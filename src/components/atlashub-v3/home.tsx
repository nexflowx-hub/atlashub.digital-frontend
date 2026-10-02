'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight, BarChart3, BookOpen, Bot, Boxes, CheckCircle2, Cloud,
  Code2, Cog, CreditCard, Gauge, Globe2, Layers3, Menu, Network,
  Search, ShoppingCart, Sparkles, Users, Workflow, X, Zap
} from 'lucide-react';

const capabilities = [
  { icon: Bot, title: 'Intelligent Systems & AI Agents', copy: 'Deploy intelligent agents and systems that reason, act and support real business operations.' },
  { icon: Cog, title: 'Business Automation', copy: 'Redesign workflows, reduce manual work and orchestrate processes across teams and tools.' },
  { icon: Boxes, title: 'Custom Software & Platforms', copy: 'Build tailored SaaS products, internal platforms and operational software around your business.' },
  { icon: ShoppingCart, title: 'Digital Commerce & Customer Experience', copy: 'Connect acquisition, commerce, service and retention into one coherent digital journey.' },
  { icon: CreditCard, title: 'FinTech & Payment Infrastructure', copy: 'Architect payment orchestration, wallets, checkout experiences and provider integrations.' },
  { icon: Cloud, title: 'Cloud, APIs & Systems Integration', copy: 'Connect platforms, data and services through secure APIs and cloud-native architecture.' },
];

const cases = [
  { tag: 'Omnichannel Platform', title: 'Atendimento.Center', copy: 'Unified customer-service infrastructure connecting channels, automation, CRM context and intelligent assistance.', icon: Network },
  { tag: 'Payment Infrastructure', title: 'XPayments & PiXBrasil', copy: 'Payment orchestration and operational infrastructure connecting Pix, cards, providers, routing and financial workflows.', icon: CreditCard },
  { tag: 'Digital Coaching', title: 'LeveLab & LIA', copy: 'Digital coaching ecosystem combining structured content, member journeys and an AI-powered conversational layer.', icon: Sparkles },
  { tag: 'Commerce & Services', title: 'AutoHub360', copy: 'Connected automotive commerce and services experience spanning content, lead capture, products and operations.', icon: Gauge },
];

const industries = ['Retail & E-commerce','Professional Services','Financial Technology','Customer Operations','Education & Training','Automotive & Mobility'];

const OFFICIAL_LOGO = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Oficial_AtlasHub-2tKNqT43mJDvSAa7Iw8JWTOFAhnmQx.jpeg';

function LogoMark({className=''}) {
  return <img src={OFFICIAL_LOGO} alt="AtlasHub" width={64} height={64} className={className} />;
}

