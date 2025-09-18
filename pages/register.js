import { useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({ nom: "", postnom: "", prenom: "", email: "", password: "", telephone: "", adresse: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", form);
            setMessage(res.data.message);
            router.push("/index");
        } catch (err) {
            setMessage(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                {["nom","postnom","prenom","email","password","telephone","adresse"].map(field => (
                    <div key={field}>
                        <input type={field==="password"?"password":"text"} name={field} placeholder={field} value={form[field]} onChange={handleChange} required />
                    </div>
                ))}
                <button type="submit">S'inscrire</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
