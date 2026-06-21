import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { Contact } from "@/models/Contact";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  await connectDB();
  const [postCount, contactCount, unreadCount] = await Promise.all([
    Post.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ read: false }),
  ]);

  const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5).select("title published createdAt slug");
  const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

  return (
    <main>
      <nav style={{ borderBottom: "1px solid var(--border)", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(12px)" }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18 }}><span className="grad">feyton</span> <span style={{ color: "var(--muted)", fontSize: 13 }}>admin</span></Link>
        <Link href="/api/auth/signout" style={{ color: "var(--muted)", fontSize: 13 }}>Sign out</Link>
      </nav>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Dashboard</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
          <div className="card" style={{ padding: 24 }}>
            <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 4 }}>Total Posts</p>
            <p style={{ fontSize: 36, fontWeight: 800 }}>{postCount}</p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 4 }}>Messages</p>
            <p style={{ fontSize: 36, fontWeight: 800 }}>{contactCount}</p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 4 }}>Unread</p>
            <p style={{ fontSize: 36, fontWeight: 800, color: unreadCount > 0 ? "var(--accent)" : "inherit" }}>{unreadCount}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontWeight: 700 }}>Recent Posts</h2>
              <Link href="/admin/posts/new" className="btn-primary" style={{ fontSize: 13, padding: "6px 14px" }}>+ New Post</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentPosts.map((p: any) => (
                <Link key={p._id} href={`/admin/posts/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{p.title}</span>
                    <span style={{ fontSize: 12, color: p.published ? "var(--accent2)" : "var(--muted)" }}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Recent Messages</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentContacts.map((c: any) => (
                <div key={c._id} className="card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
                    {!c.read && <span style={{ fontSize: 11, color: "var(--accent)", background: "rgba(124,58,237,0.1)", padding: "2px 8px", borderRadius: 99 }}>New</span>}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>{c.email}</p>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{c.message.slice(0, 80)}…</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
