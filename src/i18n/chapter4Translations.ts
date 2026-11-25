import type { Chapter1TranslationSet } from './chapter1Translations';

// Traductions du chapitre 4 (« Ce que tu as encore » — Birr al-Wālidayn) : anglais et arabe vocalisé.
// ⚠️ La version arabe et les références religieuses sont à faire relire par un arabophone natif et par un savant.

export const CHAPTER_4_TRANSLATIONS: { en: Chapter1TranslationSet; ar: Chapter1TranslationSet } = {
  en: {
    scenes: {
      30: { title: 'The Impatient Morning', subtitle: '« Words Faster Than Thought »', location: 'Family courtyard, bright morning' },
      31: { title: 'Under the Great Tree', subtitle: '« The Roots That Nourish »', location: 'Hill of the ancient tree, morning light' },
      32: { title: 'The Confidence', subtitle: '« What You Still Have »', location: 'Shaded terrace of the tea stop' },
      33: { title: 'Returning Home', subtitle: '« The Silent Gestures »', location: 'Family courtyard, midday' },
      34: { title: 'The Healing Gesture', subtitle: '« Better Than Words: An Act »', location: 'Family courtyard, peaceful afternoon' },
      35: { title: 'The Shadow of Ingratitude', subtitle: '« The Duel of Birr al-Wālidayn »', location: 'Twilight path, purple mist' },
      36: { title: 'The Evening That Calms', subtitle: '« The Blessing of Home »', location: 'Valley heights, golden dusk' }
    },
    beats: {
      s30_b1: 'Morning sunlight filters softly through the leaves of the family courtyard. The scent of warm bread fills the air, but Othman is in a hurry to meet his friends.',
      s30_b2: 'Othman, my son, before you leave, could you help me bring in the olive baskets and tidy your satchel? Your father already carried the crates this morning.',
      s30_b3: 'Always chores! Every time you want to go out, they hold you back. Tell her you do not have time — you already helped enough this week!',
      s30_b4: 'Uff! Always me! I just wanted to leave five minutes earlier… Can you not see I am already late?',
      s30_b5: 'The wooden door shuts sharply behind Othman. In the courtyard, Noura does not reply with anger: she simply lowers her eyes, slightly hurt, and picks up the basket alone.',
      s30_choice: 'Only a few steps outside the house, Othman’s heart tightens. What does he tell himself?',
      s30_quiz: 'A verse that Noura often recited comes back to Othman’s mind…',
      s31_b1: 'On the hillside overlooking the valley, a huge ancient tree spreads its gnarled roots over mossy stones. Othman’s childhood friend sits on the wooden bench, looking up at the branches.',
      s31_b2: 'As-salāmu ʿalaykum Othman! Come look up there on the low branch: a little bird has been flying back and forth for an hour.',
      s31_b3: 'Wa ʿalaykum as-salām Bilal… It looks exhausted, and yet it keeps going back to fetch twigs and seeds for its nest.',
      s31_b4: 'You are watching a beautiful sign, my children. Look also at the roots of this tree: you barely see them beneath the earth, yet without them not a single leaf would turn green.',
      s31_b5: 'The roots… They work in silence so the tree stands tall. Just like my mother and father at home.',
      s31_quiz: 'The Grandfather smiles and asks the two children a question:',
      s31_action: 'Before moving on, take a moment to notice what is easy to overlook.',
      s32_b1: 'Under the vine pergola, two glasses of mint tea steam gently. Othman admits to Bilal that he snapped at his mother this morning.',
      s32_b2: 'You know, Othman… My father works far away in the next town all week, and when he comes home he is so tired that we barely have time to talk.',
      s32_b3: 'Sometimes I wish so much he would ask me to carry a basket with him or tidy the courtyard together. You have them right beside you every morning…',
      s32_b4: 'Forgive me, Bilal… I complained about what others long for so deeply. I took their presence for granted.',
      s32_choice: 'How does Othman respond to his friend’s confidence?',
      s33_b1: 'When Othman gently pushes open the courtyard gate, he sees his father stitching the worn strap of his satchel, while Noura carefully prepares a simple meal.',
      s33_b2: 'Welcome back, Othman. Your strap was about to snap on the trail, so I sewed it up so it lasts a long time.',
      s33_b3: 'Father… You took the time to fix my satchel without even telling me? And I walked out grumbling this morning…',
      s33_b4: 'A parent does not help to keep score, my son. Yet a gentle word and a sincere thank-you rest the heart more than an hour of sleep.',
      s33_quiz: 'Othman’s father recalls the counsel of the wise Luqmān in the Quran:',
      s33_action: 'Do not keep your gratitude locked inside your heart.',
      s34_b1: 'Mother… I am sorry for saying "Uff" this morning and slamming the door. You do so much for us, and I lacked gentleness.',
      s34_b2: 'Your heart returned to the light, Othman, and that is all that matters. I forgive you with all my heart.',
      s34_choice: 'Othman wants to follow his apology with a real act of Birr. What does he choose?',
      s34_quiz: 'Before the afternoon ends, Noura reminds him of a beautiful Quranic prayer:',
      s34_action: 'Now it is your turn to offer a concrete gesture in your own home.',
      s35_b1: 'A purple mist tries one last time to cloud Othman’s gratitude: "Your parents only did their duty! Why tire yourself thanking them? You have better things to do!"',
      s35_climax: 'Defend gratitude and kindness toward parents against the whispers of ingratitude!',
      s36_b1: 'The sun sinks slowly behind the hills. The lantern of the family courtyard glows with a new warmth, softer than ever.',
      s36_b2: 'May Allah bless you, Othman. The one who honors his roots does not fear the wind on the peaks.',
      s36_b3: 'You learned to see what you still have: hands that watch over you, hearts that pray for you. Tomorrow, one final summit awaits you on the path of perseverance.',
      s36_end: 'Well done! You completed Chapter 4: "What You Still Have" (Birr al-Wālidayn).'
    },
    choices: {
      c30_regret: { label: '"I spoke too fast… That ‘Uff’ is not who I want to be."', habitMessage: 'Admitting a mistake is already the first step toward making it right.' },
      c30_marcher: { label: '"I need to walk to the great tree to reflect calmly."', habitMessage: 'Stepping back helps you see more clearly before returning with gentle words.' },
      c32_soutien: { label: '"May Allah make your father’s work easy and gather you often in peace."', habitMessage: 'A sincere prayer comforts a friend’s heart and reminds us of our blessings.' },
      c32_promesse: { label: '"Thank you for opening my eyes. I will go home right now to repair my words."', habitMessage: 'Turning awareness into immediate action is a sign of true maturity.' },
      c34_paniers: { label: 'Bring in all the olive baskets right away and sweep the courtyard.', habitMessage: 'A concrete service immediately lifts the weight from those we love.' },
      c34_the: { label: 'Prepare the mint tea tray and invite his parents to sit and rest.', habitMessage: 'Offering rest to one’s parents is a tender and thoughtful gesture.' }
    },
    quizzes: {
      quiz_birr_parole: {
        topic: 'Noble Speech Toward Parents',
        question: 'In Surah Al-Isrāʾ (17:23), what attitude does the Quran teach when we feel irritated with our parents?',
        options: {
          A: 'Answer sharply in the moment, then apologize the next day.',
          B: 'Do not even say "Uff" to them, do not repel them, and speak to them with noble words.',
          C: 'Stay silent and turn away until they change their mind.',
          D: 'Speak gently only when we agree with what they ask.'
        },
        explanation: 'Verse 17:23 teaches us not even to utter a sigh of annoyance ("Uff") toward our parents, and always to choose respectful, kind words.',
        theologicalNote: 'Kindness to parents starts with the tone of our voice, even when tired or upset.'
      },
      quiz_birr_mere: {
        topic: 'The Rank of Mother and Father',
        question: 'When a man asked the Prophet ﷺ who most deserved his good companionship, what did he answer?',
        options: {
          A: '"Your closest friends, then your nearby neighbors."',
          B: '"Your father first, then your teacher, then your mother."',
          C: '"Your mother," he repeated three times, then the fourth time: "Your father."',
          D: '"Whoever does the most favors for you during the day."'
        },
        explanation: 'The Prophet ﷺ mentioned the mother three times before the father, honoring her tenderness, hardship, and quiet care from the very beginning.',
        theologicalNote: 'Both parents hold an immense rank; the repetition honors the mother’s unseen efforts.'
      },
      quiz_birr_shukr: {
        topic: 'Gratitude (Shukr) to Allah and Parents',
        question: 'In Surah Luqmān (31:14), what does Allah directly pair with gratitude toward Him?',
        options: {
          A: 'Gratitude toward one’s parents.',
          B: 'Success in distant travels.',
          C: 'Accumulating wealth for the future.',
          D: 'Winning debates in front of the village.'
        },
        explanation: 'The Quran links being thankful to Allah with being thankful to our parents: appreciating those who care for us each day brings blessing.',
        theologicalNote: 'Whoever does not thank people does not fully thank Allah.'
      },
      quiz_birr_invocation: {
        topic: 'Supplication for Parents',
        question: 'Which Quranic supplication (17:24) teaches us to ask for Allah’s mercy upon our parents?',
        options: {
          A: '"My Lord, make me stronger than all my companions."',
          B: '"My Lord, have mercy upon them as they brought me up when I was small."',
          C: '"My Lord, keep every difficult chore at home away from me."',
          D: '"My Lord, give me patience until they change."'
        },
        explanation: 'This supplication from Surah Al-Isrāʾ (17:24) softens the heart and reminds us how our parents carried and raised us when we were small.',
        theologicalNote: 'Praying for one’s parents is a gift that lasts a lifetime.'
      }
    },
    realActions: {
      action_observer_soin: {
        title: 'See the Unseen',
        instruction: 'Today, notice at least one quiet thing a parent does for you without asking (a meal, laundry, a ride, advice) and thank Allah in your heart.',
        subtext: '"Be grateful to Me and to your parents." (Quran 31:14)',
        reflectionPrompt: 'What quiet act of care from your mother or father did you notice today?'
      },
      action_merci_parent: {
        title: 'The Gentle Word',
        instruction: 'Go to your mother or father (or call them) and simply say "Thank you for everything you do for me" with a sincere smile.',
        subtext: '"Speak to them with noble words." (Quran 17:23)',
        reflectionPrompt: 'How did they react when they heard your sincere thank-you?'
      },
      action_service_maison: {
        title: 'The Healing Gesture',
        instruction: 'Without waiting to be asked, help with a concrete task at home (clear the table, tidy a room, carry a bag, or bring a glass of water).',
        subtext: '"My Lord, have mercy upon them as they brought me up when I was small." (Quran 17:24)',
        reflectionPrompt: 'How did you feel after helping spontaneously?'
      }
    },
    climaxSteps: {}
  },
  ar: {
    scenes: {
      30: { title: 'صَبَاحُ الضَّيْقِ', subtitle: '« كَلِمَةٌ سَبَقَتِ التَّفْكِيرَ »', location: 'فِنَاءُ الْبَيْتِ الْعَائِلِيِّ، صَبَاحٌ مُشْرِقٌ' },
      31: { title: 'تَحْتَ الشَّجَرَةِ الْكَبِيرَةِ', subtitle: '« الْجُذُورُ الَّتِي تُغَذِّي »', location: 'تَلَّةُ الشَّجَرَةِ الْعَتِيقَةِ، نُورُ الصَّبَاحِ' },
      32: { title: 'بَوْحُ الصَّدِيقِ', subtitle: '« مَا لَا تَزَالُ تَمْلِكُهُ »', location: 'شُرْفَةُ اسْتِرَاحَةِ الشَّايِ الظَّلِيلَةُ' },
      33: { title: 'الْعَوْدَةُ إِلَى الْبَيْتِ', subtitle: '« الْأَفْعَالُ الصَّامِتَةُ »', location: 'فِنَاءُ الْبَيْتِ، مُنْتَصَفَ النَّهَارِ' },
      34: { title: 'الْخُطْوَةُ الْمُصْلِحَةُ', subtitle: '« أَجْمَلُ مِنَ الْكَلَامِ: الْعَمَلُ »', location: 'فِنَاءُ الْبَيْتِ، بَعْدَ الظُّهْرِ' },
      35: { title: 'ظِلُّ الْجُحُودِ', subtitle: '« مُوَاجَهَةُ بِرِّ الْوَالِدَيْنِ »', location: 'دَرْبُ الْغُرُوبِ، ضَبَابٌ بَنَفْسَجِيٌّ' },
      36: { title: 'الْمَسَاءُ الْمُطْمَئِنُّ', subtitle: '« بَرَكَةُ الْبَيْتِ »', location: 'مُرْتَفَعَاتُ الْوَادِي، غُرُوبٌ ذَهَبِيٌّ' }
    },
    beats: {
      s30_b1: 'تَتَسَلَّلُ شَمْسُ الصَّبَاحِ بِرِفْقٍ بَيْنَ أَوْرَاقِ فِنَاءِ الْبَيْتِ، وَتَفُوحُ رَائِحَةُ الْخُبْزِ الدَّافِئِ، لَكِنَّ عُثْمَانَ مُسْتَعْجِلٌ لِلِقَاءِ أَصْدِقَائِهِ.',
      s30_b2: 'يَا عُثْمَانُ بُنَيَّ، قَبْلَ أَنْ تَخْرُجَ، هَلْ يُمْكِنُكَ مُسَاعَدَتِي فِي إِدْخَالِ سِلَالِ الزَّيْتُونِ وَتَرْتِيبِ حَقِيبَتِكَ؟ فَقَدْ حَمَلَ وَالِدُكَ الصَّنَادِيقَ مُنْذُ الصَّبَاحِ.',
      s30_b3: 'دَائِمًا أَعْمَالٌ وَطَلَبَاتٌ! كُلَّمَا أَرَدْتَ الْخُرُوجَ أَوْقَفُوكَ. قُلْ لَهَا إِنَّكَ لَا تَمْلِكُ وَقْتًا، لَقَدْ سَاعَدْتَ بِمَا فِيهِ الْكِفَايَةُ!',
      s30_b4: 'أُفٍّ! دَائِمًا أَنَا! أَرَدْتُ فَقَطْ أَنْ أَخْرُجَ قَبْلَ خَمْسِ دَقَائِقَ… أَلَا تَرَيْنَ أَنَّنِي تَأَخَّرْتُ؟',
      s30_b5: 'أُغْلِقَ الْبَابُ الْخَشَبِيُّ بِقُوَّةٍ خَلْفَ عُثْمَانَ. فِي الْفِنَاءِ، لَمْ تَرُدَّ نُورَةُ بِالْغَضَبِ، بَلْ أَطْرَقَتْ بِحُزْنٍ هَادِئٍ وَحَمَلَتِ السَّلَّةَ وَحْدَهَا.',
      s30_choice: 'بَعْدَ خُطُوَاتٍ قَلِيلَةٍ خَارِجَ الْبَيْتِ، انْقَبَضَ قَلْبُ عُثْمَانَ. مَاذَا يَقُولُ لِنَفْسِهِ؟',
      s30_quiz: 'تَذَكَّرَ عُثْمَانُ آيَةً كَرِيمَةً كَانَتْ نُورَةُ تَتْلُوهَا كَثِيرًا…',
      s31_b1: 'عَلَى التَّلَّةِ الْمُطِلَّةِ عَلَى الْوَادِي، تَمُدُّ شَجَرَةٌ عَتِيقَةٌ جُذُورَهَا الْقَوِيَّةَ فَوْقَ الصُّخُورِ. يَجْلِسُ صَدِيقُ الطُّفُولَةِ بِلَالٌ عَلَى الْمَقْعَدِ الْخَشَبِيِّ يَنْظُرُ إِلَى الْأَغْصَانِ.',
      s31_b2: 'السَّلَامُ عَلَيْكُمْ يَا عُثْمَانُ! تَعَالَ انْظُرْ هُنَاكَ عَلَى الْغُصْنِ: عُصْفُورٌ صَغِيرٌ يَذْهَبُ وَيَعُودُ مُنْذُ سَاعَةٍ كَامِلَةٍ.',
      s31_b3: 'وَعَلَيْكُمُ السَّلَامُ يَا بِلَالُ… يَبْدُو مُتْعَبًا جِدًّا، وَمَعَ ذَلِكَ يَعُودُ بِالْحَبِّ وَالْأَغْصَانِ إِلَى عُشِّهِ دُونَ مَلَلٍ.',
      s31_b4: 'أَنْتُمَا تَتَأَمَّلَانِ آيَةً جَمِيلَةً يَا بُنَيَّ. انْظُرَا أَيْضًا إِلَى جُذُورِ هَذِهِ الشَّجَرَةِ: لَا نَكَادُ نَرَاهَا تَحْتَ الْأَرْضِ، وَلَوْلَاهَا مَا اخْضَرَّتْ وَرَقَةٌ وَاحِدَةٌ.',
      s31_b5: 'الْجُذُورُ… تَعْمَلُ فِي صَمْتٍ لِتَبْقَى الشَّجَرَةُ وَاقِفَةً. مِثْلَ أُمِّي وَأَبِي فِي الْبَيْتِ تَمَامًا.',
      s31_quiz: 'ابْتَسَمَ الْجَدُّ وَطَرَحَ سُؤَالًا عَلَى الطِّفْلَيْنِ:',
      s31_action: 'قَبْلَ أَنْ تُوَاصِلَ، خُذْ لَحْظَةً لِتَرَى مَا لَمْ تَعُدْ تُلَاحِظُهُ.',
      s32_b1: 'تَحْتَ عَرِيشِ الْعِنَبِ، يَتَصَاعَدُ بُخَارُ كُوبَيْنِ مِنَ الشَّايِ بِالنَّعْنَاعِ. بَاحَ عُثْمَانُ لِبِلَالٍ بِأَنَّهُ تَضَايَقَ مِنْ أُمِّهِ هَذَا الصَّبَاحَ.',
      s32_b2: 'أَتَعْلَمُ يَا عُثْمَانُ… أَبِي يَعْمَلُ بَعِيدًا فِي الْمَدِينَةِ الْمُجَاوِرَةِ طَوَالَ الْأُسْبُوعِ، وَحِينَ يَعُودُ يَكُونُ مُرْهَقًا جِدًّا حَتَّى لَا نَكَادُ نَجْلِسُ مَعًا.',
      s32_b3: 'أَحْيَانًا أَتَمَنَّى كَثِيرًا أَنْ يَطْلُبَ مِنِّي حَمْلَ سَلَّةٍ مَعَهُ أَوْ تَرْتِيبَ الْفِنَاءِ سَوِيًّا. أَنْتَ تَرَاهُمَا بِجَانِبِكَ كُلَّ صَبَاحٍ…',
      s32_b4: 'سَامِحْنِي يَا بِلَالُ… تَذَمَّرْتُ مِنْ نِعْمَةٍ يَتَمَنَّاهَا غَيْرِي. ظَنَنْتُ وُجُودَهُمَا أَمْرًا عَادِيًّا.',
      s32_choice: 'كَيْفَ يَرُدُّ عُثْمَانُ عَلَى بَوْحِ صَدِيقِهِ؟',
      s33_b1: 'حِينَ فَتَحَ عُثْمَانُ بَابَ الْفِنَاءِ بِهُدُوءٍ، رَأَى وَالِدَهُ يَخِيطُ حِزَامَ حَقِيبَتِهِ الْمُمَزَّقَ، بَيْنَمَا تُعِدُّ نُورَةُ طَعَامًا دَافِئًا بِعِنَايَةٍ.',
      s33_b2: 'مَرْحَبًا بِعَوْدَتِكَ يَا عُثْمَانُ. كَادَ حِزَامُ حَقِيبَتِكَ يَنْقَطِعُ فِي الطَّرِيقِ، فَأَصْلَحْتُهُ لَكَ كَيْ يَدُومَ طَوِيلًا.',
      s33_b3: 'أَبِي… أَصْلَحْتَ حَقِيبَتِي دُونَ أَنْ تُخْبِرَنِي؟ وَأَنَا خَرَجْتُ مُتَذَمِّرًا هَذَا الصَّبَاحَ…',
      s33_b4: 'الْوَالِدُ لَا يُسَاعِدُ لِيَعُدَّ الْجَمِيلَ يَا بُنَيَّ، لَكِنَّ كَلِمَةً طَيِّبَةً وَشُكْرًا صَادِقًا يُرِيحَانِ الْقَلْبَ أَكْثَرَ مِنْ سَاعَةِ نَوْمٍ.',
      s33_quiz: 'ذَكَرَ وَالِدُ عُثْمَانَ وَصِيَّةَ الْقُرْآنِ فِي سُورَةِ لُقْمَانَ:',
      s33_action: 'لَا تَحْبِسْ شُكْرَكَ دَاخِلَ قَلْبِكَ.',
      s34_b1: 'أُمِّي… أَنَا آسِفٌ عَلَى كَلِمَةِ «أُفٍّ» هَذَا الصَّبَاحِ وَإِغْلَاقِ الْبَابِ بِقُوَّةٍ. أَنْتِ تَبْذُلِينَ الْكَثِيرَ مِنْ أَجْلِنَا وَأَنَا قَصَّرْتُ فِي اللُّطْفِ.',
      s34_b2: 'عَادَ قَلْبُكَ إِلَى النُّورِ يَا عُثْمَانُ، وَهَذَا أَجْمَلُ مَا فِي الْأَمْرِ. لَقَدْ سَامَحْتُكَ مِنْ كُلِّ قَلْبِي.',
      s34_choice: 'يُرِيدُ عُثْمَانُ أَنْ يُتْبِعَ اعْتِذَارَهُ بِعَمَلٍ صَادِقٍ مِنَ الْبِرِّ. مَاذَا يَخْتَارُ؟',
      s34_quiz: 'قَبْلَ نِهَايَةِ الظَّهِيرَةِ، تُذَكِّرُهُ نُورَةُ بِدُعَاءٍ قُرْآنِيٍّ جَمِيلٍ:',
      s34_action: 'جَاءَ دَوْرُكَ لِتَقُومَ بِعَمَلٍ مَلْمُوسٍ فِي بَيْتِكَ.',
      s35_b1: 'يُحَاوِلُ الضَّبَابُ الْبَنَفْسَجِيُّ مَرَّةً أَخِيرَةً أَنْ يَحْجُبَ الشُّكْرَ فِي قَلْبِ عُثْمَانَ: «وَالِدَاكَ لَمْ يَفْعَلَا سِوَى وَاجِبِهِمَا! لِمَاذَا تُتْعِبُ نَفْسَكَ بِشُكْرِهِمَا؟ لَدَيْكَ مَا هُوَ أَهَمُّ!»',
      s35_climax: 'دَافِعْ عَنِ الشُّكْرِ وَبِرِّ الْوَالِدَيْنِ أَمَامَ وَسَاوِسِ الْجُحُودِ!',
      s36_b1: 'تَغْرُبُ الشَّمْسُ بِبُطْءٍ خَلْفَ التِّلَالِ، وَيَتَلَأْلَأُ مِصْبَاحُ فِنَاءِ الْبَيْتِ بِدِفْءٍ جَدِيدٍ أَلْطَفَ مِنْ أَيِّ وَقْتٍ مَضَى.',
      s36_b2: 'بَارَكَ اللَّهُ فِيكَ يَا عُثْمَانُ. مَنْ أَكْرَمَ جُذُورَهُ لَمْ يَخْشَ رِيَاحَ الْقِمَمِ.',
      s36_b3: 'تَعَلَّمْتَ أَنْ تَرَى مَا لَا تَزَالُ تَمْلِكُهُ: أَيَادِيَ تَرْعَاكَ، وَقُلُوبًا تَدْعُو لَكَ. وَغَدًا تَنْتَظِرُكَ قِمَّةٌ أَخِيرَةٌ عَلَى دَرْبِ الصَّبْرِ.',
      s36_end: 'أَحْسَنْتَ! لَقَدْ أَتْمَمْتَ الْفَصْلَ الرَّابِعَ: «مَا لَا تَزَالُ تَمْلِكُهُ» (بِرُّ الْوَالِدَيْنِ).'
    },
    choices: {
      c30_regret: { label: '« تَسَرَّعْتُ فِي الْكَلَامِ… كَلِمَةُ "أُفٍّ" لَا تُشْبِهُنِي. »', habitMessage: 'الِاعْتِرَافُ بِالْخَطَإِ هُوَ أَوَّلُ خُطْوَةٍ نَحْوَ الْإِصْلَاحِ.' },
      c30_marcher: { label: '« أَحْتَاجُ أَنْ أَمْشِيَ إِلَى الشَّجَرَةِ الْكَبِيرَةِ لِأُفَكِّرَ بِهُدُوءٍ. »', habitMessage: 'الْهُدُوءُ يُسَاعِدُ عَلَى الرُّؤْيَةِ بِوُضُوحٍ قَبْلَ الْعَوْدَةِ بِكَلَامٍ لَطِيفٍ.' },
      c32_soutien: { label: '« يَسَّرَ اللَّهُ عَمَلَ وَالِدِكَ وَجَمَعَكُمْ دَائِمًا عَلَى خَيْرٍ وَسَلَامٍ. »', habitMessage: 'الدُّعَاءُ الصَّادِقُ يُوَاسِي قَلْبَ الصَّدِيقِ وَيُذَكِّرُنَا بِقِيمَةِ النِّعَمِ.' },
      c32_promesse: { label: '« شُكْرًا لِأَنَّكَ فَتَحْتَ عَيْنَيَّ. سَأَعُودُ الْآنَ لِأُصْلِحَ كَلَامِي. »', habitMessage: 'تَحْوِيلُ الْوَعْيِ إِلَى عَمَلٍ سَرِيعٍ عَلَامَةُ نُضْجٍ حَقِيقِيٍّ.' },
      c34_paniers: { label: 'إِدْخَالُ جَمِيعِ سِلَالِ الزَّيْتُونِ فَوْرًا وَتَنْظِيفُ الْفِنَاءِ.', habitMessage: 'الْخِدْمَةُ الْعَمَلِيَّةُ تُخَفِّفُ التَّعَبَ عَنْ أَحِبَّتِنَا فَوْرًا.' },
      c34_the: { label: 'إِعْدَادُ صِينِيَّةِ الشَّايِ بِالنَّعْنَاعِ وَدَعْوَةُ وَالِدَيْهِ لِلْجُلُوسِ وَالرَّاحَةِ.', habitMessage: 'مَنْحُ الرَّاحَةِ لِلْوَالِدَيْنِ لَفْتَةٌ رَقِيقَةٌ مَلِيئَةٌ بِالْمَحَبَّةِ.' }
    },
    quizzes: {
      quiz_birr_parole: {
        topic: 'الْقَوْلُ الْكَرِيمُ لِلْوَالِدَيْنِ',
        question: 'فِي سُورَةِ الْإِسْرَاءِ (١٧:٢٣)، مَا الْأَدَبُ الَّذِي يُعَلِّمُنَا إِيَّاهُ الْقُرْآنُ عِنْدَ الشُّعُورِ بِالضَّيْقِ مَعَ الْوَالِدَيْنِ؟',
        options: {
          A: 'الرَّدُّ بِحِدَّةٍ فِي الْحَالِ ثُمَّ الِاعْتِذَارُ فِي الْيَوْمِ التَّالِي.',
          B: 'أَلَّا نَقُولَ لَهُمَا حَتَّى «أُفٍّ»، وَلَا نَنْهَرَهُمَا، وَنَقُولَ لَهُمَا قَوْلًا كَرِيمًا.',
          C: 'إِدَارَةُ الظَّهْرِ بِصَمْتٍ حَتَّى يُغَيِّرَا رَأْيَهُمَا.',
          D: 'التَّحَدُّثُ بِلُطْفٍ فَقَطْ عِنْدَمَا نُوَافِقُ عَلَى طَلَبِهِمَا.'
        },
        explanation: 'تُعَلِّمُنَا الْآيَةُ (١٧:٢٣) أَلَّا نُظْهِرَ حَتَّى التَّضَجُّرَ بِكَلِمَةِ «أُفٍّ» تِجَاهَ الْوَالِدَيْنِ، وَأَنْ نَخْتَارَ دَائِمًا أَطْيَبَ الْكَلَامِ.',
        theologicalNote: 'بِرُّ الْوَالِدَيْنِ يَبْدَأُ بِنَبْرَةِ الصَّوْتِ، حَتَّى عِنْدَ التَّعَبِ أَوِ الضَّيْقِ.'
      },
      quiz_birr_mere: {
        topic: 'مَكَانَةُ الْأُمِّ وَالْأَبِ',
        question: 'حِينَ سَأَلَ رَجُلٌ النَّبِيَّ ﷺ: مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ بِمَ أَجَابَ؟',
        options: {
          A: '« أَصْدِقَاؤُكَ الْمُقَرَّبُونَ ثُمَّ جِيرَانُكَ. »',
          B: '« أَبُوكَ أَوَّلًا، ثُمَّ مُعَلِّمُكَ، ثُمَّ أُمُّكَ. »',
          C: '« أُمُّكَ » كَرَّرَهَا ثَلَاثَ مَرَّاتٍ، ثُمَّ فِي الرَّابِعَةِ قَالَ: « أَبُوكَ. »',
          D: '« مَنْ يُقَدِّمُ لَكَ أَكْثَرَ الْخِدْمَاتِ فِي يَوْمِكَ. »'
        },
        explanation: 'ذَكَرَ النَّبِيُّ ﷺ الْأُمَّ ثَلَاثَ مَرَّاتٍ قَبْلَ الْأَبِ تَكْرِيمًا لِحَنَانِهَا وَتَعَبِهَا وَعِنَايَتِهَا الصَّامِتَةِ مُنْذُ الصِّغَرِ.',
        theologicalNote: 'لِلْوَالِدَيْنِ مَكَانَةٌ عَظِيمَةٌ، وَالتَّكْرَارُ يُبْرِزُ جُهُودَ الْأُمِّ الْخَفِيَّةَ.'
      },
      quiz_birr_shukr: {
        topic: 'الشُّكْرُ لِلَّهِ وَلِلْوَالِدَيْنِ',
        question: 'فِي سُورَةِ لُقْمَانَ (٣١:١٤)، بِمَ قَرَنَ اللَّهُ سُبْحَانَهُ شُكْرَهُ مُبَاشَرَةً؟',
        options: {
          A: 'بِالشُّكْرِ لِلْوَالِدَيْنِ.',
          B: 'بِالنَّجَاحِ فِي الْأَسْفَارِ الْبَعِيدَةِ.',
          C: 'بِجَمْعِ الْمَالِ لِلْمُسْتَقْبَلِ.',
          D: 'بِالْفَوْزِ فِي الْمُنَاظَرَاتِ أَمَامَ الْقَرْيَةِ.'
        },
        explanation: 'قَرَنَ الْقُرْآنُ شُكْرَ اللَّهِ بِشُكْرِ الْوَالِدَيْنِ؛ فَشُكْرُ مَنْ يَرْعَانَا كُلَّ يَوْمٍ بَابٌ مِنَ الْبَرَكَةِ.',
        theologicalNote: 'مَنْ لَا يَشْكُرِ النَّاسَ لَا يَشْكُرِ اللَّهَ شُكْرًا كَامِلًا.'
      },
      quiz_birr_invocation: {
        topic: 'الدُّعَاءُ لِلْوَالِدَيْنِ',
        question: 'مَا الدُّعَاءُ الْقُرْآنِيُّ (١٧:٢٤) الَّذِي يُعَلِّمُنَا طَلَبَ الرَّحْمَةِ لِلْوَالِدَيْنِ؟',
        options: {
          A: '« رَبِّ اجْعَلْنِي أَقْوَى مِنْ جَمِيعِ رِفَاقِي. »',
          B: '« رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا. »',
          C: '« رَبِّ أَبْعِدْ عَنِّي كُلَّ عَمَلٍ شَاقٍّ فِي الْبَيْتِ. »',
          D: '« رَبِّ ارْزُقْنِي الصَّبْرَ حَتَّى يَتَغَيَّرَا. »'
        },
        explanation: 'هَذَا الدُّعَاءُ مِنْ سُورَةِ الْإِسْرَاءِ (١٧:٢٤) يُلَيِّنُ الْقَلْبَ وَيُذَكِّرُنَا بِفَضْلِ وَالِدَيْنَا حِينَ رَبَّيَانَا صِغَارًا.',
        theologicalNote: 'الدُّعَاءُ لِلْوَالِدَيْنِ هَدِيَّةٌ تَدُومُ طَوَالَ الْحَيَاةِ.'
      }
    },
    realActions: {
      action_observer_soin: {
        title: 'رُؤْيَةُ الْمَخْفِيِّ',
        instruction: 'لَاحِظِ الْيَوْمَ عَمَلًا صَامِتًا وَاحِدًا عَلَى الْأَقَلِّ يَقُومُ بِهِ أَحَدُ وَالِدَيْكَ مِنْ أَجْلِكَ، وَاحْمَدِ اللَّهَ فِي قَلْبِكَ.',
        subtext: '« أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ » (سُورَةُ لُقْمَانَ ٣١:١٤)',
        reflectionPrompt: 'مَا الْعَمَلُ الصَّامِتُ الَّذِي لَاحَظْتَهُ مِنْ أُمِّكَ أَوْ أَبِيكَ الْيَوْمَ؟'
      },
      action_merci_parent: {
        title: 'الْكَلِمَةُ الطَّيِّبَةُ',
        instruction: 'اذْهَبْ إِلَى أُمِّكَ أَوْ أَبِيكَ (أَوِ اتَّصِلْ بِهِمَا) وَقُلْ لَهُمَا بِابْتِسَامَةٍ صَادِقَةٍ: «شُكْرًا عَلَى كُلِّ مَا تَفْعَلُهُ مِنْ أَجْلِي».',
        subtext: '« وَقُل لَّهُمَا قَوْلًا كَرِيمًا » (سُورَةُ الْإِسْرَاءِ ١٧:٢٣)',
        reflectionPrompt: 'كَيْفَ كَانَتْ رَدَّةُ فِعْلِهِمَا حِينَ سَمِعَا شُكْرَكَ الصَّادِقَ؟'
      },
      action_service_maison: {
        title: 'الْخُطْوَةُ الْمُصْلِحَةُ',
        instruction: 'دُونَ أَنْ يَطْلُبَ مِنْكَ أَحَدٌ، قَدِّمْ خِدْمَةً عَمَلِيَّةً فِي الْبَيْتِ (تَرْتِيبُ الْمَائِدَةِ، حَمْلُ غَرَضٍ، أَوْ تَقْدِيمُ كُوبِ مَاءٍ).',
        subtext: '« رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا » (سُورَةُ الْإِسْرَاءِ ١٧:٢٤)',
        reflectionPrompt: 'بِمَ شَعَرْتَ بَعْدَ أَنْ قَدَّمْتَ هَذِهِ الْخِدْمَةَ عَفْوِيًّا؟'
      }
    },
    climaxSteps: {}
  }
};
