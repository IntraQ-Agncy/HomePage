import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.REACT_APP_GEMINI_API_KEY || 'your-gemini-api-key'
);

export interface ResumeFeedback {
  atsOptimization: string[];
  formatting: string[];
  content: string[];
  missingSections: string[];
  overallSummary: string;
}

// Optimized prompt for better Gemini performance
const createAnalysisPrompt = (targetRole: string, resumeText: string): string => {
  return `Analyze this resume for ${targetRole} role. Provide 3-4 specific suggestions for each category:

1. ATS Optimization - Keywords and phrases to add
2. Formatting - Layout and readability improvements  
3. Content - Impact and clarity enhancements
4. Missing Sections - Important additions needed
5. Overall Summary - 2-sentence strengths and improvements

Resume: ${resumeText}

Format: Use bullet points (•) for each suggestion. Keep responses concise.`;
};

// Parse Gemini response efficiently
const parseGeminiResponse = (response: string): ResumeFeedback => {
  try {
    const sections = response.split(/\d+\.\s+/).filter(Boolean);
    
    return {
      atsOptimization: extractBulletPoints(sections[0] || ''),
      formatting: extractBulletPoints(sections[1] || ''),
      content: extractBulletPoints(sections[2] || ''),
      missingSections: extractBulletPoints(sections[3] || ''),
      overallSummary: sections[4]?.trim() || 'Analysis completed successfully.'
    };
  } catch (error) {
    console.error('Response parsing error:', error);
    return getDefaultFeedback();
  }
};

// Efficient bullet point extraction
const extractBulletPoints = (text: string): string[] => {
  const points = text.match(/•\s*(.+?)(?=\n|$)/g) || 
                 text.match(/-\s*(.+?)(?=\n|$)/g);
  
  return points 
    ? points.map(p => p.replace(/^[•\-]\s*/, '').trim()).slice(0, 4)
    : text.split('\n').filter(line => line.trim()).slice(0, 4);
};

// Fallback feedback
const getDefaultFeedback = (): ResumeFeedback => ({
  atsOptimization: ['Add industry-specific keywords', 'Include technical skills'],
  formatting: ['Use consistent spacing', 'Improve readability'],
  content: ['Quantify achievements', 'Use action verbs'],
  missingSections: ['Consider adding certifications', 'Include projects section'],
  overallSummary: 'Resume shows potential. Focus on ATS optimization and quantifying achievements.'
});

// Main analysis function
export const analyzeResumeWithGemini = async (
  resumeText: string, 
  targetRole: string
): Promise<ResumeFeedback> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = createAnalysisPrompt(targetRole, resumeText);
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    return parseGeminiResponse(response);
  } catch (error) {
    console.error('Gemini analysis error:', error);
    return getDefaultFeedback();
  }
};
