import type { Chapter1TranslationSet } from './chapter1Translations';

// Traductions du chapitre 5 (« Le Sommet de la Persévérance » — Sabr) : anglais et arabe vocalisé.
// ⚠️ La version arabe et les références religieuses sont à faire relire par un arabophone natif et par un savant.

export const CHAPTER_5_TRANSLATIONS: { en: Chapter1TranslationSet; ar: Chapter1TranslationSet } = {
  en: {
    scenes: {
      40: { title: 'The Ridge Trail', subtitle: '« The First Breath of the Climb »', location: 'Valley slope, cool dawn' },
      41: { title: 'Anchored in Refuge', subtitle: '« Steadfastness Against Doubt »', location: 'Olive trail under mist' },
      42: { title: 'The Pause on the Slope', subtitle: '« Keeping Gentleness in Fatigue »', location: 'Stone terrace halfway up' },
      43: { title: 'The Hands That Uplift', subtitle: '« Never Alone on the Path »', location: 'Highland orchard, lit lantern' },
      44: { title: 'The Summit of Trial', subtitle: '« The Final Duel of Perseverance »', location: 'Mountain ridge pass, glowing sky' },
      45: { title: 'Light Over the Valley', subtitle: '« The Real Journey Begins Now »', location: 'Panoramic summit, golden dawn over the valley' }
    },
    beats: {
      s40_b1: 'The cool morning air brushes the hills. Ahead of Othman rises the stony trail leading to the ridge overlook, where the entire valley opens to view.',
      s40_b2: 'The climb is much steeper than I imagined… My legs feel heavy and the summit still looks so far away.',
      s40_b3: 'Why keep going? You already finished four chapters, that is enough! Go back down and rest — no one will blame you for giving up.',
      s40_b4: 'Do not look at the whole mountain at once, Othman. Look only at the next stone before your foot, and move forward with steadiness.',
      s40_choice: 'Fatigue weighs on Othman’s shoulders. How does he choose to face the climb?',
      s41_b1: 'A veil of purple mist slips between the rocks. The old doubts from the very first day return to whisper in Othman’s ear.',
      s41_b2: 'Aʿūdhu billāhi mina sh-shayṭāni r-rajīm! I recognize you now, Waswas. You want to make me forget everything I have already overcome.',
      s41_b3: 'Remember the golden rule of perseverance: it is not one-day feats that build character, but small faithful steps.',
      s41_quiz: 'Noura asks a question about the value of consistency:',
      s41_action: 'Anchor your perseverance in one simple daily habit.',
      s42_b1: 'Halfway to the summit, a narrow path runs beside a small terrace. A hurried young traveler bumps into Othman on his way down and knocks his water flask into the dust.',
      s42_b2: 'I almost lost my temper because I was tired… But I learned Hilm at the market. Anger never helped anyone climb faster.',
      s42_b3: 'It is nothing, my brother! The trail is slippery here. Watch your step going down, as-salāmu ʿalaykum.',
      s42_b4: 'The traveler stops, surprised by such gentleness, apologizes, and continues down with a smile. Othman’s fatigue already feels lighter.',
      s42_quiz: 'The Sage recalls the Quranic promise that strengthens every effort:',
      s43_b1: 'Othman! I caught up with you! Your father entrusted me with this small lantern and some dates for the final climb.',
      s43_b2: 'Al-Hamdulillāh! Between my parents’ prayers, the patience of the boy with the splint, and your friendship, Bilal, I see we are never alone when walking toward good.',
      s43_choice: 'Before the last bend toward the summit, what intention does Othman place in his heart?',
      s43_action: 'Now become a lantern for someone around you.',
      s44_b1: 'Just before the peak, the Shadow gathers all its whispers: loneliness, anger, discouragement, and ingratitude! Yet Othman holds his lantern high.',
      s44_climax: 'Call upon every virtue learned since Chapter 1 to cross the summit!',
      s45_b1: 'Othman finally reaches the summit. Before his eyes stretches the whole valley bathed in gold: his room, the crossroads, the reconciled market, the orchard, and the family courtyard.',
      s45_b2: 'You crossed every stage not by strength of arms, but by nobility of heart: Istiʿādhah, Hilm, Tawakkul, Birr, and Sabr.',
      s45_b3: 'And to you who walked alongside Othman all this way: thank you for every thoughtful choice and every real-life gesture. The finest adventure continues now, beyond the screen.',
      s45_end: 'Congratulations! You have completed all 5 chapters of NOUR: The Path of Wisdom.'
    },
    choices: {
      c40_pas: { label: '"One step at a time, with Bismillāh. Even slowly, I keep moving."', habitMessage: 'Calm perseverance turns steep slopes into reachable steps.' },
      c40_souffle: { label: '"I catch my breath calmly and keep my eyes on the light."', habitMessage: 'Pausing to breathe without quitting is true strength.' },
      c43_partage: { label: '"Share the light I received with those who still doubt."', habitMessage: 'True light grows brighter whenever it is shared.' },
      c43_confiance: { label: '"Place my Tawakkul in Allah and keep learning all my life."', habitMessage: 'Humility and trust in Allah are the finest companions on the road.' }
    },
    quizzes: {
      quiz_sabr_constance: {
        topic: 'Consistency in Good Deeds (Al-Istiqāmah)',
        question: 'According to a famous hadith of the Prophet ﷺ, which deeds are most beloved to Allah?',
        options: {
          A: 'Those done once in a dramatic way in front of everyone.',
          B: 'The most consistent over time, even if they are small.',
          C: 'Those done only when one feels zero fatigue.',
          D: 'Those that require succeeding perfectly on the very first try.'
        },
        explanation: 'The Prophet ﷺ taught that humble regularity outweighs a single burst of effort: one faithful small gesture each day transforms the heart.',
        theologicalNote: 'Perseverance (Sabr) is built step by step, without giving up.'
      },
      quiz_sabr_facilite: {
        topic: 'With Hardship Comes Ease',
        question: 'What promise of hope does Allah repeat twice in Surah Ash-Sharḥ (94:5-6)?',
        options: {
          A: 'That the believer’s path will never contain any trial.',
          B: 'That one should wait for others to solve all hardships.',
          C: 'That indeed, with hardship comes ease.',
          D: 'That fatigue vanishes as soon as one stops climbing.'
        },
        explanation: 'Allah reminds us twice that ease accompanies hardship: no climb lasts forever for the one who moves forward with patience and trust.',
        theologicalNote: 'One hardship can never overcome two eases.'
      }
    },
    realActions: {
      action_petite_constance: {
        title: 'The Small Daily Step',
        instruction: 'Choose one simple good habit you can keep every day this week (saying Bismillāh before eating, tidying your desk, or praying for your parents at night).',
        subtext: '"The most beloved deeds to Allah are the most consistent, even if small." (Bukhari 6464)',
        reflectionPrompt: 'Which small faithful habit do you choose to keep this week?'
      },
      action_encourager_proche: {
        title: 'The Shared Lantern',
        instruction: 'Think of someone around you making an effort right now (a sibling, friend, or parent) and offer them a sincere word of encouragement.',
        subtext: '"Indeed, with hardship comes ease." (Quran 94:5-6)',
        reflectionPrompt: 'Who did you choose to encourage today?'
      }
    },
    climaxSteps: {}
  },
  ar: {
    scenes: {
      40: { title: 'دَرْبُ الْقِمَمِ', subtitle: '« أَوَّلُ نَفَسٍ فِي الصُّعُودِ »', location: 'سَفْحُ الْوَادِي، فَجْرٌ نَدِيٌّ' },
      41: { title: 'الثَّبَاتُ فِي الِاسْتِعَاذَةِ', subtitle: '« الْمُدَاوَمَةُ أَمَامَ الشَّكِّ »', location: 'دَرْبُ الزَّيْتُونِ تَحْتَ الضَّبَابِ' },
      42: { title: 'الِاسْتِرَاحَةُ عَلَى الْمُنْحَدَرِ', subtitle: '« حِفْظُ اللُّطْفِ عِنْدَ التَّعَبِ »', location: 'شُرْفَةٌ حَجَرِيَّةٌ فِي مُنْتَصَفِ الطَّرِيقِ' },
      43: { title: 'الْأَيَادِي الَّتِي تَسْنُدُ', subtitle: '« لَسْتَ وَحْدَكَ عَلَى الدَّرْبِ »', location: 'بُسْتَانُ الْمُرْتَفَعَاتِ، مِصْبَاحٌ مُضِيءٌ' },
      44: { title: 'قِمَّةُ الِاخْتِبَارِ', subtitle: '« الْمُوَاجَهَةُ الْأَخِيرَةُ لِلصَّبْرِ »', location: 'مَمَرُّ الْقِمَمِ، سَمَاءٌ مُتَوَهِّجَةٌ' },
      45: { title: 'النُّورُ فَوْقَ الْوَادِي', subtitle: '« الرِّحْلَةُ الْحَقِيقِيَّةُ تَبْدَأُ الْآنَ »', location: 'الْقِمَّةُ الْمُطِلَّةُ، فَجْرٌ ذَهَبِيٌّ عَلَى الْوَادِي' }
    },
    beats: {
      s40_b1: 'يُدَاعِبُ هَوَاءُ الصَّبَاحِ الْبَارِدُ التِّلَالَ، وَأَمَامَ عُثْمَانَ يَرْتَفِعُ الدَّرْبُ الصَّخْرِيُّ نَحْوَ الْقِمَّةِ حَيْثُ يَنْكَشِفُ الْوَادِي كُلُّهُ.',
      s40_b2: 'الصُّعُودُ أَشَدُّ انْحِدَارًا مِمَّا تَصَوَّرْتُ… قَدَمَايَ ثَقِيلَتَانِ وَالْقِمَّةُ مَا زَالَتْ بَعِيدَةً جِدًّا.',
      s40_b3: 'مَا فَائِدَةُ الْمُوَاصَلَةِ؟ لَقَدْ أَنْهَيْتَ أَرْبَعَةَ فُصُولٍ، هَذَا يَكْفِي! انْزِلْ وَاسْتَرِحْ، لَنْ يَلُومَكَ أَحَدٌ إِذَا تَوَقَّفْتَ.',
      s40_b4: 'لَا تَنْظُرْ إِلَى الْجَبَلِ كُلِّهِ دُفْعَةً وَاحِدَةً يَا عُثْمَانُ، بَلِ انْظُرْ إِلَى الْخُطْوَةِ التَّالِيَةِ أَمَامَ قَدَمِكَ وَتَقَدَّمْ بِثَبَاتٍ.',
      s40_choice: 'يُثْقِلُ التَّعَبُ كَتِفَيْ عُثْمَانَ. كَيْفَ يَخْتَارُ مُوَاصَلَةَ الصُّعُودِ؟',
      s41_b1: 'يَنْسَابُ ضَبَابٌ بَنَفْسَجِيٌّ بَيْنَ الصُّخُورِ، وَتَعُودُ الشُّكُوكُ الْقَدِيمَةُ لِتُوَسْوِسَ فِي أُذُنِ عُثْمَانَ.',
      s41_b2: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ! أَعْرِفُكَ الْآنَ أَيُّهَا الْوَسْوَاسُ، تُرِيدُ أَنْ تُنْسِيَنِي كُلَّ مَا تَجَاوَزْتُهُ.',
      s41_b3: 'تَذَكَّرِ الْقَاعِدَةَ الذَّهَبِيَّةَ لِلصَّبْرِ: لَيْسَتْ إِنْجَازَاتُ يَوْمٍ وَاحِدٍ مَا يَبْنِي الْإِنْسَانَ، بَلِ الْخُطُوَاتُ الصَّغِيرَةُ الدَّائِمَةُ.',
      s41_quiz: 'تَطْرَحُ نُورَةُ سُؤَالًا عَنْ قِيمَةِ الْمُدَاوَمَةِ:',
      s41_action: 'ثَبِّتْ صَبْرَكَ بِخُطْوَةٍ بَسِيطَةٍ فِي يَوْمِكَ.',
      s42_b1: 'فِي مُنْتَصَفِ الطَّرِيقِ، يَصْطَدِمُ مُسَافِرٌ شَابٌّ مُسْتَعْجِلٌ بِعُثْمَانَ أَثْنَاءَ نُزُولِهِ فَتَسْقُطُ قِرْبَتُهُ عَلَى التُّرَابِ.',
      s42_b2: 'كِدْتُ أَغْضَبُ بِسَبَبِ التَّعَبِ… لَكِنِّي تَعَلَّمْتُ الْحِلْمَ فِي السُّوقِ، فَالْغَضَبُ لَمْ يُسَاعِدْ أَحَدًا يَوْمًا عَلَى الصُّعُودِ.',
      s42_b3: 'لَا بَأْسَ يَا أَخِي! الطَّرِيقُ زَلِقٌ هُنَا. انْتَبِهْ لِخُطُوَاتِكَ وَأَنْتَ تَنْزِلُ، السَّلَامُ عَلَيْكُمْ.',
      s42_b4: 'يَتَوَقَّفُ الْمُسَافِرُ مُنْدَهِشًا مِنْ هَذَا اللُّطْفِ، فَيَعْتَذِرُ وَيَمْضِي مُبْتَسِمًا، وَيَشْعُرُ عُثْمَانُ أَنَّ تَعَبَهُ قَدْ خَفَّ كَثِيرًا.',
      s42_quiz: 'يُذَكِّرُ الْحَكِيمُ بِالْوَعْدِ الْقُرْآنِيِّ الَّذِي يُقَوِّي كُلَّ مُجْتَهِدٍ:',
      s43_b1: 'يَا عُثْمَانُ! لَحِقْتُ بِكَ! أَرْسَلَ مَعِي وَالِدُكَ هَذَا الْمِصْبَاحَ الصَّغِيرَ وَبَعْضَ التَّمْرِ لِلْمَرْحَلَةِ الْأَخِيرَةِ.',
      s43_b2: 'الْحَمْدُ لِلَّهِ! بَيْنَ دَعَوَاتِ وَالِدَيَّ، وَصَبْرِ الْفَتَى ذِي الْجَبِيرَةِ، وَصُحْبَتِكَ يَا بِلَالُ، أَدْرَكْتُ أَنَّنَا لَا نَسِيرُ وَحْدَنَا أَبَدًا فِي طَرِيقِ الْخَيْرِ.',
      s43_choice: 'قَبْلَ الْمُنْعَطَفِ الْأَخِيرِ نَحْوَ الْقِمَّةِ، مَا النِّيَّةُ الَّتِي يَضَعُهَا عُثْمَانُ فِي قَلْبِهِ؟',
      s43_action: 'كُنْ أَنْتَ أَيْضًا مِصْبَاحًا لِمَنْ حَوْلَكَ.',
      s44_b1: 'قُبَيْلَ الْقِمَّةِ، يَجْمَعُ الظِّلُّ كُلَّ وَسَاوِسِهِ: الْعُزْلَةَ، وَالْغَضَبَ، وَالْيَأْسَ، وَالْجُحُودَ! لَكِنَّ عُثْمَانَ يَرْفَعُ مِصْبَاحَهُ عَالِيًا.',
      s44_climax: 'اسْتَحْضِرْ كُلَّ الْقِيَمِ الَّتِي تَعَلَّمْتَهَا مُنْذُ الْفَصْلِ الْأَوَّلِ لِتَبْلُغَ الْقِمَّةَ!',
      s45_b1: 'يَصِلُ عُثْمَانُ أَخِيرًا إِلَى الْقِمَّةِ، وَتَمْتَدُّ أَمَامَ عَيْنَيْهِ الْوَادِي كُلُّهُ غَارِقًا فِي النُّورِ الذَّهَبِيِّ: غُرْفَتُهُ، وَالْمُفْتَرَقُ، وَالسُّوقُ الْمُتَصَالِحُ، وَالْبُسْتَانُ، وَفِنَاءُ الْبَيْتِ.',
      s45_b2: 'لَقَدْ تَجَاوَزْتَ كُلَّ مَرْحَلَةٍ لَا بِقُوَّةِ الْجَسَدِ، بَلْ بِنُبْلِ الْقَلْبِ: الِاسْتِعَاذَةُ، وَالْحِلْمُ، وَالتَّوَكُّلُ، وَالْبِرُّ، وَالصَّبْرُ.',
      s45_b3: 'وَأَنْتَ يَا مَنْ رَافَقْتَ عُثْمَانَ حَتَّى هُنَا: شُكْرًا لِكُلِّ اخْتِيَارٍ وَاعٍ وَلِكُلِّ عَمَلٍ طَيِّبٍ فِي حَيَاتِكَ الْوَاقِعِيَّةِ. أَجْمَلُ مُغَامَرَةٍ تَبْدَأُ الْآنَ خَارِجَ الشَّاشَةِ.',
      s45_end: 'مُبَارَكٌ! لَقَدْ أَتْمَمْتَ الْفُصُولَ الْخَمْسَةَ لِلُعْبَةِ نُور: طَرِيقُ الْحِكْمَةِ.'
    },
    choices: {
      c40_pas: { label: '« خُطْوَةً بَعْدَ خُطْوَةٍ بِبِسْمِ اللَّهِ، حَتَّى بِبُطْءٍ سَأَسْتَمِرُّ. »', habitMessage: 'الصَّبْرُ الْهَادِئُ يُحَوِّلُ الْعَقَبَاتِ الْكَبِيرَةَ إِلَى خُطُوَاتٍ مُمْكِنَةٍ.' },
      c40_souffle: { label: '« أَلْتَقِطُ أَنْفَاسِي بِهُدُوءٍ وَأُثَبِّتُ نَظَرِي نَحْوَ النُّورِ. »', habitMessage: 'الِاسْتِرَاحَةُ دُونَ اسْتِسْلَامٍ قُوَّةٌ حَقِيقِيَّةٌ.' },
      c43_partage: { label: '« أَنْ أُشَارِكَ النُّورَ الَّذِي تَعَلَّمْتُهُ مَعَ مَنْ لَا يَزَالُ يَشُكُّ. »', habitMessage: 'النُّورُ الْحَقِيقِيُّ يَزْدَادُ كُلَّمَا شَارَكْنَاهُ.' },
      c43_confiance: { label: '« أَنْ أَتَوَكَّلَ عَلَى اللَّهِ وَأَسْتَمِرَّ فِي التَّعَلُّمِ طَوَالَ حَيَاتِي. »', habitMessage: 'التَّوَاضُعُ وَالتَّوَكُّلُ عَلَى اللَّهِ خَيْرُ رَفِيقٍ فِي الطَّرِيقِ.' }
    },
    quizzes: {
      quiz_sabr_constance: {
        topic: 'الْمُدَاوَمَةُ عَلَى الْخَيْرِ',
        question: 'بِحَسَبِ حَدِيثِ النَّبِيِّ ﷺ، مَا أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ تَعَالَى؟',
        options: {
          A: 'الَّتِي نَفْعَلُهَا مَرَّةً وَاحِدَةً بِشَكْلٍ كَبِيرٍ أَمَامَ النَّاسِ.',
          B: 'أَدْوَمُهَا وَأَثْبَتُهَا مَعَ الزَّمَنِ وَإِنْ كَانَتْ قَلِيلَةً.',
          C: 'الَّتِي نَقُومُ بِهَا فَقَطْ حِينَ لَا نَشْعُرُ بِأَيِّ تَعَبٍ.',
          D: 'الَّتِي تَتَطَلَّبُ النَّجَاحَ الْكَامِلَ مِنَ الْمُحَاوَلَةِ الْأُولَى.'
        },
        explanation: 'عَلَّمَنَا النَّبِيُّ ﷺ أَنَّ الْمُدَاوَمَةَ الْبَسِيطَةَ خَيْرٌ مِنْ حَمَاسِ يَوْمٍ وَاحِدٍ؛ فَعَمَلٌ صَغِيرٌ دَائِمٌ يُصْلِحُ الْقَلْبَ.',
        theologicalNote: 'الصَّبْرُ يُبْنَى خُطْوَةً بِخُطْوَةٍ دُونَ يَأْسٍ.'
      },
      quiz_sabr_facilite: {
        topic: 'مَعَ الْعُسْرِ يُسْرٌ',
        question: 'مَا الْوَعْدُ الْمُطَمْئِنُ الَّذِي كَرَّرَهُ اللَّهُ مَرَّتَيْنِ فِي سُورَةِ الشَّرْحِ (٩٤:٥-٦)؟',
        options: {
          A: 'أَنَّ طَرِيقَ الْمُؤْمِنِ لَنْ يَخْلُوَ مِنْ أَيِّ صُعُوبَةٍ أَبَدًا.',
          B: 'أَنْ نَنْتَظِرَ الْآخَرِينَ لِيَحُلُّوا الصُّعُوبَاتِ عَنَّا.',
          C: 'أَنَّ مَعَ الْعُسْرِ يُسْرًا حَقًّا.',
          D: 'أَنَّ التَّعَبَ يَخْتَفِي بِمُجَرَّدِ التَّوَقُّفِ عَنِ الصُّعُودِ.'
        },
        explanation: 'ذَكَّرَنَا اللَّهُ مَرَّتَيْنِ أَنَّ الْيُسْرَ يُرَافِقُ الْعُسْرَ؛ فَلَا صُعُودَ يَدُومُ إِلَى الْأَبَدِ لِمَنْ يَصْبِرُ وَيَتَوَكَّلُ.',
        theologicalNote: 'لَنْ يَغْلِبَ عُسْرٌ يُسْرَيْنِ.'
      }
    },
    realActions: {
      action_petite_constance: {
        title: 'الْخُطْوَةُ الْيَوْمِيَّةُ الصَّغِيرَةُ',
        instruction: 'اخْتَرْ عَادَةً طَيِّبَةً بَسِيطَةً تُحَافِظُ عَلَيْهَا كُلَّ يَوْمٍ هَذَا الْأُسْبُوعَ (قَوْلُ بِسْمِ اللَّهِ، تَرْتِيبُ مَكَانِكَ، أَوِ الدُّعَاءُ لِوَالِدَيْكَ).',
        subtext: '« أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ » (الْبُخَارِيُّ ٦٤٦٤)',
        reflectionPrompt: 'مَا الْعَادَةُ الصَّغِيرَةُ الَّتِي اخْتَرْتَ الْمُدَاوَمَةَ عَلَيْهَا هَذَا الْأُسْبُوعَ؟'
      },
      action_encourager_proche: {
        title: 'الْمِصْبَاحُ الْمُشْتَرَكُ',
        instruction: 'فَكِّرْ فِي شَخْصٍ حَوْلَكَ يَبْذُلُ جُهْدًا هَذِهِ الْأَيَّامَ وَقَدِّمْ لَهُ كَلِمَةَ تَشْجِيعٍ صَادِقَةً.',
        subtext: '« فَإِنَّ مَعَ الْعُسْرِ يُسْرًا » (سُورَةُ الشَّرْحِ ٩٤:٥-٦)',
        reflectionPrompt: 'مَنِ الشَّخْصُ الَّذِي اخْتَرْتَ تَشْجِيعَهُ الْيَوْمَ؟'
      }
    },
    climaxSteps: {}
  }
};
