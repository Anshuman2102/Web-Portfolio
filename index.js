const express = require('express')
const path = require('path')
const nodemailer = require("nodemailer");
const app=express()

app.set("view engine", "ejs")
app.set('views', __dirname);
app.use(express.static(path.join(__dirname)));
app.use(express.json())

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adhikarianshuman21@gmail.com",
      pass: "ovmu qwxh tmwp ownq",
    },
  });

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/mm',(req,res)=>{
    if(!req.body.name || !req.body.email  || !req.body.message ){
        return res.status(400).json({
            success: -1,
            message: " Some error occured",
          });
    }
    const emailHTML = `
         <html>
         <body>
         <h3>${req.body.name} Asked you something on Your Portfolio</h3>
         <p>Email : '${req.body.email}'</p>
         <p>Message : '${req.body.message}'</p>
         </body>
         </html>
        `;
        let mailDetails = {
            from: "portfoliomessage880@gmail.com",
            to: 'adhikarianshuman02@gmail.com',
            subject: "New Message from Portfolio",
            html: emailHTML,
          };

          mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
              console.log("Some error occured",err)
              return res.status(400).json({
                success: -1,
                message: " Some error occured",
              });
            } else {
              return res.status(200).json({
    
                message: "A mail sent successfully",
              });
            }
          });
})

app.listen(3000,()=>{
    console.log("Listening")
});
