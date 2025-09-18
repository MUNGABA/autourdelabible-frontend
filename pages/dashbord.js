import { useEffect, useState } from "react";
import api, { setAuthToken } from "../utils/api";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/");
        setAuthToken(token);
        // Charger les informations selon rôle
        api.get("/users").then(res => setUsers(res.data)).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {users.map(u => (
                <div key={u.id}>{u.nom} {u.prenom} ({u.role})</div>
            ))}
        </div>
    );
}
