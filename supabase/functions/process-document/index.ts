import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { documentId, fileName, fileType } = await req.json();

    console.log('Processing document:', documentId, fileName, fileType);

    // Simulate file analysis - in production, you would:
    // 1. Download the file from storage
    // 2. Parse it based on type (PDF, Excel, Word)
    // 3. Extract business metrics using AI or parsing libraries
    
    // For now, generate sample metrics based on random variations
    const baseRevenue = 2400000 + Math.random() * 1000000;
    const baseUsers = 8000 + Math.floor(Math.random() * 2000);
    const baseSales = 20 + Math.random() * 15;
    const baseHealth = 95 + Math.random() * 5;

    const metrics = {
      total_revenue: Math.round(baseRevenue * 100) / 100,
      revenue_change: Math.round((Math.random() * 20 - 5) * 10) / 10,
      active_users: baseUsers,
      users_change: Math.round((Math.random() * 15 - 3) * 10) / 10,
      sales_growth: Math.round(baseSales * 10) / 10,
      sales_change: Math.round((Math.random() * 10 - 2) * 10) / 10,
      system_health: Math.round(baseHealth * 10) / 10,
      health_change: Math.round((Math.random() * 2 - 0.5) * 10) / 10,
      extracted_data: {
        fileName,
        fileType,
        processedAt: new Date().toISOString(),
        monthlyData: generateMonthlyData(),
        departmentData: generateDepartmentData(),
        productData: generateProductData()
      }
    };

    // Insert metrics into database
    const { data, error } = await supabase
      .from('business_metrics')
      .insert({
        document_id: documentId,
        user_id: user.id,
        ...metrics
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting metrics:', error);
      throw error;
    }

    // Update document status
    await supabase
      .from('uploaded_documents')
      .update({ analysis_status: 'completed' })
      .eq('id', documentId);

    console.log('Document processed successfully:', data);

    return new Response(
      JSON.stringify({ success: true, metrics: data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function generateMonthlyData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map(month => ({
    name: month,
    revenue: Math.round(300000 + Math.random() * 200000),
    expenses: Math.round(150000 + Math.random() * 100000)
  }));
}

function generateDepartmentData() {
  const departments = ['Sales', 'Marketing', 'Engineering', 'Support'];
  return departments.map(dept => ({
    name: dept,
    value: Math.round(60 + Math.random() * 40)
  }));
}

function generateProductData() {
  const products = ['Product A', 'Product B', 'Product C', 'Product D'];
  return products.map(product => ({
    name: product,
    value: Math.round(15 + Math.random() * 20)
  }));
}