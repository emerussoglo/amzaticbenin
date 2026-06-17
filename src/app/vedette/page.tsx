"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Sélection des meilleurs produits informatiques (les vedettes de ta liste)
const FEATURED_PRODUCTS = [
  { id: 1, name: "PC Portable HP 15s (Intel i5, 16GB RAM, 512GB SSD)", price: 450000, oldPrice: 490000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60", tag: "Coup de cœur" },
  { id: 3, name: "PC Gaming ASUS TUF (RTX 4060, i7)", price: 850000, oldPrice: 950000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60", tag: "Top Vente" },
  { id: 6, name: "iPad Air 5 (M1, Wi-Fi, 64GB)", price: 420000, oldPrice: 460000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60", tag: "Populaire" },
  { id: 8, name: "iPhone 15 Pro Max (256GB)", price: 850000, oldPrice: 950000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1695048133230-070845371b21?w=500&auto=format&fit=crop&q=60", tag: "Premium" },
  { id: 10, name: "Casque Bluetooth Sony WH-1000XM5", price: 210000, oldPrice: 245000, category: "Casques & Audio", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60", tag: "Meilleure Note" },
  { id: 13, name: "Imprimante ÉcoTank Epson L3250", price: 155000, oldPrice: 180000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60", tag: "Offre Spéciale" }
];

export default function FeaturedPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (product: typeof FEATURED_PRODUCTS[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <div className="home-page-container">
      {/* En-tête stylisé pour la section Vedette */}
      <div className="featured-hero">
        <span className="featured-subtitle">Exclusivités ESPANA DEAL</span>
        <h1>Les Meilleurs Produits du Moment</h1>
        <p>Découvrez notre sélection exclusive de matériel informatique plébiscité par nos clients au Bénin pour sa puissance, sa qualité et sa fiabilité.</p>
      </div>

      {/* Grille de produits avec badges et prix mis à jour */}
      <div className="products-grid">
        {FEATURED_PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            
            <div className="product-image-wrapper">
              {/* Badge Vedette dynamique sur l'image */}
              <span className="featured-badge">{product.tag}</span>
              
              <img 
                src={product.image} 
                alt={product.name}
                className="product-img"
                loading="lazy"
              />
            </div>

            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              
              {/* Conteneur de prix alignés à gauche */}
              <div className="product-price-container">
                <span className="product-price">{product.price.toLocaleString()} FCFA</span>
                {product.oldPrice && (
                  <span className="product-old-price">{product.oldPrice.toLocaleString()} FCFA</span>
                )}
              </div>
              
              <div className="product-card-actions">
                <button 
                  onClick={() => addToCart(product)} 
                  className="btn-add-cart"
                  title="Ajouter au panier"
                  type="button"
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
                <button 
                  onClick={() => handleBuyNow(product)} 
                  className="btn-buy-now"
                  type="button"
                >
                  Commander
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}