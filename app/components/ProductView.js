"use client";
import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export default function ProductView({ product }) {
  // Tutaj tylko logika wyglądu (galeria, kolory)
  const [activeImage, setActiveImage] = useState(product.image_url);
  
  const demoColors = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1D2D44" },
    { name: "Red", hex: "#DC2626" },
  ];
  const [selectedColor, setSelectedColor] = useState(demoColors[0]);

  const allImages = product.gallery 
    ? [product.image_url, ...product.gallery] 
    : [product.image_url];

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-4 md:p-12 font-sans text-[#333]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEWA STRONA */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
          <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-visible">
            {allImages.map((imgUrl, index) => (
              <div 
                key={index} 
                onMouseEnter={() => setActiveImage(imgUrl)} // Zmiana po najechaniu (szybciej!)
                onClick={() => setActiveImage(imgUrl)}
                className={`w-20 h-20 bg-white rounded-2xl p-1 cursor-pointer transition-all flex items-center justify-center border-2 ${activeImage === imgUrl ? 'border-blue-500' : 'border-transparent hover:border-gray-200'}`}
              >
                 <img src={imgUrl} alt="miniatura" className="w-full h-full object-contain rounded-xl" />
              </div>
            ))}
          </div>
          <div className="flex-1 bg-white rounded-[40px] p-8 relative shadow-sm min-h-[500px] flex items-center justify-center order-1 md:order-2">
            <span className="absolute top-8 left-8 bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-gray-100 uppercase tracking-widest">{product.brand}</span>
            <img src={activeImage} alt={product.name} className="max-w-full max-h-[400px] object-contain drop-shadow-xl transition-all duration-300"/>
          </div>
        </div>

        {/* PRAWA STRONA */}
        <div className="lg:col-span-5 flex flex-col justify-center py-4 pl-0 lg:pl-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4 tracking-tight">{product.name}</h1>
          <p className="text-gray-500 leading-relaxed mb-10 text-base">{product.description}</p>
          <div className="text-4xl font-black text-[#3B5896]">{product.price}</div>
        </div>
      </div>
    </div>
  );
}
