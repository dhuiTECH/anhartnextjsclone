interface AnhartEmailProps {
  name: string
  email: string
  message: string
  phone?: string
  organization?: string
  subject?: string
  investment_amount?: string
  form_type: string
}

export const generateAnhartEmailHtml = ({
  name,
  email,
  message,
  phone,
  organization,
  subject,
  investment_amount,
  form_type,
}: AnhartEmailProps): string => {
  const getFormTypeDescription = (formType: string): string => {
    switch (formType) {
      case 'contact':
        return 'inquiry'
      case 'partner':
        return 'partnership request'
      case 'limited_partnership':
        return 'limited partnership inquiry'
      case 'home':
        return 'contact request'
      default:
        return 'submission'
    }
  }

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Open Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="margin: 0 auto; max-width: 600px; background-color: #ffffff;">
    <!-- Header with Logo -->
    <div style="text-align: center; padding-top: 20px; padding-bottom: 20px;">
      <img src="https://anhart.ca/images/anhart-logo.png" width="200" height="auto" alt="Anhart Affordable Housing Logo" style="max-width: 200px; height: auto;" />
    </div>

    <!-- Main Content -->
    <div style="padding: 20px;">
      <h1 style="color: #2c5530; font-size: 28px; font-weight: bold; text-align: center; margin: 0 0 30px 0;">
        Thank You for Your Submission
      </h1>
      
      <p style="font-size: 18px; color: #333333; margin: 0 0 20px 0;">
        <strong>Dear ${name},</strong>
      </p>
      
      <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Thank you for reaching out to Anhart! We've received your ${getFormTypeDescription(form_type)} and will respond within 48 hours. Here are your details:
      </p>

      <!-- Submission Details -->
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
        <p style="font-size: 18px; font-weight: bold; color: #D32F2F; margin: 0 0 15px 0;">Your Submission Details:</p>
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Email:</strong> ${email}</p>
        ${phone ? `<p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Phone:</strong> ${phone}</p>` : ''}
        ${organization ? `<p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Organization:</strong> ${organization}</p>` : ''}
        ${subject ? `<p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Subject:</strong> ${subject}</p>` : ''}
        ${investment_amount ? `<p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Investment Amount:</strong> ${investment_amount}</p>` : ''}
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.4;"><strong>Message:</strong> ${message}</p>
      </div>

      <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        We appreciate your interest in partnering with us to create sustainable, affordable housing solutions across Canada.
      </p>

      <!-- Call to Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://anhart.ca/contact" style="background-color: #D32F2F; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 12px 30px; border-radius: 6px; display: inline-block; border: none;">
          Contact Us Again
        </a>
      </div>

      <!-- Next Steps Box -->
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #e9ecef;">
        <p style="font-size: 18px; font-weight: bold; color: #D32F2F; margin: 0 0 15px 0;">What happens next?</p>
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.5;">• Our team will review your submission within 24-48 hours</p>
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.5;">• We'll reach out to discuss your project or partnership opportunity</p>
        <p style="font-size: 15px; color: #555555; margin: 8px 0; line-height: 1.5;">• Together, we'll explore how we can create positive impact</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 30px 20px 20px 20px; border-top: 1px solid #e9ecef; background-color: #f8f9fa;">
      <p style="font-size: 16px; color: #333333; margin: 0 0 15px 0;">
        <em>Best regards,</em><br />
        <strong>The Anhart Team</strong>
      </p>
      <p style="font-size: 14px; color: #666666; margin: 0 0 15px 0;">
        Email: <a href="mailto:info@anhart.ca" style="color: #D32F2F; text-decoration: none;">info@anhart.ca</a><br />
        Phone: 1-800-555-1234
      </p>
      <p style="font-size: 12px; color: #999999; margin: 0;">
        © 2025 Anhart. Creating sustainable communities through affordable housing.
      </p>
    </div>
  </div>
</body>
</html>`
}

export default generateAnhartEmailHtml