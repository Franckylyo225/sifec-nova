-- Modifier le trigger pour que les nouveaux comptes soient non approuves par defaut
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, approved)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    false  -- Les nouveaux comptes ne sont pas approuves par defaut
  );
  RETURN NEW;
END;
$function$;
