'use client';

import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  CloudCog,
  Code2,
  Cpu,
  Globe2,
  GraduationCap,
  Layers3,
  Menu,
  Network,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const capabilities = [
  { icon: BrainCircuit, title: 'Intelligent Systems & Agents', text: 'Deploy intelligent agents and decision systems that support real operational work.' },
  { icon: Workflow, title: 'Business Automation', text: 'Connect workflows, remove repetitive tasks and orchestrate processes across teams.' },
  { icon: Code2, title: 'Custom Software & Platforms', text: 'Build tailored SaaS products, portals, dashboards and internal operating systems.' },
  { icon: ShoppingCart, title: 'Digital Commerce & CX', text: 'Create connected commerce, service and customer journeys from acquisition to operation.' },
  { icon: ShieldCheck, title: 'FinTech & Payments', text: 'Design payment orchestration, wallets, APIs and provider integrations for digital businesses.' },
  { icon: CloudCog, title: 'Cloud, APIs & Integration', text: 'Integrate systems, data and services on secure, scalable cloud architecture.' },
];

const buildForYou = [
  'AI assistants and specialist agents',
  'Omnichannel customer operations',
  'CRM, ERP and workflow automation',
  'Executive dashboards and analytics',
  'SaaS platforms and member portals',
  'E-commerce and service ecosystems',
  'Payment and financial integrations',
  'Knowledge systems and internal copilots',
];

const industries = [
  ['Retail & E-commerce', ShoppingCart],
  ['Professional Services', Building2],
  ['Healthcare Operations', BrainCircuit],
  ['Real Estate', Building2],
  ['Financial Technology', ShieldCheck],
  ['Education & Training', GraduationCap],
  ['Customer Operations', Network],
] as const;

const cases = [
  { title: 'Atendimento.Center', tag: 'Omnichannel Operations', text: 'A unified service layer connecting channels, automation and intelligent assistance.' },
  { title: 'XPayments & PiXBrasil', tag: 'Payment Infrastructure', text: 'Payment orchestration, Pix, provider routing, merchant operations and financial tooling.' },
  { title: 'LeveLab & LIA', tag: 'Digital Coaching', text: 'A guided digital experience combining content, journeys, intelligent assistance and community.' },
  { title: 'AutoHub360', tag: 'Commerce & Services', text: 'A connected automotive ecosystem spanning discovery, commerce, service and operations.' },
];

function AtlasMark({ className = '' }: { className?: string }) {
  return <img className={className} src="/atlas-v3/atlas-mark.png" alt="AtlasHub" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="atlas-header">
      <a className="brand" href="#top" aria-label="AtlasHub Digital home">
        <AtlasMark className="brand-mark" />
        <span><b>AtlasHub.</b>Digital</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#solutions">Solutions</a>
        <a href="#work">Work</a>
        <a href="#industries">Industries</a>
        <a href="#si">AtlasHub.SI</a>
        <a href="#insights">Insights</a>
        <a href="#company">Company</a>
      </nav>
      <a className="nav-cta" href="#contact">Talk to AtlasHub <ArrowRight size={17} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      {open && (
        <div className="mobile-menu">
          {['solutions','work','industries','si','insights','company','contact'].map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{id === 'si' ? 'AtlasHub.SI' : id[0].toUpperCase()+id.slice(1)}</a>
          ))}
        </div>
      )}
    </header>
  );
}

