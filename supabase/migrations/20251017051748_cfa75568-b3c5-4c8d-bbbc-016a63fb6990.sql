-- Fix function search path security issue by recreating with CASCADE
DROP TRIGGER IF EXISTS update_uploaded_documents_updated_at ON public.uploaded_documents;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_uploaded_documents_updated_at
  BEFORE UPDATE ON public.uploaded_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();