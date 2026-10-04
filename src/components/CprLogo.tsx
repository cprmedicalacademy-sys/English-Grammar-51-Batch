import React from 'react';

interface CprLogoProps {
  className?: string;
  size?: number | string;
}

export const CprLogo: React.FC<CprLogoProps> = ({ className = 'w-12 h-12', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      style={style}
    >
      {/* Outer Border Circle */}
      <circle
        cx="250"
        cy="250"
        r="245"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="2.5"
      />

      {/* STETHOSCOPE - Binaural Tubes & Headset (Royal Blue #0047AB) */}
      <g stroke="#0047AB" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left ear tip */}
        <ellipse cx="90" cy="112" rx="4" ry="7" fill="#0047AB" />
        {/* Right ear tip */}
        <ellipse cx="148" cy="112" rx="4" ry="7" fill="#0047AB" />

        {/* Ear tubes arching down */}
        <path d="M 90 115 C 80 165, 88 215, 118 240" />
        <path d="M 148 115 C 158 165, 150 215, 120 240" />
        {/* Spring connector */}
        <path d="M 93 175 C 119 183, 119 183, 145 175" strokeWidth="3.5" />
        {/* Central stem */}
        <path d="M 119 238 L 119 252" strokeWidth="5" />
      </g>

      {/* STETHOSCOPE TUBING & ECG HEARTBEAT (Vibrant Red #E52427) */}
      <path
        d="M 119 252 L 119 320 Q 119 328, 128 328 L 244 328 L 250 338 L 270 274 L 296 374 L 316 328 L 396 328"
        stroke="#E52427"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* STETHOSCOPE CHEST PIECE / DIAPHRAGM (Royal Blue #0047AB) */}
      <circle cx="414" cy="328" r="19" fill="#0047AB" />

      {/* CPR ACRONYM - Stylized Display Letters */}
      {/* Letter 'C' in Blue */}
      <text
        x="170"
        y="230"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="175"
        fontWeight="bold"
        fontStyle="italic"
        fill="#0047AB"
        letterSpacing="-5"
      >
        C
      </text>

      {/* Letter 'P' in Red */}
      <text
        x="270"
        y="230"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="175"
        fontWeight="bold"
        fontStyle="italic"
        fill="#E52427"
        letterSpacing="-5"
      >
        P
      </text>

      {/* Letter 'R' in Blue */}
      <text
        x="368"
        y="230"
        fontFamily="Times New Roman, Georgia, serif"
        fontSize="175"
        fontWeight="bold"
        fontStyle="italic"
        fill="#0047AB"
        letterSpacing="-5"
      >
        R
      </text>

      {/* Medical Academy - Script Cursive Subtitle */}
      <text
        x="305"
        y="272"
        fontFamily="'Brush Script MT', 'Segoe Script', 'Great Vibes', cursive, 'Dancing Script'"
        fontSize="37"
        fontWeight="bold"
        fontStyle="italic"
        fill="#111827"
        textAnchor="middle"
      >
        Medical Academy
      </text>

      {/* Centre for Post-gRaduation (CPR) - Serif Footer Line */}
      <text
        x="250"
        y="395"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="bold"
        textAnchor="middle"
      >
        <tspan fill="#0047AB">Centre for </tspan>
        <tspan fill="#E52427">Post-</tspan>
        <tspan fill="#0047AB">g</tspan>
        <tspan fill="#E52427">R</tspan>
        <tspan fill="#0047AB">aduation (CPR)</tspan>
      </text>
    </svg>
  );
};
