import { useState } from "react";
import api, { setAuthToken } from "../utils/api";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            setAuthToken(res.data.token);
            if(res.data.role === "candidat") router.push("/dashboard");
            else if(res.data.role === "agent") router.push("/dashboard");
            else if(res.data.role === "admin") router.push("/dashboard");
        } catch (err) {
            setMessage(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
                <button type="submit">Se connecter</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
