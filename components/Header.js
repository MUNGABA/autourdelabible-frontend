import Link from "next/link";

export default function Header({ user }) {
  return (
    <header style={{
      background:"#222", color:"white", padding:"1rem",
      display:"flex", justifyContent:"space-between", alignItems:"center"
    }}>
      <h2>🏆 Competition App</h2>
      <nav>
        <Link href="/dashboard" style={{marginRight:"1rem"}}>Dashboard</Link>
        {user?.role === "candidat" && (
          <Link href="/candidature" style={{marginRight:"1rem"}}>Candidature</Link>
        )}
        <a href="/" onClick={()=>localStorage.clear()}>Déconnexion</a>
      </nav>
    </header>
  );
}
