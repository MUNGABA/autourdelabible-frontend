import { useState } from "react";
import api from "../utils/api";

export default function Candidature() {
    const [paiementOnline, setPaiementOnline] = useState(false);
    const [paiementCash, setPaiementCash] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/candidature", { paiementOnline, paiementCash });
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <div>
            <h1>Postuler à la compétition</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="checkbox" checked={paiementOnline} onChange={e => setPaiementOnline(e.target.checked)} /> Payer en ligne
                </label>
                <label>
                    <input type="checkbox" checked={paiementCash} onChange={e => setPaiementCash(e.target.checked)} /> Payer en cash
                </label>
                <button type="submit">Postuler</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
