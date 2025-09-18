import Link from "next/link";

export default function Sidebar({ role }) {
  return (
    <aside style={{
      width:"200px", padding:"1rem", background:"#f5f5f5", height:"100vh"
    }}>
      <h3>📌 Menu</h3>
      <ul style={{listStyle:"none", padding:0}}>
        <li><Link href="/dashboard">🏠 Accueil</Link></li>

        {role === "candidat" && (
          <>
            <li><Link href="/candidature">📄 Ma candidature</Link></li>
            <li><Link href="/chat/1">💬 Chat</Link></li>
          </>
        )}

        {role === "agent" && (
          <>
            <li><Link href="/dashboard">👤 Mes candidats</Link></li>
          </>
        )}

        {role === "admin" && (
          <>
            <li><Link href="/dashboard">📊 Statistiques</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
}
