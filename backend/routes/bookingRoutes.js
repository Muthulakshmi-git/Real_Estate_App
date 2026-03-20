const express = require("express");
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { names, email, phone, reason, agentEmail } = req.body;

    await Booking.create({ names, email, phone, reason, agentEmail });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: agentEmail,
      subject: "New Property Booking",
      text: `
Name: ${names}
Email: ${email}
Phone: ${phone}
Reason: ${reason}
      `
    });

    res.json({ msg: "Booking saved & Email sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Email failed" });
  }
});

module.exports = router;
