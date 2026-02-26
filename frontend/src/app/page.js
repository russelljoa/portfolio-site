"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

/**
 * Single-Page Portfolio for Russell Joarder
 * Theme: Light Mode, Monospace, ASCII/Terminal
 */

// --- DATA ---

const RESUME = {
  identity: {
    name: "Russell Joarder",
    role: "cs_undergrad",
    location: "West Chester, PA",
    github: "github.com/russelljoa",
    linkedin: "linkedin.com/in/russell-joarder",
    instagram: "instagram.com/russell.joar",
    tagline: "I build systems + ship products"
  },
  stats: [
    { label: "home", value: "West Chester, PA | Boston, MA" },
    { label: "grad", value: "May 2028" },
    { label: "stack", value: "nextjs node aws mongo" },
    { label: "major", value: "Computer Science" },
    { label: "minor", value: "Business Administration & Management"}

  ],
  projects: [
    {
      id: "parrot",
      name: "parrotdrop.com",
      desc: "media sharing platform",
      status: "open",
      details: [
        "Full-stack file/media sharing platform with temporary lifecycles, short-link sharing",
        "Next.js (TypeScript) frontend + Node.js REST API",
        "AWS S3 storage, MongoDB metadata, Firebase Auth JWT, Socket.IO",
        "Scaled to 100+ users and 2.1TB total transfers",
        "S3 signed URLs and backend access controls"
      ],
      link: "https://parrotdrop.com",
      linkName: "Visit Site"
    },
    {
      id: "wordle",
      name: "github.com/russelljoa/wordle-solver",
      desc: "python constraint solver",
      status: "complete",
      details: [
        "Python solver using letter-frequency + constraint propagation",
        "Fast lookups with hashed structures + per-word metadata",
        "≈95% solve rate across word pool",
        "Automated testing framework for constraints/heuristics"
      ],
      link: "https://github.com/russelljoa/wordle-solver",
      linkName: "View GitHub"
    },
    {
      id: "engagemint",
      name: "github.com/russelljoa/EngageMint",
      desc: "creator rewards platform",
      status: "hackathon",
      details: [
        "EasyA x Harvard x Polkadot hackathon project for tokenized fan engagement",
        "Lets creators mint ERC-20-style rewards on Polkadot AssetHub and gate minting to admins",
        "Frontend flows (login/home/merch/videos/extension) for distributing tasks that earn tokens",
        "Verified on-chain mints via Subscan explorer; built with Solidity, Rust, and JavaScript"
      ],
      link: "https://github.com/russelljoa/EngageMint",
      linkName: "View GitHub"
    },
    {
      id: "swap-squad",
      name: "Swap Squad",
      desc: "decentralized p2p marketplace",
      status: "hackathon",
      details: [
        "Decentralized peer-to-peer marketplace on the TRON blockchain with competitive fees",
        "Smart contract w/ Solidity on TRON, React & Flask for UI & backend",
        "Achieved 2nd Place Prize Winner at Hackathon",
        "Leveraged Solidity to build the smart contract on TRON to ensure security, transparency, reliability"
      ],
      link: "https://github.com/russelljoa/SwapSquad",
      linkName: "View GitHub"
    },
    {
      id: "westtown-school-dining-menu",
      name: "github.com/russelljoa/Westtown-School-Dining-Menu",
      desc: "cafeteria menu",
      status: "complete",
      details: [
        "Web interface for presenting dining menus for Westtown School",
        "Built with HTML, PHP, JavaScript, and CSS for dynamic menu rendering",
        "Includes backend (e.g., PHP) and for menu building for kitchen staff",
        "Only accessible within Westtown's secure network environment"
      ],
      link: "https://github.com/russelljoa/Westtown-School-Dining-Menu",
      linkName: "View GitHub"
  }
  ],
  experience: [
    {
      id: "chesco",
      date: "2025-10",
      company: "ChesCo Webworks",
      role: "Co-Founder & Lead Developer",
      details: [
        "Lead gen sites for 6+ businesses with Next.js",
        "15,000+ organic monthly visitors",
        "Centralized form handler + email pipeline (Next.js + Node.js), Heroku",
        "AWS SES integration",
        "Redis sliding-window IP rate limiting + honeypot filtering"
      ]
    },
    {
      id: "erie",
      date: "2025-06",
      company: "Erie Home",
      role: "Field Marketing Agent",
      details: [
        "$148,000 gross revenue sourced",
        "Top 10 weekly in region (July 2025)"
      ]
    },
    {
      id: "cook",
      date: "2022-09",
      company: "Let’s Cook AIO",
      role: "Co-Founder",
      details: [
        "Subscription community scaled to $11,000+ MRR peak, 838 paid subscribers",
        "Python Discord bots + MongoDB automation",
        "Stripe + Whop API integration",
        "Coordinated 30+ contractors; broader 4,000+ user community"
      ]
    }
  ],
  leadership: [
    {
      id: "blockchain",
      role: "Vice President of Technology",
      org: "Boston University Blockchain",
      period: "May 2025-Present",
      details: [
        "Led technical seminars on web3/blockchain",
        "Coordinated conference/hackathon logistics",
        "Directed website redesign; managed infrastructure",
        "Site: bublockchain.com"
      ],
      link: "https://bublockchain.com"
    }
  ],
  skills: {
    languages: ["python", "ts/js", "java", "sql", "solidity", "(c/c++ php asm)"],
    frameworks: ["react", "nextjs", "node", "flask"],
    db: ["mongodb", "mysql", "postgres", "supabase"],
    cloud_devops: ["aws(s3 lambda ec2 ses)", "vercel", "heroku", "git", "redis"],
    other: ["systems design", "rest apis", "socket.io"]
  }
};

