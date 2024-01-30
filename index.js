const express=require("express");
const app=express();
const qr=require("qrcode")

app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/QRcode",async(req,res)=>{
    const link=req.body.link;

    try {
        const qrcode=await qr.toDataURL(link);
        res.send(` <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
        <h1 style="color: #333; margin-bottom: 20px;">Scan this</h1>
        <img src="${qrcode}" alt="QR Code" style="border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);" height="300" width="300"/>
        <a href="/" style="text-decoration: none; color: #333; margin-top: 20px; font-weight: bold;">Go back</a>
    </div>`)
    } catch (error) {
        res.status(500).send("Internal error")
    }
})
app.listen(8000,()=>console.log("Server is running on port no:- 8000"));
