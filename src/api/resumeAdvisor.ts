import { analyzeResumeWithGemini } from './geminiService';
import { extractTextFromFile } from './fileService';
import { sendResumeFeedback } from './emailService';

export interface ResumeAnalysisRequest {
  resume: File;
  targetRole: string;
  email: string;
}

export interface ResumeAnalysisResponse {
  success: boolean;
  message: string;
  analysisId?: string;
}

// Main resume analysis function - lightweight and efficient
export const analyzeResume = async (data: ResumeAnalysisRequest): Promise<ResumeAnalysisResponse> => {
  try {
    // Extract text from resume
    const resumeText = await extractTextFromFile(data.resume);
    
    // Analyze with Gemini
    const feedback = await analyzeResumeWithGemini(resumeText, data.targetRole);
    
    // Send email with feedback
    await sendResumeFeedback(data.email, data.targetRole, feedback);
    
    return {
      success: true,
      message: 'Resume analysis completed successfully. Check your email for detailed feedback.',
      analysisId: `analysis_${Date.now()}`
    };
  } catch (error) {
    console.error('Resume analysis error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to analyze resume'
    };
  }
};
