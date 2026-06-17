"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Sélection des meilleurs produits (les vedettes de ta liste)
const FEATURED_PRODUCTS = [
  { id: 1, name: "iPhone", price: 999, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60", tag: "Coup de cœur" },
  { id: 3, name: "PlayStation 5 (PS5)", price: 499, category: "Appareils électroniques", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop&q=60", tag: "Top Vente" },
  { id: 6, name: "Sneakers Jordan", price: 180, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60", tag: "Populaire" },
  { id: 9, name: "Parfums", price: 85, category: "Beauté et soin", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60", tag: "Tendance" },
  { id: 11, name: "Aspirateurs robots", price: 240, category: "Maison", image: "https://images.unsplash.com/photo-1518133680790-3985ecea5649?w=500&auto=format&fit=crop&q=60", tag: "Meilleure Note" },
  { id: 15, name: "Vélos électriques", price: 1200, category: "Sport / Fitness", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60", tag: "Offre Spéciale" }
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
        <span className="featured-subtitle">Exclusivités Espanadeal</span>
        <h1>Les Meilleurs Produits du Moment</h1>
        <p>Découvrez notre sélection exclusive de produits plébiscités par nos clients pour leur qualité et leur fiabilité.</p>
      </div>

      {/* Grille de produits - même structure mais avec le badge vedette */}
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
              <p className="product-price">{product.price.toLocaleString()} €</p>
              
              <div className="product-card-actions">
                <button 
                  onClick={() => addToCart(product)} 
                  className="btn-add-cart"
                  title="Ajouter au panier"
                  type="button"
                >
                  <i className="fas fa-shopping-basket"></i> +
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