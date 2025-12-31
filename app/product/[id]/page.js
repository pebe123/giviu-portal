// Dynamiczne budowanie ścieżki do zdjęcia na podstawie kodu i koloru
// Zakładamy, że zdjęcia nazywają się np. 38011250_Bialy.jpg
const mainImage = `/images/products/${product.code}_${selectedColor.name}.jpg`;

// ... wewnątrz return:
<img 
  src={mainImage} 
  alt={`${product.name} ${selectedColor.name}`} 
  className="w-64 h-64 object-contain mb-8 transition-opacity duration-300"
/>
