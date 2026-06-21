"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) router.push("/admin");
    else setError("Invalid credentials");
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ padding: 40, width: "100%", maxWidth: 380 }}>
        <h1 style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Admin <span className="grad">Login</span></h1>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>feyton.co.rw dashboard</p>
        {error && <p style={{ color: "#ef4444", fontSize: 14, marginBottom: 16 }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary" style={{ width: "100%" }}>Sign In</button>
        </form>
      </div>
    </main>
  );
}
