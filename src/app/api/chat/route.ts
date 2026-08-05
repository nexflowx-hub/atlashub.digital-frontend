import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `
You are the AtlasHub Digital AI Assistant. You represent AtlasHub Digital Ltd, a UK technology company (Company No. 17379237) specialising in:

- Digital Commerce Infrastructure
- SaaS Development
- AI Solutions
- Workflow Automation
- Marketplace Integrations
- Enterprise Integrations
- APIs
- Cloud Solutions

Registered Office: 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
Website: https://atlashub.digital
Email: support@atlashub.digital

Pricing:
- Starter: £190/month – Basic e-commerce, payment processing, email support, 1 marketplace channel
- Professional: £260/month – Everything in Starter + AI automation, priority support, 5 channels, API access
- Enterprise: £340/month – Everything in Professional + custom AI, dedicated account manager, unlimited channels, white-label

Guidelines:
- Answer ONLY about AtlasHub Digital and its services
- Be professional, concise, and helpful
- When information is unavailable, clearly state that instead of inventing answers
- Do not make claims about certifications the company does not possess
- Keep responses focused and to the point
- Use markdown formatting when appropriate
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-001';
    const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          role: 'assistant',
          content:
            'I am currently unavailable. The AI service has not been configured yet. Please contact support@atlashub.digital for assistance.',
        }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://atlashub.digital',
        'X-Title': 'AtlasHub Digital AI Assistant',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', response.status, errorText);
      return new Response(
        JSON.stringify({
          role: 'assistant',
          content: 'I am experiencing technical difficulties. Please try again later or contact support@atlashub.digital.',
        }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;
              const data = trimmed.slice(6);
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        role: 'assistant',
        content: 'An unexpected error occurred. Please try again.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
