"use client";
import React, { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';

export default function ProductPage() {
  // TO JEST TA BRAKUJĄCA CZĘŚĆ, KTÓREJ SZUKA VERCEL:
  const product = {
    brand: "Tee Jays",
    name: "Classic Cotton Tee",
    code: "38011250",
    description: "Męski t-shirt z krótkim rękawem wykonany z bawełny o gramaturze 160 g/m2 jest idealny na każdą okazję i stanowi wygodny dodatek do każdej garderoby. Bawełna typu ringspun zapewnia mocniejszą i gładszą przędzę, dzięki czemu powstaje bardziej wytrzymały materiał, który gwarantuje wysoką jakość brandingu.",
    priceRange: "45-65 PLN",
    colors: [
      { name: "Bialy", hex: "#FFFFFF" },
      { name: "Czarny", hex: "#000000" },
      { name: "Granatowy", hex: "#1D2D44" },
      { name: "Czerwony", hex: "#C8102E" },
      { name: "Szary", hex: "#7D7D7D" },
      { name: "Zielony", hex: "#006400" },
    ]
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const mainImage = `/api/placeholder/400/400`; // Tymczasowy obrazek

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-8 font-sans text-[#333]">
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <span>Strona główna</span> <ChevronRight size={14} />
        <span>Odzież</span> <ChevronRight size={14} />
        <span className="font-semibold text-blue-600">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex gap-4">
          <div className="flex-1 bg-white rounded-[40px] shadow-sm p-12 relative flex flex-col items-center justify-center min-h-[500px]">
             <span className="absolute top-8 left-8 bg-gray-50 px-4 py-1 rounded-full text-xs font-bold border border-gray-100 uppercase tracking-widest text-gray-400">
               {product.brand}
             </span>
             <img src={mainImage} alt={product.name} className="w-64 h-64 object-contain mb-8" />
             <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                <div className="bg-white border-2 border-black rounded-3xl p-4 w-1/2 flex flex-col items-center shadow-lg">
                  <span className="text-[10px] font-bold self-start mb-2">Product Gallery</span>
                  <img src="/api/placeholder/100/100" alt="gallery" className="w-20" />
                </div>
                <div className="bg-[#F3F4F6] rounded-3xl p-6 w-1/2 flex flex-col justify-center relative">
                  <h4 className="font-bold text-sm leading-tight">{product.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{product.brand}</p>
                  <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl">
                    <Plus size={20} />
                  </button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col justify-center max-w-md text-left items-start">
          <h1 className="text-5xl font-extrabold text-[#2D2D2D] mb-4">{product.name}</h1>
          <div className="bg-[#EBEDF0] px-4 py-1 rounded-lg w-fit text-sm font-bold text-gray-600 mb-8">
            {product.code}
          </div>
          <p className="text-gray-600 leading-relaxed mb-10 text-sm text-left">
            {product.description}
          </p>
          <div className="mb-8 text-left items-start flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Dostępne kolory</h3>
            <div className="flex gap-3 mb-4">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${selectedColor.name === color.name ? 'border-blue-500 scale-110' : 'border-transparent shadow-sm'}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Wybrany kolor: <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold ml-1 border border-blue-100">{selectedColor.name}</span>
            </p>
          </div>
          <div className="text-4xl font-black text-blue-700">
            {product.priceRange}
          </div>
        </div>
      </div>
    </div>
  );
}
