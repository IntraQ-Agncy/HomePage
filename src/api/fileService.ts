import mammoth from 'mammoth';

// Simplified file service - no text extraction, just file preparation for upload
export const prepareFilesForUpload = async (file: File, formData: any) => {
  try {
    // Validate file type
    if (file.type !== 'application/pdf' && 
        file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      throw new Error('Please upload a PDF or DOCX file.');
    }

    // Create a text file with form details
    const formDetailsText = `
Resume Submission Details
=========================

Target Role: ${formData.targetRole}
Email: ${formData.email}
Name: ${formData.name || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Submission Date: ${new Date().toISOString()}
Original File: ${file.name}
File Type: ${file.type}
File Size: ${(file.size / 1024).toFixed(2)} KB

Notes: This resume was submitted through the Resume Advisor service.
    `.trim();

    // Create a text file blob
    const formDetailsBlob = new Blob([formDetailsText], { type: 'text/plain' });
    const formDetailsFile = new File([formDetailsBlob], `form-details-${Date.now()}.txt`, { type: 'text/plain' });

    return {
      success: true,
      originalFile: file,
      formDetailsFile: formDetailsFile,
      formDetailsText: formDetailsText
    };
  } catch (error) {
    console.error('File preparation error:', error);
    throw new Error('Failed to prepare files for upload. Please try again.');
  }
};

// Legacy function for backward compatibility (returns empty string)
export const extractTextFromFile = async (file: File): Promise<string> => {
  console.log('Text extraction disabled - files will be uploaded directly to Supabase Storage');
  return 'Text extraction disabled - file will be uploaded directly to Supabase Storage';
};
