import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, message } = await request.json();

    // Basic Server-Side Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required field configurations.' }, { status: 400 });
    }

    // Dispatch the email via Resend
    const data = await resend.emails.send({
      from: 'Mass Spares Inquiry <onboarding@resend.dev>', // Swap with your verified domain in production
      to: ['mass.ind26@gmail.com'], // The address where you want to receive inquiries
      subject: `Mass Spares - New B2B Inquiry from ${company || name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0f172a; border: 1px solid #e2e8f0; padding: 24px; rounded: 4px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #0B2553; border-bottom: 2px solid #1E3A8A; padding-bottom: 8px; margin-top: 0;">
            Mass Spares Incoming B2B Request
          </h2>
          <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 120px;"><strong>Contact Name:</strong></td>
              <td style="padding: 6px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b;"><strong>Company:</strong></td>
              <td style="padding: 6px 0; font-size: 14px;">${company || 'Not Specified'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-size: 13px; color: #64748b;"><strong>Phone:</strong></td>
              <td style="padding: 6px 0; font-size: 14px;">${phone || 'Not Specified'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px dashed #e2e8f0;">
            <strong style="font-size: 13px; color: #64748b; display: block; margin-bottom: 6px;">Message Body:</strong>
            <p style="font-size: 14px; line-height: 1.6; margin: 0; color: #334155; bg-color: #f8fafc; padding: 12px;">
              ${message.replace(/\n/g, '<br />')}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal pipeline mailing error.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
