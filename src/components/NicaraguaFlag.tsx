import React from 'react';

export const NicaraguaFlag: React.FC<{ className?: string }> = ({ className = "w-7 h-5" }) => {
  return (
    <svg
      viewBox="0 0 600 360"
      className={`${className} rounded shadow-sm inline-block shrink-0 border border-slate-700/50`}
      aria-label="Bandera de Nicaragua"
    >
      {/* Franja Azul Superior */}
      <rect width="600" height="120" fill="#0067c6" />
      {/* Franja Blanca Central */}
      <rect y="120" width="600" height="120" fill="#ffffff" />
      {/* Franja Azul Inferior */}
      <rect y="240" width="600" height="120" fill="#0067c6" />
      
      {/* Escudo Nacional en el Centro */}
      <g transform="translate(300, 180) scale(0.65)">
        {/* Anillo exterior dorado / texto */}
        <circle r="68" fill="none" stroke="#cca01d" strokeWidth="6" />
        <circle r="60" fill="#ffffff" />
        
        {/* Triángulo equilátero nacional */}
        <polygon points="0,-48 -44,32 44,32" fill="#1b854a" stroke="#cca01d" strokeWidth="3" />
        
        {/* Cielo azul y sol */}
        <polygon points="0,-44 -40,30 40,30" fill="#58b4f0" />
        
        {/* Volcanes de Nicaragua */}
        <path d="M -36,30 L -25,5 L -14,30 L -5,12 L 8,30 L 18,2 L 30,30 Z" fill="#2d6a4f" />
        
        {/* Arcoíris */}
        <path d="M -30,22 Q 0,-30 30,22" fill="none" stroke="#f4a261" strokeWidth="3" opacity="0.9" />
        <path d="M -26,23 Q 0,-25 26,23" fill="none" stroke="#e76f51" strokeWidth="2" opacity="0.9" />
        
        {/* Gorro Frigio */}
        <circle cx="0" cy="-6" r="5" fill="#d90429" />
      </g>
    </svg>
  );
};
