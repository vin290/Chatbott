const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const  Message = require("./models/Message")

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string (local)
const MONGO_URI = "mongodb://127.0.0.1:27017/chatbot";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err.message));

  function getReplyBot(usermessage){
const msg =String(usermessage).toLowerCase()
if(msg.includes("hello"))return "Hello ,whats uppp dear";
if(msg.includes("hi"))return "Hi ,whats uppp";
if(msg.includes("how are you"))return "I m just doing good";
if(msg.includes("your name"))return "I m Seema chatbot";
return "Sorry I did not understand "
  }


app.get("/", (req, res) => {
  res.send("🚀 Chatbot backend running successfully!");
});

app.post("/chat",async (req,res)=>{
    try{
     const userText = req.body.text;
     console.log("usertext is ",userText)
     const botReply =getReplyBot(userText);
     const newMessage = new Message({
        user : "you",
        text: userText,
        response:botReply
     });
     await newMessage.save();
     res.json({reply:botReply})
    }
    catch(error){
  console.error("Error in /chat",error);
  res.status(500).json("Internal server error")
    }
})
const PORT = 5000; 
app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
