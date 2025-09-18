import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";

export default function Chat() {
    const router = useRouter();
    const { id } = router.query;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        if (!id) return;
        api.get(`/messages/${id}`).then(res => setMessages(res.data));
    }, [id]);

    const sendMessage = async () => {
        if(!text) return;
        await api.post("/messages", { receiverId: parseInt(id), message: text });
        setMessages([...messages, { senderId: 0, receiverId: parseInt(id), message: text }]);
        setText("");
    }

    return (
        <div>
            <h1>Chat</h1>
            <div style={{border:"1px solid #ccc", height:"300px", overflowY:"scroll"}}>
                {messages.map((m,i) => <div key={i}><b>{m.senderId===0?"Moi":"Autre"}:</b> {m.message}</div>)}
            </div>
            <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="Écrire un message..." />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
}
