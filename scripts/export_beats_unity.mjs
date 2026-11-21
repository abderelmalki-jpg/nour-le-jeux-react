// Exporte les données narratives du Chapitre 1 (React) vers le format JSON consommé
// par le prototype Unity NOUR 3D — voir NOUR_3D/DOSSIER_PRODUCTION_CHAPITRE_1.md §5.1.
//
// Usage :  npx tsx scripts/export_beats_unity.mjs
// Sortie : NOUR_3D/unity_data/beats_ch1.json        (séquences + textes FR/EN/AR + audioClip)
//          NOUR_3D/unity_data/audio_checklist_ch1.json (attendus vs existants dans public/audio/ch1)
//
// À copier ensuite dans le projet Unity : Assets/NOUR/Data/

import fs from 'node:fs';
import path from 'node:path';
import {
  CHAPTER_1_SCENES,
  QUIZZES,
  REAL_ACTIONS,
  CLIMAX_STEPS,
  DAY_2_POTEAU_BEATS
} from '../src/data/chapter1.ts';
import {
  CHAPTER_1_SCENES_EN,
  QUIZZES_EN,
  REAL_ACTIONS_EN,
  CLIMAX_STEPS_EN,
  DAY_2_POTEAU_BEATS_EN
} from '../src/data/locales/chapter1.en.ts';
import {
  CHAPTER_1_SCENES_AR,
  QUIZZES_AR,
  REAL_ACTIONS_AR,
  CLIMAX_STEPS_AR,
  DAY_2_POTEAU_BEATS_AR
} from '../src/data/locales/chapter1.ar.ts';

const ROOT = path.resolve(process.cwd());
const OUT_DIR = path.join(ROOT, 'NOUR_3D', 'unity_data');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio', 'ch1');
const AUDIO_CLIP_PREFIX = 'Audio/Voices/Ch1/';

// ---------------------------------------------------------------------------
// Tables de correspondance beatId / choiceId -> variantes localisées
// ---------------------------------------------------------------------------

function buildBeatMap(scenes) {
  const map = new Map();
  for (const scene of scenes) {
    for (const beat of scene.beats || []) {
      map.set(beat.id, beat);
    }
  }
  return map;
}

function buildChoiceMap(scenes) {
  const map = new Map();
  for (const scene of scenes) {
    for (const beat of scene.beats || []) {
      for (const choice of beat.choices || []) {
        map.set(choice.id, choice);
      }
    }
  }
  return map;
}

const beatsEn = buildBeatMap(CHAPTER_1_SCENES_EN);
const beatsAr = buildBeatMap(CHAPTER_1_SCENES_AR);
const choicesEn = buildChoiceMap(CHAPTER_1_SCENES_EN);
const choicesAr = buildChoiceMap(CHAPTER_1_SCENES_AR);

// ---------------------------------------------------------------------------
// Normalisation d'un beat (FR = source) avec textes localisés inline
// ---------------------------------------------------------------------------

const VOICED_TYPES = new Set(['dialogue', 'memory_fragments']);

function beatAudioInfo(beat) {
  const expectsVoice = VOICED_TYPES.has(beat.type);
  const file = `${beat.id}.mp3`;
  const exists = fs.existsSync(path.join(AUDIO_DIR, file));
  return {
    audioClip: exists ? AUDIO_CLIP_PREFIX + beat.id : null,
    expectsVoice: expectsVoice && !beat.speakerName, // les répliques nommées à la main restent textuelles
    voiceFilePresent: exists
  };
}

function loc(fr, en, ar) {
  if (fr === undefined && en === undefined && ar === undefined) return undefined;
  const out = {};
  if (fr !== undefined) out.fr = fr;
  if (en !== undefined) out.en = en;
  if (ar !== undefined) out.ar = ar;
  return out;
}

