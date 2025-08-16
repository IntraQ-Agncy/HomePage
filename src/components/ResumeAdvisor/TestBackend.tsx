import React, { useState } from 'react';
import { supabase } from '../../config/supabase';
import { checkStorageAccess, getSupabaseStatus } from '../../api/supabaseStorageService';

const TestBackend: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSupabaseConnection = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      addResult('🔍 Testing Supabase connection...');
      
      // Test 1: Check configuration
      const configStatus = getSupabaseStatus();
      addResult(`📋 Configuration Status: ${JSON.stringify(configStatus, null, 2)}`);
      
      // Test 2: Test Supabase client creation
      addResult('🔧 Testing Supabase client creation...');
      const supabaseClient = await supabase();
      addResult('✅ Supabase client created successfully');
      
      // Test 3: Test basic connection
      addResult('🌐 Testing basic connection...');
      const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
      if (authError) {
        addResult(`⚠️ Auth check error (this might be normal): ${authError.message}`);
      } else {
        addResult(`👤 User status: ${user ? 'Authenticated' : 'Not authenticated'}`);
      }
      
      // Test 4: Test storage bucket access
      addResult('📦 Testing storage bucket access...');
      const storageAccess = await checkStorageAccess();
      addResult(`📦 Storage access result: ${JSON.stringify(storageAccess, null, 2)}`);
      
      // Test 5: Try to list files from bucket
      addResult('📁 Testing file listing...');
      const { data: listData, error: listError } = await supabaseClient.storage
        .from('resume-files')
        .list('', { limit: 5 });
      
      if (listError) {
        addResult(`❌ File listing failed: ${listError.message}`);
        addResult(`❌ Error code: ${listError.code || 'No code'}`);
        addResult(`❌ Error details: ${JSON.stringify(listError, null, 2)}`);
      } else {
        addResult(`✅ File listing successful: ${listData?.length || 0} files found`);
        if (listData && listData.length > 0) {
          addResult(`📄 Files: ${listData.map(f => f.name).join(', ')}`);
        }
      }
      
      // Test 6: Try to upload a small test file
      addResult('📤 Testing file upload...');
      const testFile = new File(['Test content'], 'test.txt', { type: 'text/plain' });
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from('resume-files')
        .upload(`test-${Date.now()}.txt`, testFile);
      
      if (uploadError) {
        addResult(`❌ File upload failed: ${uploadError.message}`);
        addResult(`❌ Upload error code: ${uploadError.code || 'No code'}`);
        addResult(`❌ Upload error details: ${JSON.stringify(uploadError, null, 2)}`);
      } else {
        addResult(`✅ File upload successful: ${uploadData?.path}`);
        
        // Clean up test file
        const { error: deleteError } = await supabaseClient.storage
          .from('resume-files')
          .remove([uploadData.path]);
        
        if (deleteError) {
          addResult(`⚠️ Test file cleanup failed: ${deleteError.message}`);
        } else {
          addResult('🧹 Test file cleaned up successfully');
        }
      }
      
      // Test 7: Check bucket policies
      addResult('🔒 Checking bucket policies...');
      try {
        const { data: policies, error: policiesError } = await supabaseClient
          .from('storage.policies')
          .select('*')
          .eq('bucket_id', 'resume-files');
        
        if (policiesError) {
          addResult(`⚠️ Could not check policies directly: ${policiesError.message}`);
        } else {
          addResult(`🔒 Found ${policies?.length || 0} policies for resume-files bucket`);
        }
      } catch (policyError) {
        addResult(`⚠️ Policy check failed: ${policyError}`);
      }
      
    } catch (error) {
      addResult(`💥 Test failed with error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Supabase Backend Test
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Test your Supabase connection and storage access
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={testSupabaseConnection}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Run Tests'}
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Clear Results
            </button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Test Results:</h3>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Troubleshooting Steps</h3>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>1. Check Supabase Dashboard:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Go to Storage → resume-files bucket</li>
                <li>• Verify bucket exists and is public</li>
                <li>• Check Policies tab for RLS policies</li>
              </ul>
            </div>
            <div>
              <strong>2. Verify Environment Variables:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• VITE_SUPABASE_URL should be set</li>
                <li>• VITE_SUPABASE_ANON_KEY should be set</li>
                <li>• Check browser console for any errors</li>
              </ul>
            </div>
            <div>
              <strong>3. Common Issues:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Bucket doesn't exist</li>
                <li>• RLS policies are too restrictive</li>
                <li>• Bucket is not public</li>
                <li>• CORS issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBackend;
