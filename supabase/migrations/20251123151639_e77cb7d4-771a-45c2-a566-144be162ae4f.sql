-- Ajouter une colonne approved à la table profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- Ajouter une colonne approved_at pour tracer la date d'approbation
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Ajouter une colonne approved_by pour tracer qui a approuvé
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES public.profiles(id);

-- Mettre à jour les profils existants pour les marquer comme approuvés
UPDATE public.profiles SET approved = true, approved_at = NOW() WHERE approved IS NULL OR approved = false;

-- Ajouter des commentaires
COMMENT ON COLUMN public.profiles.approved IS 'Indique si le compte a ete approuve par un administrateur';
COMMENT ON COLUMN public.profiles.approved_at IS 'Date et heure approbation du compte';
COMMENT ON COLUMN public.profiles.approved_by IS 'ID de administrateur qui a approuve le compte';
