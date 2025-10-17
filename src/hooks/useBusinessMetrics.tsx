import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BusinessMetrics {
  id: string;
  total_revenue: number;
  revenue_change: number;
  active_users: number;
  users_change: number;
  sales_growth: number;
  sales_change: number;
  system_health: number;
  health_change: number;
  extracted_data: any;
  created_at: string;
}

export function useBusinessMetrics() {
  return useQuery({
    queryKey: ['business-metrics'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('business_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as BusinessMetrics | null;
    },
  });
}