"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense } from "react";

// 1. CATALOGUE INFORMATIQUE AVEC PRIX ET PRIX BARRÉS (oldPrice)
const PRODUCTS_DATA = [
  // PC & Moniteurs
  { id: 1, name: "PC Portable HP 15s (Intel i5, 16GB RAM, 512GB SSD)", price: 450000, oldPrice: 490000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "MacBook Air M2 (8GB RAM, 256GB SSD)", price: 750000, oldPrice: 820000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "PC Gaming ASUS TUF (RTX 4060, i7)", price: 850000, oldPrice: 950000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Moniteur Gaming MSI 27\" Incurvé 165Hz", price: 145000, oldPrice: 175000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Écran Bureautique Dell 24\" UltraSharp", price: 110000, oldPrice: 130000, category: "PC & Moniteurs", image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format&fit=crop&q=60" },

  // Tablettes & Téléphones
  { id: 6, name: "iPad Air 5 (M1, Wi-Fi, 64GB)", price: 420000, oldPrice: 460000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60" },
  { id: 7, name: "Tablette Samsung Galaxy Tab S9 FE", price: 330000, oldPrice: 370000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60" },
  { id: 8, name: "iPhone 15 Pro Max (256GB)", price: 850000, oldPrice: 950000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1695048133230-070845371b21?w=500&auto=format&fit=crop&q=60" },
  { id: 9, name: "Samsung Galaxy S24 Ultra", price: 790000, oldPrice: 880000, category: "Tablettes & Téléphones", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60" },

  // Casques & Audio
  { id: 10, name: "Casque Bluetooth Sony WH-1000XM5", price: 210000, oldPrice: 245000, category: "Casques & Audio", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60" },
  { id: 11, name: "Casque Gaming Razer BlackShark V2", price: 65000, oldPrice: 80000, category: "Casques & Audio", image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&auto=format&fit=crop&q=60" },
  { id: 12, name: "Écouteurs AirPods Pro 2", price: 160000, oldPrice: 190000, category: "Casques & Audio", image: "https://images.unsplash.com/photo-1588449668338-d151688d3482?w=500&auto=format&fit=crop&q=60" },

  // Imprimantes & Accessoires
  { id: 13, name: "Imprimante ÉcoTank Epson L3250", price: 155000, oldPrice: 180000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60" },
  { id: 14, name: "Imprimante Laser HP Neverstop", price: 175000, oldPrice: 200000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60" },
  { id: 15, name: "Souris Logitech MX Master 3S", price: 65000, oldPrice: 75000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60" },
  { id: 16, name: "Clavier Mécanique Corsair K70 RGB", price: 95000, oldPrice: 115000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
  { id: 17, name: "Disque Dur Externe WD My Passport 2To", price: 55000, oldPrice: 65000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=500&auto=format&fit=crop&q=60" },
  { id: 18, name: "Hub USB-C 8-en-1 Anker", price: 30000, oldPrice: 40000, category: "Imprimantes & Accessoires", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=60" }
];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

  const categoryMapping: { [key: string]: string } = {
    ordinateurs: "PC & Moniteurs",
    tablettes: "Tablettes & Téléphones",
    audio: "Casques & Audio",
    peripheriques: "Imprimantes & Accessoires"
  };
  const targetCategory = categoryMapping[categoryQuery] || "";

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    
    const cleanProductCat = product.category.replace(/\s+/g, '').toLowerCase();
    const cleanTargetCat = targetCategory.replace(/\s+/g, '').toLowerCase();
    
    const matchesCategory = targetCategory ? cleanProductCat === cleanTargetCat : true;
    
    return matchesSearch && matchesCategory;
  });
 
  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <main>
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
            
          <div className="features-section">
            <div className="features-container">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping"> 
                  <i className="fas fa-tools"></i>
                </div>
                <h3>SERVICE APRÈS VENTE ASSURÉ</h3>
                <p>Une assistance technique dédiée pour suivre vos équipements</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper icon-security">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Paiement Sécurisé</h3>
                <p>Transactions 100% sécurisées et cryptées</p>
              </div>

              <div className="feature-card"> 
                <div className="feature-icon-wrapper icon-support">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Support 24/7</h3>
                <p>Assistance commerciale disponible à tout moment</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-user-check"></i>
                </div>
                <h3>Investissement Garanti</h3>
                <p>Choisir nos articles informatiques, c'est sécuriser son achat</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <span className="featured-subtitle">AMZATIC BÉNIN</span>
          <h1>
            {searchQuery || categoryQuery 
              ? `Résultats de votre recherche (${filteredProducts.length})` 
              : "Nos produits phares "}
          </h1>
          
          {(searchQuery || categoryQuery) && (
            <button 
              onClick={() => router.push("/")}
              style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
            >
              Voir tout le catalogue Tech
            </button>
          )}
        </div>
      

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
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
                  
                  {/* ZONE DES PRIX MISE À JOUR */}
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
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#636366" }}>
            <i className="fas fa-search" style={{ fontSize: "30px", marginBottom: "15px", display: "block" }}></i>
            Aucun produit informatique trouvé pour ces critères.
          </div>
        )}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement du catalogue...</div>}>
      <HomePageContent />
    </Suspense>
  );
}