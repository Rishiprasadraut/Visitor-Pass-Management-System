const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Send email function
const sendEmail = async ({ to, subject, html }) => {
    try {
        // Check if email is configured
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('Email service not configured. Skipping email send.');
            return { success: false, message: 'Email service not configured' };
        }

        const info = await transporter.sendMail({
            from: `"Visitor Management System" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        });

        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error: error.message };
    }
};

// Email templates
const emailTemplates = {
    visitorApproved: (visitorName, hostName, qrCode) => `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .qr-code { text-align: center; margin: 20px 0; }
                .qr-code img { max-width: 250px; border: 2px solid #4F46E5; padding: 10px; background: white; }
                .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Visitor Pass Approved!</h1>
                </div>
                <div class="content">
                    <h2>Hello ${visitorName},</h2>
                    <p>Your visitor request has been <strong>approved</strong> by ${hostName}.</p>
                    <p>Please present this QR code at the security desk for check-in:</p>
                    <div class="qr-code">
                        <img src="${qrCode}" alt="Your Visitor Pass QR Code" />
                    </div>
                    <p><strong>Important:</strong> Save this email or take a screenshot of the QR code.</p>
                </div>
                <div class="footer">
                    <p>Visitor Management System | Automated Email - Do Not Reply</p>
                </div>
            </div>
        </body>
        </html>
    `,

    visitorRejected: (visitorName, hostName) => `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Visitor Request Update</h1>
                </div>
                <div class="content">
                    <h2>Hello ${visitorName},</h2>
                    <p>Unfortunately, your visitor request has been <strong>rejected</strong> by ${hostName}.</p>
                    <p>For more information, please contact ${hostName} directly.</p>
                </div>
                <div class="footer">
                    <p>Visitor Management System | Automated Email - Do Not Reply</p>
                </div>
            </div>
        </body>
        </html>
    `,

    newVisitorRequest: (hostEmail, visitorName, purpose) => `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .footer { background: #374151; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Visitor Request</h1>
                </div>
                <div class="content">
                    <h2>Hello,</h2>
                    <p>You have a new visitor request:</p>
                    <p><strong>Visitor:</strong> ${visitorName}</p>
                    <p><strong>Purpose:</strong> ${purpose}</p>
                    <p>Please login to the Visitor Management System to approve or reject this request.</p>
                </div>
                <div class="footer">
                    <p>Visitor Management System | Automated Email - Do Not Reply</p>
                </div>
            </div>
        </body>
        </html>
    `
};

module.exports = { sendEmail, emailTemplates };
