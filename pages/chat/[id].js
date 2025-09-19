import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/api";
import { io } from "socket.io-client";
import MessageBox from "../../components/MessageBox";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

let socket;

export default function Chat(){
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    api.get("/auth/me", { headers:{ Authorization:`Bearer ${token}` } })
       .then(res=>{
         setUser(res.data);
         socket = io("http://localhost:5000"); // ⚠️ remplacer par ton backend en ligne
         socket.emit("user_connected", res.data.id);
         socket.on("receive_message", msg=> setMessages(prev=>[...prev, msg]));
       });
    return ()=> socket?.disconnect();
  },[]);

  const sendMessage = ()=>{
    if(!text) return;
    socket.emit("send_message", { senderId:user.id, receiverId:parseInt(id), message:text });
    setMessages([...messages, { senderId:user.id, message:text }]);
    setText("");
  };

  useEffect(()=>{
    if(!id) return;
    api.get(`/messages/${id}`, { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } })
       .then(res=>setMessages(res.data));
  },[id]);

  if(!user) return <p>Chargement...</p>;

  return (
    <div style={{display:"flex"}}>
      <Sidebar role={user.role} />
      <div style={{flex:1}}>
        <Header user={user} />
        <div style={{padding:"2rem"}}>
          <h1>💬 Chat avec {id}</h1>
          <MessageBox messages={messages} userId={user.id} />
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Écrire..." />
          <button onClick={sendMessage}>Envoyer</button>
        </div>
      </div>
    </div>
  );
}
