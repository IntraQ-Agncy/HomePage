// Supabase Storage service for file uploads and data storage
// Lazy import to avoid pulling in heavy dependencies on initial load
let supabase: any = null;

const getSupabase = async () => {
  if (!supabase) {
    try {
      const { supabase: supabaseClient } = await import('../config/supabase');
      supabase = await supabaseClient();
    } catch (error) {
      console.error('Failed to import Supabase:', error);
      throw new Error('Supabase not available');
    }
  }
  return supabase;
};

export interface FileUploadResponse {
  success: boolean;
  fileId?: string;
  downloadUrl?: string;
  error?: string;
}

export interface MultiFileUploadResponse {
  success: boolean;
  originalFileId?: string;
  formDetailsFileId?: string;
  originalFileUrl?: string;
  formDetailsFileUrl?: string;
  error?: string;
}

export interface ResumeSubmission {
  id?: string;
  originalFileName: string;
  formDetailsFileName: string;
  originalFileUrl: string;
  formDetailsFileUrl: string;
  originalFileId: string;
  formDetailsFileId: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  feedback?: string;
  reviewerNotes?: string;
  fullName: string;
  email: string;
  phone: string;
  desiredRole: string;
}

// Upload a single file to Supabase Storage
const uploadFileToStorage = async (file: File, folder: string): Promise<FileUploadResponse> => {
  try {
    console.log('🔍 Starting file upload process...');
    
    const supabaseClient = await getSupabase();
    console.log('✅ Supabase client obtained');
    
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}_${file.name}`;
    
    console.log(`📤 Attempting to upload file: ${fileName} to bucket: resume-files`);
    console.log(`📁 File details:`, {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });
    
    // Test bucket access before upload
    console.log('🔍 Testing bucket access...');
    const { data: testData, error: testError } = await supabaseClient.storage
      .from('resume-files')
      .list('', { limit: 1 });
    
    if (testError) {
      console.error('❌ Bucket access test failed:', testError);
      console.error('❌ Error details:', {
        message: testError.message,
        code: testError.code,
        details: testError
      });
      
      if (testError.message.includes('row-level security policy')) {
        throw new Error('Storage access denied. Please check Supabase Storage policies for the "resume-files" bucket.');
      }
      
      if (testError.message.includes('bucket not found')) {
        throw new Error('Storage bucket "resume-files" not found. Please create it in your Supabase dashboard.');
      }
      
      throw new Error(`Bucket access test failed: ${testError.message}`);
    }
    
    console.log('✅ Bucket access test passed');
    
    // Upload file to Supabase Storage
    console.log('📤 Starting file upload...');
    const { data, error } = await supabaseClient.storage
      .from('resume-files')
      .upload(fileName, file);
    
    if (error) {
      console.error('❌ Supabase upload error:', error);
      console.error('❌ Upload error details:', {
        message: error.message,
        code: error.code,
        details: error
      });
      
      // Handle specific RLS errors
      if (error.message.includes('row-level security policy')) {
        throw new Error('Storage access denied. Please check Supabase Storage policies for the "resume-files" bucket.');
      }
      
      if (error.message.includes('bucket not found')) {
        throw new Error('Storage bucket "resume-files" not found. Please create it in your Supabase dashboard.');
      }
      
      throw new Error(error.message);
    }
    
    console.log('✅ File upload successful, getting public URL...');
    
    // Get public URL for the file
    const { data: urlData } = supabaseClient.storage
      .from('resume-files')
      .getPublicUrl(fileName);
    
    console.log(`✅ File uploaded successfully: ${fileName}`);
    console.log(`🔗 Public URL: ${urlData.publicUrl}`);
    
    return {
      success: true,
      fileId: data.path,
      downloadUrl: urlData.publicUrl
    };
    
  } catch (error) {
    console.error(`❌ File upload failed:`, error);
    console.error(`❌ Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Upload multiple files to Supabase Storage
export const uploadFilesToStorage = async (
  originalFile: File,
  formDetailsFile: File
): Promise<MultiFileUploadResponse> => {
  try {
    console.log('🚀 Starting Supabase Storage upload...');
    
    // Upload original resume file
    const originalFileResponse = await uploadFileToStorage(originalFile, 'resumes');
    if (!originalFileResponse.success) {
      throw new Error(`Original file upload failed: ${originalFileResponse.error}`);
    }
    
    // Upload form details file
    const formDetailsResponse = await uploadFileToStorage(formDetailsFile, 'form-details');
    if (!formDetailsResponse.success) {
      throw new Error(`Form details upload failed: ${formDetailsResponse.error}`);
    }
    
    console.log('📁 Both files uploaded successfully to Supabase Storage');
    
    return {
      success: true,
      originalFileId: originalFileResponse.fileId!,
      formDetailsFileId: formDetailsResponse.fileId!,
      originalFileUrl: originalFileResponse.downloadUrl!,
      formDetailsFileUrl: formDetailsResponse.downloadUrl!
    };
    
  } catch (error) {
    console.error('Supabase Storage upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Save resume submission to Supabase Database
export const saveResumeSubmission = async (
  submission: Omit<ResumeSubmission, 'id' | 'submittedAt'>
): Promise<{ success: boolean; submissionId?: string; error?: string }> => {
  try {
    console.log('💾 Saving resume submission to Supabase...');
    
    const supabaseClient = await getSupabase();
    
    const submissionData = {
      ...submission,
      submittedAt: new Date().toISOString(),
      status: 'pending' as const
    };
    
    // Insert document into Supabase
    const { data, error } = await supabaseClient
      .from('resume_submissions')
      .insert([submissionData])
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log('✅ Resume submission saved with ID:', data.id);
    
    return {
      success: true,
      submissionId: data.id
    };
    
  } catch (error) {
    console.error('❌ Failed to save resume submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save submission'
    };
  }
};

// Get all resume submissions
export const getResumeSubmissions = async (): Promise<ResumeSubmission[]> => {
  try {
    const supabaseClient = await getSupabase();
    
    const { data, error } = await supabaseClient
      .from('resume_submissions')
      .select('*')
      .order('submittedAt', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
    
  } catch (error) {
    console.error('Failed to fetch resume submissions:', error);
    return [];
  }
};

// Get a specific resume submission
export const getResumeSubmission = async (id: string): Promise<ResumeSubmission | null> => {
  try {
    const supabaseClient = await getSupabase();
    
    const { data, error } = await supabaseClient
      .from('resume_submissions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No rows returned
      }
      throw new Error(error.message);
    }
    
    return data;
    
  } catch (error) {
    console.error('Failed to fetch resume submission:', error);
    return null;
  }
};

// Update resume submission status
export const updateResumeSubmissionStatus = async (
  id: string,
  status: ResumeSubmission['status'],
  feedback?: string,
  reviewerNotes?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const supabaseClient = await getSupabase();
    
    const { error } = await supabaseClient
      .from('resume_submissions')
      .update({
        status,
        feedback,
        reviewerNotes,
        reviewedAt: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log(`✅ Resume submission ${id} status updated to: ${status}`);
    
    return { success: true };
    
  } catch (error) {
    console.error('Failed to update resume submission status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Update failed'
    };
  }
};

// Delete a resume submission and associated files
export const deleteResumeSubmission = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get the submission first to get file IDs
    const submission = await getResumeSubmission(id);
    if (!submission) {
      throw new Error('Resume submission not found');
    }
    
    const supabaseClient = await getSupabase();
    
    // Delete files from Storage
    if (submission.originalFileId) {
      const { error: originalError } = await supabaseClient.storage
        .from('resume-files')
        .remove([submission.originalFileId]);
      
      if (originalError) {
        console.warn('Failed to delete original file:', originalError);
      }
    }
    
    if (submission.formDetailsFileId) {
      const { error: formError } = await supabaseClient.storage
        .from('resume-files')
        .remove([submission.formDetailsFileId]);
      
      if (formError) {
        console.warn('Failed to delete form details file:', formError);
      }
    }
    
    // Delete document from database
    const { error } = await supabaseClient
      .from('resume_submissions')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log(`✅ Resume submission ${id} deleted successfully`);
    
    return { success: true };
    
  } catch (error) {
    console.error('Failed to delete resume submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Deletion failed'
    };
  }
};

// Upload text content as a file
export const uploadTextFile = async (
  filename: string,
  content: string,
  folder: string = 'text-files'
): Promise<FileUploadResponse> => {
  try {
    // Create a file blob from content
    const file = new File([content], filename, { type: 'text/plain' });
    
    // Upload using the existing function
    return await uploadFileToStorage(file, folder);
    
  } catch (error) {
    console.error('Text file upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
};

// Check if storage bucket is accessible
export const checkStorageAccess = async (): Promise<{ accessible: boolean; error?: string }> => {
  try {
    const supabaseClient = await getSupabase();
    
    // Try to list files from the bucket to check access
    const { data, error } = await supabaseClient.storage
      .from('resume-files')
      .list('', { limit: 1 });
    
    if (error) {
      if (error.message.includes('row-level security policy')) {
        return {
          accessible: false,
          error: 'Storage bucket exists but RLS policies prevent access. Please check bucket policies.'
        };
      }
      if (error.message.includes('bucket not found')) {
        return {
          accessible: false,
          error: 'Storage bucket "resume-files" not found. Please create it in your Supabase dashboard.'
        };
      }
      return {
        accessible: false,
        error: error.message
      };
    }
    
    return { accessible: true };
  } catch (error) {
    return {
      accessible: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get Supabase configuration status
export const getSupabaseStatus = (): {
  configured: boolean;
  url: string;
  hasAnonKey: boolean;
} => {
  return {
    configured: isSupabaseConfigured(),
    url: import.meta.env.VITE_SUPABASE_URL || 'Not configured',
    hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
  };
};
