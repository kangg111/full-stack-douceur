import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use an App Password, not your real password
  },
});

export async function sendOtpEmail(to: string, code: string) {
  await transporter.sendMail({
    from: `"Your Store" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${code} is your code`,
    html: `
      <p>Your verification code:</p>
      <h1>${code}</h1>
      <p>This code can only be used once. It expires in 15 minutes.</p>
    `,
  });
}
