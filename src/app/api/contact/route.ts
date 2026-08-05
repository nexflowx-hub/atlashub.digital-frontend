import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // TODO: Integrate with email service (e.g., SendGrid, Resend, AWS SES)
    // For now, log the contact form submission
    console.log('Contact form submission:', { name, email, subject, message: message.substring(0, 100) });

    // TODO: Store in database if needed
    // await db.contactSubmission.create({ data: { name, email, subject, message } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