function exportBeat(beat) {
  const en = beatsEn.get(beat.id);
  const ar = beatsAr.get(beat.id);
  const audio = beatAudioInfo(beat);

  const out = {
    id: beat.id,
    type: beat.type,
    speaker: beat.speaker ?? null,
    emotion: beat.emotion ?? null,
    text: loc(beat.text, en?.text, ar?.text) ?? null,
    arabicText: loc(beat.arabicText, en?.arabicText, ar?.arabicText) ?? null,
    audioClip: audio.audioClip,
    voiceFilePresent: audio.voiceFilePresent,
    localizedIn: {
      fr: true,
      en: Boolean(en),
      ar: Boolean(ar)
    }
  };

  if (beat.requiredNarrativeFlag) out.requiredNarrativeFlag = beat.requiredNarrativeFlag;
  if (beat.quizId) out.quizId = beat.quizId;
  if (beat.realActionId) out.realActionId = beat.realActionId;
  if (beat.climaxStepId) out.climaxStepId = beat.climaxStepId;
  if (beat.xpAmount !== undefined) out.xpAmount = beat.xpAmount;
  if (beat.xpReason) out.xpReason = beat.xpReason;
  if (beat.waswasXpAmount !== undefined) out.waswasXpAmount = beat.waswasXpAmount;
  if (beat.waswasReason) out.waswasReason = beat.waswasReason;
  if (beat.unlockedConceptId) out.unlockedConceptId = beat.unlockedConceptId;
  if (beat.isPontDeNour) out.isPontDeNour = true;

  if (beat.choices && beat.choices.length > 0) {
    out.choices = beat.choices.map((c) => {
      const ce = choicesEn.get(c.id);
      const ca = choicesAr.get(c.id);
      const choice = {
        id: c.id,
        label: loc(c.label, ce?.label, ca?.label) ?? null,
        choiceType: c.choiceType ?? null
      };
      if (c.responsePreview) choice.responsePreview = loc(c.responsePreview, ce?.responsePreview, ca?.responsePreview);
      if (c.traitGains) choice.traitGains = c.traitGains;
      if (c.setNarrativeFlags) choice.setNarrativeFlags = c.setNarrativeFlags;
      if (c.habitMessage) choice.habitMessage = loc(c.habitMessage, ce?.habitMessage, ca?.habitMessage);
      if (c.statBonus) choice.statBonus = c.statBonus;
      if (c.moralKey) choice.moralKey = c.moralKey;
      if (c.requiredTrait) choice.requiredTrait = c.requiredTrait;
      if (c.targetSceneId !== undefined) choice.targetSceneId = c.targetSceneId;
      if (c.disabled) choice.disabled = true;
      return choice;
    });
  }

  return out;
}

function exportScene(scene) {
  return {
    id: scene.id,
    title: scene.title,
    subtitle: scene.subtitle,
    poeticSubtitle: scene.poeticSubtitle ?? null,
    location: scene.location,
    theme: scene.backgroundTheme,
    requiredXp: scene.requiredXp ?? 0,
    isSpiritualGate: scene.isSpiritualGate ?? false,
    nextSceneId: scene.nextSceneId ?? null,
    beats: (scene.beats || []).map(exportBeat)
  };
}

// ---------------------------------------------------------------------------
// Quiz / Actions réelles / Climax (localisés)
// ---------------------------------------------------------------------------

function exportQuizDict(frDict, enDict, arDict) {
  const out = {};
  for (const [id, quiz] of Object.entries(frDict)) {
    const en = enDict[id];
    const ar = arDict[id];
    out[id] = {
      id: quiz.id,
      topic: quiz.topic,
      promptSpeaker: quiz.promptSpeaker,
      question: loc(quiz.question, en?.question, ar?.question) ?? null,
      options: quiz.options.map((opt, i) => ({
        id: opt.id,
        isCorrect: opt.isCorrect,
        text: loc(opt.text, en?.options?.[i]?.text, ar?.options?.[i]?.text) ?? null
      })),
      correctOptionId: quiz.correctOptionId,
      explanation: loc(quiz.explanation, en?.explanation, ar?.explanation) ?? null,
      theologicalNote: loc(quiz.theologicalNote, en?.theologicalNote, ar?.theologicalNote) ?? null,
      reference: quiz.reference ?? null
    };
  }
  return out;
}

function exportRealActionDict(frDict, enDict, arDict) {
  const out = {};
  for (const [id, action] of Object.entries(frDict)) {
    const en = enDict[id];
    const ar = arDict[id];
    out[id] = {
      id: action.id,
      title: loc(action.title, en?.title, ar?.title) ?? null,
      instruction: loc(action.instruction, en?.instruction, ar?.instruction) ?? null,
      subtext: loc(action.subtext, en?.subtext, ar?.subtext) ?? null,
      xpReward: action.xpReward,
      reflectionPrompt: loc(action.reflectionPrompt, en?.reflectionPrompt, ar?.reflectionPrompt) ?? null
    };
  }
  return out;
}

function exportClimaxSteps(frList, enList, arList) {
  return frList.map((step, i) => ({
    stepNumber: step.stepNumber,
    id: step.id,
    title: step.title,
    quote: loc(step.quote, enList[i]?.quote, arList[i]?.quote) ?? null,
    arabic: step.arabic ?? null,
    meaning: step.meaning,
    description: step.description
  }));
}

// ---------------------------------------------------------------------------
// Table des voix (héritée de scripts/dialogues_export.json -> meta.characters)
// ---------------------------------------------------------------------------

function loadVoiceTable() {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'dialogues_export.json'), 'utf8'));
    const chars = raw?.meta?.characters;
    if (Array.isArray(chars)) {
      return chars.map((c) => ({
        key: c.key,
        name: c.name,
        description: c.description,
        elevenlabsVoice: c.elevenlabsVoice ?? null,
        openaiVoice: c.openaiVoice ?? null
      }));
    }
  } catch {
    // fichier absent ou illisible : table vide
  }
  return [];
}

// ---------------------------------------------------------------------------
// Checklist audio : beats attendus vs fichiers réels
// ---------------------------------------------------------------------------

