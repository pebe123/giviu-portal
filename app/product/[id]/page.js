import { createClient } from '@supabase/supabase-js';
import ProductView from '../../components/ProductView';

// To sprawia, że strona nie jest cache'owana na sztywno, tylko pobiera świeże dane
export const revalidate = 0; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// To jest funkcja asynchroniczna SERWERA. Przeglądarka tego nie widzi.
export default async function ProductPage({ params }) {
  
  // 1. Serwer Vercel pobiera dane (super szybkie łącze w USA)
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  // 2. Jeśli nie ma produktu, zwróć prosty błąd
  if (!product) {
    return <div>Nie znaleziono produktu</div>;
  }

  // 3. Wyślij do przeglądarki gotowy, wypełniony komponent
  return <ProductView product={product} />;
}
