<div align="center">

# AtlasHub Digital – Corporate Website v2

**Building Digital Commerce Infrastructure**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-New%20York-black)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-Proprietary-gray)]()

</div>

---

## Sobre o Projecto

Website corporativo premium da **AtlasHub Digital Ltd**, empresa de tecnologia registada em Inglaterra e Gales (Company No. 17379237). O site posiciona a empresa como fornecedora de infraestrutura de comércio digital, com foco em SaaS, IA, automação e marketplace.

O website foi concebido para:
- **Stripe KYB** – Verificação de identidade empresarial
- **Wise Business / PayPal Business** – Onboarding de contas empresariais
- **Banking** – Verificação de empresa para abertura de contas
- **Partners & Enterprise** – Apresentação profissional a parceiros e clientes
- **Investors** – Confiança e seriedade corporativa

---

## Tecnologias

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Linguagem | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS 4 | 4.x |
| Componentes | shadcn/ui (New York) | latest |
| Animações | Framer Motion | 12.x |
| Ícones | Lucide React | 0.525.x |
| Estado Cliente | Zustand | 5.x |
| Formulários | React Hook Form + Zod | 7.x / 4.x |
| Tema | next-themes | 0.4.x |
| Processamento | Bun | latest |
| Deploy | Vercel | — |

---

## Arquitectura

```
src/
├── app/
│   ├── api/
│   │   ├── geoip/route.ts      # Detecção GeoIP → moeda + idioma
│   │   └── contact/route.ts     # Formulário de contacto (Zod validated)
│   ├── globals.css              # Tema dark premium, glassmorphism, animações
│   ├── layout.tsx               # SEO metadata, JSON-LD, ThemeProvider
│   └── page.tsx                 # Page assembly (SPA single-route)
│
├── components/
│   ├── atlashub/                # Componentes de negócio
│   │   ├── animated-background.tsx  # Cubo 3D wireframe + partículas + grid
│   │   ├── navbar.tsx               # Sticky glass navbar, i18n, scroll spy
│   │   ├── hero-section.tsx         # Hero com CTA, animated background
│   │   ├── solutions-section.tsx    # 5 solution cards (Commerce, Marketplace, AI, SaaS, Workflow)
│   │   ├── workflow-section.tsx     # Animated pipeline (8 steps) + feature cards
│   │   ├── products-section.tsx     # 8 products com filtro por categoria
│   │   ├── pricing-section.tsx      # 3 tiers com conversão de moeda
│   │   ├── trust-section.tsx        # 6 trust indicators
│   │   ├── company-page.tsx         # Company modal (Mission, Vision, Values)
│   │   ├── contact-section.tsx      # Formulário + info de contacto
│   │   ├── legal-pages.tsx          # 9 legal page modals
│   │   └── footer.tsx               # Footer 4 colunas + payment badges
│   └── ui/                      # shadcn/ui components (47 componentes)
│
├── lib/
│   ├── i18n/
│   │   ├── index.ts            # t() helper, detectLocale(), fallback EN
│   │   └── locales/
│   │       ├── en.ts           # English (152 chaves, completo)
│   │       ├── pt.ts           # Português (127+ chaves)
│   │       ├── es.ts           # Español (60+ chaves, fallback EN)
│   │       ├── fr.ts           # Français (20+ chaves, fallback EN)
│   │       └── de.ts           # Deutsch (20+ chaves, fallback EN)
│   ├── currency.ts             # Formatação e conversão de moedas
│   ├── stripe.ts               # Arquitectura Stripe (ENV-based, sem credenciais)
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── stores/
│   └── app-store.ts            # Zustand global store (locale, currency, UI state)
│
├── hooks/
│   ├── use-mobile.ts           # Responsive breakpoint hook
│   └── use-toast.ts            # Toast notification hook
│
└── types/
    └── index.ts                # TypeScript interfaces (Locale, Currency, Product, etc.)
```

---

## Funcionalidades

