// Supabase configuration for file storage and database
// Lazy import to avoid pulling in heavy dependencies on initial load
let supabaseClient: any = null;

// Your Supabase configuration
// Get these values from your Supabase project console
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase configuration missing:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.error('Please check your .env file or environment variables');
}

// Create Supabase client lazily
export const supabase = async () => {
  if (!supabaseClient) {
    try {
      // Validate configuration before creating client
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration incomplete. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
      }
      
      console.log('🔧 Creating Supabase client with URL:', supabaseUrl);
      const { createClient } = await import('@supabase/supabase-js');
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        },
        storage: {
          // Enable debug logging for storage operations
          debug: true
        }
      });
      
      console.log('✅ Supabase client created successfully');
    } catch (error) {
      console.error('❌ Failed to create Supabase client:', error);
      throw new Error(`Supabase client creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  return supabaseClient;
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  const configured = !!(supabaseUrl && supabaseAnonKey);
  console.log('🔍 Supabase configuration check:', {
    url: !!supabaseUrl,
    anonKey: !!supabaseAnonKey,
    configured
  });
  return configured;
};

// Get Supabase configuration status
export const getSupabaseStatus = (): {
  configured: boolean;
  url: string;
  hasAnonKey: boolean;
  urlPreview: string;
  keyPreview: string;
} => {
  return {
    configured: isSupabaseConfigured(),
    url: supabaseUrl || 'Not configured',
    hasAnonKey: !!supabaseAnonKey,
    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'Not set',
    keyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Not set'
  };
};

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  error?: string;
  details?: any;
}> => {
  try {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        error: 'Supabase not configured'
      };
    }
    
    const client = await supabase();
    
    // Test basic connection by getting user (this should work even without auth)
    const { data, error } = await client.auth.getUser();
    
    if (error && !error.message.includes('JWT')) {
      return {
        success: false,
        error: `Connection test failed: ${error.message}`
      };
    }
    
    return {
      success: true,
      details: {
        user: data.user,
        hasAuthError: !!error
      }
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
