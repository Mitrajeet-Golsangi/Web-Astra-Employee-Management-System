"use strict";
const nodemailer = require("nodemailer");


// clbqyvhnkrgifnyz - 2 way password 


// const emailValidator = require('deep-email-validator');

// async function isEmailValid(email) {
//   return emailValidator.validate(email);
// }






module.exports = async function main(e_mail,link) {
  // async..await is not allowed in global scope, must use a wrapper
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // const {valid, reason, validators} = await isEmailValid(e_mail);
  
  // if (!valid) return res.json({e_mail: "Invalid"});



  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service:'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "webastraemployee@gmail.com", // generated ethereal user
      pass: "clbqyvhnkrgifnyz", // generated ethereal password
    },
  });

  // verification link trial
  // const rand=Math.floor((Math.random() * 100) + 54);
  // const host=req.get('host');
  // const link="http://"+req.get('host')+"/verify?id="+rand;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Web_Astra_Tech-support" <WebAstraEmployee@gmail.com>', // sender address
    to: e_mail, // list of receivers
    subject: "Veryfing Email", // Subject line
    text: "Please Verify your email", // plain text body
    html : `Hello, Please Click on the link to verify your email.+${link}+ >Click here to verify`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().then().catch(console.error);


