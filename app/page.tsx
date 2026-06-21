import Link from "next/link";
import Image from "next/image";

const SKILLS = [
  { name: "Node.js", icon: "🟢" }, { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛️" }, { name: "TypeScript", icon: "🔷" },
  { name: "Python", icon: "🐍" }, { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" }, { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" }, { name: "Linux", icon: "🐧" },
];

const EXPERIENCE = [
  {
    role: "Program Development Officer",
    org: "Digital Opportunity Trust Rwanda",
    period: "2022 — Present",
    desc: "Leading digital skills programs, building platforms for youth empowerment across Rwanda.",
  },
  {
    role: "Software Engineer",
    org: "Igiti Corp",
    period: "2021 — 2022",
    desc: "Built and maintained API services and full-stack web apps using Node.js and React.",
  },
];

export default function Home() {
  return (
    <main>
      <nav style={{ borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: 20 }}>
            <span className="grad">feyton</span>
            <span style={{ color: "var(--muted)" }}>.co.rw</span>
          </Link>
          <div style={{ display: "flex", gap: 28, fontSize: 15 }}>
            <Link href="#about">About</Link>
            <Link href="#skills">Skills</Link>
            <Link href="#work">Work</Link>
            <Link href="/blog">Blog</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 60%)" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
            <div>
              <p style={{ color: "var(--accent2)", fontWeight: 600, marginBottom: 12, letterSpacing: "0.1em", fontSize: 14, textTransform: "uppercase" }}>
                Hello, I&apos;m
              </p>
              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
                <span className="grad">Fabrice</span><br />
                Hafashimana
              </h1>
              <p style={{ fontSize: 20, color: "var(--muted)", marginBottom: 12 }}>
                Full-Stack Developer · Kigali, Rwanda
              </p>
              <p style={{ color: "#94a3b8", maxWidth: 520, marginBottom: 32, lineHeight: 1.8 }}>
                I build modern web applications and digital platforms that create real impact.
                Specialising in Node.js, Next.js, and scalable cloud infrastructure.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="#work" className="btn-primary">View My Work</Link>
                <Link href="#contact" className="btn-outline">Get In Touch</Link>
                <a href="https://www.linkedin.com/in/fhafashimana/" target="_blank" rel="noopener noreferrer" className="btn-outline">LinkedIn ↗</a>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 220, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--accent)", margin: "0 auto", position: "relative" }}>
                <Image src="/assets/profile.JPG" alt="Fabrice Hafashimana" fill style={{ objectFit: "cover" }} priority />
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center" }}>
                <a href="https://github.com/feyton" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", fontSize: 13 }}>GitHub</a>
                <a href="https://www.linkedin.com/in/fhafashimana/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", fontSize: 13 }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40 }}>About <span className="grad">Me</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, marginBottom: 16 }}>
                I&apos;m a software engineer based in Kigali, Rwanda with a passion for building products
                that solve real problems. With expertise in both backend and frontend development,
                I&apos;ve contributed to projects ranging from enterprise platforms to startup MVPs.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, marginBottom: 24 }}>
                At Digital Opportunity Trust Rwanda, I lead the development of digital tools that
                empower youth with technology skills. I thrive in collaborative environments and love
                turning complex ideas into clean, maintainable code.
              </p>
              <a href="https://www.linkedin.com/in/fhafashimana/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                View LinkedIn Profile ↗
              </a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {EXPERIENCE.map((e) => (
                <div key={e.role} className="card" style={{ padding: 20, gridColumn: "span 2" }}>
                  <p style={{ color: "var(--accent2)", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{e.period}</p>
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>{e.role}</p>
                  <p style={{ color: "var(--accent)", fontSize: 13, marginBottom: 8 }}>{e.org}</p>
                  <p style={{ color: "var(--muted)", fontSize: 14 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ background: "var(--card)" }}>
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40 }}>Tech <span className="grad">Stack</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
            {SKILLS.map((s) => (
              <div key={s.name} className="card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work / Projects — loaded from DB via client component */}
      <section id="work">
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Featured <span className="grad">Projects</span></h2>
          <p style={{ color: "var(--muted)", marginBottom: 40 }}>A selection of things I&apos;ve built.</p>
          <ProjectsGrid />
        </div>
      </section>

      {/* Blog preview */}
      <section style={{ background: "var(--card)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700 }}>Latest <span className="grad">Posts</span></h2>
            <Link href="/blog" style={{ color: "var(--accent2)", fontSize: 14 }}>View all →</Link>
          </div>
          <BlogPreview />
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Get In <span className="grad">Touch</span></h2>
          <p style={{ color: "var(--muted)", marginBottom: 40 }}>
            I&apos;m open to new opportunities, collaborations, and interesting conversations.
          </p>
          <ContactForm />
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 0", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        <div className="container">
          © {new Date().getFullYear()} Fabrice Hafashimana · Built with Next.js & MongoDB
        </div>
      </footer>
    </main>
  );
}

function ProjectsGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
      {[
        { title: "DSE Portal", desc: "Graduate portal for DSE program — Node.js + MySQL + Express", tech: ["Node.js", "MySQL", "Express"], url: "https://github.com/feyton/dse-portal" },
        { title: "DOT Pulse", desc: "Live event intelligence — captions, AI insights, audience engagement", tech: ["Next.js", "Socket.IO", "MongoDB"], url: "https://pulse.dtsmanagement.site" },
        { title: "DTS Management", desc: "Internal management platform for Digital Opportunity Trust Rwanda", tech: ["Next.js", "MongoDB", "NextAuth"], url: "https://dtsmanagement.site" },
        { title: "Zubba Energy", desc: "EV mobility platform for Rwanda's growing electric vehicle market", tech: ["Next.js", "TypeScript"], url: "https://zubbaenergy.com" },
      ].map((p) => (
        <div key={p.title} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{p.desc}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent2)", fontSize: 13 }}>View Project ↗</a>
        </div>
      ))}
    </div>
  );
}

function BlogPreview() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
      <div className="card" style={{ padding: 24 }}>
        <p style={{ color: "var(--accent2)", fontSize: 12, marginBottom: 8 }}>COMING SOON</p>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Blog posts on the way</h3>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>I&apos;ll be sharing thoughts on software engineering, Rwanda&apos;s tech scene, and building products that matter.</p>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <form action="/api/contact" method="POST" style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="your@email.com" required />
      </div>
      <input name="subject" placeholder="Subject" />
      <textarea name="message" placeholder="Your message..." rows={5} required style={{ resize: "vertical" }} />
      <button type="submit" className="btn-primary" style={{ width: "100%" }}>Send Message</button>
    </form>
  );
}
