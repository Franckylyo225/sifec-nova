-- Ajouter les colonnes SEO à la table articles
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- Ajouter un commentaire pour expliquer les colonnes
COMMENT ON COLUMN public.articles.meta_title IS 'Titre optimisé pour le SEO (max 60 caractères)';
COMMENT ON COLUMN public.articles.meta_description IS 'Description optimisée pour le SEO (max 160 caractères)';
COMMENT ON COLUMN public.articles.meta_keywords IS 'Mots-clés pour le référencement, séparés par des virgules';
