import React, { useState } from 'react';
import { Scene, PlayerProgress } from '../types';
import { CHAPTER_1_SCENES } from '../data/chapter1';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  Compass,
  RotateCcw,
  ListOrdered,
  ChevronDown,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HUDProps {
  currentScene: Scene;
  playerProgress: PlayerProgress;
  onSelectScene: (sceneId: number) => void;
  onOpenKnowledge: () => void;
  onOpenHistory: () => void;
  onOpenAssets: () => void;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  currentScene,
  playerProgress,
  onSelectScene,
  onOpenKnowledge,
  onOpenHistory,
  onOpenAssets,
  onToggleSound,
  onResetProgress
}) => {
  const [showSceneMenu, setShowSceneMenu] = useState(false);


  return (
    <header className="relative z-40 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-3 pb-2 flex flex-col gap-2">
      {/* Main Top Bar Style Tuile Rétro Beige */}
      <div className="flex items-center justify-between gap-2 bg-[#fbf7ee]/95 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-xl border-2 sm:border-3 border-[#3c2311] shadow-[0_4px_0_#241407]">
        {/* Left: Chapter & Scene Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#d97c27] flex items-center justify-center border-2 border-[#3c2311] shadow-xs shrink-0">
            <span className="font-pixel text-xs sm:text-sm font-black text-white">1</span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8c5a2b] font-pixel">
                {playerProgress.dayNumber === 2 && currentScene.id === 2 ? '🌅 Jour 2' : 'Chapitre 1'}
              </span>
              <span className="text-[10px] text-[#3c2311]/40">•</span>
              <span className="text-[10px] text-[#5c3a21] font-pixel">
                {playerProgress.dayNumber === 2 && currentScene.id === 2 ? 'Carrefour Déverrouillé' : `Scène ${currentScene.id}/9`}
              </span>
            </div>
            <button
              onClick={() => setShowSceneMenu(!showSceneMenu)}
              className="flex items-center gap-1 text-xs sm:text-sm font-bold font-pixel text-[#3c2311] hover:text-[#d97c27] transition-colors truncate text-left cursor-pointer"
            >
              <span className="truncate">{currentScene.title}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#d97c27] transition-transform ${showSceneMenu ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center: XP Bar and counter */}
        <div className="flex items-center gap-1.5 bg-[#ebdcc0] px-2.5 sm:px-3 py-1 rounded-lg border-2 border-[#3c2311]">
          <Sparkles className="w-3.5 h-3.5 text-[#d97c27]" />
          <div className="flex items-center gap-1 font-pixel">
            <span className="text-xs font-black text-[#3c2311] tracking-wide">
              {playerProgress.xp}
            </span>
            <span className="text-[9px] font-bold text-[#8c5a2b]">XP</span>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Custom Assets Manager */}
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenAssets();
            }}
            title="Personnaliser les visuels (Assets)"
            className="p-1.5 rounded-lg bg-[#ebdcc0] hover:bg-[#e0cfb4] text-[#3c2311] border-2 border-[#3c2311] transition-all cursor-pointer shadow-xs active:translate-y-0.5"
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Knowledge Codex */}
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenKnowledge();
            }}
            title="Bibliothèque du Savoir (ʿIlm)"
            className="p-1.5 rounded-lg bg-[#ebdcc0] hover:bg-[#e0cfb4] text-[#3c2311] border-2 border-[#3c2311] transition-all cursor-pointer shadow-xs active:translate-y-0.5 relative"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {playerProgress.unlockedKnowledgeIds.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#d97c27] text-[8px] font-black text-white rounded-full flex items-center justify-center border border-[#3c2311]">
                {playerProgress.unlockedKnowledgeIds.length}
              </span>
            )}
          </button>

          {/* Dialogue History */}
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenHistory();
            }}
            title="Historique des dialogues"
            className="p-1.5 rounded-lg bg-[#ebdcc0] hover:bg-[#e0cfb4] text-[#3c2311] border-2 border-[#3c2311] transition-all cursor-pointer shadow-xs active:translate-y-0.5"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Audio toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playSelect();
            }}
            title={playerProgress.soundEnabled ? "Couper le son" : "Activer le son"}
            className="p-1.5 rounded-lg bg-[#ebdcc0] hover:bg-[#e0cfb4] text-[#3c2311] border-2 border-[#3c2311] transition-all cursor-pointer shadow-xs active:translate-y-0.5"
          >
            {playerProgress.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2d6a4f]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8c2b2b]" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Scene Navigator */}
      {showSceneMenu && (
        <div className="absolute top-16 left-3 sm:left-6 right-3 sm:right-6 bg-[#1b1824] border border-amber-500/40 rounded-2xl shadow-2xl p-3 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-zinc-200 uppercase tracking-wider font-cinzel">
                Navigation des 9 Scènes
              </span>
            </div>
            <button
              onClick={() => {
                if (confirm('Voulez-vous recommencer le Chapitre 1 depuis le début ?')) {
                  onResetProgress();
                  setShowSceneMenu(false);
                }
              }}
              className="flex items-center gap-1 text-[11px] text-red-400/80 hover:text-red-300 px-2 py-1 rounded-lg bg-red-950/30 border border-red-900/40 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Recommencer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1">
            {CHAPTER_1_SCENES.map((scene) => {
              const isCurrent = scene.id === currentScene.id;
              const isUnlocked = true;

              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    soundManager.playSelect();
                    onSelectScene(scene.id);
                    setShowSceneMenu(false);
                  }}
                  className={`flex items-start gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-600/30 border border-amber-500/60 text-amber-200'
                      : isUnlocked
                      ? 'bg-[#252132] hover:bg-[#342f44] border border-zinc-800 text-zinc-300'
                      : 'bg-zinc-900/60 border border-zinc-800/40 text-zinc-500 opacity-60'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md bg-zinc-950/80 text-[10px] font-bold flex items-center justify-center text-amber-400 shrink-0">
                    {scene.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{scene.title}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{scene.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
