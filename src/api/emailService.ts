import { ResumeFeedback } from './geminiService';

// Lightweight email service
export const sendResumeFeedback = async (
  email: string, 
  targetRole: string, 
  feedback: ResumeFeedback
): Promise<boolean> => {
  try {
    const emailContent = generateEmailContent(targetRole, feedback);
    
    console.log(`Sending feedback to ${email} for ${targetRole}`);
    console.log('Email content:', emailContent);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, integrate with your email provider
    // Example: Brevo, Resend, or your existing email service
    
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Generate clean email content
const generateEmailContent = (targetRole: string, feedback: ResumeFeedback): string => {
  return `
Dear User,

Thank you for using our AI Resume Analysis service for the ${targetRole} position.

Here's your detailed feedback:

ATS OPTIMIZATION:
${feedback.atsOptimization.map(point => `• ${point}`).join('\n')}

FORMATTING:
${feedback.formatting.map(point => `• ${point}`).join('\n')}

CONTENT:
${feedback.content.map(point => `• ${point}`).join('\n')}

MISSING SECTIONS:
${feedback.missingSections.map(point => `• ${point}`).join('\n')}

OVERALL SUMMARY:
${feedback.overallSummary}

Best regards,
IntraQ AI Resume Advisor Team
  `.trim();
};
