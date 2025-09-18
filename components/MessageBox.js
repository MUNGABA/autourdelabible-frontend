export default function MessageBox({ messages, userId }) {
  return (
    <div style={{
      border:"1px solid #ccc", height:"300px",
      overflowY:"scroll", padding:"0.5rem", marginBottom:"1rem"
    }}>
      {messages.map((m, i) => (
        <div key={i} style={{
          textAlign: m.senderId===userId ? "right" : "left",
          margin:"0.3rem 0"
        }}>
          <span style={{
            background: m.senderId===userId ? "#007bff" : "#eee",
            color: m.senderId===userId ? "white" : "black",
            padding:"0.5rem", borderRadius:"8px"
          }}>
            {m.message}
          </span>
        </div>
      ))}
    </div>
  );
}