function buildAudioChecklist(scenes, day2Beats) {
  const expected = [];
  for (const scene of scenes) {
    for (const beat of scene.beats || []) {
      if (VOICED_TYPES.has(beat.type)) expected.push(beat.id);
    }
  }
  for (const beat of day2Beats) {
    if (VOICED_TYPES.has(beat.type)) expected.push(beat.id);
  }

  const existing = fs.existsSync(AUDIO_DIR)
    ? fs.readdirSync(AUDIO_DIR).filter((f) => f.endsWith('.mp3') && !f.endsWith('.old.mp3')).map((f) => f.replace(/\.mp3$/, ''))
    : [];

  const expectedSet = new Set(expected);
  const existingSet = new Set(existing);

  const missing = expected.filter((id) => !existingSet.has(id));
  const orphaned = existing.filter((id) => !expectedSet.has(id));

  return {
    generatedAt: new Date().toISOString(),
    audioFolder: 'public/audio/ch1',
    expectedVoiceBeats: expected.length,
    filesPresent: existing.length,
    missing: missing.map((id) => ({ beatId: id, file: `${id}.mp3` })),
    orphanedFiles: orphaned.map((id) => `${id}.mp3`),
    note: 'missing = beats parlés sans fichier audio ; orphanedFiles = fichiers audio sans beat correspondant (anciens ids ou variantes).'
  };
}

// ---------------------------------------------------------------------------
// Assemblage + écriture
// ---------------------------------------------------------------------------

const scenes = CHAPTER_1_SCENES.map(exportScene);
const day2PoteauBeats = DAY_2_POTEAU_BEATS.map(exportBeat);
const checklist = buildAudioChecklist(CHAPTER_1_SCENES, DAY_2_POTEAU_BEATS);

const payload = {
  meta: {
    game: 'Nour — La Voie de la Sagesse',
    document: 'Chapitre 1 — export pour prototype Unity NOUR 3D',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    source: 'src/data/chapter1.ts + locales/chapter1.{en,ar}.ts',
    languages: ['fr', 'en', 'ar'],
    audioClipPrefix: AUDIO_CLIP_PREFIX,
    sceneCount: scenes.length,
    beatCount: scenes.reduce((n, s) => n + s.beats.length, 0),
    day2PoteauBeatCount: day2PoteauBeats.length,
    notes: [
      'audioClip = null si le fichier public/audio/ch1/<beatId>.mp3 est absent.',
      'Les voix EN/AR ne sont pas générées : Unity lit la voix FR, le texte suit la langue.',
      'Types de beat : dialogue | choice | quiz | real_action | xp | climax_combat | memory_fragments | chapter_end.',
      'Les beats xp sont des récompenses auto-attribuées (pas de voix).'
    ]
  },
  characters: loadVoiceTable(),
  scenes,
  day2PoteauBeats,
  quizzes: exportQuizDict(QUIZZES, QUIZZES_EN, QUIZZES_AR),
  realActions: exportRealActionDict(REAL_ACTIONS, REAL_ACTIONS_EN, REAL_ACTIONS_AR),
  climaxSteps: exportClimaxSteps(CLIMAX_STEPS, CLIMAX_STEPS_EN, CLIMAX_STEPS_AR)
};

fs.mkdirSync(OUT_DIR, { recursive: true });
const beatsPath = path.join(OUT_DIR, 'beats_ch1.json');
const checklistPath = path.join(OUT_DIR, 'audio_checklist_ch1.json');
fs.writeFileSync(beatsPath, JSON.stringify(payload, null, 2), 'utf8');
fs.writeFileSync(checklistPath, JSON.stringify(checklist, null, 2), 'utf8');

// Résumé console
const totalBeats = payload.meta.beatCount;
console.log('─'.repeat(64));
console.log('NOUR 3D — Export Chapitre 1');
console.log('─'.repeat(64));
console.log(`Scènes exportées      : ${scenes.length}`);
console.log(`Beats exportés        : ${totalBeats}`);
console.log(`  dont avec voix FR   : ${checklist.expectedVoiceBeats}`);
console.log(`Day-2 Poteau beats    : ${day2PoteauBeats.length}`);
console.log(`Quiz / Actions / Clim : ${Object.keys(payload.quizzes).length} / ${Object.keys(payload.realActions).length} / ${payload.climaxSteps.length}`);
console.log('');
console.log(`Audio manquant        : ${checklist.missing.length}${checklist.missing.length ? ' → ' + checklist.missing.slice(0, 8).map((m) => m.beatId).join(', ') + (checklist.missing.length > 8 ? '…' : '') : ''}`);
console.log(`Audio orphelin        : ${checklist.orphanedFiles.length}${checklist.orphanedFiles.length ? ' (anciens ids, ex. ' + checklist.orphanedFiles.slice(0, 4).join(', ') + '…)' : ''}`);
console.log('');
console.log(`Écrit : ${path.relative(ROOT, beatsPath)}`);
console.log(`Écrit : ${path.relative(ROOT, checklistPath)}`);
