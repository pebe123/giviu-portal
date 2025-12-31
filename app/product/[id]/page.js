import { createClient } from '@supabase/supabase-js';
import ProductView from '../../components/ProductView';

// TURBO MODE:
// 1. Cache'uj stronę przez 3600 sekund (1 godzinę). 
// Klient dostaje gotowca z pamięci RAM serwera.
export const revalidate = 3600; 

// Pozwala generować nowe strony dla produktów dodanych PO zbudowaniu aplikacji
export const dynamicParams = true; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Ta funkcja uruchamia się PODCZAS BUDOWANIA (Deploy)
// Pobiera wszystkie ID produktów i tworzy dla nich gotowe pliki HTML
export async function generateStaticParams() {
  const { data: products } = await supabase.from('products').select('id');
  
  if (!products) return [];

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <h1 className="text-2xl font-bold text-gray-400">Produkt nie istnieje</h1>
      </div>
    );
  }

  return <ProductView product={product} />;
}