// --- UTILITY FUNCTIONS ---

const download_resume = () => {
  const resumePath = "/russell.joarder_resume_2026.pdf";
  const link = document.createElement("a");
  link.href = resumePath;
  link.download = "russell.joarder_resume_2026.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- COMPONENTS ---

const LoadingScreen = () => {
  const [status, setStatus] = useState("initializing_kernel");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const statusSequence = [
      "initializing_js",
      "loading_assets",
      "proofreading_resume",
      "mounting_portfolio_v2",
      "polishing",
      "system_ready"
    ];
    
    let current = 0;
    const interval = setInterval(() => {
      if (current < statusSequence.length - 1) {
        current++;
        setStatus(statusSequence[current]);
      }
    }, 400);

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center font-mono p-4"
      style={{ backgroundColor: '#ffffff', color: '#000000', opacity: 1 }}
    >
      <div className="max-w-md w-full">
        <div className="mb-8 p-4 border-2 border-black relative overflow-hidden">
          <div className="text-xl md:text-2xl font-bold mb-1">RUSSELL_J // PORTFOLIO_DEVITE</div>
          <div className="text-xs opacity-60">v{new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.{String(new Date().getDate()).padStart(2, '0')} [STABLE BUILD]</div>
          <div className="absolute top-0 right-0 p-1 text-[8px] bg-black text-white">SYSTEMID: 0x827A</div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span style={{ color: '#0044cc', fontWeight: 'bold' }}>&gt;</span>
            <span className="uppercase tracking-widest text-sm font-bold">{status}{dots}</span>
          </div>
          
          <div className="w-full bg-gray-100 border border-black h-2 overflow-hidden relative">
             <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
                className="h-full bg-accent"
                style={{ backgroundColor: '#0044cc' }}
             />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[10px] opacity-70 border-t border-black pt-4">
           <div>CPU: INTEL(R) CORE(TM) I9-13900K</div>
           <div>MEM: 64.0GB RAM [ OK ]</div>
           <div>GPU: NVIDIA RTX 4090 [ 0% ]</div>
           <div>DSK: NVME_SSD_0 [ MOUNTED ]</div>
        </div>
      </div>
    </motion.div>
  );
};

const AsciiFrame = ({ children, className }) => (
  <motion.div 
    className={clsx("ascii-frame", className)}
  >
    <div className="ascii-frame-bl">└</div>
    <div className="ascii-frame-br">┘</div>
    {children}
  </motion.div>
);

const SectionHeader = ({ title, showExpandHint = false }) => (
  <div className={clsx("mb-6", showExpandHint && "pb-2")}>
    <motion.h2 
      className="section-title text-accent"
    >
      {`===[ ${title} ]===`}
    </motion.h2>
    {showExpandHint && (
      <p className="text-xs text-muted mt-2">click a box to expand</p>
    )}
  </div>
);

const NavItem = ({ label, href, active, onClick }) => (
  <a 
    href={href}
    onClick={onClick}
    className={clsx(
      "block py-1 px-2 border-l-2 transition-colors duration-200 mt-1 group",
      active ? "border-[var(--accent)] text-accent font-bold" : "border-transparent hover:text-accent"
    )}
  >
    {active ? "> " : "  "}
    {label}
    {!active && <span className="opacity-0 group-hover:opacity-100 animate-pulse">_</span>}
  </a>
);

// --- MAIN PAGE ---

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);

    const handleLoad = () => {
      // Small timeout to ensure a smooth transition and show off the cool ASCII loader
      setTimeout(() => setLoading(false), 2600);
    };

    // If already loaded (e.g. from cache or very fast connection)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Fail-safe: if load event fails to fire for some reason, clear after 5s
    const failSafe = setTimeout(handleLoad, 5000);

    const handleScroll = () => {
      const sections = ["home", "projects", "experience", "leadership", "skills", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(failSafe);
    }
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <motion.div 
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: (isClient && !loading) ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="layout-grid text-sm"
        style={{ 
          height: loading ? '100vh' : 'auto', 
          overflow: loading ? 'hidden' : 'visible' 
        }}
      >
          
          {/* SIDEBAR */}
          <aside className="sidebar">
        <div>
          <div className="mb-8 border-b border-[var(--border)] pb-4">
            <div className="font-bold text-accent mb-1">[user] {RESUME.identity.name.toLowerCase().replace(" ", "_")}</div>
            <div className="text-muted mb-1">[role] {RESUME.identity.role}</div>
            <div className="text-xs">[mode] light::ascii</div>
          </div>
          
          <nav className="flex flex-col gap-1">
            {["home", "projects", "experience", "leadership", "skills", "contact"].map((sec) => (
              <NavItem 
                key={sec} 
                label={sec} 
                href={`#${sec}`} 
                active={activeSection === sec}
                onClick={(e) => handleNavClick(e, sec)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-8 flex gap-4 text-xs font-mono">
          <a href={`mailto:${RESUME.identity.email}`} className="hover:text-accent group">[mail]<span className="opacity-0 group-hover:opacity-100 animate-pulse">_</span></a>
          <a href={`https://${RESUME.identity.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent group">[in]<span className="opacity-0 group-hover:opacity-100 animate-pulse">_</span></a>
          <a href={`https://${RESUME.identity.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent group">[git]<span className="opacity-0 group-hover:opacity-100 animate-pulse">_</span></a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center mb-5">
          <AsciiFrame className="p-8">
            <motion.div>
              <h1 className="text-3xl font-bold mb-2">{RESUME.identity.name}</h1>
              <p className="text-lg text-muted mb-4">CS & BIZ @ Boston University</p>
              <div className="h-px w-full bg-[var(--border)] my-4 relative">
                <span className="absolute right-0 top-[-8px] bg-[var(--bg)] px-2 text-xs text-muted">v{new Date().getMonth() + 1}.0.{String(new Date().getFullYear()).slice(-2)}</span>
              </div>
              <p className="font-mono text-accent text-xl mb-6">"{RESUME.identity.tagline}"</p>
            </motion.div>
          </AsciiFrame>

          {/* Quick Stats Table */}
          <motion.div 
            className="mb-8 font-mono text-xs md:text-sm border border-[var(--border)]"
          >
             {RESUME.stats.map((stat, i) => (
               <div key={stat.label} className="flex border-b border-[var(--border)] last:border-b-0">
                 <div className="w-min whitespace-nowrap p-2 border-r border-[var(--border)] bg-gray-50">{stat.label}</div>
                 <div className="p-2 flex-1">{stat.value}</div>
               </div>
             ))}
          </motion.div>

          <div className="flex flex-col gap-2 font-mono">
            <button 
              onClick={(e) => handleNavClick(e, "projects")}
              className="text-left hover:text-accent group"
            >
              <span className="text-accent mr-2">&gt;</span>
              view_projects
              <span className="ml-1 opacity-0 group-hover:opacity-100 animate-pulse">_</span>
            </button>
            <button 
              className="text-left hover:text-accent group"
              onClick={download_resume}
            >
              <span className="text-accent mr-2">&gt;</span>
              download_resume
              <span className="ml-1 opacity-0 group-hover:opacity-100 animate-pulse">_</span>
            </button>
            {/* NOTE: Wire up actual PDF download logic in the onClick above. Ensure the file is in /public */}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-5 pt-16">
          <SectionHeader title="projects" showExpandHint />
          <div className="flex flex-col gap-8">
            {RESUME.projects.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} index={i} />
            ))}
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mb-5 pt-16">
          <SectionHeader title="experience" showExpandHint />
          <div className="flex flex-col gap-8">
            {RESUME.experience.map((exp, i) => (
              <ExperienceItem key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section id="leadership" className="mb-5 pt-16">
          <SectionHeader title="leadership" />
          {RESUME.leadership.map((lead) => (
            <AsciiFrame key={lead.id} className="p-6">
              <div className="flex justify-between flex-wrap gap-2 mb-4 border-b border-dashed border-[var(--border)] pb-2 px-2">
                <h3 className="font-bold text-lg">{lead.org}</h3>
                <span className="text-muted">{lead.period}</span>
              </div>
              <div className="mb-2 text-accent font-bold">:: {lead.role}</div>
              <ul className="list-none space-y-2 mb-4">
                {lead.details.map((d, i) => (
                   <li key={i} className="flex gap-2">
                     <span className="text-accent">-</span>
                     <span>{d}</span>
                   </li>
                ))}
              </ul>
              {lead.link && (
                <a href={lead.link} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-accent">
                  [{lead.link.replace("https://", "")}]
                </a>
              )}
            </AsciiFrame>
          ))}
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-5 pt-16">
          <SectionHeader title="skills" />
          <div className="grid gap-4 font-mono text-sm">
            {Object.entries(RESUME.skills).map(([category, items], i) => (
              <div 
                key={category}
                className="flex flex-col md:flex-row border-b border-[var(--border)] last:border-b-0 py-2 pr-3 hover:bg-gray-50 transition-colors"
                tabIndex={0}
              >
                <div className="w-40 font-bold text-accent mb-1 md:mb-0 mr-2">
                  [{category.replace("_", "/")}]
                </div>
                <div className="flex-1 text-muted">
                  {items.join(" | ")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-32 pt-16">
          <SectionHeader title="contact" />
          <div className="bg-[var(--panel)] p-3 border border-[var(--border)] font-mono relative overflow-hidden ">
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                 style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}></div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <ContactCommand cmd="email_me" args="&#114;&#106;&#111;&#97;&#114;&#100;&#101;&#114;&#64;&#98;&#117;&#46;&#101;&#100;&#117;" href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#114;&#106;&#111;&#97;&#114;&#100;&#101;&#114;&#64;&#98;&#117;&#46;&#101;&#100;&#117;" />
              <ContactCommand cmd="connect_on" args={RESUME.identity.linkedin} href={`https://${RESUME.identity.linkedin}`} />
              <ContactCommand cmd="check_out" args={RESUME.identity.github} href={`https://${RESUME.identity.github}`} />
              <ContactCommand cmd="add_me" args={RESUME.identity.instagram} href={`https://${RESUME.identity.instagram}`} />
              <ContactCommand 
                cmd="download_resume" 
                args="portfolio_v1.pdf" 
                action={download_resume}
              />
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted">
            :: connect with me pls ::
          </div>
        </section>
      </main>
      </motion.div>
    </>
  );
}

// --- SUB-COMPONENTS ---

function ProjectCard({ project, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="group"
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer overflow-hidden p-[1px]"
      >
        <div className="relative border border-[var(--border)] p-4 bg-white hover:border-[var(--accent)] transition-colors">
            {/* ASCII Corners for Header */}
            <div className="absolute top-[-5px] left-[-1px] bg-white leading-none">┌</div>
            <div className="absolute top-[-5px] right-[-1px] bg-white leading-none">┐</div>
            <div className="absolute bottom-[-5px] left-[-1px] bg-white leading-none">└</div>
            <div className="absolute bottom-[-5px] right-[-1px] bg-white leading-none">┘</div>
            
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2 relative z-10">
              <div className="flex-1">
                <div className="font-mono">
                    <span className="text-accent font-bold">[proj]</span> {project.name}
                </div>
                <div className="text-xs text-muted mt-1">
                    :: {project.desc} <span className="text-accent mx-1">-&gt;</span> {project.status}
                </div>
              </div>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whitespace-nowrap border border-[var(--border)] px-3 py-1 hover:bg-[var(--accent)] hover:text-white transition-colors text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.linkName}
                </a>
              )}
            </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
          >
            <div className="mx-[1px] border-x border-b border-[var(--border)] bg-[var(--panel)] relative mt-[-1px] pt-4 pb-2 px-6 mb-4 px-3">
                {/* Connect header to body visually by removing top border overlap effectively done by mt-[-1px] */}
                <div className="absolute bottom-[-5px] left-[-1px] text-[var(--fg)] leading-none bg-[var(--panel)]">└</div>
                <div className="absolute bottom-[-5px] right-[-1px] text-[var(--fg)] leading-none bg-[var(--panel)]">┘</div>

                <div className="text-sm">
                <ul className="space-y-2 mb-4">
                    {project.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mb-2">::</span>
                        <span>{d}</span>
                    </li>
                    ))}
                </ul>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ExperienceItem({ exp, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="group"
    >
      <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer overflow-hidden p-[1px]" 
      >
          <div className="relative border border-[var(--border)] p-4 bg-white hover:border-[var(--accent)] transition-colors">
              {/* ASCII Corners for Header */}
              <div className="absolute top-[-5px] left-[-1px] bg-white leading-none">┌</div>
              <div className="absolute top-[-5px] right-[-1px] bg-white leading-none">┐</div>
              <div className="absolute bottom-[-5px] left-[-1px] bg-white leading-none">└</div>
              <div className="absolute bottom-[-5px] right-[-1px] bg-white leading-none">┘</div>

              <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono font-bold text-accent">[{exp.date}]</span>
                  <span className="font-bold">{exp.company}</span>
                  <span className="text-muted text-xs hidden md:inline"> // {exp.role}</span>
              </div>
          </div>
      </div>

      <AnimatePresence>
          {isOpen && (
          <motion.div
              className="overflow-hidden"
          >
              <div className="mx-[1px] border-x border-b border-[var(--border)] bg-[var(--panel)] relative mt-[-1px] pt-4 pb-2 px-6 mb-5 px-3">
                  <div className="absolute bottom-[-5px] left-[-1px] text-[var(--fg)] leading-none bg-[var(--panel)]">└</div>
                  <div className="absolute bottom-[-5px] right-[-1px] text-[var(--fg)] leading-none bg-[var(--panel)]">┘</div>

                  <div className="text-sm">
                  {exp.details.map((d, i) => (
                      <div key={i} className="mb-1 last:mb-0 flex gap-2">
                          <span className="text-accent">-</span>
                          <span>{d}</span>
                      </div>
                  ))}
                  </div>
              </div>
          </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactCommand({ cmd, args, href, action }) {
  const Content = (
    <div className="flex items-center gap-3 p-2 hover:bg-[var(--fg)] hover:text-[var(--bg)] group transition-colors cursor-pointer border border-transparent hover:border-[var(--accent)]">
      <span className="text-accent group-hover:text-[var(--bg)] font-bold">&gt;</span>
      <span className="font-bold">{cmd}</span>
      <span className="opacity-70 group-hover:opacity-100">{args}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block outline-none focus:ring-1 ring-[var(--accent)]">
        {Content}
      </a>
    );
  }
  
  return (
    <button onClick={action} className="w-full text-left outline-none focus:ring-1 ring-[var(--accent)]">
      {Content}
    </button>
  );
}
