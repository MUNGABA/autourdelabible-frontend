import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token) return router.push("/");
    api.get("/auth/me", { headers:{ Authorization:`Bearer ${token}` } })
       .then(res=>setUser(res.data));
  },[]);

  if(!user) return <p>Chargement...</p>;

  return (
    <div style={{display:"flex"}}>
      <Sidebar role={user.role} />
      <div style={{flex:1}}>
        <Header user={user} />
        <div style={{padding:"2rem"}}>
          <h1>Bienvenue {user.prenom} ({user.role})</h1>
        </div>
      </div>
    </div>
  );
}
