import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOneAndUpdate(
    { slug, published: true },
    { $inc: { visits: 1 } },
    { new: true }
  ).lean() as any;

  if (!post) notFound();

  return (
    <main>
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 24, background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18 }}><span className="grad">feyton</span><span style={{ color: "var(--muted)" }}>.co.rw</span></Link>
        <Link href="/blog" style={{ color: "var(--muted)", fontSize: 14 }}>← Blog</Link>
      </nav>

      <article style={{ padding: "60px 0 80px" }}>
        <div className="container prose">
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {post.category && <span className="tag">{post.category}</span>}
            {post.tags?.map((t: string) => <span key={t} className="tag">{t}</span>)}
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>{post.title}</h1>
          <div style={{ display: "flex", gap: 16, color: "var(--muted)", fontSize: 13, marginBottom: 48 }}>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}</span>
            <span>{post.visits} views</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content || "<p>Content coming soon.</p>" }} />
        </div>
      </article>
    </main>
  );
}
