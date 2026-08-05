'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Code,
  Webhook,
  KeyRound,
  Key,
  Package,
  Store,
  Workflow,
  BookOpen,
  Copy,
  Check,
  Construction,
  ArrowRight,
  Layers,
  Server,
  Lock,
  Plug,
  type LucideIcon,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import type { Locale } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type NavId =
  | 'overview'
  | 'apis'
  | 'webhooks'
  | 'auth'
  | 'keys'
  | 'sdks'
  | 'marketplace'
  | 'automation'
  | 'reference';

interface NavItem {
  id: NavId;
  label: string;
  icon: LucideIcon;
  mobileLabel: string;
}

interface FeatureCard {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
  navId: NavId;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, mobileLabel: 'Overview' },
  { id: 'apis', label: 'REST APIs', icon: Code, mobileLabel: 'APIs' },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook, mobileLabel: 'Webhooks' },
  { id: 'auth', label: 'Authentication', icon: KeyRound, mobileLabel: 'Auth' },
  { id: 'keys', label: 'API Keys', icon: Key, mobileLabel: 'Keys' },
  { id: 'sdks', label: 'SDKs', icon: Package, mobileLabel: 'SDKs' },
  { id: 'marketplace', label: 'Marketplace Integrations', icon: Store, mobileLabel: 'Marketplace' },
  { id: 'automation', label: 'Automation Workflows', icon: Workflow, mobileLabel: 'Automation' },
  { id: 'reference', label: 'API Reference', icon: BookOpen, mobileLabel: 'Reference' },
];

const FEATURE_CARDS: FeatureCard[] = [
  { titleKey: 'dev.apis', descKey: 'dev.apis.desc', icon: Code, navId: 'apis' },
  { titleKey: 'dev.webhooks', descKey: 'dev.webhooks.desc', icon: Webhook, navId: 'webhooks' },
  { titleKey: 'dev.auth', descKey: 'dev.auth.desc', icon: KeyRound, navId: 'auth' },
  { titleKey: 'dev.apiKeys', descKey: 'dev.apiKeys.desc', icon: Key, navId: 'keys' },
  { titleKey: 'dev.sdks', descKey: 'dev.sdks.desc', icon: Package, navId: 'sdks' },
  { titleKey: 'dev.marketplace', descKey: 'dev.marketplace.desc', icon: Store, navId: 'marketplace' },
  { titleKey: 'dev.automation', descKey: 'dev.automation.desc', icon: Workflow, navId: 'automation' },
  { titleKey: 'dev.apiRef', descKey: 'dev.apiRef.desc', icon: BookOpen, navId: 'reference' },
];

const ARCHITECTURE_PRINCIPLES = [
  {
    icon: Plug,
    title: 'Event-Driven',
    description: 'All services communicate through an event bus for loose coupling',
  },
  {
    icon: Server,
    title: 'Horizontally Scalable',
    description: 'Each microservice can scale independently based on demand',
  },
  {
    icon: Layers,
    title: 'API-First',
    description: 'Every capability is exposed through well-documented REST APIs',
  },
  {
    icon: Lock,
    title: 'Secure by Default',
    description: 'Authentication, rate limiting, and encryption at every layer',
  },
];

const CODE_EXAMPLES = [
  {
    lang: 'bash',
    title: 'Authentication',
    code: `curl -X POST https://api.atlashub.digital/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
  }'`,
  },
  {
    lang: 'typescript',
    title: 'List Products',
    code: `import { AtlasHubClient } from '@atlashub/sdk';

const client = new AtlasHubClient({
  apiKey: process.env.ATLASHUB_API_KEY
});

const products = await client.products.list({
  limit: 10,
  sort: 'created_at:desc'
});

console.log(products.data);`,
  },
  {
    lang: 'python',
    title: 'Create Order',
    code: `from atlashub import AtlasHub

client = AtlasHub(api_key="sk_live_...")

order = client.orders.create(
    customer_email="customer@example.com",
    items=[
        {"product_id": "prod_123", "quantity": 1}
    ],
    metadata={"source": "website"}
)`,
  },
];

