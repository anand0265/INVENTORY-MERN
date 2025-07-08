const nodemailer = require('nodemailer');

// const sendEmail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//   port: 587,
//   secure: false, 
//   auth: {
//     user: "panditanand242003@gmail.com",
//     pass: "yney zhdr ulnt uvlb",
//   },
//   });

//   await transporter.sendMail({
//     from: '"QxBilling" <panditanand242003@gmail.com>',
//     to,
//     subject,
//     html
//   });
// };

const sendEmail = async (to, subject, html) => {

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "panditanand242003@gmail.com",
    pass: "yney zhdr ulnt uvlb",
  },
  tls: {
    rejectUnauthorized: false
  }
});

await transporter.sendMail({
    from: '"QxBilling" <panditanand242003@gmail.com>',
    to,
    subject,
    html
  });

}

module.exports = sendEmail;
