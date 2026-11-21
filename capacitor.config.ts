import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lavoie.sagesse',
  appName: 'Nour : Jeu Islamique & Adab',
  webDir: 'dist',
  backgroundColor: '#0e0b14',
  ios: {
    // La vue web respecte les zones sûres (encoche, barre d'accueil) sans chevaucher le jeu
    contentInset: 'always',
    backgroundColor: '#0e0b14',
    allowsLinkPreview: false,
    limitsNavigationsToAppBoundDomains: false
  }
};

export default config;
