// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, services, budget, isMember } = body;

    // 1. Configure the SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Format the Email Layout
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #FBCFE8; padding: 20px; border-radius: 15px;">
        <h2 style="color: #9D174D; border-bottom: 2px solid #FFF5F5; padding-bottom: 10px;">New Booking Alert: The Pink Room</h2>
        
        <h3>Client Information:</h3>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Desired Date:</strong> ${date || "N/A"}</p>
        <p><strong>Is Member?</strong> ${isMember || "No"}</p>

        <h3 style="color: #DB2777; margin-top: 20px;">Selected Luxury Treatments:</h3>
        <p style="background: #FFF5F5; padding: 10px; border-radius: 8px; color: #4A2828;">
          ${services && services.length > 0 ? services.join(", ") : "No services selected"}
        </p>

        <h3>Budget Spectrum Selected:</h3>
        <p><strong>Range:</strong> ${budget || "Not Specified"}</p>
      </div>
    `;

    // 3. Setup Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the message to yourself
      replyTo: email, // Clicking 'Reply' in your inbox will reply to the client
      subject: `✨ New Pink Room Booking Reservation from ${name || 'Client'}`,
      html: emailHtml,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Booking email sent successfully!" }, { status: 200 });

  } catch (error: any) {
    console.error("Nodemailer API Error:", error);
    return NextResponse.json(
      { error: "Internal server failed to compile/send email.", details: error.message },
      { status: 500 }
    );
  }
}