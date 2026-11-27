import React from 'react';

export type FlagLang = 'fr' | 'ar' | 'en';

interface PixelFlagProps {
  lang: FlagLang;
  className?: string;
}

/**
 * Crisp pixel-art SVG flags (rendered identically on Windows, macOS, Android & iOS
 * unlike Unicode flag emojis which render as plain letters on Windows browsers).
 */
export const PixelFlag: React.FC<PixelFlagProps> = ({ lang, className = 'w-4 h-3' }) => {
  if (lang === 'fr') {
    return (
      <svg
        viewBox="0 0 18 12"
        className={`${className} shrink-0 rounded-[2px] border border-[#2b180b]/70 shadow-[0_1px_0_rgba(0,0,0,0.3)]`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="6" height="12" fill="#1d4ed8" />
        <rect x="6" y="0" width="6" height="12" fill="#ffffff" />
        <rect x="12" y="0" width="6" height="12" fill="#dc2626" />
      </svg>
    );
  }

  if (lang === 'ar') {
    return (
      <svg
        viewBox="0 0 18 12"
        className={`${className} shrink-0 rounded-[2px] border border-[#2b180b]/70 shadow-[0_1px_0_rgba(0,0,0,0.3)]`}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect x="0" y="0" width="18" height="12" fill="#15803d" />
        {/* Stylized pixel calligraphy */}
        <rect x="3" y="3" width="2" height="1" fill="#ffffff" />
        <rect x="6" y="2" width="1" height="3" fill="#ffffff" />
        <rect x="8" y="3" width="3" height="1" fill="#ffffff" />
        <rect x="12" y="2" width="1" height="3" fill="#ffffff" />
        <rect x="14" y="3" width="1" height="2" fill="#ffffff" />
        <rect x="4" y="5" width="9" height="1" fill="#ffffff" />
        {/* Pixel sword beneath */}
        <rect x="4" y="8" width="10" height="1" fill="#ffffff" />
        <rect x="13" y="7" width="1" height="3" fill="#ffffff" />
      </svg>
    );
  }

  // 'en' -> US pixel flag
  return (
    <svg
      viewBox="0 0 18 12"
      className={`${className} shrink-0 rounded-[2px] border border-[#2b180b]/70 shadow-[0_1px_0_rgba(0,0,0,0.3)]`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* Red & white stripes */}
      <rect x="0" y="0" width="18" height="2" fill="#dc2626" />
      <rect x="0" y="2" width="18" height="2" fill="#ffffff" />
      <rect x="0" y="4" width="18" height="2" fill="#dc2626" />
      <rect x="0" y="6" width="18" height="2" fill="#ffffff" />
      <rect x="0" y="8" width="18" height="2" fill="#dc2626" />
      <rect x="0" y="10" width="18" height="2" fill="#ffffff" />
      {/* Blue canton */}
      <rect x="0" y="0" width="8" height="6" fill="#1e3a8a" />
      {/* Pixel stars */}
      <rect x="1" y="1" width="1" height="1" fill="#ffffff" />
      <rect x="3" y="1" width="1" height="1" fill="#ffffff" />
      <rect x="5" y="1" width="1" height="1" fill="#ffffff" />
      <rect x="2" y="3" width="1" height="1" fill="#ffffff" />
      <rect x="4" y="3" width="1" height="1" fill="#ffffff" />
      <rect x="6" y="3" width="1" height="1" fill="#ffffff" />
      <rect x="1" y="5" width="1" height="1" fill="#ffffff" />
      <rect x="3" y="5" width="1" height="1" fill="#ffffff" />
      <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
    </svg>
  );
};
