import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set. Email functionality will be disabled.");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return false;
    }

    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const fromEmail = process.env.FROM_EMAIL || 'info@cabinsinhillcountry.com';
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5dc;">
      <div style="background-color: #8b4513; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">🏞️ Welcome to Hill Country!</h1>
      </div>
      
      <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #8b4513; margin-top: 0;">Thanks for joining our Hill Country family!</h2>
        
        <p style="color: #2f4f4f; line-height: 1.6;">
          You're now part of our exclusive community of Hill Country enthusiasts! Get ready to discover:
        </p>
        
        <ul style="color: #2f4f4f; line-height: 1.8;">
          <li>🍷 Insider wine tasting tips and vineyard recommendations</li>
          <li>🏡 Exclusive cabin deals and availability alerts</li>
          <li>🌸 Seasonal wildflower bloom updates and best viewing spots</li>
          <li>🎪 Early access to festival and event information</li>
          <li>🍖 Local restaurant recommendations and BBQ joint secrets</li>
        </ul>
        
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #8b4513; margin-top: 0;">🌟 Welcome Gift!</h3>
          <p style="color: #2f4f4f; margin: 0;">
            Use code <strong style="color: #d2691e;">HILLCOUNTRY15</strong> for 15% off your first cabin booking!
          </p>
        </div>
        
        <p style="color: #2f4f4f; line-height: 1.6;">
          We'll send you the best Hill Country has to offer - from hidden swimming holes to the perfect sunset viewing spots. 
          Your Texas adventure starts here!
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://cabinsinhillcountry.com" style="background-color: #d2691e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
            Start Exploring
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #888; font-size: 14px; text-align: center;">
          Happy trails!<br>
          The Cabins in Hill Country Team<br>
          <em>"Where every stay is an adventure"</em>
        </p>
      </div>
    </div>
  `;

  const textContent = `
    Welcome to Hill Country!
    
    Thanks for joining our Hill Country family! You're now part of our exclusive community of Hill Country enthusiasts.
    
    Get ready to discover:
    • Insider wine tasting tips and vineyard recommendations
    • Exclusive cabin deals and availability alerts
    • Seasonal wildflower bloom updates and best viewing spots
    • Early access to festival and event information
    • Local restaurant recommendations and BBQ joint secrets
    
    Welcome Gift: Use code HILLCOUNTRY15 for 15% off your first cabin booking!
    
    We'll send you the best Hill Country has to offer - from hidden swimming holes to the perfect sunset viewing spots. Your Texas adventure starts here!
    
    Happy trails!
    The Cabins in Hill Country Team
    "Where every stay is an adventure"
  `;

  return await sendEmail({
    to: email,
    from: fromEmail,
    subject: '🏞️ Welcome to Hill Country - Your Adventure Awaits!',
    text: textContent,
    html: htmlContent,
  });
}