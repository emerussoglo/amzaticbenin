"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Ordinateurs de Performance : PC Portables, Fixes & Moniteurs",
    subtitle: "Productivité & Puissance",
    description: "Équipez votre bureau ou votre setup de gaming avec le meilleur de l'informatique. Des PC configurés pour durer, avec SERVICE APRÈS-VENTE ASSURÉ.",
    image: "/img/img1.jpeg", // Image setup PC Bureau
    btnText: "Voir les Ordinateurs",
    link: "/?cat=ordinateurs"
  },
  { 
    id: 2,
    title: "Tablettes & Téléphones Pro : Restez connecté partout",
    subtitle: "Mobilité & Innovation",
    description: "Boostez votre quotidien professionnel et personnel avec nos iPads, tablettes Android et smartphones de dernière génération.",
    image: "/img/img2.jpeg", // Image Tablette / iPad
    btnText: "Découvrir la Sélection",
    link: "/?cat=tablettes"
  },
  {
    id: 3,
    title: "Imprimantes & Périphériques : Solutions complètes pour Bureau",
    subtitle: "Équipements Pro",
    description: "Optimisez vos flux de travail avec nos imprimantes multifonctions laser ou jet d'encre et nos accessoires informatiques durables.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000&auto=format&fit=crop&q=80", // Image Imprimante / Espace Travail
    btnText: "Découvrir les Accessoires",
    link: "/?cat=peripheriques"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gestion du défilement automatique toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section-container">
      
      {/* COMPOSANT DE GAUCHE : LE SLIDER DYNAMIQUE */}
      <div className="hero-slider-left">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            {/* Image de fond */}
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            
            {/* Voile sombre texturé pour garantir la lisibilité du texte blanc */}
            <div className="slide-overlay"></div>

            {/* Contenu textuel */}
            <div className="slide-content">
              <span className="slide-tag">{slide.subtitle}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-desc">{slide.description}</p>
              <Link href={slide.link} className="btn-hero-action">
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        {/* Boutons indicateurs (Dots) en bas au centre du slider */}
        <div className="slider-dots">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* COMPOSANT DE DROITE : LES DEUX ENCARTS STATIQUES */}
      <div className="hero-banners-right">
  
        {/* Encart Haut - Gaming Setup */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80" 
            alt="PC Gaming Setup" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-red">E-Sport & Gaming</span>
            <h3>PC Gaming & Écrans Incurvés</h3>
            <p>Maximisez vos performances avec du matériel certifié d'origine.</p>
            <Link href="/?cat=ordinateurs" className="btn-banner-small">
              Découvrir
            </Link>
          </div>
        </div>

        {/* Encart Bas - Casques & Audio */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&auto=format&fit=crop&q=80" 
            alt="Casques Informatiques et Audio" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-green">Audio & Bureau</span>
            <h3>Casques & Périphériques Audio</h3>
            <p>Une clarté sonore totale pour vos réunions professionnelles ou vos sessions de jeu.</p>
            <Link href="/?cat=audio" className="btn-banner-small">
              Acheter
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}