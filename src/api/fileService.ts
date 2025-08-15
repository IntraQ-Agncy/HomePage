// Lightweight file processing for browser compatibility
export const extractTextFromFile = async (file: File): Promise<string> => {
  try {
    if (file.type === 'application/pdf') {
      return await processPDF(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await processDOCX(file);
    } else {
      throw new Error('Please upload a PDF or DOCX file.');
    }
  } catch (error) {
    console.error('File processing error:', error);
    throw new Error('Failed to process file. Please try again.');
  }
};

// Simulated PDF processing (lightweight)
const processPDF = async (file: File): Promise<string> => {
  console.log('Processing PDF:', file.name);
  
  // In production, this would use a lightweight PDF parser
  // For now, return sample content to demonstrate the flow
  return `Sample resume content from ${file.name}:
  
John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

SUMMARY
Experienced software engineer with 5+ years developing web applications.

EXPERIENCE
Software Engineer | Tech Corp | 2020-Present
• Developed 10+ web applications
• Led team of 3 developers
• Improved performance by 40%

EDUCATION
Bachelor of Science in Computer Science | University of Technology | 2020`;
};

// Simulated DOCX processing (lightweight)
const processDOCX = async (file: File): Promise<string> => {
  console.log('Processing DOCX:', file.name);
  
  return `Sample resume content from ${file.name}:
  
Jane Smith
Marketing Manager
jane.smith@email.com
(555) 987-6543

SUMMARY
Creative marketing professional with 7+ years experience.

EXPERIENCE
Marketing Manager | Brand Corp | 2019-Present
• Led rebranding campaign increasing awareness by 60%
• Managed team of 5 specialists
• Increased social engagement by 200%

EDUCATION
Master of Business Administration | Business University | 2019`;
};
