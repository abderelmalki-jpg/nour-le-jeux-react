import type { Chapter1TranslationSet } from './chapter1Translations';

// Rattrapage des traductions du chapitre 1 : dix répliques/choix présents en français mais absents
// des versions anglaise et arabe (la première conversation de la scène 1, les choix des scènes 6, 7 et 9…).
// ⚠️ La version arabe est à faire relire par un arabophone natif.

const empty = { scenes: {}, climaxSteps: {}, quizzes: {}, realActions: {} };

export const CHAPTER_1_PATCH: { en: Chapter1TranslationSet; ar: Chapter1TranslationSet } = {
  en: {
    ...empty,
    beats: {
      s1_noura_intro: 'Are you talking to your bag now?',
      s1_othman_reply1: 'It listens to me better than people do.',
      s1_noura_reply1: 'Then maybe it is time to introduce it to the world.',
      s1_othman_reply2: 'Mom... What if I cannot do it? Go toward others, speak, find my place...',
      s1_noura_reply2: 'You are already trying to know what the whole road will be like... when you have not yet taken the first step.',
      s6_refus_choice: 'The young craftsman answers curtly. How does Othman react?',
      s7_aid_choice: 'How does Othman step in to help the farmer?',
      s9_b3: 'His words hit exactly where it hurts... Maybe I was just lucky today. Maybe I am still the same shy boy as this morning...',
      s9_ordeal_choice: 'Facing the hissing of the Great Waswas, what certainty does Othman raise?',
      s9_proclamation: '« My patient efforts and my perseverance are worth more than your lies! I place my trust in Allah! »'
    },
    variants: {
      's9_proclamation#0': '« My patient efforts and my perseverance are worth more than your lies! I place my trust in Allah and I will not weaken! »',
      's9_proclamation#1': '« Every habit built today is carved into reality! You can do nothing against regularity and true deeds! »',
      's9_proclamation#2': '« My heart seeks sincerity and good for Allah alone! Purity of intention and kindness disarm all your shadows! »',
      's9_proclamation#3': '« Even tired, I will take the next step forward! Resolute action breaks fear and the illusion of powerlessness! »'
    },
    choices: {
      c_silence_sabr: { label: 'Stay silent and withdraw with dignity (Sabr)', habitMessage: 'Moral decision • Othman welcomes the refusal with restraint.', responsePreview: 'Withdraw with dignity without making a fuss.' },
      c_adab_courage: { label: '« Good luck with your order then! » (Adab)', habitMessage: 'Moral decision • Othman overcomes his ego through Adab.', responsePreview: 'Answer with a kind word despite the coldness.' },
      c_hilm_compassion: { label: '« Do not worry, may Allah bless your labor! » (Hilm)', habitMessage: 'Moral decision • Othman’s Hilm defuses all resentment.', responsePreview: 'Understand his tiredness and offer him a kind duʿāʾ.' },
      c_comprehension_ilm: { label: 'Watch his craft and respect his commitment (ʿIlm)', habitMessage: 'Moral decision • Othman understands the value of craftsmanship.', responsePreview: '« Good work takes concentration. Good work to you! »' },
      c_aide_humaine: { label: 'Help the old man up first (Adab & Hilm)', habitMessage: 'Moral decision • Othman puts human care at the center of his gesture.', responsePreview: 'Take care of the person before the objects.' },
      c_aide_active: { label: 'Quickly pick up the fruit to clear the path (Discipline)', habitMessage: 'Moral decision • Othman acts with promptness and organization.', responsePreview: 'Act fast so the fruit is not crushed underfoot.' },
      c_aide_complete: { label: 'Tidy the fruit and carry the heaviest basket (Vitality & Sabr)', habitMessage: 'Moral decision • The nobility of Othman’s discreet service.', responsePreview: 'Fully relieve the elder of his burden all the way to the orchard.' },
      c_verite_sabr: { label: '« My patient efforts and my perseverance are worth more than your lies! » (Sabr)', habitMessage: 'Trial overcome • Othman’s Sabr reduces the doubt to silence.', responsePreview: 'Anchor his strength in Sabr and trust in Allah.' },
      c_verite_discipline: { label: '« Every habit built today is carved into reality! » (Discipline)', habitMessage: 'Trial overcome • Othman’s Discipline dispels the confusion.', responsePreview: 'Set the rigor of deeds against deceiving illusions.' },
      c_verite_hilm_adab: { label: '« My heart seeks sincerity and good for Allah alone! » (Adab & Hilm)', habitMessage: 'Trial overcome • The nobility of the heart dissolves the Great Waswas.', responsePreview: 'Disarm the darkness through purity of intention.' },
      c_verite_vitalite: { label: '« Even tired, I will take the next step forward! » (Vitality & Sabr)', habitMessage: 'Trial overcome • Othman’s drive to act breaks fear.', responsePreview: 'Refuse inaction and take the step of courage.' }
    }
  },
  ar: {
    ...empty,
    beats: {
      s1_noura_intro: 'أَتُحَدِّثُ حَقِيبَتَكَ الْآنَ؟',
      s1_othman_reply1: 'إِنَّهَا تُصْغِي إِلَيَّ أَفْضَلَ مِنَ النَّاسِ.',
      s1_noura_reply1: 'إِذَنْ رُبَّمَا حَانَ الْوَقْتُ لِتُعَرِّفَهَا عَلَى الْعَالَمِ.',
      s1_othman_reply2: 'أُمِّي... وَمَاذَا لَوْ لَمْ أَنْجَحْ؟ فِي الذَّهَابِ إِلَى الْآخَرِينَ، وَفِي الْكَلَامِ، وَفِي إِيجَادِ مَكَانِي...',
      s1_noura_reply2: 'أَنْتَ تُحَاوِلُ مُنْذُ الْآنَ أَنْ تَعْرِفَ كَيْفَ سَيَكُونُ الطَّرِيقُ كُلُّهُ... وَأَنْتَ لَمْ تَخْطُ الْخُطْوَةَ الْأُولَى بَعْدُ.',
      s6_refus_choice: 'يُجِيبُ الْحِرَفِيُّ الشَّابُّ بِجَفَاءٍ. كَيْفَ يَتَصَرَّفُ عُثْمَانُ؟',
      s7_aid_choice: 'كَيْفَ يَتَدَخَّلُ عُثْمَانُ لِمُسَاعَدَةِ الْفَلَّاحِ؟',
      s9_b3: 'كَلِمَاتُهُ تُصِيبُ بِالضَّبْطِ مَكَانَ الْأَلَمِ... رُبَّمَا كُنْتُ مَحْظُوظًا الْيَوْمَ فَقَطْ. رُبَّمَا مَا زِلْتُ ذَلِكَ الْفَتَى الْخَجُولَ نَفْسَهُ مِنْ هَذَا الصَّبَاحِ...',
      s9_ordeal_choice: 'أَمَامَ فَحِيحِ الْوَسْوَاسِ الْأَكْبَرِ، أَيَّ يَقِينٍ يَرْفَعُ عُثْمَانُ؟',
      s9_proclamation: '« جُهُودِي الصَّابِرَةُ وَمُثَابَرَتِي أَغْلَى مِنْ أَكَاذِيبِكَ! أَضَعُ ثِقَتِي فِي اللهِ! »'
    },
    variants: {
      's9_proclamation#0': '« جُهُودِي الصَّابِرَةُ وَمُثَابَرَتِي أَغْلَى مِنْ أَكَاذِيبِكَ! أَضَعُ ثِقَتِي فِي اللهِ وَلَنْ أَضْعُفَ! »',
      's9_proclamation#1': '« كُلُّ عَادَةٍ رَسَّخْتُهَا الْيَوْمَ مَنْقُوشَةٌ فِي الْوَاقِعِ! لَا تَسْتَطِيعُ شَيْئًا ضِدَّ الِانْتِظَامِ وَالْأَعْمَالِ الصَّادِقَةِ! »',
      's9_proclamation#2': '« قَلْبِي يَطْلُبُ الصِّدْقَ وَالْخَيْرَ للهِ وَحْدَهُ! نَقَاءُ النِّيَّةِ وَالْإِحْسَانُ يَنْزِعَانِ سِلَاحَ كُلِّ ظِلَالِكَ! »',
      's9_proclamation#3': '« وَلَوْ كُنْتُ مُتْعَبًا، سَأَخْطُو الْخُطْوَةَ الْقَادِمَةَ إِلَى الْأَمَامِ! الْفِعْلُ الْحَازِمُ يَكْسِرُ الْخَوْفَ وَوَهْمَ الْعَجْزِ! »'
    },
    choices: {
      c_silence_sabr: { label: 'الصَّمْتُ وَالِانْسِحَابُ بِكَرَامَةٍ (الصَّبْرُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَسْتَقْبِلُ عُثْمَانُ الرَّفْضَ بِضَبْطِ نَفْسٍ.', responsePreview: 'الِانْسِحَابُ بِكَرَامَةٍ دُونَ ضَجِيجٍ.' },
      c_adab_courage: { label: '« بِالتَّوْفِيقِ فِي طَلَبِيَّتِكَ إِذَنْ! » (الْأَدَبُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَتَغَلَّبُ عُثْمَانُ عَلَى أَنَانِيَّتِهِ بِالْأَدَبِ.', responsePreview: 'الرَّدُّ بِكَلِمَةٍ لَطِيفَةٍ رَغْمَ الْجَفَاءِ.' },
      c_hilm_compassion: { label: '« لَا تَقْلَقْ، بَارَكَ اللهُ فِي عَمَلِكَ! » (الْحِلْمُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • حِلْمُ عُثْمَانَ يَنْزِعُ كُلَّ ضَغِينَةٍ.', responsePreview: 'فَهْمُ تَعَبِهِ وَالدُّعَاءُ لَهُ بِخَيْرٍ.' },
      c_comprehension_ilm: { label: 'مُلَاحَظَةُ حِرْفَتِهِ وَاحْتِرَامُ الْتِزَامِهِ (الْعِلْمُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَفْهَمُ عُثْمَانُ قِيمَةَ الْعَمَلِ الْحِرَفِيِّ.', responsePreview: '« الْعَمَلُ الْمُتْقَنُ يَحْتَاجُ إِلَى تَرْكِيزٍ. عَمَلًا مُوَفَّقًا! »' },
      c_aide_humaine: { label: 'مُسَاعَدَةُ الرَّجُلِ الْمُسِنِّ عَلَى النُّهُوضِ أَوَّلًا (الْأَدَبُ وَالْحِلْمُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَجْعَلُ عُثْمَانُ الِاهْتِمَامَ بِالْإِنْسَانِ مَحْوَرَ فِعْلِهِ.', responsePreview: 'الِاعْتِنَاءُ بِالشَّخْصِ قَبْلَ الْأَشْيَاءِ.' },
      c_aide_active: { label: 'جَمْعُ الثِّمَارِ بِسُرْعَةٍ لِإِخْلَاءِ الطَّرِيقِ (الِانْضِبَاطُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَتَصَرَّفُ عُثْمَانُ بِسُرْعَةٍ وَتَنْظِيمٍ.', responsePreview: 'التَّصَرُّفُ بِسُرْعَةٍ لِئَلَّا تُسْحَقَ الثِّمَارُ تَحْتَ الْأَقْدَامِ.' },
      c_aide_complete: { label: 'تَرْتِيبُ الثِّمَارِ وَحَمْلُ السَّلَّةِ الْأَثْقَلِ (الْحَيَوِيَّةُ وَالصَّبْرُ)', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • نُبْلُ خِدْمَةِ عُثْمَانَ الْخَفِيَّةِ.', responsePreview: 'تَخْفِيفُ عِبْءِ الشَّيْخِ كُلِّيًّا حَتَّى الْبُسْتَانِ.' },
      c_verite_sabr: { label: '« جُهُودِي الصَّابِرَةُ وَمُثَابَرَتِي أَغْلَى مِنْ أَكَاذِيبِكَ! » (الصَّبْرُ)', habitMessage: 'ابْتِلَاءٌ تَمَّ التَّغَلُّبُ عَلَيْهِ • صَبْرُ عُثْمَانَ يُسْكِتُ الشَّكَّ.', responsePreview: 'تَثْبِيتُ قُوَّتِهِ فِي الصَّبْرِ وَالثِّقَةِ بِاللهِ.' },
      c_verite_discipline: { label: '« كُلُّ عَادَةٍ رَسَّخْتُهَا الْيَوْمَ مَنْقُوشَةٌ فِي الْوَاقِعِ! » (الِانْضِبَاطُ)', habitMessage: 'ابْتِلَاءٌ تَمَّ التَّغَلُّبُ عَلَيْهِ • انْضِبَاطُ عُثْمَانَ يُبَدِّدُ الِارْتِبَاكَ.', responsePreview: 'مُقَابَلَةُ الْأَوْهَامِ الْمُضَلِّلَةِ بِصَرَامَةِ الْأَفْعَالِ.' },
      c_verite_hilm_adab: { label: '« قَلْبِي يَطْلُبُ الصِّدْقَ وَالْخَيْرَ للهِ وَحْدَهُ! » (الْأَدَبُ وَالْحِلْمُ)', habitMessage: 'ابْتِلَاءٌ تَمَّ التَّغَلُّبُ عَلَيْهِ • نُبْلُ الْقَلْبِ يُذِيبُ الْوَسْوَاسَ الْأَكْبَرَ.', responsePreview: 'نَزْعُ سِلَاحِ الظَّلَامِ بِنَقَاءِ النِّيَّةِ.' },
      c_verite_vitalite: { label: '« وَلَوْ كُنْتُ مُتْعَبًا، سَأَخْطُو الْخُطْوَةَ الْقَادِمَةَ إِلَى الْأَمَامِ! » (الْحَيَوِيَّةُ وَالصَّبْرُ)', habitMessage: 'ابْتِلَاءٌ تَمَّ التَّغَلُّبُ عَلَيْهِ • انْدِفَاعُ عُثْمَانَ نَحْوَ الْفِعْلِ يَكْسِرُ الْخَوْفَ.', responsePreview: 'رَفْضُ الْجُمُودِ وَخُطْوَةُ الشَّجَاعَةِ.' }
    }
  }
};
