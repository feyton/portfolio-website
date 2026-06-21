import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    icon: "🎨",
    title: "Web Design",
    desc: "Clean, modern interfaces that put the user first. Every pixel serves a purpose.",
  },
  {
    icon: "⚙️",
    title: "System Automation",
    desc: "End-to-end infrastructure automation — CI/CD pipelines, backups, monitoring, and cloud deployments.",
  },
  {
    icon: "💻",
    title: "Web Development",
    desc: "Scalable full-stack applications built with Next.js, Node.js, and MongoDB that grow with your business.",
  },
];

const PROJECTS = [
  {
    title: "DSE Portal",
    desc: "Graduate management portal for the DSE program.",
    tags: ["Node.js", "MySQL"],
    img: "/assets/mac-pro.jpg",
    url: "https://github.com/feyton/dse-portal",
  },
  {
    title: "DOT Pulse",
    desc: "Live event intelligence with AI captions and audience engagement.",
    tags: ["Next.js", "Socket.IO"],
    img: "/assets/mac-pro - wide.jpg",
    url: "https://pulse.dtsmanagement.site",
  },
  {
    title: "DTS Management",
    desc: "Internal management platform for Digital Opportunity Trust Rwanda.",
    tags: ["Next.js", "MongoDB"],
    img: "/assets/blog3.png",
    url: "https://dtsmanagement.site",
  },
  {
    title: "Zubba Energy",
    desc: "EV mobility platform for Rwanda's growing electric vehicle market.",
    tags: ["Next.js", "TypeScript"],
    img: "/assets/about.jpg",
    url: "https://zubbaenergy.com",
  },
];

const SKILLS = [
  "JavaScript / TypeScript", "React & Next.js", "Node.js & Express",
  "Python & Django", "MongoDB & PostgreSQL", "Docker & Linux",
  "AWS (S3, EC2)", "CI/CD & GitHub Actions", "REST APIs & WebSockets",
];

const VALUES = [
  "Responsibility", "Integrity", "Collaboration", "Teamwork",
];

