import { useEffect,useRef,useState } from "react";
import "./App.css";
import sendIcon from "../../frontend/src/assets/SendIcon.png"
import chatIcon from "../../frontend/src/assets/chatBot.png"

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const chatEndref = useRef(null)
  const fullText = "🤖 I am Seema Chatbot";
   useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 100); // type speed = 100ms per character
    return () => clearInterval(timer);
  }, []);
useEffect(()=>{
  chatEndref.current?.scrollIntoView({behaviour:"smooth"})
},[messages])
  
  const handleSend = async () => {
    const newUsermessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, newUsermessage]);
    setTyping(true);
    try {
      const response = await fetch("https://chatbott-nqa2.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      console.log("data is", data);
      setTimeout(() => {
        setTyping(false);
        const botMessage = { sender: "Bot", text: data.reply };
        setMessages((prev) => [...prev, botMessage]);
      }, 2000);
    } catch (err) {}
    setInput("");
  };
  return (
    <div className="App">
      <header className="App-header">
        <h4 className="typeWriter">{displayText}</h4>
      </header>
      <div className="ChatArea" style={{ backgroundImage: `url(${chatIcon})`,backgroundSize: "contain",    backgroundPosition: "center",backgroundRepeat: "no-repeat",}}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chatBubble ${
              msg.sender === "You" ? "userMsg" : "botMsg"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}

        {
          typing && (
            <div className="chatBubble botMsg typingIndicator">
          <div className="Dot"></div>
          <div className="Dot"></div>
          <div className="Dot"></div>
            </div>
          )
        }
        <div ref={chatEndref}></div>

      </div>
      <div className="bottomArea">
        <input
        className="MessageInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..." 
          onKeyDown={(e)=>e.key === "Enter" && handleSend()}
        ></input>
     
       <img src={sendIcon} alt="Send" className="sendIcon"   onClick={handleSend} />
       
      </div>
    </div>
  );
}

export default App;
