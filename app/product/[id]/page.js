"use client";
import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function ProductPage({ params }) {
  // Dane produktu dokładnie jak na Twoim obrazku
  const product = {
    brand: "Tee Jays",
    name: "Classic Cotton Tee",
    code: "38011250",
    price: "45-65 PLN",
    description: "Męski t-shirt z krótkim rękawem wykonany z bawełny o gramaturze 160 g/m2 jest idealny na każdą okazję i stanowi wygodny dodatek do każdej garderoby. Bawełna typu ringspun zapewnia mocniejszą i gładszą przędzę, dzięki czemu powstaje bardziej wytrzymały materiał, który gwarantuje wysoką jakość brandingu.",
    colors: [
      { name: "White", hex: "#FFFFFF", border: "border-gray-200" },
      { name: "Black", hex: "#000000", border: "border-gray-800" },
      { name: "Navy", hex: "#1D2D44", border: "border-blue-900" },
      { name: "Red", hex: "#DC2626", border: "border-red-600" },
      { name: "Grey", hex: "#6B7280", border: "border-gray-500" },
      { name: "Forest Green", hex: "#15803D", border: "border-green-700" },
    ]
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  // Placeholder dla obrazka (zastąpimy potem prawdziwymi zdjęciami z Supabase)
  const placeholderImg = "/api/placeholder/600/600"; 

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-4 md:p-12 font-sans text-[#333]">
      
      {/* Kontener główny */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEWA KOLUMNA: Galeria (Thumbnails + Main Image) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
          
          {/* Miniaturki (Pionowo po lewej) */}
          <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-20 h-20 bg-[#FDFBF7] rounded-2xl p-2 cursor-pointer border border-transparent hover:border-gray-200 transition-all flex items-center justify-center">
                 {/* Tutaj będą małe zdjęcia */}
                 <div className="w-12 h-12 bg-green-100 rounded-lg opacity-50"></div>
              </div>
            ))}
          </div>

          {/* Główne Zdjęcie (Duży biały box) */}
          <div className="flex-1 bg-white rounded-[40px] p-12 relative shadow-sm min-h-[500px] flex items-center justify-center order-1 md:order-2">
            {/* Badge marki w rogu */}
            <span className="absolute top-8 left-8 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-gray-100">
              {product.brand}
            </span>
            
            {/* Obrazek produktu */}
            <div className="w-full h-full flex items-center justify-center">
                {/* Symulacja koszulki (zielony prostokąt, dopóki nie wgramy zdjęć) */}
                <div className="w-64 h-80 bg-green-400 rounded-lg shadow-xl relative overflow-hidden">
                    <div className="absolute top-1/3 w-full h-8 bg-green-200 opacity-50"></div>
                </div>
            </div>

            {/* Przycisk Plus (Interakcja) */}
            <button className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <Plus size={24} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* PRAWA KOLUMNA: Informacje */}
        <div className="lg:col-span-5 flex flex-col justify-center py-4 pl-0 lg:pl-8">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 tracking-tight">
            {product.name}
          </h1>

          <div className="bg-[#EBEBEB] px-4 py-1.5 rounded-md w-fit text-sm font-semibold text-gray-600 mb-8">
            {product.code}
          </div>

          <p className="text-gray-500 leading-relaxed mb-10 text-base">
            {product.description}
          </p>

          {/* Wybór kolorów */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              DOSTĘPNE KOLORY
            </h3>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${
                    selectedColor.name === color.name 
                      ? 'border-blue-600 scale-110 shadow-md' 
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {/* Pokaż "fajkę" na białym kolorze, żeby było widać, że wybrany */}
                  {selectedColor.name === color.name && color.name === 'White' && (
                    <Check size={16} className="text-black" />
                  )}
                  {selectedColor.name === color.name && color.name !== 'White' && (
                    <Check size={16} className="text-white" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Wybrany kolor: <span className="font-semibold text-gray-700">{selectedColor.name}</span>
            </p>
          </div>

          {/* Cena */}
          <div className="text-4xl font-black text-[#3B5896]">
            {product.price}
          </div>

        </div>
      </div>
    </div>
  );
}
