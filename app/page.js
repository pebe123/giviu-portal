import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Wyłączamy cache, żeby nowe produkty pojawiały się od razu po odświeżeniu
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  // 1. Pobieramy WSZYSTKIE produkty z bazy (tylko potrzebne pola)
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, brand, price, image_url')
    .order('id', { ascending: false }); // Najnowsze na górze

  if (error) {
    return <div className="p-10 text-red-500">Błąd połączenia z bazą: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans text-[#333]">
      
      {/* NAGŁÓWEK */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-blue-900">GIVIU.</div>
          <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition">
            Zaloguj się
          </button>
        </div>
      </header>

      {/* GŁÓWNA TREŚĆ */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-3 text-[#2D2D2D]">Nasza Kolekcja</h1>
          <p className="text-gray-500">Najlepsze gadżety reklamowe dla Twojej firmy.</p>
        </div>

        {/* SIATKA PRODUKTÓW (GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {products?.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group block" // Grupa do efektów hover
            >
              <div className="bg-white rounded-[30px] p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 h-full flex flex-col">
                
                {/* Zdjęcie */}
                <div className="bg-gray-50 rounded-2xl h-64 mb-6 flex items-center justify-center p-4 relative overflow-hidden">
                  <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {product.brand}
                  </span>
                  
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-gray-300 text-xs">Brak zdjęcia</div>
                  )}
                </div>

                {/* Treść */}
                <div className="mt-auto">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h2>
                  <div className="flex justify-between items-end mt-4 border-t border-gray-50 pt-4">
                    <span className="text-xl font-black text-[#3B5896]">{product.price}</span>
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      </main>
    </div>
  );
}