function VisualPanel({ src, alt, className = '', children }: { src: string; alt: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`visual-panel ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-desktop">
        <VisualPanel src="/atlas-v3/hero.webp" alt="AtlasHub Digital — We build the Augmented Enterprise">
          <div className="hero-top-mask" />
          <div className="hero-metric-mask">
            <div><b>STRATEGY</b><span>Business context first</span></div>
            <div><b>SYSTEMS</b><span>Intelligence + software</span></div>
            <div><b>EXECUTION</b><span>Build, integrate, operate</span></div>
          </div>
          <a className="hotspot hs-work" href="#work" aria-label="Explore our work" />
          <a className="hotspot hs-si" href="#si" aria-label="Discover AtlasHub.SI" />
        </VisualPanel>
      </div>
      <div className="hero-mobile">
        <div className="cosmic-orb cosmic-orb-a" />
        <div className="mobile-logo-ring"><AtlasMark className="mobile-hero-mark" /></div>
        <div className="eyebrow">PEOPLE · TECHNOLOGY · RESULTS</div>
        <h1>We build the <span>Augmented Enterprise.</span></h1>
        <p>People, intelligent systems, software and automation working together to help forward-thinking organisations operate better and grow with clarity.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#work">Explore our work <ArrowRight size={18}/></a>
          <a className="secondary-button" href="#si">Discover AtlasHub.SI <ArrowRight size={18}/></a>
        </div>
        <div className="hero-principles">
          <span>Strategy</span><span>Systems</span><span>Execution</span>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="solutions" className="atlas-section visual-section">
      <VisualPanel src="/atlas-v3/capabilities.webp" alt="AtlasHub capabilities — intelligent systems, automation, software, commerce, fintech and integration" />
      <div className="mobile-section-native">
        <div className="section-kicker">CAPABILITIES</div>
        <h2>What <span>we do</span></h2>
        <p className="section-lead">AtlasHub combines strategy, software, intelligent systems and automation to transform real operations.</p>
        <div className="cap-grid">
          {capabilities.map(({icon: Icon,title,text}) => (
            <article className="glass-card" key={title}>
              <div className="icon-shell"><Icon /></div>
              <h3>{title}</h3><p>{text}</p>
              <ArrowRight className="card-arrow" size={18}/>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SISection() {
  return (
    <section id="si" className="atlas-section visual-section si-section">
      <VisualPanel src="/atlas-v3/si.webp" alt="AtlasHub.SI Workspace — Your Augmented Enterprise, in one place">
        <div className="si-metric-mask">
          <span>People</span><span>Agents</span><span>Processes</span><span>Knowledge</span><span>Automations</span><span>Analytics</span>
        </div>
        <a className="hotspot hs-enter" href="https://atlashub.si" aria-label="Enter AtlasHub.SI Workspace" />
        <a className="hotspot hs-demo" href="#contact" aria-label="Request a demo" />
      </VisualPanel>
      <div className="mobile-section-native">
        <div className="section-kicker">ATLASHUB.SI</div>
        <h2>AtlasHub.SI <span>Workspace</span></h2>
        <h3 className="si-tagline">Your Augmented Enterprise, in one place.</h3>
        <p className="section-lead">Bring people, agents, processes, knowledge, automations and analytics together in one intelligent operational layer.</p>
        <div className="si-dashboard-mini">
          {['People','Agents','Processes','Knowledge','Automations','Analytics'].map((x,i) => <div key={x}><span className="mini-dot">0{i+1}</span><b>{x}</b></div>)}
        </div>
        <div className="hero-actions">
          <a className="primary-button" href="https://atlashub.si">Enter the Workspace <ArrowRight size={18}/></a>
          <a className="secondary-button" href="#contact">Request a Demo <ArrowRight size={18}/></a>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="atlas-section visual-section">
      <VisualPanel src="/atlas-v3/work.webp" alt="Selected AtlasHub work and projects" />
      <div className="mobile-section-native">
        <div className="section-kicker">SELECTED WORK</div>
        <h2>Real systems. <span>Real operations.</span></h2>
        <p className="section-lead">A selection of products, ventures and operational systems developed across different business contexts.</p>
        <div className="case-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.title}>
              <div className="case-index">{String(cases.indexOf(item)+1).padStart(2,'0')}</div>
              <span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p>
              <a href="#contact">Discuss a similar challenge <ArrowRight size={16}/></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildForYou() {
  return (
    <section className="atlas-section native-section" id="build">
      <div className="section-copy two-col-head">
        <div><div className="section-kicker">FROM IDEA TO OPERATION</div><h2>What we can build <span>for your company</span></h2></div>
        <p>We translate business problems into working systems — from a single agent or workflow to a complete operational platform.</p>
      </div>
      <div className="build-grid">
        {buildForYou.map((item,i)=><div className="build-item" key={item}><span>{String(i+1).padStart(2,'0')}</span><b>{item}</b><ArrowRight size={17}/></div>)}
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="atlas-section native-section industry-section">
      <div className="section-copy centered-copy">
        <div className="section-kicker">BUSINESS CONTEXTS</div>
        <h2>Built around the operation, <span>not the buzzword.</span></h2>
        <p>Our architecture adapts to the reality of each organisation: its people, processes, data, customers and systems.</p>
      </div>
      <div className="industry-grid">
        {industries.map(([title,Icon]) => <div className="industry-card" key={title}><Icon/><span>{title}</span></div>)}
      </div>
    </section>
  );
}

function AugmentedEnterprise() {
  const pillars = [
    [Bot,'Agents','Specialist digital workers that can reason, act and collaborate within defined boundaries.'],
    [Layers3,'Systems','Software, data and integrations assembled as an operational layer rather than disconnected tools.'],
    [Cpu,'Intelligence','Context and knowledge applied at the point of work to improve decisions and execution.'],
    [Globe2,'People','Human judgement, accountability, relationships and creativity remain at the centre of the enterprise.'],
  ] as const;
  return (
    <section className="atlas-section native-section augmented-section">
      <div className="augmented-copy">
        <div className="section-kicker">THE AUGMENTED ENTERPRISE</div>
        <h2>Not AI added to a company. <span>A company redesigned to operate with intelligence.</span></h2>
        <p>We design environments where people, agents, software and processes work as one coordinated system — with human direction and measurable operational outcomes.</p>
        <a className="text-link" href="#contact">Explore the model <ArrowRight size={17}/></a>
      </div>
      <div className="pillar-grid">
        {pillars.map(([Icon,title,text])=><article key={title}><Icon/><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function Insights() {
  const cards = [
    {icon: Sparkles, label:'Insights', title:'Ideas for the Augmented Enterprise', text:'Research, essays and practical thinking on intelligent systems, operations and transformation.'},
    {icon: GraduationCap, label:'Academy', title:'Executive and team enablement', text:'Workshops, training and implementation sessions for leaders and operational teams.'},
    {icon: Rocket, label:'Labs', title:'Applied R&D and venture building', text:'Experiments, prototypes and new products developed from real business opportunities.'},
  ];
  return (
    <section id="insights" className="atlas-section native-section insight-section">
      <div className="section-copy"><div className="section-kicker">KNOWLEDGE · ENABLEMENT · R&D</div><h2>Beyond delivery. <span>We build capability.</span></h2></div>
      <div className="insight-grid">
        {cards.map(({icon:Icon,label,title,text}) => <article key={label}><div className="icon-shell"><Icon/></div><span>{label}</span><h3>{title}</h3><p>{text}</p><a href="#contact">Learn more <ArrowRight size={16}/></a></article>)}
      </div>
    </section>
  );
}

function Company() {
  return (
    <section id="company" className="atlas-section native-section company-section">
      <div className="company-card">
        <div className="company-brand"><div className="logo-ring-small"><AtlasMark /></div><div><span>ATLASHUB.DIGITAL</span><h2>People. Technology. Results.</h2></div></div>
        <div className="company-copy"><p>AtlasHub is a technology company focused on building intelligent systems, digital platforms and operational infrastructure for modern organisations.</p><p>We work from strategy through architecture, development, integration and continuous improvement — connecting business context to working technology.</p></div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="atlas-section final-cta">
      <div className="cta-orbit" />
      <AtlasMark className="cta-logo" />
      <div className="section-kicker">START A CONVERSATION</div>
      <h2>What could your company become <span>with the right systems?</span></h2>
      <p>Tell us where the friction is. We will help map the opportunity, architecture and path to execution.</p>
      <div className="hero-actions centered-actions">
        <a className="primary-button" href="mailto:support@atlashub.digital">Talk to AtlasHub <ArrowRight size={18}/></a>
        <a className="secondary-button" href="https://atlashub.si">Explore AtlasHub.SI <ArrowRight size={18}/></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="atlas-footer">
      <div className="footer-brand"><AtlasMark/><span><b>AtlasHub.</b>Digital</span></div>
      <div className="footer-links"><a href="#solutions">Solutions</a><a href="#work">Work</a><a href="#si">AtlasHub.SI</a><a href="#company">Company</a></div>
      <div className="footer-meta"><span>© 2026 AtlasHub Digital Ltd</span><span>People | Technology | Results</span></div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    }, { threshold: .12 });
    document.querySelectorAll('.native-section, .final-cta').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="atlas-site">
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <SISection />
        <Work />
        <BuildForYou />
        <Industries />
        <AugmentedEnterprise />
        <Insights />
        <Company />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
