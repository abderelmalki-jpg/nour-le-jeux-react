import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Mic, MicOff, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';

interface PauseMenuModalProps {
  sceneTitle?: string;
  onResume: () => void;
  onReturnToMenu: () => void;
}

const PAUSE_COPY = {
  fr: {
    title: 'PAUSE',
    resume: 'Reprendre la partie',
    sound: 'Sons & Musique',
    voice: 'Narration Vocale',
    on: 'ACTIVÉ',
    off: 'COUPÉ',
    voiceOn: 'ACTIVE',
    voiceOff: 'COUPÉE',
    mainMenu: 'Menu Principal',
    autoSaved: 'Progression sauvegardée automatiquement'
  },
  en: {
    title: 'PAUSED',
    resume: 'Resume Game',
    sound: 'Sound & Music',
    voice: 'Voice Narration',
    on: 'ON',
    off: 'MUTED',
    voiceOn: 'ON',
    voiceOff: 'MUTED',
    mainMenu: 'Main Menu',
    autoSaved: 'Progress saved automatically'
  },
  ar: {
    title: 'إِيقَافٌ مُؤَقَّتٌ',
    resume: 'مُتَابَعَةُ اللَّعِبِ',
    sound: 'الْأَصْوَاتُ وَالْمُوسِيقَى',
    voice: 'صَوْتُ الرَّاوِي',
    on: 'مُفَعَّلٌ',
    off: 'مَكْتُومٌ',
    voiceOn: 'مُفَعَّلٌ',
    voiceOff: 'مَكْتُومٌ',
    mainMenu: 'الْقَائِمَةُ الرَّئِيسِيَّةُ',
    autoSaved: 'تَمَّ حِفْظُ التَّقَدُّمِ تِلْقَائِيًّا'
  }
} as const;

export const PauseMenuModal: React.FC<PauseMenuModalProps> = ({
  sceneTitle,
  onResume,
  onReturnToMenu
}) => {
  const { language, isRtl } = useLanguage();
  const copy = PAUSE_COPY[language === 'ar' || language === 'en' ? language : 'fr'];

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => !soundManager.getMuted());
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => speechManager.isVoiceEnabled());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playSelect();
        onResume();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onResume]);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.setMuted(!next);
    setSoundEnabled(next);
    if (next) soundManager.playSelect();
  };

  const toggleVoice = () => {
    soundManager.playSelect();
    const next = speechManager.toggleVoice();
    setVoiceEnabled(next);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      onClick={() => {
        soundManager.playSelect();
        onResume();
      }}
      className="fixed inset-0 z-[135] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xs sm:max-w-sm pixel-tile-frame p-5 flex flex-col gap-3 animate-in zoom-in-95 duration-150"
      >
        <div className="text-center border-b-2 border-[#3c2311]/25 pb-2.5">
          <h2 className="font-pixel text-2xl font-black text-[#3c2311] tracking-widest">
            {copy.title}
          </h2>
          {sceneTitle && (
            <p className="font-cinzel text-xs font-bold text-[#8c5a2b] mt-0.5 truncate">
              {sceneTitle}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            soundManager.playSelect();
            onResume();
          }}
          className="pixel-tile-btn pixel-tile-btn-primary py-3 px-4 text-center text-base font-black flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-current shrink-0" />
          <span>{copy.resume}</span>
        </button>

        <button
          type="button"
          onClick={toggleSound}
          className="pixel-tile-btn py-2.5 px-3.5 flex items-center justify-between text-xs sm:text-sm font-bold"
        >
          <span className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#2d6a4f]" /> : <VolumeX className="w-4 h-4 text-[#8c2b2b]" />}
            <span>{copy.sound}</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${soundEnabled ? 'bg-emerald-700 text-white' : 'bg-red-800 text-white'}`}>
            {soundEnabled ? copy.on : copy.off}
          </span>
        </button>

        <button
          type="button"
          onClick={toggleVoice}
          className="pixel-tile-btn py-2.5 px-3.5 flex items-center justify-between text-xs sm:text-sm font-bold"
        >
          <span className="flex items-center gap-2">
            {voiceEnabled ? <Mic className="w-4 h-4 text-[#2d6a4f]" /> : <MicOff className="w-4 h-4 text-[#8c2b2b]" />}
            <span>{copy.voice}</span>
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${voiceEnabled ? 'bg-emerald-700 text-white' : 'bg-red-800 text-white'}`}>
            {voiceEnabled ? copy.voiceOn : copy.voiceOff}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playSelect();
            onReturnToMenu();
          }}
          className="pixel-tile-btn py-2.5 px-4 text-center text-sm sm:text-base font-bold text-[#8c2b2b] flex items-center justify-center gap-2 mt-1"
        >
          <Home className="w-4 h-4 shrink-0" />
          <span>{copy.mainMenu}</span>
        </button>

        <p className="text-[10px] text-center text-[#7a5837] font-semibold pt-0.5">
          ✓ {copy.autoSaved}
        </p>
      </div>
    </div>
  );
};
