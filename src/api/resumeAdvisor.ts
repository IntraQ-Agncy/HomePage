// Resume Advisor service using Supabase Storage and Database
import { uploadFilesToStorage, saveResumeSubmission } from './supabaseStorageService';

export interface ResumeFormData {
  fullName: string;
  email: string;
  phone: string;
  desiredRole: string;
}

export interface ResumeSubmissionResult {
  success: boolean;
  submissionId?: string;
  originalFileUrl?: string;
  formDetailsFileUrl?: string;
  error?: string;
}

// Submit resume with files and form data
export const submitResume = async (
  originalFile: File,
  formData: ResumeFormData
): Promise<ResumeSubmissionResult> => {
  try {
    console.log('🚀 Starting resume submission process...');
    
    // Create form details file from form data
    const formDetailsContent = JSON.stringify(formData, null, 2);
    const formDetailsFile = new File(
      [formDetailsContent], 
      `${formData.fullName.replace(/\s+/g, '_')}_form_details.json`, 
      { type: 'application/json' }
    );
    
    console.log('📋 Form details file created');
    
    // Upload both files to Supabase Storage
    console.log('📤 Uploading files to Supabase Storage...');
    const uploadResult = await uploadFilesToStorage(originalFile, formDetailsFile);
    
    if (!uploadResult.success) {
      console.error('Supabase Storage upload failed:', uploadResult.error);
      throw new Error(`Failed to upload files to Supabase Storage. ${uploadResult.error}`);
    }
    
    console.log('✅ Files uploaded successfully to Supabase Storage');
    console.log('📄 Original file URL:', uploadResult.originalFileUrl);
    console.log('📋 Form details URL:', uploadResult.formDetailsFileUrl);
    
    // Save submission data to Supabase Database
    console.log('💾 Saving submission data to Supabase...');
    const submissionData = {
      originalFileName: originalFile.name,
      formDetailsFileName: formDetailsFile.name,
      originalFileUrl: uploadResult.originalFileUrl!,
      formDetailsFileUrl: uploadResult.formDetailsFileUrl!,
      originalFileId: uploadResult.originalFileId!,
      formDetailsFileId: uploadResult.formDetailsFileId!,
      status: 'pending' as const,
      ...formData
    };
    
    const saveResult = await saveResumeSubmission(submissionData);
    
    if (!saveResult.success) {
      console.error('Failed to save submission to Supabase:', saveResult.error);
      throw new Error(`Failed to save submission data. ${saveResult.error}`);
    }
    
    console.log('✅ Resume submission completed successfully');
    console.log('🆔 Submission ID:', saveResult.submissionId);
    
    return {
      success: true,
      submissionId: saveResult.submissionId,
      originalFileUrl: uploadResult.originalFileUrl,
      formDetailsFileUrl: uploadResult.formDetailsFileUrl
    };
    
  } catch (error) {
    console.error('Resume submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Resume submission failed'
    };
  }
};

// Get form data from a file (for editing existing submissions)
export const getFormDataFromFile = async (file: File): Promise<ResumeFormData | null> => {
  try {
    const text = await file.text();
    return JSON.parse(text) as ResumeFormData;
  } catch (error) {
    console.error('Failed to parse form data from file:', error);
    return null;
  }
};

// Validate form data
export const validateFormData = (formData: ResumeFormData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!formData.fullName?.trim()) {
    errors.push('Full name is required');
  }
  
  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!formData.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  if (!formData.desiredRole?.trim()) {
    errors.push('Desired role is required');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Format form data for display
export const formatFormDataForDisplay = (formData: ResumeFormData): string => {
  return `
Resume Submission Details:

Personal Information:
- Full Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}

Professional Information:
- Desired Role: ${formData.desiredRole}

Submitted at: ${new Date().toLocaleString()}
  `.trim();
};
