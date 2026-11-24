import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { PostHogProvider } from '@posthog/react';
import './firebase.ts';
import './utils/analytics.ts';
import App from './App.tsx';
import './fonts.css';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { posthogApiKey, posthogOptions } from './utils/posthogConfig';
import { analyticsAllowed } from './utils/consent';
import { ConsentBanner } from './components/ConsentBanner';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false };
  public props!: Props;

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React lifecycle:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f6ebd7',
          color: '#2b2118',
          fontFamily: 'serif',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
            NOUR — Réinitialisation de session
          </h1>
          <p style={{ maxWidth: '420px', marginBottom: '20px', fontSize: '14px', lineHeight: '1.5' }}>
            Une reprise de session a été détectée. Cliquez ci-dessous pour relancer l'aventure :
          </p>
          {this.state.error && (
            <details style={{ marginBottom: '16px', fontSize: '12px', color: '#8c5a2b', textAlign: 'left', maxWidth: '400px' }}>
              <summary style={{ cursor: 'pointer' }}>Détails techniques</summary>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: '8px' }}>
                {this.state.error.message}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              try {
                localStorage.removeItem('nour_pixelio_rpg_progress_v2');
              } catch {}
              window.location.href = '/play';
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '16px',
              backgroundColor: '#d97c27',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '14px',
              border: '2px solid #3a2312',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            Lancer le Chapitre 1
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const appTree = (
  <ErrorBoundary>
    <LanguageProvider>
      <ThemeProvider>
        <App />
        <ConsentBanner />
      </ThemeProvider>
    </LanguageProvider>
  </ErrorBoundary>
);

// Web : PostHog n'est même pas chargé tant que l'utilisateur n'a pas accepté (voir ConsentBanner).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {analyticsAllowed() ? (
      <PostHogProvider apiKey={posthogApiKey} options={posthogOptions}>
        {appTree}
      </PostHogProvider>
    ) : (
      appTree
    )}
  </StrictMode>,
);