function EnergyRing() {
  return (
    <div className="ah-ring" aria-hidden="true">
      <div className="ah-ring__rail ah-ring__rail--outer" />
      <div className="ah-ring__rail ah-ring__rail--inner" />
      <div className="ah-ring__beam ah-ring__beam--a" />
      <div className="ah-ring__beam ah-ring__beam--b" />
      <div className="ah-ring__core"><LogoMark className="ah-ring__logo" /></div>
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="ah-workspace-shell">
      <div className="ah-workspace-top">
        <div className="ah-workspace-brand"><LogoMark/><div><strong>AtlasHub<span>.SI</span></strong><small>Workspace</small></div></div>
        <div className="ah-search"><Search size={14}/><span>Search anything…</span></div>
      </div>
      <div className="ah-workspace-body">
        <aside className="ah-workspace-nav">
          {['Workspace','Agents','People','Processes','Knowledge','Automations','Analytics'].map((item,i)=><div key={item} className={i===0?'active':''}>{item}</div>)}
        </aside>
        <div className="ah-workspace-main">
          <div className="ah-module-grid">
            {[
              [Bot,'Agents','Digital talent'],[Users,'People','Teams & skills'],[Workflow,'Processes','Orchestration'],
              [BookOpen,'Knowledge','Organisational memory'],[Zap,'Automations','Action layer'],[BarChart3,'Analytics','Live insight']
            ].map(([Icon,title,copy])=> {
              const C=Icon as typeof Bot;
              return <div className="ah-module" key={String(title)}><C size={19}/><strong>{String(title)}</strong><small>{String(copy)}</small></div>
            })}
          </div>
          <div className="ah-data-grid">
            <div className="ah-chart-card">
              <div className="ah-card-label"><span>Operational intelligence</span><em>Live</em></div>
              <svg viewBox="0 0 420 130" className="ah-chart" role="img" aria-label="Illustrative performance chart">
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#18bfff" stopOpacity=".38"/><stop offset="100%" stopColor="#18bfff" stopOpacity="0"/></linearGradient></defs>
                <path d="M0 108 C35 94 42 98 70 76 S114 91 145 59 S196 82 228 48 S282 69 316 40 S368 53 420 18 L420 130 L0 130 Z" fill="url(#area)"/>
                <path d="M0 108 C35 94 42 98 70 76 S114 91 145 59 S196 82 228 48 S282 69 316 40 S368 53 420 18" fill="none" stroke="#37d7ff" strokeWidth="3"/>
              </svg>
              <div className="ah-chart-meta"><span>Signals</span><span>Decisions</span><span>Actions</span></div>
            </div>
            <div className="ah-agents-card">
              <div className="ah-card-label"><span>Active agents</span><em>Orchestrated</em></div>
              {['Research Agent','Operations Agent','Customer Agent','Insights Agent'].map((a,i)=><div className="ah-agent-row" key={a}><i className={'dot d'+i}/><span>{a}</span><small>{i===0?'Processing':'Active'}</small></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AtlasHubV3Home(){
  const [open,setOpen]=useState(false);
  return (
    <div className="ah-site">
      <header className="ah-nav-wrap">
        <nav className="ah-nav">
          <a href="#top" className="ah-brand"><LogoMark/><span>AtlasHub<span>.Digital</span></span></a>
          <div className="ah-nav-links">
            <a href="#solutions">Solutions</a><a href="#work">Work</a><a href="#industries">Industries</a><a href="#si">AtlasHub.SI</a><a href="#insights">Insights</a><a href="#company">Company</a>
          </div>
          <a className="ah-button ah-button--nav" href="#contact">Talk to AtlasHub <ArrowRight size={16}/></a>
          <button className="ah-mobile-toggle" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
        </nav>
        {open && <div className="ah-mobile-menu">{['solutions','work','industries','si','insights','company','contact'].map(x=><a onClick={()=>setOpen(false)} key={x} href={'#'+x}>{x==='si'?'AtlasHub.SI':x[0].toUpperCase()+x.slice(1)}</a>)}</div>}
      </header>

      <main id="top">
        <section className="ah-hero ah-space">
          <div className="ah-stars"/>
          <div className="ah-planet"/>
          <div className="ah-orbit ah-orbit--one"/>
          <div className="ah-orbit ah-orbit--two"/>
          <div className="ah-container ah-hero-grid">
            <div className="ah-hero-copy">
              <div className="ah-eyebrow">ATLASHUB — AUGMENTED ENTERPRISE</div>
              <h1>We build the <span>Augmented Enterprise.</span></h1>
              <p>People, intelligent systems, software and automation working together to help forward-thinking organisations move faster, work smarter and achieve more.</p>
              <div className="ah-signature">People <b/> Technology <b/> Results</div>
              <div className="ah-actions"><a className="ah-button" href="#work">Explore our work <ArrowRight size={18}/></a><a className="ah-button ah-button--ghost" href="#si">Discover AtlasHub.SI <ArrowRight size={18}/></a></div>
              <div className="ah-proof"><span><strong>Strategy + Build</strong><small>From vision to production</small></span><span><strong>Multi-market</strong><small>International by design</small></span><span><strong>End-to-end</strong><small>Systems, software & operations</small></span></div>
            </div>
            <div className="ah-hero-visual">
              <EnergyRing/>
              <div className="ah-dashboard-stage"><WorkspacePreview/></div>
            </div>
          </div>
          <div className="ah-container ah-entry-cards">
            <a href="#solutions" className="ah-entry-card"><Boxes/><div><strong>Solutions</strong><span>End-to-end capability across systems, software and automation.</span><small>Explore solutions <ArrowRight size={14}/></small></div></a>
            <a href="#work" className="ah-entry-card"><Globe2/><div><strong>Selected Work</strong><span>Real platforms and operating systems built across different contexts.</span><small>View our work <ArrowRight size={14}/></small></div></a>
            <a href="#si" className="ah-entry-card"><LogoMark/><div><strong>AtlasHub.SI</strong><span>Intelligence infrastructure for the Augmented Enterprise.</span><small>Discover AtlasHub.SI <ArrowRight size={14}/></small></div></a>
          </div>
        </section>

        <section id="solutions" className="ah-section ah-section--capabilities">
          <div className="ah-container">
            <div className="ah-section-head"><div><div className="ah-eyebrow">CAPABILITIES</div><h2>What <span>we do</span></h2><p>AtlasHub combines strategy, software, intelligent systems and automation to transform real operations.</p></div><div className="ah-mini-emblem"><EnergyRing/></div></div>
            <div className="ah-cap-grid">{capabilities.map(({icon:Icon,title,copy})=><article className="ah-cap-card" key={title}><div className="ah-icon-stage"><Icon/></div><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight className="ah-card-arrow"/></article>)}</div>
          </div>
        </section>

        <section id="si" className="ah-section ah-section--si ah-space">
          <div className="ah-stars"/>
          <div className="ah-container ah-si-grid">
            <div className="ah-si-copy"><div className="ah-eyebrow">PEOPLE. AGENTS. PROCESSES. KNOWLEDGE. AUTOMATIONS. ANALYTICS.</div><h2>AtlasHub.SI<br/><span>Workspace</span></h2><h3>Your Augmented Enterprise, in one place.</h3><p>AtlasHub.SI brings together people, agents, processes, knowledge, automations and analytics inside one intelligent operational layer — so your organisation can move faster, work smarter and achieve more.</p><div className="ah-actions"><a className="ah-button" href="https://atlashub.si">Explore AtlasHub.SI <ArrowRight size={18}/></a><a className="ah-button ah-button--ghost" href="#contact">Request a Demo <ArrowRight size={18}/></a></div></div>
            <div className="ah-si-visual"><div className="ah-si-ring"><EnergyRing/></div><WorkspacePreview/></div>
          </div>
          <div className="ah-container ah-benefit-grid">
            {[[Globe2,'Unified visibility','Bring people, agents, data and work together with a shared operational view.'],[Users,'Agent orchestration','Deploy, manage and coordinate intelligent agents across your organisation.'],[BarChart3,'Operational intelligence','Turn signals and real-time data into faster decisions and measurable action.'],[Layers3,'Scalable architecture','Enterprise-ready systems designed to integrate and evolve with your organisation.']].map(([Icon,t,c])=>{const C=Icon as typeof Globe2; return <article key={String(t)}><C/><div><h3>{String(t)}</h3><p>{String(c)}</p></div></article>})}
          </div>
        </section>

        <section id="work" className="ah-section ah-section--work">
          <div className="ah-container">
            <div className="ah-section-head ah-section-head--simple"><div><div className="ah-eyebrow">ATLASHUB.DIGITAL — SELECTED WORK</div><h2>Selected <span>Work</span></h2><p>Platforms, intelligent systems and operational infrastructure built from real business needs.</p></div><div className="ah-value-row"><span><Users/>Different contexts</span><span><Cog/>End-to-end delivery</span><span><BarChart3/>Operational focus</span></div></div>
            <div className="ah-case-grid">{cases.map(({icon:Icon,tag,title,copy})=><article className="ah-case" key={title}><div className="ah-case-visual"><div className="ah-case-orbit"/><Icon/></div><div className="ah-case-tag">{tag}</div><h3>{title}</h3><p>{copy}</p><a href="#contact">Discuss a similar project <ArrowRight size={15}/></a></article>)}</div>
            <div className="ah-method"><div><div className="ah-eyebrow">OUR APPROACH</div><h3>How we work</h3><p>A structured, end-to-end method for turning complex challenges into working systems.</p></div><ol>{[['Search','Discover'],['Layers3','Design'],['Code2','Build'],['Network','Integrate'],['Cloud','Operate'],['BarChart3','Improve']].map(([_,n],i)=><li key={n}><span>{String(i+1).padStart(2,'0')}</span><strong>{n}</strong></li>)}</ol></div>
          </div>
        </section>

        <section className="ah-section ah-section--build">
          <div className="ah-container">
            <div className="ah-section-head ah-section-head--simple"><div><div className="ah-eyebrow">FROM USE CASE TO OPERATING SYSTEM</div><h2>What we can <span>build with you</span></h2></div></div>
            <div className="ah-build-grid">{['Executive assistants & enterprise agents','AI-enabled customer service','Sales and lead automation','Operational dashboards & control planes','Custom SaaS and internal platforms','Commerce, checkout & payment workflows','Knowledge systems & organisational memory','API integrations & workflow orchestration'].map((x,i)=><div className="ah-build-item" key={x}><span>{String(i+1).padStart(2,'0')}</span><p>{x}</p><ArrowRight/></div>)}</div>
          </div>
        </section>

        <section id="industries" className="ah-section ah-section--industries">
          <div className="ah-container ah-industries-grid"><div><div className="ah-eyebrow">BUSINESS CONTEXTS</div><h2>Built around <span>real operations.</span></h2><p>We apply the same systems thinking to different operating environments, adapting the architecture to the business rather than forcing the business into a template.</p></div><div className="ah-industry-list">{industries.map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><ArrowRight/></div>)}</div></div>
        </section>

        <section className="ah-section ah-section--manifesto">
          <div className="ah-container ah-manifesto-grid"><div className="ah-manifesto-orb"><EnergyRing/></div><div><div className="ah-eyebrow">THE AUGMENTED ENTERPRISE</div><h2>Not AI added to a company.<br/><span>A company redesigned to operate with intelligence.</span></h2><p>People define intent. Intelligent systems coordinate information and action. Software turns decisions into repeatable operations. AtlasHub works across all three layers.</p><div className="ah-equation"><span>People</span><b>+</b><span>Intelligence</span><b>+</b><span>Systems</span><b>=</b><strong>Augmented Enterprise</strong></div></div></div>
        </section>

        <section id="insights" className="ah-section ah-section--ecosystem">
          <div className="ah-container"><div className="ah-section-head ah-section-head--simple"><div><div className="ah-eyebrow">ECOSYSTEM</div><h2>Build. Learn. <span>Advance.</span></h2></div></div><div className="ah-ecosystem-grid">
            <article><Sparkles/><small>R&D</small><h3>AtlasHub Labs</h3><p>Experiments, prototypes and emerging systems that test what becomes possible next.</p></article>
            <article><BookOpen/><small>KNOWLEDGE</small><h3>AtlasHub Academy</h3><p>Workshops, executive enablement and practical education for the augmented enterprise.</p></article>
            <article><Globe2/><small>INSIGHTS</small><h3>Research & Ideas</h3><p>Field notes, frameworks and perspectives on intelligent systems and business transformation.</p></article>
          </div></div>
        </section>

        <section id="company" className="ah-section ah-section--company">
          <div className="ah-container ah-company-grid"><div><div className="ah-eyebrow">ATLASHUB</div><h2>People. Technology. <span>Results.</span></h2></div><div><p>AtlasHub is a technology company focused on building intelligent systems, software and digital infrastructure that help organisations operate better.</p><p>Our work spans product strategy, software engineering, automation, integrations and the architecture of augmented operations.</p></div></div>
        </section>

        <section id="contact" className="ah-cta ah-space"><div className="ah-stars"/><div className="ah-container ah-cta-inner"><LogoMark/><div><div className="ah-eyebrow">START A CONVERSATION</div><h2>What could your company become <span>with the right systems?</span></h2><p>Bring us the business challenge. We will help map the systems, technology and execution required to move it forward.</p></div><a className="ah-button" href="mailto:support@atlashub.digital">Talk to AtlasHub <ArrowRight size={18}/></a></div></section>
      </main>

      <footer className="ah-footer"><div className="ah-container"><div className="ah-brand"><LogoMark/><span>AtlasHub<span>.Digital</span></span></div><div className="ah-footer-links"><a href="#solutions">Solutions</a><a href="#work">Work</a><a href="#si">AtlasHub.SI</a><a href="#company">Company</a></div><p>© AtlasHub • People | Technology | Results</p></div></footer>
    </div>
  );
}