### Design
- **Dark-first** com tema claro suportado via next-themes
- **Color system** baseado em emerald/teal (sem azul/indigo)
- **Glassmorphism** controlado (navbar, cards premium)
- **Gradient text** e **gradient borders** animados
- **Micro-interações** via Framer Motion (whileInView, stagger, layout animations)
- **Custom scrollbar** estilizado
- **Mobile-first** responsive design

### Seções
| Secção | ID | Descrição |
|---|---|---|
| Hero | `#hero` | Headline, 3 CTAs, animated 3D background com cubo wireframe |
| Solutions | `#solutions` | 5 cards: Digital Commerce, Marketplace, AI, SaaS, Workflow |
| Workflow | `#workflow` | Pipeline animado 8 steps (Customer → Analytics) + 4 feature cards |
| Products | `#products` | 8 products, filtro por 7 categorias, preços dinâmicos |
| Pricing | `#pricing` | 3 tiers (Starter £190, Professional £260, Enterprise £340) com moeda dinâmica |
| Trust | `#trust` | 6 indicadores: UK Company, Secure Payments, GDPR, SSL, Support, Global |
| Company | `#company` | Modal com Mission, Vision, 4 Core Values, Business Activities |
| Contact | `#contact` | Formulário validado + 5 canais de contacto + Maps placeholder |
| Footer | — | 4 colunas, 9 legal links, 8 payment badges |

### i18n – Internacionalização
- **5 idiomas**: English, Português, Español, Français, Deutsch
- Detecção automática via `navigator.language`
- Detecção GeoIP via `/api/geoip` para moeda + idioma
- **Fallback**: chaves em falta recuam para Inglês
- Arquitectura preparada para adicionar novos idiomas

### Moeda Dinâmica
| País/Região | Moeda | Símbolo | Taxa (vs GBP) |
|---|---|---|---|
| United Kingdom | GBP | £ | 1.00 |
| European Union | EUR | € | 1.17 |
| United States | USD | $ | 1.27 |
| Brazil | BRL | R$ | 7.85 |

### Páginas Legais (Modais)
9 páginas legais completas com estrutura profissional:
1. Privacy Policy
2. Terms & Conditions
3. Refund Policy
4. Cookie Policy
5. Shipping Policy
6. Acceptable Use Policy
7. AML & Compliance
8. GDPR Statement
9. Accessibility Statement

### SEO
- OpenGraph meta tags
- Twitter Card meta tags
- JSON-LD Structured Data (Schema.org Organization)
- Canonical URL
- Robots directives
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`)
- ARIA labels e roles

### Stripe Integration (Arquitectura)
- `src/lib/stripe.ts` – Service layer preparado
- Todos os credenciais via environment variables (nunca hardcoded)
- Suporte para Checkout Sessions, Subscriptions, One-time Payments
- Webhook-ready architecture
- Price IDs configuráveis por plano

### API Routes
| Endpoint | Método | Descrição |
|---|---|---|
| `/api/geoip` | GET | Detecta país via CF-IPCountry ou ip-api.com → retorna moeda + locale |
| `/api/contact` | POST | Recebe formulário de contacto (validado com Zod) |

---

## Instalação & Desenvolvimento

### Pré-requisitos
- **Bun** >= 1.0 (https://bun.sh)
- **Node.js** >= 18 (alternativa ao Bun)

### Setup

```bash
# Clonar o repositório
git clone https://github.com/nexflowx-hub/atlashub.digital-frontend.git
cd atlashub.digital-frontend

# Instalar dependências
bun install

# Copiar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com os valores correctos

# Iniciar servidor de desenvolvimento
bun run dev
```

O website estará disponível em `http://localhost:3000`.

### Scripts

```bash
bun run dev      # Servidor de desenvolvimento (port 3000)
bun run build    # Build de produção
bun run start    # Servidor de produção
bun run lint     # ESLint check
```

---

## Environment Variables

Copiar `.env.example` para `.env.local`. Todas as variáveis são opcionais para o funcionamento base do website.

