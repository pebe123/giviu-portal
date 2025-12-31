"use client";
import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function ProductView({ product }) {
  // Stan dla aktywnego zdjęcia (to duże)
  const [activeImage, setActiveImage] = useState(product.image_url);
  
  // Demo kolory (tylko wizualnie, bo w bazie ich jeszcze nie mamy)
  const demoColors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1D2D44" },
    { name: "Red", hex: "#DC2626" },
  ];
  const [selectedColor, setSelectedColor] = useState(demoColors[0]);

  // Łączymy główne zdjęcie z galerią w jedną listę
  const allImages = product.gallery 
    ? [product.image_url, ...product.gallery] 
    : [product.image_url];

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-4 md:p-12 font-sans text-[#333]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEWA STRONA - GALERIA I ZDJĘCIE */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
          
          {/* Pasek Miniaturek */}
          <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-visible">
            {allImages.map((imgUrl, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setActiveImage(imgUrl)} // Zmiana po najechaniu (szybciej!)
                onClick={() => setActiveImage(imgUrl)}      // Zmiana po kliknięciu (dla dotykowych)
                className={`w-20 h-20 bg-white rounded-2xl p-1 cursor-pointer transition-all flex items-center justify-center border-2 ${activeImage === imgUrl ? 'border-blue-500' : 'border-transparent hover:border-gray-200'}`}
              >
                 <img 
                   src={imgUrl} 
                   alt="miniatura" 
                   className="w-full h-full object-contain rounded-xl" 
                 />
              </div>
            ))}
          </div>

          {/* Główne Zdjęcie */}
          <div className="flex-1 bg-white rounded-[40px] p-8 relative shadow-sm min-h-[500px] flex items-center justify-center order-1 md:order-2">
            {/* Marka */}
            <span className="absolute top-8 left-8 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-gray-100 uppercase tracking-widest">
              {product.brand}
            </span>
            
            {/* Obraz - Dodane loading="eager" dla prędkości */}
            <img 
              src={activeImage} 
              alt={product.name} 
              loading="eager" 
              className="max-w-full max-h-[400px] object-contain drop-shadow-xl transition-all duration-300"
            />

            {/* Przycisk Plus */}
            <button className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              <Plus size={24} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* PRAWA STRONA - DANE */}
        <div className="lg:col-span-5 flex flex-col justify-center py-4 pl-0 lg:pl-8">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 tracking-tight">
            {product.name}
          </h1>

          <p className="text-gray-500 leading-relaxed mb-10 text-base">
            {product.description}
          </p>

          {/* Kolory */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              DOSTĘPNE KOLORY
            </h3>
            <div className="flex gap-3 flex-wrap">
              {demoColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-xl border-2 transition-all flex items-center justify-center ${selectedColor.name === color.name ? 'border-blue-600 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor.name === color.name && (
                    <Check size={16} className={color.name === 'White' ? "text-black" : "text-white"} />
                  )}
                </button>
              ))}
            </div>
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
