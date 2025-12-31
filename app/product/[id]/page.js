"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Plus, Check } from 'lucide-react';

// 1. Konfiguracja połączenia (Most do Supabase)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Te kolory zostawiamy na razie "na sztywno" dla ozdoby, bo nie mamy ich w bazie
  const demoColors = [
    { name: "White", hex: "#FFFFFF", border: "border-gray-200" },
    { name: "Black", hex: "#000000", border: "border-gray-800" },
    { name: "Navy", hex: "#1D2D44", border: "border-blue-900" },
    { name: "Red", hex: "#DC2626", border: "border-red-600" },
  ];
  const [selectedColor, setSelectedColor] = useState(demoColors[0]);

  // 2. Pobieranie danych
  useEffect(() => {
    async function fetchProduct() {
      // Pobieramy produkt po ID z adresu URL
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Błąd:', error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [params.id]);

  // 3. Ekran ładowania (kręciołek)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-2xl font-bold text-gray-400 animate-pulse">
          Pobieranie danych z bazy...
        </div>
      </div>
    );
  }

  // 4. Jeśli wpiszesz złe ID
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
        <div className="text-xl text-red-500">Nie znaleziono produktu ID: {params.id}</div>
      </div>
    );
  }

  // 5. WYŚWIETLANIE (Twój design + Dane z bazy)
  return (
    <div className="min-h-screen bg-[#F9F7F2] p-4 md:p-12 font-sans text-[#333]">
      
      {/* Kontener główny */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEWA KOLUMNA: Galeria */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
          <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-20 h-20 bg-[#FDFBF7] rounded-2xl p-2 cursor-pointer hover:border-gray-200 border border-transparent transition-all flex items-center justify-center">
                 <div className="w-12 h-12 bg-gray-200 rounded-lg opacity-50"></div>
              </div>
            ))}
          </div>

          <div className="flex-1 bg-white rounded-[40px] p-12 relative shadow-sm min-h-[500px] flex items-center justify-center order-1 md:order-2">
            {/* Marka z Bazy Danych */}
            <span className="absolute top-8 left-8 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-gray-100 uppercase tracking-widest">
              {product.brand}
            </span>
            
            {/* Placeholder na zdjęcie */}
            <div className="w-64 h-80 bg-gray-100 rounded-lg shadow-xl relative flex items-center justify-center text-gray-400">
                [ZDJĘCIE]
            </div>

            <button className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <Plus size={24} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* PRAWA KOLUMNA: Informacje z Bazy */}
        <div className="lg:col-span-5 flex flex-col justify-center py-4 pl-0 lg:pl-8">
          
          {/* Nazwa z Bazy */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 tracking-tight">
            {product.name}
          </h1>

          <div className="bg-[#EBEBEB] px-4 py-1.5 rounded-md w-fit text-sm font-semibold text-gray-600 mb-8">
            ID: {product.id}
          </div>

          {/* Opis z Bazy */}
          <p className="text-gray-500 leading-relaxed mb-10 text-base">
            {product.description}
          </p>

          {/* Kolory (Na razie demo, bo nie ma w bazie) */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              DOSTĘPNE KOLORY
            </h3>
            <div className="flex gap-3 flex-wrap">
              {demoColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                    selectedColor.name === color.name 
                      ? 'border-blue-600 scale-110 shadow-md' 
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor.name === color.name && (
                    <Check size={16} className={color.name === 'White' ? "text-black" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cena z Bazy */}
          <div className="text-4xl font-black text-[#3B5896]">
            {product.price}
          </div>

        </div>
      </div>
    </div>
  );
}
