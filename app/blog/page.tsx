import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find({ published: true })
    .sort({ publishedAt: -1 })
    .limit(20)
    .select("-content")
    .lean();

  return (
    <main>
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 24, background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18 }}><span className="grad">feyton</span><span style={{ color: "var(--muted)" }}>.co.rw</span></Link>
        <Link href="/" style={{ color: "var(--muted)", fontSize: 14 }}>← Home</Link>
      </nav>

      <section>
        <div className="container">
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Blog <span className="grad">Posts</span></h1>
          <p style={{ color: "var(--muted)", marginBottom: 48 }}>Thoughts on software, technology, and building things.</p>

          {posts.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: "center", color: "var(--muted)" }}>
              <p style={{ fontSize: 18 }}>No posts yet — check back soon.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 24 }}>
              {posts.map((post: any) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 20 }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                        {post.category && <span className="tag">{post.category}</span>}
                        {post.tags?.slice(0, 3).map((t: string) => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{post.title}</h2>
                      <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{post.summary}</p>
                    </div>
                    <div style={{ textAlign: "right", minWidth: 100 }}>
                      <p style={{ color: "var(--muted)", fontSize: 12 }}>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Draft"}
                      </p>
                      <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>{post.visits} views</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
