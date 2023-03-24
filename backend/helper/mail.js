const nodemailer = require("nodemailer");

exports.sendResetCode = (email, name, code) => {
  // create transporter object using Gmail
  const transporter = nodemailer.createTransport({
    service: "smtp-mail.outlook.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // email content
  const mailOptions = {
    from:  process.env.EMAIL,
    to: email,
    subject: "Forgot password varification code",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dttyhvsnv/image/upload/v1677427333/rockie/blog_images/nldqzh966sww70aqjlzj.jpg" alt="" style="width:30px"><span>Action requise : reset your account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">To change your password copy the code below and paste it to the confirmation box</span></div><a  style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">${code}</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">OpenEnded allows you the read blogs about different category and create your own</span></div></div>`,
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('er',error);
    }
  });
};