export default function Home() {
  return (
    <main>
      {/* ── Nav ── */}
      <nav className="site-nav">
        <Link href="/" className="brand">
          <span className="grad">feyton</span>
          <span style={{ color: "var(--muted)" }}>.co.rw</span>
        </Link>
        <div className="nav-links">
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#work">Work</Link>
          <Link href="/blog">Blog</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero-text">
          <h3 className="josefin">Your Dream</h3>
          <h2>Made a Reality</h2>
          <p className="hero-sub">
            I&apos;m <strong style={{ color: "#fff" }}>Fabrice Hafashimana</strong> — full-stack developer
            from Kigali, Rwanda. I build modern web applications and digital platforms
            that create real-world impact. Done right.
          </p>
          <div className="hero-btns">
            <Link href="#work" className="btn btn-primary">Explore My Work</Link>
            <Link href="#contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ background: "var(--card)" }}>
        <div className="container">
          <h2 className="section-title">What I <span className="grad">Do</span></h2>
          <p className="section-sub">Services built around your goals.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {SERVICES.map((s) => (
              <div key={s.title} className="card service-card">
                <div className="icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about">
        <div className="container">
          <h2 className="section-title">About <span className="grad">Me</span></h2>
          <div className="about-grid">
            <div className="about-photos">
              <Image src="/assets/fab-1.jpg" alt="Fabrice at work" width={300} height={220} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8 }} />
              <Image src="/assets/fab-2.jpg" alt="Fabrice presenting" width={300} height={220} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8 }} />
              <Image src="/assets/profession.jpg" alt="Professional" width={620} height={160} style={{ width: "100%", gridColumn: "span 2", height: 160, objectFit: "cover", borderRadius: 8, gridArea: "auto / 1 / auto / 3" }} />
            </div>
            <div>
              <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 16 }}>
                I&apos;m a software engineer and digital leader based in Kigali, Rwanda. I specialise in
                building full-stack applications that are fast, scalable, and maintainable — from
                architecture to deployment.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 24 }}>
                At <strong style={{ color: "var(--text)" }}>Digital Opportunity Trust Rwanda</strong>, I lead
                the development of digital tools that empower youth with technology skills. I thrive in
                collaborative environments and turn complex requirements into clean, pragmatic code.
              </p>

              <h3 className="josefin" style={{ fontSize: "1.3rem", marginBottom: 10, letterSpacing: ".5px" }}>
                Tech Skills
              </h3>
              <ul className="checklist" style={{ marginBottom: 20 }}>
                {SKILLS.map((s) => <li key={s}>{s}</li>)}
              </ul>

              <h3 className="josefin" style={{ fontSize: "1.1rem", marginBottom: 10, letterSpacing: ".5px" }}>
                Experience
              </h3>
              {[
                { role: "Program Development Officer", org: "Digital Opportunity Trust Rwanda", period: "2022 — Present" },
                { role: "Software Engineer", org: "Igiti Corp", period: "2021 — 2022" },
              ].map((e) => (
                <div key={e.role} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: "2px solid var(--blue-mid)" }}>
                  <p style={{ fontWeight: 700, fontSize: ".95rem" }}>{e.role}</p>
                  <p style={{ color: "var(--blue-mid)", fontSize: ".85rem" }}>{e.org}</p>
                  <p style={{ color: "var(--muted)", fontSize: ".82rem" }}>{e.period}</p>
                </div>
              ))}

              <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <a href="https://www.linkedin.com/in/fhafashimana/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn ↗</a>
                <a href="https://github.com/feyton" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" style={{ background: "var(--card)" }}>
        <div className="container">
          <h2 className="section-title">Featured <span className="grad">Work</span></h2>
          <p className="section-sub">A selection of projects I&apos;ve built and shipped.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {PROJECTS.map((p) => (
              <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className="work-card">
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} />
                  <div className="info">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
                      {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="https://github.com/feyton" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View All on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Blog preview ── */}
      <section id="blog">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 4 }}>Latest <span className="grad">Posts</span></h2>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>Thoughts on software, Rwanda&apos;s tech scene, and building products.</p>
            </div>
            <Link href="/blog" className="btn btn-outline">View All Posts →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            <div className="card" style={{ padding: 24 }}>
              <p style={{ color: "var(--blue-mid)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em" }}>Coming Soon</p>
              <h3 className="josefin" style={{ fontSize: "1.2rem", marginBottom: 8 }}>
                Building scalable apps in Rwanda&apos;s tech ecosystem
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                Sharing lessons from building production systems under real constraints — connectivity, cost, and team size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ background: "var(--card)" }}>
        <div className="container">
          <h2 className="section-title">Get In <span className="grad">Touch</span></h2>
          <p className="section-sub">Interested in working together? Let&apos;s talk.</p>
          <div className="contact-grid">
            <div>
              <div className="card values-card" style={{ marginBottom: 20 }}>
                <h3>Why Work With Me</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12, lineHeight: 1.7 }}>
                  I bring a mix of engineering rigour and product thinking. I deliver working software,
                  not slide decks — and I care about the outcomes your product drives.
                </p>
                <ul className="checklist">
                  {VALUES.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>📍 Kigali, Rwanda</p>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>📧 fhafashimana@dotrust.org</p>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>🌐 Available for remote work worldwide</p>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3><span className="grad">feyton</span>.co.rw</h3>
              <p>Full-stack developer building modern web applications and digital platforms from Kigali, Rwanda.</p>
              <p style={{ marginTop: 8 }}>© {new Date().getFullYear()} Fabrice Hafashimana</p>
            </div>
            <div className="footer-col">
              <h3>Connect</h3>
              <div className="footer-social">
                <a href="https://github.com/feyton" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/fhafashimana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
              <Link href="#about" style={{ marginTop: 12, display: "block" }}>About</Link>
              <Link href="#work">Work</Link>
              <Link href="/blog">Blog</Link>
              <Link href="#contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h3>Built With</h3>
              <p>Next.js 16 (App Router)</p>
              <p>MongoDB & Mongoose</p>
              <p>PM2 & Nginx</p>
              <p>Let&apos;s Encrypt SSL</p>
              <p style={{ marginTop: 12, fontSize: ".82rem" }}>Deployed on VPS · Kigali</p>
            </div>
          </div>
          <div className="footer-bottom">
            Built with Next.js &amp; MongoDB · Hosted in Kigali, Rwanda
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  return (
    <form action="/api/contact" method="POST" className="contact-form">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="your@email.com" required />
      </div>
      <input name="subject" placeholder="Subject" />
      <textarea name="message" placeholder="Tell me about your project..." required />
      <button type="submit" className="btn btn-primary" style={{ width: "100%", cursor: "pointer" }}>
        Send Message
      </button>
    </form>
  );
}