const ARCHITECTURE_DIAGRAM = `┌─────────────┐    ┌─────────────┐    ┌───────────────┐
│   Client     │──┾│  API Gateway │──┾│  Microservice│
│  Application │    │  (Auth+Rate) │    │     Layer     │
└─────────────┘    └─────────────┘    └─────┐──────┘
                                               │
                    ┌─────────────────────┐───────────├──────────────────┐
                    │                          │                │
             ┌─────┐──────────────────────┘           ┌─────┐────────────────┘  ┌────┐──────┘
             │  Commerce   │           │  Workflow   │  │   AI     │
             │   Service  │           │   Engine    │  │ Service  │
             └─────┐──────────────────────┘           └─────┐────────────────┘  └────┐──────┘
                    │                          │                │
             ┌─────┐──────────────────────┘           ┌─────┐────────────────┘  ┌────┐──────┘
             │  Database   │           │   Message   │  │  LLM     │
             │  (Postgres) │           │    Queue    │  │ Provider  │
             └───────────────────────┘           └────────────────────┘  └────────────┘`;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const pageContainer = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Copy Button                                                         */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded-md bg-white/5 p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
      aria-label="Copy code"
    >
      {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Code Block                                                          */
/* ------------------------------------------------------------------ */

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-black/40 border border-border/30">
      {lang && (
        <div className="flex items-center border-b border-border/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {lang}
          </span>
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <pre className="overflow-x-auto p-4">
          <code className="text-sm leading-relaxed text-emerald-300/90 font-mono whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page: Overview                                                      */
/* ------------------------------------------------------------------ */

function OverviewPage({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (id: NavId) => void;
}) {
  return (
    <motion.div
      key="overview"
      variants={pageContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-8"
    >
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('dev.title', locale).split('Portal')[0]}
          <span className="gradient-text">Portal</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          {t('dev.subtitle', locale)}
        </p>
      </div>

      {/* Feature Cards Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.titleKey}
              variants={cardFadeUp}
              onClick={() => onNavigate(card.navId)}
              className="group relative text-left rounded-xl glass gradient-border p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t(card.titleKey, locale)}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 font-normal"
                    >
                      Coming Soon
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {t(card.descKey, locale)}
                  </p>
                </div>
              </div>
              <ArrowRight className="absolute bottom-5 right-5 size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page: Code Examples (REST APIs)                                     */
/* ------------------------------------------------------------------ */

function CodeExamplesPage({ locale }: { locale: Locale }) {
  return (
    <motion.div
      key="apis"
      variants={pageContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('dev.codeExample', locale)}
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          {t('dev.codeExample.subtitle', locale)}
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {CODE_EXAMPLES.map((example, idx) => (
          <motion.div key={idx} variants={cardFadeUp} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {idx + 1}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {example.title}
              </h3>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                {example.lang}
              </Badge>
            </div>
            <CodeBlock code={example.code} lang={example.lang} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page: Architecture (Webhooks / Automation)                          */
/* ------------------------------------------------------------------ */

function ArchitecturePage({ locale }: { locale: Locale }) {
  return (
    <motion.div
      key="architecture"
      variants={pageContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('dev.architecture', locale)}
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          {t('dev.architecture.subtitle', locale)}
        </p>
      </div>

      {/* Architecture Diagram */}
      <motion.div variants={cardFadeUp}>
        <CodeBlock code={ARCHITECTURE_DIAGRAM} lang="System Architecture" />
      </motion.div>

      {/* Architecture Principles */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2"
      >
        {ARCHITECTURE_PRINCIPLES.map((principle) => {
          const Icon = principle.icon;
          return (
            <motion.div
              key={principle.title}
              variants={cardFadeUp}
              className="rounded-xl glass gradient-border p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page: Coming Soon                                                   */
/* ------------------------------------------------------------------ */

function ComingSoonPage({ locale, featureName }: { locale: Locale; featureName: string }) {
  return (
    <motion.div
      key={featureName}
      variants={pageContainer}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
        <Construction className="size-8 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {featureName}
      </h2>
      <p className="mt-3 max-w-md text-base text-muted-foreground">
        {t('dev.comingSoon', locale)}
      </p>
      <Badge variant="secondary" className="mt-6 px-4 py-1.5 text-sm">
        Coming Soon
      </Badge>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function Sidebar({
  activeNav,
  onNavigate,
}: {
  activeNav: NavId;
  onNavigate: (id: NavId) => void;
}) {
  return (
    <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-border/50 bg-background/50">
      {/* Logo */}
      <div className="flex items-center gap-1.5 px-5 py-5 border-b border-border/50">
        <span className="text-base font-bold text-foreground">AtlasHub</span>
        <span className="text-base font-bold text-primary">Digital</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Tab Bar                                                      */
/* ------------------------------------------------------------------ */

function MobileTabBar({
  activeNav,
  onNavigate,
}: {
  activeNav: NavId;
  onNavigate: (id: NavId) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const activeEl = scrollRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeNav]);

  return (
    <div className="lg:hidden border-b border-border/50 bg-background/50">
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate(item.id)}
              data-active={isActive}
              className="shrink-0 text-xs"
            >
              {item.mobileLabel}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Content Router                                                 */
/* ------------------------------------------------------------------ */

function MainContent({
  activeNav,
  locale,
  onNavigate,
}: {
  activeNav: NavId;
  locale: Locale;
  onNavigate: (id: NavId) => void;
}) {
  const renderPage = () => {
    switch (activeNav) {
      case 'overview':
        return <OverviewPage locale={locale} onNavigate={onNavigate} />;
      case 'apis':
        return <CodeExamplesPage locale={locale} />;
      case 'webhooks':
      case 'automation':
        return <ArchitecturePage locale={locale} />;
      default: {
        const navItem = NAV_ITEMS.find((n) => n.id === activeNav);
        return (
          <ComingSoonPage
            locale={locale}
            featureName={navItem?.label ?? ''}
          />
        );
      }
    }
  };

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-10">
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Developer Portal Dialog                                             */
/* ------------------------------------------------------------------ */

export function DeveloperPortal() {
  const activePage = useAppStore((s) => s.activePage);
  const setActivePage = useAppStore((s) => s.setActivePage);
  const locale = useAppStore((s) => s.locale);

  const [activeNav, setActiveNav] = useState<NavId>('overview');

  const isOpen = activePage === 'developers';

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setActivePage(null);
        setActiveNav('overview');
      }
    },
    [setActivePage]
  );

  const handleNavigate = useCallback((id: NavId) => {
    setActiveNav(id);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-background">
        <DialogHeader className="sr-only">
          <DialogTitle>Developer Portal</DialogTitle>
        </DialogHeader>

        {/* Two-column layout */}
        <div className="flex flex-1 min-h-0">
          <Sidebar activeNav={activeNav} onNavigate={handleNavigate} />

          <div className="flex flex-1 flex-col min-h-0">
            <MobileTabBar activeNav={activeNav} onNavigate={handleNavigate} />
            <MainContent
              activeNav={activeNav}
              locale={locale}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
