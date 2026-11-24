import { Beat, DialogueChoice, Quiz, RealAction, Scene } from '../types';
import { Language } from '../i18n/translations';
import { CHAPTER_1_TRANSLATIONS, Chapter1TranslationSet } from '../i18n/chapter1Translations';
import { CHAPTER_2_TRANSLATIONS } from '../i18n/chapter2Translations';
import { CHAPTER_3_TRANSLATIONS } from '../i18n/chapter3Translations';
import { CHAPTER_1_PATCH } from '../i18n/chapter1Patch';

// Jeux de traductions fusionnés : les identifiants (répliques, choix, quiz, actions) sont uniques
// d'un chapitre à l'autre, donc une simple fusion suffit.
const mergeSets = (...sets: Chapter1TranslationSet[]): Chapter1TranslationSet => ({
  scenes: Object.assign({}, ...sets.map((s) => s.scenes)),
  beats: Object.assign({}, ...sets.map((s) => s.beats)),
  adaptiveVariants: Object.assign({}, ...sets.map((s) => s.adaptiveVariants || {})),
  variants: Object.assign({}, ...sets.map((s) => s.variants || {})),
  choices: Object.assign({}, ...sets.map((s) => s.choices)),
  quizzes: Object.assign({}, ...sets.map((s) => s.quizzes)),
  realActions: Object.assign({}, ...sets.map((s) => s.realActions)),
  climaxSteps: Object.assign({}, ...sets.map((s) => s.climaxSteps))
});

const NARRATIVE_TRANSLATIONS: Record<Language, Chapter1TranslationSet> = {
  fr: CHAPTER_1_TRANSLATIONS.fr,
  en: mergeSets(CHAPTER_1_TRANSLATIONS.en, CHAPTER_1_PATCH.en, CHAPTER_2_TRANSLATIONS.en, CHAPTER_3_TRANSLATIONS.en),
  ar: mergeSets(CHAPTER_1_TRANSLATIONS.ar, CHAPTER_1_PATCH.ar, CHAPTER_2_TRANSLATIONS.ar, CHAPTER_3_TRANSLATIONS.ar)
};


export const getLocalizedBeatText = (beat: Beat, language: Language = 'fr'): string => {
  if (language === 'fr') {
    return beat.text || '';
  }

  const langSet = NARRATIVE_TRANSLATIONS[language];
  if (langSet && langSet.beats && langSet.beats[beat.id]) {
    return langSet.beats[beat.id];
  }

  return beat.text || '';
};

export const stripLeadingEmoji = (text: string): string => {
  if (!text) return '';
  return text.replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\u20E3\s]+/u, '').trim();
};

export const getLocalizedChoiceLabel = (choice: DialogueChoice, language: Language = 'fr'): string => {
  let label = choice.label;
  if (language !== 'fr') {
    const langSet = NARRATIVE_TRANSLATIONS[language];
    if (langSet && langSet.choices && langSet.choices[choice.id]) {
      label = langSet.choices[choice.id].label;
    }
  }

  return stripLeadingEmoji(label);
};

export const getLocalizedQuiz = (quiz: Quiz, language: Language = 'fr'): Quiz => {
  if (language === 'fr') {
    return quiz;
  }

  const langSet = NARRATIVE_TRANSLATIONS[language];
  if (!langSet || !langSet.quizzes || !langSet.quizzes[quiz.id]) {
    return quiz;
  }

  const localizedData = langSet.quizzes[quiz.id];
  return {
    ...quiz,
    topic: localizedData.topic || quiz.topic,
    question: localizedData.question || quiz.question,
    options: quiz.options.map((opt) => ({
      ...opt,
      text: localizedData.options[opt.id] || opt.text
    })),
    explanation: localizedData.explanation || quiz.explanation,
    theologicalNote: localizedData.theologicalNote || quiz.theologicalNote,
    reference: quiz.reference
      ? {
          ...quiz.reference,
          concept: localizedData.concept || quiz.reference.concept,
          citationText: localizedData.citationText || quiz.reference.citationText
        }
      : undefined
  };
};

export const getLocalizedRealAction = (action: RealAction, language: Language = 'fr'): RealAction => {
  if (language === 'fr') {
    return action;
  }

  const langSet = NARRATIVE_TRANSLATIONS[language];
  if (!langSet || !langSet.realActions || !langSet.realActions[action.id]) {
    return action;
  }

  const localizedData = langSet.realActions[action.id];
  return {
    ...action,
    title: localizedData.title || action.title,
    instruction: localizedData.instruction || action.instruction,
    subtext: localizedData.subtext || action.subtext,
    reflectionPrompt: localizedData.reflectionPrompt || action.reflectionPrompt
  };
};

export const getLocalizedScene = (
  scene: Scene,
  language: Language = 'fr'
): { title: string; subtitle?: string; description?: string; location?: string } => {
  if (language === 'fr') {
    return {
      title: scene.title,
      subtitle: scene.subtitle,
      description: (scene as any).description,
      location: scene.location
    };
  }

  const langSet = NARRATIVE_TRANSLATIONS[language];
  if (langSet && langSet.scenes && langSet.scenes[scene.id]) {
    return {
      title: langSet.scenes[scene.id].title || scene.title,
      subtitle: langSet.scenes[scene.id].subtitle || scene.subtitle,
      description: (langSet.scenes[scene.id] as any)?.description || (scene as any).description,
      location: langSet.scenes[scene.id].location || scene.location
    };
  }

  return {
    title: scene.title,
    subtitle: scene.subtitle,
    description: (scene as any).description,
    location: scene.location
  };
};

/** Texte d'une variante adaptative (chapitres 2 et 3) dans la langue du joueur. */
export const getLocalizedVariantText = (
  beatId: string,
  variantIndex: number,
  fallback: string,
  language: Language = 'fr'
): string => {
  if (language === 'fr') return fallback;
  return NARRATIVE_TRANSLATIONS[language]?.variants?.[`${beatId}#${variantIndex}`] || fallback;
};

/** Badge d'un choix (ex. « ✦ Continuer ») dans la langue du joueur. */
export const getLocalizedChoiceBadge = (choice: DialogueChoice, language: Language = 'fr'): string | undefined => {
  if (language === 'fr') return choice.badge;
  return NARRATIVE_TRANSLATIONS[language]?.choices?.[choice.id]?.badge || choice.badge;
};

/** Message d'habitude (bandeau « Décision morale ») dans la langue du joueur. */
export const getLocalizedHabitMessage = (choice: DialogueChoice, language: Language = 'fr'): string | undefined => {
  if (language === 'fr') return choice.habitMessage;
  return NARRATIVE_TRANSLATIONS[language]?.choices?.[choice.id]?.habitMessage || choice.habitMessage;
};