### Obrigatórias para Stripe (quando activado)
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PRICE_STARTER=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...
NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Opcionais
```env
NEXT_PUBLIC_SITE_URL=https://atlashub.digital
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Deploy – Vercel

### Configuração

1. **Conectar repositório**: Em [vercel.com](https://vercel.com) → New Project → Import `nexflowx-hub/atlashub.digital-frontend`

2. **Framework Preset**: Next.js (detectado automaticamente)

3. **Environment Variables**: Adicionar no painel da Vercel:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PRICE_STARTER`
   - `NEXT_PUBLIC_STRIPE_PRICE_PRO`
   - `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE`
   - `STRIPE_WEBHOOK_SECRET`

4. **Build Command**: `bun run build` (ou `npm run build`)

5. **Output Directory**: Deixar vazio (Vercel detecta Next.js automaticamente)

6. **Deploy**: Clicar "Deploy"

### Domínio Personalizado

Em Settings → Domains:
- Adicionar `atlashub.digital`
- Configurar DNS: CNAME `www.atlashub.digital` → `cname.vercel-dns.com`
- Configurar DNS: A `atlashub.digital` → `76.76.21.21`

### Vercel JSON (Opcional)

O `next.config.ts` já está configurado para Vercel. Não é necessário `vercel.json` adicional.

---

## Estrutura de Dados

### Tipo: Locale
```typescript
type Locale = 'en' | 'pt' | 'es' | 'fr' | 'de';
```

### Tipo: CurrencyCode
```typescript
type CurrencyCode = 'GBP' | 'EUR' | 'USD' | 'BRL';
```

### Estado Global (Zustand)
```typescript
interface AppState {
  locale: Locale;           // Idioma activo
  currency: CurrencyCode;   // Moeda activa
  activeSection: string;    // Secção visível (scroll spy)
  legalPage: string | null; // Página legal aberta (modal)
  companyPageOpen: boolean; // Modal da empresa
  mobileMenuOpen: boolean;  // Menu mobile
  productFilter: string;    // Filtro de produtos
}
```

---

## Companhia

| Campo | Valor |
|---|---|
| Nome | AtlasHub Digital Ltd |
| Registo | England & Wales |
| Nº Empresa | 17379237 |
| Sede | 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, UK |
| Website | https://atlashub.digital |
| Email | support@atlashub.digital |
| Telegram | @AtlasHubDigital |
| Telefone | +44 7451 245014 |

---

## Notas para Desenvolvedores

### Adicionar novo idioma
1. Criar `src/lib/i18n/locales/<code>.ts` com `Partial<Record<TranslationKey, string>>`
2. Importar em `src/lib/i18n/index.ts` e adicionar ao `localeMap`
3. Adicionar ao tipo `Locale` em `src/types/index.ts`
4. Adicionar ao array `availableLocales` e ao objecto `localeNames`
5. Adicionar mapeamento país→locale em `src/app/api/geoip/route.ts`

### Adicionar nova moeda
1. Adicionar entrada em `src/lib/currency.ts` (currencies + countryToCurrency)
2. Adicionar ao tipo `CurrencyCode` em `src/types/index.ts`

### Activar Stripe
1. Instalar: `bun add stripe`
2. Configurar environment variables
3. Descomentar o código em `src/lib/stripe.ts`
4. Criar webhook route em `src/app/api/stripe/webhook/route.ts`

### Performance
- Todas as animações usam `will-change` e `transform3d` para GPU acceleration
- O background animado usa CSS puro (sem Canvas/WebGL)
- Imagens optimizadas com Sharp (instalado)
- Target: Lighthouse 100/100/100/100

### Acessibilidade
- Semantic HTML5
- ARIA labels em todos os elementos interactivos
- Navegação por teclado
- Screen reader friendly (sr-only classes)
- Contraste adequado em modo dark

---

## Licença

Propriedade da **AtlasHub Digital Ltd**. Todos os direitos reservados.

Este repositório contém software proprietário. A reprodução, distribuição ou modificação sem autorização escrita é estritamente proibida.

---

<div align="center">

**© 2026 AtlasHub Digital Ltd**<br/>
Building Digital Commerce Infrastructure

</div>
