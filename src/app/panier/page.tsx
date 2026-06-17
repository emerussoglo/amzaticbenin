"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calcul du prix total global basé sur le prix actuel
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Si le panier est vide, on affiche un message propre avec un bouton de retour
  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <i className="fas fa-shopping-bag empty-icon"></i>
        <h2>Votre panier est vide</h2>
        <p>Il semblerait que vous n'avez pas encore ajouté de produits.</p>
        <Link href="/" className="btn-back-home">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="page-title">Mon Panier ({cart.length})</h1>
      
      <div className="cart-content-wrapper">
        
        {/* Colonne de Gauche : Liste des produits ajoutés */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              
              {/* Image confinée dans son cadre */}
              <div className="cart-item-img-wrapper">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-img" 
                />
              </div>
              
              {/* Détails textuels du produit */}
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">
                  Prix unitaire : {item.price.toLocaleString()} FCFA
                </p>
              </div>

              {/* Sélecteur de quantité numérique */}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  type="button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </div>

              {/* Sous-total et bouton de suppression */}
              <div className="cart-item-actions">
                <p className="cart-item-subtotal">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="btn-remove-item" 
                  title="Supprimer l'article"
                  type="button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Colonne de Droite : Résumé financier fixe */}
        <div className="cart-summary-card">
          <h3>Résumé de la commande</h3>
          
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
          
          <div className="summary-row">
            <span>Livraison</span>
            <span className="free-shipping">Gratuite</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
          
          <button 
            className="btn-checkout" 
            onClick={() => alert("Validation de la commande...")}
            type="button"
          >
            Commander
          </button>
        </div>

      </div>
    </div>
  );
}