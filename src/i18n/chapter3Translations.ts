import type { Chapter1TranslationSet } from './chapter1Translations';

// Traductions du chapitre 3 (« Le chemin du Tawakkul ») : anglais et arabe.
// Le texte français reste la source (src/data/chapter3.ts) ; les clés sont les identifiants des répliques.
// ⚠️ La version arabe est à faire relire par un arabophone natif et par un savant (citations religieuses).

export const CHAPTER_3_TRANSLATIONS: { en: Chapter1TranslationSet; ar: Chapter1TranslationSet } = {
  en: {
    scenes: {
      17: { title: 'The Difficult Morning', subtitle: '« The Slowed Body »', location: 'Othman’s room, glimmers of dawn' },
      18: { title: 'The Apothecary’s Dispensary', subtitle: '« Trust in Allah Through Care »', location: 'The village healing house, jars and mortar' },
      19: { title: 'He Who Prays with a Splint', subtitle: '« Dignity in Fragility »', location: 'The mosque steps under the ochre dome' },
      20: { title: 'The Prophetic Remedies', subtitle: '« The Gentleness of Honey and Talbīna »', location: 'Shaded patio under the vine arbor' },
      21: { title: 'The Weight of the Pause', subtitle: '« Keeping the Bond Without Shame »', location: 'Family courtyard at dusk' },
      22: { title: 'Naming the Pain Without Shame', subtitle: '« The Nobility of Tears »', location: 'Workshop under the fig arbor' },
      23: { title: 'The Trust of the Body & the Broth', subtitle: '« Accepting the Outstretched Hand »', location: 'Family kitchen and resting table' },
      24: { title: 'The Seed Under the Earth', subtitle: '« The Silent Hope »', location: 'Orchard at sunset' },
      25: { title: 'The Inner Mountain', subtitle: '« The Triumph of Resilience »', location: 'Mountain crests, radiant dawn' },
      201: { title: 'Picking Under the Almond Trees', subtitle: '« Brotherhood in Fragility »', location: 'Blooming almond orchard, sunny hillside' },
      202: { title: 'The Manuscript of Trials', subtitle: '« The Nobility of Ayyūb’s Patience »', location: 'Quiet dispensary, smell of herbs and wax' }
    },
    beats: {
      s17_b1: 'That morning, the glimmers of dawn gently stroke the floor of the room... but Othman cannot find the strength to get up. His body feverish and his limbs numb, the slightest movement takes enormous effort.',
      s17_b2: 'I would so like to get up and continue my journey... But my strength has left me. Everyone is moving ahead outside, and I stay stuck here...',
      s17_b3: 'You see? You have become a burden to everyone. You are no use anymore. Give up your plans, you will never reach wisdom...',
      s17_b4: 'You do not need to climb the whole mountain today, my son. For now, it is enough to sit, breathe calmly and listen to what your body is saying.',
      s17_b5: 'But Mom... it is almost nothing, just a little step...',
      s17_b6: 'Little steps are not nothing when they are taken with patience in hardship. The first wisdom of this morning is to welcome your weakness with gentleness.',
      s17_b6_choice: 'Facing his weakness this morning, what would you do in Othman’s place?',
      s17_b8: 'As he drinks this glass of cool water, Othman feels a first wave of freshness ease his feverish temples. The morning light seems softer.',
      s18_b1: 'Supported by Noura, Othman steps across the threshold of the healing house. The air smells of dried mint, pine resin and beeswax. On the weathered wooden shelves, dozens of amber bottles catch the sun.',
      s18_b2: 'My stomach is in knots... What if the healer tells me something serious? What if I never get back to how I was?',
      s18_b3: 'Run from this place! Do not ask any questions! Pretend everything is fine, the weak go to doctors, not heroes!',
      s18_b4: 'Welcome, young traveler. Tiredness and fever are not enemies, but kind signals that your body needs rest and the right remedies. Sit down, breathe in these soothing herbs.',
      s18_b4_noura: 'Courage does not mean denying what scares us, Othman. True courage means seeking the truth with dignity and taking the necessary steps to get better.',
      s18_b7: 'The apothecary was so reassuring... He explained that my body was fighting the trial, and prescribed rest and a soothing preparation. Taking care of oneself is a duty!',
      s19_b1: 'At prayer time, Othman and Noura slowly climb the limestone steps of the mosque. The villagers hurry up at a brisk pace.',
      s19_b2: 'Look at them all running... They are so strong. I can barely bend my knees.',
      s19_b3: 'But on the first steps, a boy his age climbs peacefully. His left arm is firmly held by a light wooden splint wrapped in white linen bandages.',
      s19_b4: 'Did you see? Even he climbs without complaining! You only have some tiredness and you moan! You are pitiful!',
      s19_b5: 'As-salāmu ʿalaykum, my brother! The climb is gentle when you take your time, isn’t it? Come, let us sit together by the pillar for the prayer!',
      s19_b5_choice: 'Facing the injured boy, what would you do in Othman’s place?',
      s19_b6: 'Do you see this boy, Othman? He does not pray because he is invincible. He prays because his heart turns to Allah with the body he has today.',
      s19_b8: '« Lā yukallifullāhu nafsan illā wusʿahā »... I prayed seated beside him, with humility and peace. I am not behind in my faith: I simply live it with the strength of the moment.',
      s20_b1: 'After the prayer, Noura and the boy with the splint invite Othman into the inner courtyard of the mosque. Under a leafy vine arbor, a wooden table holds a jar of golden honey, a steaming bowl of Talbīna and a small vial of black seed oil.',
      s20_b2: 'My father makes me warm Talbīna every morning since my fracture. It is a barley porridge with milk and honey: the Prophet ﷺ said it comforts the heart of the sick!',
      s20_b5: 'Faith and medical science go hand in hand, my son. Taking the blessed remedies created by Allah while placing your hope in Him alone: that is the true balance.',
      s20_b6_choice: 'To continue this convalescent afternoon, what would you do in Othman’s place?',
      s201_b1: 'Othman and the boy walk slowly along the grassy path. The almond trees spread a dazzling canopy of white and pink blossoms in the warm breeze.',
      s201_b2: 'When I broke my arm, I cried in secret... I was ashamed of being slowed down. But my grandfather told me: « Branches bend in the wind to become more supple, not to die ». Look at this wild mint!',
      s201_b3: 'That is so true... I was afraid my friends would think me useless. But walking beside you gives me courage. Let us pick these sprigs together for the evening tea.',
      s201_b4: '« The example of the believers in their love, mercy and compassion for one another is like a body: if one part suffers, the rest of the body responds with sleeplessness and fever » (Bukhari 6011). You bring this noble saying to life, my children.',
      s201_b5: 'Al-Hamdulillāh! Breathing in the scent of these flowers with a loyal brother has lifted the heaviness from my temples. My body is still tired, but my soul is refreshed!',
      s202_b1: 'Othman chooses the hushed calm of the dispensary. The apothecary gently lays an old manuscript bound in dark leather with yellowed pages on the oak table.',
      s202_b2: '« Read this, young traveler. It is the story of the long illness of the noble Prophet Ayyūb (Job, peace be upon him). Through years of physical pain, not a word of bitterness or reproach ever crossed his lips. »',
      s202_b3: '« Rabbi annī massaniyaḍ-ḍurru wa anta arḥamur-rāḥimīn » (Quran 21:83)... « Harm has touched me, and You are the Most Merciful of the merciful ». Such a humble prayer, without demand or bitterness.',
      s202_b4: 'The Prophet ﷺ taught: « No fatigue, illness, worry or even a thorn touches the believer without Allah wiping away some of his sins because of it » (Bukhari 5641). Nothing you endure is in vain, Othman.',
      s202_b5: 'Understanding the deep meaning of the trial calms the mind more surely than any balm. My heart accepts this pause with renewed gratitude.',
      s21_b1: 'Back home, Othman tries to help tidy the garden, but dizziness forces him to sit on the dry stone wall. Far off, the laughter of his friends rises from the path.',
      s21_b2: 'I walked five minutes and I am already exhausted... My friends are working, exploring the valley... and I am stuck here. They will end up forgetting me.',
      s21_b3: 'Whatever you do, do not write to them! You will bother everyone with your complaining. Shut yourself away in the dark, you no longer have a place among them!',
      s21_b4: 'Resting when your body asks for it is not giving up, Othman. True perseverance knows when to put down the bag. And sharing news with those who love you is not begging for pity: it lets them practice their brotherhood.',
      s21_b4_choice: 'To dispel loneliness and keep the bond, what would you do in Othman’s place?',
      s21_b6: 'Noura lights the little oil lantern on the wall. Its golden flame dances softly in the evening air, bringing a peaceful comfort.',
      s22_b1: 'Passing by his workshop, Othman sees his traveler’s bag and carving tools set in a corner. The village master craftsman patiently carves a piece of cedar under the fig arbor.',
      s22_b1_artisan: 'Look at this wood, Othman. Before becoming a solid arch, it had to dry under the sun and endure the bite of the chisel. This pause is not wasted: it forges your patience.',
      s22_b2: 'Why me? Why now? I was making my efforts, I was trying to be good! Why is my own body betraying me?',
      s22_b3: 'Because your efforts are worth nothing! You have been abandoned! If God loved you, you would be strong and invincible!',
      s22_b4: 'You have the right to be in pain, Othman. You have the right to be sad and to find this pause hard. Even the Prophets cried in pain! But never let suffering whisper to you that your soul has lost its worth.',
      s22_b7: 'Putting words on my pain freed me from an immense weight. I am not angry at life: I simply needed to welcome my sadness.',
      s23_b1: 'The next day at noon, there is a soft knock at the door. It is the pomegranate merchant, with the boy with the splint, bringing a basket of fresh pomegranates and a steaming soup tureen.',
      s23_b2: 'As-salāmu ʿalaykum! We heard that the brave Othman has been going through a few days of fever. Here is a comforting broth prepared by my household with all our respect!',
      s23_b3: 'This is... too much honor. I feel embarrassed... I have always wanted to be the one who helps, not the one who is helped.',
      s23_b4: 'Receiving with gratitude is sometimes harder than giving generously, my son. Let your brothers reap the reward of generosity!',
      s23_b7: 'Thank you from the bottom of my heart, my brothers. May Allah bless you for your kindness!',
      s24_b1: 'After several days of regular care and disciplined rest, Othman sits at the foot of a big fig tree in the orchard. The evening wind stirs the golden branches.',
      s24_b2: 'I took my care, I drank the Talbīna... Yet tonight I do not feel much stronger than yesterday. What is the point of all this effort if nothing changes?',
      s24_b3: 'You wasted your time! Healing will never come! You will stay weak forever!',
      s24_b4: 'Look at this earth at the foot of the tree, Othman. When you sow a seed, nothing breaks through the soil for days. Yet in the secret of the darkness, the roots sink deep to prepare tomorrow’s sprout. Hope means refusing to let impatience decide your mood.',
      s24_b6: 'On a small low branch of the fig tree, a delicate white flower slowly begins to open among the dark leaves. A quiet symbol of life being reborn.',
      s25_b1: 'The next day, Othman walks with a measured but steady step up to the rocky ledge. Suddenly the cliffs wrap themselves in a thick, cold purple fog: the Great Waswas of Abandonment rises before him!',
      s25_b2: 'Look at yourself! You have weakened! You have been slowed down! You depend on others and their remedies! You have lost all your glory as a traveler!',
      s25_b3: '« Aʿūdhu billāhi mina sh-shayṭāni r-rajīm! » Be quiet, Waswas! My body has been tested, but my worth before my Creator does not depend on my strength of the day! I move forward with patience (Sabr), care and trust (Tawakkul)!',
      s25_b5: 'No... Even weakened, his heart stays unshakable... The trial no longer feeds doubt but strengthens his faith...!',
      s25_b6: 'The wisps of purple mist dissolve completely under the first rays of a clear, golden dawn. Little wild bells open on the ancient stone slabs. The valley breathes peace.',
      s25_b7: 'True perseverance did not ask you to run, my son. It asked you to stay dignified and upright in your heart, even when your body moved in small steps. You have conquered your Inner Mountain.'
    },
    variants: {
      's17_b1#0': 'Othman kept moving forward without looking back. The difficulties had not disappeared, but he had learned to keep going despite them. Yet this morning, a sudden fever pins his body to the bed...',
      's17_b1#1': 'Othman had understood that some battles are won not by force but by self-control. But today, the trial is not outside: it strikes his own weakened body.',
      's17_b1#2': 'Othman had learned to seek before concluding. Yet one question remained: when should we stop reasoning and humbly welcome rest?',
      's17_b1#3': 'Othman had regained all his energy and drive. But at the dawn of this new stage, a sudden exhaustion tests his will.',
      's17_b1#4': 'Othman was moving forward at a measured, serene pace. But this morning, a heavy fever disturbs the harmony of his waking.',
      's17_b3#0': 'All your routines are wrecked! You missed your wake-up, your day is ruined, you are worth nothing as soon as your schedule collapses!',
      's17_b3#1': 'You, who thought you were so strong and tireless! Look at your arms shaking. You are an empty shell, unable to take three steps!',
      's17_b3#2': 'What good is all that knowledge you gathered if you cannot even stand? Your reflections will not heal you!',
      's17_b3#3': 'You have become a burden to Noura. She has to wear herself out caring for you when you should be relieving her! You are letting her down!',
      's17_b3#4': 'You pretend to be patient... but deep down you know this illness will last forever. Give up all hope!',
      's17_b3#5': 'You hold back your complaints, but a dull anger is boiling: why does this halt fall on you?'
    },
    choices: {
      c3_discipline_soins: { label: 'Drink in small sips and reorganize the day with method (Discipline & Vitality)', responsePreview: '« My body has rights over me. I take this glass of water without guilt. »', habitMessage: 'Moral decision • Othman takes measured actions to protect his body.' },
      c3_sabr_accueil: { label: 'Welcome the weakness with patience and calm (Sabr & Hilm)', responsePreview: '« This pause is not a failure, it is a trial that forges endurance. »', habitMessage: 'Moral decision • Othman refuses revolt and practices noble Sabr.' },
      c3_ilm_comprehension: { label: 'Reflect on the wisdom of trials and the prophetic remedies (ʿIlm & Sabr)', responsePreview: '« Illness is a reminder of our fragility and a chance to learn. »', habitMessage: 'Moral decision • Othman feeds his understanding of the laws of life.' },
      c3_adab_gratitude: { label: 'Thank Noura and accept her help gently (Adab & Hilm)', responsePreview: '« Thank you, Mom, for your patience... I accept being guided this morning. »', habitMessage: 'Moral decision • Othman welcomes a mother’s love with humility.' },
      c3_entraide_marche: { label: 'Offer him his shoulder and climb the steps together (Adab & Hilm)', responsePreview: '« Let us climb together step by step, my brother. There is no rush on the path to prayer. »', habitMessage: 'Moral decision • Othman shows sincere, active brotherhood.' },
      c3_assise_humilite: { label: 'Sit beside him on the step to share the moment (Sabr & Hilm)', responsePreview: '« Your courage inspires me. Let us sit here in the shade a moment before going in. »', habitMessage: 'Moral decision • Othman welcomes the present moment with humility.' },
      c3_ecoute_ilm: { label: 'Talk about the beauty of adapting one’s prayer with dignity (ʿIlm & Sabr)', responsePreview: '« Religion is ease. Let us pray together according to our strength! »', habitMessage: 'Moral decision • Othman recalls the mercy of the prophetic rules.' },
      c3_verger: { label: 'Go with the injured boy to the almond orchard (Adab & Vitality)', responsePreview: '« Let us walk gently under the blossoms. Sharing the trial makes the heart stronger. »', habitMessage: 'Moral decision • Othman chooses the gentle walk and brotherly support.' },
      c3_manuscrit: { label: 'Stay at the dispensary to reflect and study the manuscript (ʿIlm & Sabr)', responsePreview: '« Calm and study will soothe my mind. Let us see what this ancient parchment says. »', habitMessage: 'Moral decision • Othman deepens his knowledge of remedies and wisdom.' },
      c3_message_fraternel: { label: 'Send a kind, warm message to his friends', responsePreview: '« Writing them a simple note reconnects me to the world. Brotherhood does not fade with distance. »' },
      c3_gratitude_noura: { label: 'Offer a gesture of tenderness and gratitude to Noura for her presence', responsePreview: '« Mom watches over me with so much love. I thank her with all my heart before thinking of anything else. »' },
      c_ch3_isolate_retreat: { label: 'Lock himself in the dark and cut ties with everyone' }
    },
    quizzes: {
      quiz_tawakkul_soins: {
        topic: 'Active Tawakkul & Medicine',
        question: 'What does it truly mean to place your trust in Allah (Tawakkul) in the face of illness or injury?',
        options: {
          A: 'Wait without doing anything, because everything is already written.',
          B: 'Take care of yourself seriously, then leave the result to Allah.',
          C: 'Take care of yourself, but stop thinking about Allah until you are healed.',
          D: 'Rely only on secret remedies passed down by relatives.'
        },
        explanation: 'The Prophet ﷺ clearly ordered us to seek treatment, affirming that Allah has not created a disease without creating its remedy. Consulting and taking remedies is the very essence of prophetic Tawakkul.',
        theologicalNote: 'The prophetic saying « Tie your camel, then place your trust in Allah » (Tirmidhi 2517) applies fully to the health of the body.',
        citationText: '« Seek treatment, servants of Allah! For Allah has not sent down a disease without sending down its remedy. »',
        concept: 'Active Tawakkul & the duty of care'
      },
      quiz_capacite_ame: {
        topic: 'Trials According to Capacity',
        question: 'What does the Quran teach about the weight of a trial and adapting our practice when the body weakens?',
        options: {
          A: 'We must wait until we are healed to resume prayer.',
          B: 'Allah burdens no one beyond what they can bear: we pray according to our strength.',
          C: 'Only those in good health receive the full reward.',
          D: 'We must pray exactly as usual, even if it hurts a lot.'
        },
        explanation: 'Verse 2:286 guarantees that Allah measures each trial to the strength of the soul. The Prophet ﷺ taught to pray standing according to one’s strength, seated if one cannot, or even on one’s side, because divine mercy lightens the practice.',
        theologicalNote: 'The Islamic legal principle states: « Hardship brings ease » (Al-mashaqqatu tajlibut-taysīr).',
        citationText: '« Allah does not burden a soul beyond its capacity. »',
        concept: 'Divine ease in weakness'
      },
      quiz_remedes_prophetiques: {
        topic: 'The Wisdom of Prophetic Remedies',
        question: 'Among these foods, which are praised in the prophetic tradition?',
        options: {
          A: 'Honey, Talbīna (barley porridge) and black seed.',
          B: 'Refined sugar, salt and fried foods.',
          C: 'Very sweet drinks taken at any time of day.',
          D: 'Very salty foods eaten in large quantities.'
        },
        explanation: 'The Sunnah highlights gentle dietary causes: honey (Quran 16:69), Talbīna which soothes the heart of the sick and eases sadness (Bukhari 5417), and black seed (Bukhari 5688), always in harmony with science.',
        theologicalNote: 'These benefits are causes created by Allah, to be used with gratitude and without neglecting medical diagnosis.',
        citationText: '« Talbīna comforts the heart of the sick and relieves some of his grief. »',
        concept: 'Talbīna and the benefits of food'
      },
      quiz_dignite_souffrance: {
        topic: 'Dignity & Welcoming Emotions',
        question: 'What is the noble attitude of the believer toward pain and tears when the trial is heavy?',
        options: {
          A: 'Hold back tears in every situation, because crying is a weakness.',
          B: 'Accept the pain, cry without revolt, and keep trust in Allah’s mercy.',
          C: 'Rebel against the pain, since it has no meaning.',
          D: 'Isolate yourself so as not to bother anyone, and ask nothing of loved ones.'
        },
        explanation: 'The Prophet ﷺ himself shed tears during trials and said: « The eye weeps, the heart is sad, but we say only what pleases our Lord » (Bukhari 1303). Sincere tears never contradict Sabr.',
        theologicalNote: 'Sabr is not the insensitivity of stone: it is holding the tongue back from revolt and keeping hope alive.',
        citationText: '« The eye sheds tears and the heart grieves, but we say only what pleases our Lord. »',
        concept: 'Tears of mercy'
      },
      quiz_shukr_dependance: {
        topic: 'The Humility of Receiving Help',
        question: 'Why is accepting help from a loved one or a caregiver when weakened an act of wisdom, not weakness?',
        options: {
          A: 'Because we let others do good, and we practice gratitude.',
          B: 'Because those who help are always right, whatever we think.',
          C: 'Because it proves we can no longer do anything by ourselves.',
          D: 'Because it is better to accept without thanking, so as not to feel indebted.'
        },
        explanation: 'The Prophet ﷺ taught that whoever does not thank people does not thank Allah (Tirmidhi 1954). Letting your brother or sister help is a shared blessing that weaves true brotherhood.',
        theologicalNote: 'Pride refuses help to protect an illusion of self-sufficiency; the humble heart welcomes the outstretched hand with love.',
        citationText: '« Whoever does not thank people does not thank Allah. »',
        concept: 'Thanking those who help'
      }
    },
    realActions: {
      action_ecouter_corps: {
        title: 'Listening to Your Body & Naming Your State',
        instruction: 'Take two minutes in real life: sit comfortably, rest your hands on your knees and breathe slowly through your nose. If you feel tired, thirsty or tense, acknowledge it without shame: drink a big glass of cool water.',
        subtext: 'Your body is a trust given by your Creator (Amānah); listening to its needs is part of faith.',
        reflectionPrompt: 'Did you take a moment to recognize what your body needs today?'
      },
      action_conseil_sante: {
        title: 'The Step of Advice & Care',
        instruction: 'Today, carefully follow a real health instruction: take your prescribed care on time, air out your room, go to bed at a reasonable hour or ask a parent or doctor if a pain persists.',
        subtext: 'Seeking useful advice and applying care is the direct fulfillment of active Tawakkul.',
        reflectionPrompt: 'Taking care of your health with rigor honors the gift of life.'
      },
      action_remede_sain_dua: {
        title: 'The Spoon of Honey & the Healing Duʿāʾ',
        instruction: 'Today, have a healthy food (a spoonful of pure honey, a warm herbal tea or a seasonal fruit). Then recite with devotion the prophetic duʿāʾ for healing, for yourself or for those who are tried.',
        subtext: '« Allāhumma Rabba an-nās, adh-hib al-ba’s, ishfi anta ash-Shāfī, lā shifā’a illā shifā’uk » (Bukhari 5743).',
        reflectionPrompt: 'Did you think of asking for healing for all those who suffer in silence?'
      },
      action_rompre_isolement: {
        title: 'Breaking Isolation Without False Modesty',
        instruction: 'Send a simple, warm message to a trusted person: a kind word, some honest news, or ask how a family member you have not seen lately is doing.',
        subtext: 'Brotherhood breaks down the walls the Waswas tries to build around tired hearts.',
        reflectionPrompt: 'A kind message lights a lantern in a loved one’s day.'
      },
      action_nommer_emotions: {
        title: 'Clarity of the Heart (Naming Your Feelings)',
        instruction: 'On a sheet of paper or in your heart, identify three real emotions you felt today (e.g. relief, fear, hope, tiredness, gratitude). Humbly hand them over to Allah in a short, sincere prayer.',
        subtext: 'Naming what we feel frees the mind and stops resentment or anxiety from building up.',
        reflectionPrompt: 'Emotional clarity is an immense source of inner peace.'
      },
      action_remercier_aidant: {
        title: 'Thanking Those Who Care for Us',
        instruction: 'Go to a parent, a friend or a caregiver who helped you or prepared a meal for you recently. Look them in the eyes, smile and say: « Jazāk Allāhu khayran for everything you do »!',
        subtext: '« Whoever does not thank people does not thank Allah » (Tirmidhi 1954).',
        reflectionPrompt: 'Expressing gratitude delights the heart of the one who gives without counting.'
      },
      action_micro_progres: {
        title: 'The Treasure of Tiny Progress',
        instruction: 'Identify a tiny step of progress you made today, even if invisible to the world: staying calm, resting without guilt, smiling despite tiredness. Say with gratitude: « Al-Hamdulillāh ».',
        subtext: 'The seed under the earth works in secret before it blooms. Every small step weighs heavy with Allah.',
        reflectionPrompt: 'Did you appreciate your quiet little victory of the day?'
      },
      action_mission_malade: {
        title: 'Ultimate Mission: The Brotherly Visit',
        instruction: 'Visit or call an elderly, sick or isolated person around you. Bring a smile, comforting news and recite a duʿāʾ of peace for them.',
        subtext: 'The Prophet ﷺ taught that visiting the sick plunges the visitor into divine mercy until he returns.',
        reflectionPrompt: 'Bringing comfort to the sick lifts the soul toward the noblest wisdom.'
      }
    },
    climaxSteps: {}
  },
  ar: {
    scenes: {
      17: { title: 'الصَّبَاحُ الْعَسِيرُ', subtitle: '« الْجَسَدُ الْمُتَبَاطِئُ »', location: 'غُرْفَةُ عُثْمَانَ، خُيُوطُ الْفَجْرِ' },
      18: { title: 'مُسْتَوْصَفُ الصَّيْدَلِيِّ', subtitle: '« التَّوَكُّلُ فِي الْعِلَاجِ »', location: 'بَيْتُ الْعِلَاجِ فِي الْقَرْيَةِ، قَوَارِيرُ وَهَاوُونٌ' },
      19: { title: 'الَّذِي يُصَلِّي بِجَبِيرَةٍ', subtitle: '« الْكَرَامَةُ فِي الضَّعْفِ »', location: 'دَرَجَاتُ الْمَسْجِدِ تَحْتَ الْقُبَّةِ الصَّفْرَاءِ' },
      20: { title: 'الْعِلَاجَاتُ النَّبَوِيَّةُ', subtitle: '« حَلَاوَةُ الْعَسَلِ وَالتَّلْبِينَةِ »', location: 'فِنَاءٌ ظَلِيلٌ تَحْتَ عَرِيشَةِ الْعِنَبِ' },
      21: { title: 'ثِقَلُ التَّوَقُّفِ', subtitle: '« حِفْظُ الصِّلَةِ بِلَا خَجَلٍ »', location: 'فِنَاءُ الْبَيْتِ عِنْدَ الْغُرُوبِ' },
      22: { title: 'تَسْمِيَةُ الْأَلَمِ بِلَا خَجَلٍ', subtitle: '« نُبْلُ الدُّمُوعِ »', location: 'وَرْشَةٌ تَحْتَ عَرِيشَةِ التِّينِ' },
      23: { title: 'أَمَانَةُ الْجَسَدِ وَالْمَرَقَةُ', subtitle: '« قَبُولُ الْيَدِ الْمَمْدُودَةِ »', location: 'مَطْبَخُ الْأُسْرَةِ وَمَائِدَةُ الرَّاحَةِ' },
      24: { title: 'الْبَذْرَةُ تَحْتَ التُّرَابِ', subtitle: '« الْأَمَلُ الصَّامِتُ »', location: 'الْبُسْتَانُ عِنْدَ الْغُرُوبِ' },
      25: { title: 'الْجَبَلُ الدَّاخِلِيُّ', subtitle: '« انْتِصَارُ الصُّمُودِ »', location: 'قِمَمُ الْمُرْتَفَعَاتِ، فَجْرٌ مُشْرِقٌ' },
      201: { title: 'قِطَافٌ تَحْتَ أَشْجَارِ اللَّوْزِ', subtitle: '« الْأُخُوَّةُ فِي الضَّعْفِ »', location: 'بُسْتَانُ لَوْزٍ مُزْهِرٌ، تَلٌّ مُشْمِسٌ' },
      202: { title: 'مَخْطُوطَةُ الِابْتِلَاءَاتِ', subtitle: '« نُبْلُ صَبْرِ أَيُّوبَ »', location: 'مُسْتَوْصَفٌ هَادِئٌ، رَائِحَةُ أَعْشَابٍ وَشَمْعٍ' }
    },
    beats: {
      s17_b1: 'فِي ذَلِكَ الصَّبَاحِ، تُدَاعِبُ خُيُوطُ الْفَجْرِ أَرْضِيَّةَ الْغُرْفَةِ بِلُطْفٍ... لَكِنَّ عُثْمَانَ لَا يَجِدُ الْقُوَّةَ لِيَنْهَضَ. الْجِسْمُ مَحْمُومٌ وَالْأَطْرَافُ مُخَدَّرَةٌ، وَأَدْنَى حَرَكَةٍ تَتَطَلَّبُ مِنْهُ جُهْدًا هَائِلًا.',
      s17_b2: 'كَمْ أَوَدُّ أَنْ أَنْهَضَ وَأُوَاصِلَ رِحْلَتِي... لَكِنَّ قُوَايَ خَذَلَتْنِي. الْجَمِيعُ يَتَقَدَّمُ فِي الْخَارِجِ، وَأَنَا أَبْقَى هُنَا مُسَمَّرًا...',
      s17_b3: 'أَرَأَيْتَ؟ لَقَدْ صِرْتَ عِبْئًا عَلَى الْجَمِيعِ. لَمْ تَعُدْ تَنْفَعُ فِي شَيْءٍ. تَخَلَّ عَنْ مَشَارِيعِكَ، لَنْ تَبْلُغَ الْحِكْمَةَ أَبَدًا...',
      s17_b4: 'لَيْسَ عَلَيْكَ أَنْ تَتَسَلَّقَ الْجَبَلَ كُلَّهُ الْيَوْمَ يَا بُنَيَّ. الْآنَ يَكْفِي أَنْ تَجْلِسَ، وَأَنْ تَتَنَفَّسَ بِهُدُوءٍ، وَأَنْ تُصْغِيَ إِلَى مَا يَقُولُهُ جَسَدُكَ.',
      s17_b5: 'لَكِنْ يَا أُمِّي... هَذَا تَقْرِيبًا لَا شَيْءَ، مُجَرَّدُ خُطْوَةٍ صَغِيرَةٍ...',
      s17_b6: 'الْخُطُوَاتُ الصَّغِيرَةُ لَيْسَتْ لَا شَيْءَ حِينَ تُؤَدَّى بِصَبْرٍ فِي الشِّدَّةِ. أَوَّلُ حِكْمَةٍ فِي هَذَا الصَّبَاحِ أَنْ تَسْتَقْبِلَ ضَعْفَكَ بِلُطْفٍ.',
      s17_b6_choice: 'أَمَامَ ضَعْفِهِ هَذَا الصَّبَاحَ، مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَ عُثْمَانَ؟',
      s17_b8: 'وَهُوَ يَشْرَبُ كَأْسَ الْمَاءِ الْبَارِدِ، يَشْعُرُ عُثْمَانُ بِأَوَّلِ مَوْجَةِ انْتِعَاشٍ تُرِيحُ صُدْغَيْهِ الْمَحْمُومَيْنِ. وَيَبْدُو ضَوْءُ الصَّبَاحِ أَلْطَفَ.',
      s18_b1: 'بِمُسَانَدَةِ نُورَا، يَعْبُرُ عُثْمَانُ عَتَبَةَ بَيْتِ الْعِلَاجِ. يَفُوحُ الْمَكَانُ بِالنَّعْنَاعِ الْجَافِّ وَصَمْغِ الصَّنَوْبَرِ وَشَمْعِ الْعَسَلِ. وَعَلَى الرُّفُوفِ الْخَشَبِيَّةِ الْعَتِيقَةِ، عَشَرَاتُ الْقَوَارِيرِ الْعَنْبَرِيَّةِ تَلْتَقِطُ ضَوْءَ الشَّمْسِ.',
      s18_b2: 'مَعِدَتِي مَعْقُودَةٌ... مَاذَا لَوْ أَخْبَرَنِي الطَّبِيبُ بِشَيْءٍ خَطِيرٍ؟ وَمَاذَا لَوْ لَمْ أَعُدْ كَمَا كُنْتُ أَبَدًا؟',
      s18_b3: 'اهْرُبْ مِنْ هَذَا الْمَكَانِ! لَا تَسْأَلْ أَيَّ سُؤَالٍ! تَظَاهَرْ بِأَنَّ كُلَّ شَيْءٍ عَلَى مَا يُرَامُ، الضُّعَفَاءُ هُمُ الَّذِينَ يُرَاجِعُونَ الْأَطِبَّاءَ، لَا الْأَبْطَالُ!',
      s18_b4: 'مَرْحَبًا بِكَ أَيُّهَا الْمُسَافِرُ الشَّابُّ. التَّعَبُ وَالْحُمَّى لَيْسَا عَدُوَّيْنِ، بَلْ هُمَا إِشَارَتَانِ لَطِيفَتَانِ بِأَنَّ جَسَدَكَ يَطْلُبُ الرَّاحَةَ وَالْعِلَاجَ الْمُنَاسِبَ. اجْلِسْ، وَاسْتَنْشِقْ هَذِهِ الْأَعْشَابَ الْمُهَدِّئَةَ.',
      s18_b4_noura: 'الشَّجَاعَةُ لَيْسَتْ إِنْكَارَ مَا يُخِيفُ يَا عُثْمَانُ. الشَّجَاعَةُ الْحَقِيقِيَّةُ أَنْ تَطْلُبَ الْحَقِيقَةَ بِكَرَامَةٍ وَأَنْ تَأْخُذَ بِالْأَسْبَابِ اللَّازِمَةِ لِلتَّدَاوِي.',
      s18_b7: 'كَانَ الصَّيْدَلِيُّ مُطَمْئِنًا جِدًّا... شَرَحَ لِي أَنَّ جَسَدِي يُقَاوِمُ الِابْتِلَاءَ، وَوَصَفَ لِي الرَّاحَةَ وَمَزِيجًا نَافِعًا. التَّدَاوِي وَاجِبٌ!',
      s19_b1: 'عِنْدَ وَقْتِ الصَّلَاةِ، يَصْعَدُ عُثْمَانُ وَنُورَا بِبُطْءٍ دَرَجَاتِ الْمَسْجِدِ الْحَجَرِيَّةَ. وَالْقَرَوِيُّونَ يُسْرِعُونَ بِخُطًى نَشِيطَةٍ.',
      s19_b2: 'انْظُرْ إِلَيْهِمْ جَمِيعًا وَهُمْ يَرْكُضُونَ... إِنَّهُمْ أَقْوِيَاءُ جِدًّا. أَمَّا أَنَا فَبِالْكَادِ أَثْنِي رُكْبَتَيَّ.',
      s19_b3: 'لَكِنْ عَلَى الدَّرَجَاتِ الْأُولَى، يَصْعَدُ فَتًى فِي مِثْلِ سِنِّهِ بِهُدُوءٍ. ذِرَاعُهُ الْيُسْرَى مُثَبَّتَةٌ بِإِحْكَامٍ بِجَبِيرَةٍ مِنَ الْخَشَبِ الْفَاتِحِ مَلْفُوفَةٍ بِضِمَادَاتٍ مِنَ الْكَتَّانِ الْأَبْيَضِ.',
      s19_b4: 'أَرَأَيْتَ؟ حَتَّى هُوَ يَصْعَدُ دُونَ أَنْ يَشْتَكِيَ! وَأَنْتَ لَيْسَ بِكَ إِلَّا تَعَبٌ وَتَئِنُّ! يَا لَكَ مِنْ مُثِيرٍ لِلشَّفَقَةِ!',
      s19_b5: 'السَّلَامُ عَلَيْكُمْ يَا أَخِي! الصُّعُودُ لَطِيفٌ حِينَ نَأْخُذُ وَقْتَنَا، أَلَيْسَ كَذَلِكَ؟ تَعَالَ، لِنَجْلِسْ مَعًا قُرْبَ الْعَمُودِ لِلصَّلَاةِ!',
      s19_b5_choice: 'أَمَامَ الْفَتَى الْمُصَابِ، مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَ عُثْمَانَ؟',
      s19_b6: 'أَتَرَى هَذَا الطِّفْلَ يَا عُثْمَانُ؟ إِنَّهُ لَا يُصَلِّي لِأَنَّهُ لَا يُقْهَرُ. إِنَّهُ يُصَلِّي لِأَنَّ قَلْبَهُ يَتَوَجَّهُ إِلَى اللهِ بِجَسَدِهِ الْيَوْمَ.',
      s19_b8: '« لَا يُكَلِّفُ اللهُ نَفْسًا إِلَّا وُسْعَهَا »... صَلَّيْتُ جَالِسًا بِجَانِبِهِ، بِتَوَاضُعٍ وَسَلَامٍ. أَنَا لَسْتُ مُتَأَخِّرًا فِي إِيمَانِي: إِنَّنِي أَعِيشُهُ فَقَطْ بِقُوَى اللَّحْظَةِ.',
      s20_b1: 'بَعْدَ الصَّلَاةِ، تَدْعُو نُورَا وَالْفَتَى ذُو الْجَبِيرَةِ عُثْمَانَ إِلَى الْفِنَاءِ الدَّاخِلِيِّ لِلْمَسْجِدِ. وَتَحْتَ عَرِيشَةِ عِنَبٍ خَضْرَاءَ، تَحْمِلُ مَائِدَةٌ خَشَبِيَّةٌ جَرَّةَ عَسَلٍ ذَهَبِيٍّ وَطَبَقَ تَلْبِينَةٍ يَتَصَاعَدُ مِنْهُ الْبُخَارُ وَقَارُورَةَ زَيْتِ الْحَبَّةِ السَّوْدَاءِ.',
      s20_b2: 'أَبِي يُحَضِّرُ لِي التَّلْبِينَةَ سَاخِنَةً كُلَّ صَبَاحٍ مُنْذُ كَسْرِي. إِنَّهَا عَصِيدَةُ شَعِيرٍ بِالْحَلِيبِ وَالْعَسَلِ: كَانَ النَّبِيُّ ﷺ يَقُولُ إِنَّهَا تُرِيحُ قَلْبَ الْمَرِيضِ!',
      s20_b5: 'الْإِيمَانُ وَالْعِلْمُ الطِّبِّيُّ يَسِيرَانِ جَنْبًا إِلَى جَنْبٍ يَا بُنَيَّ. أَنْ تَأْخُذَ الْعِلَاجَاتِ الْمُبَارَكَةَ الَّتِي خَلَقَهَا اللهُ مَعَ جَعْلِ رَجَائِكَ فِيهِ وَحْدَهُ: ذَلِكَ هُوَ التَّوَازُنُ الْحَقِيقِيُّ.',
      s20_b6_choice: 'لِمُتَابَعَةِ عَصْرِ النَّقَاهَةِ هَذَا، مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَ عُثْمَانَ؟',
      s201_b1: 'يَمْشِي عُثْمَانُ وَالْفَتَى بِخُطًى بَطِيئَةٍ عَلَى الدَّرْبِ الْعُشْبِيِّ. وَتَنْشُرُ أَشْجَارُ اللَّوْزِ قُبَّةً مُبْهِرَةً مِنَ الْأَزْهَارِ الْبَيْضَاءِ وَالْوَرْدِيَّةِ تَحْتَ النَّسِيمِ الدَّافِئِ.',
      s201_b2: 'حِينَ كُسِرَتْ ذِرَاعِي، كُنْتُ أَبْكِي سِرًّا... كُنْتُ أَخْجَلُ مِنْ بُطْئِي. لَكِنَّ جَدِّي قَالَ لِي : « الْأَغْصَانُ تَنْحَنِي أَمَامَ الرِّيحِ لِتُصْبِحَ أَلْيَنَ، لَا لِتَمُوتَ ». انْظُرْ إِلَى هَذَا النَّعْنَاعِ الْبَرِّيِّ!',
      s201_b3: 'مَا أَصْدَقَ هَذَا... كُنْتُ أَخَافُ أَنْ يَرَانِي أَصْدِقَائِي عَدِيمَ الْفَائِدَةِ. لَكِنَّ الْمَشْيَ بِجَانِبِكَ يُعِيدُ إِلَيَّ الشَّجَاعَةَ. لِنَقْطِفْ هَذِهِ الْأَغْصَانَ مَعًا لِشَايِ الْمَسَاءِ.',
      s201_b4: '« مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ، إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى » (الْبُخَارِيُّ ٦٠١١). أَنْتُمَا تُحْيِيَانِ هَذَا الْقَوْلَ الْكَرِيمَ يَا وَلَدَيَّ.',
      s201_b5: 'الْحَمْدُ للهِ! اسْتِنْشَاقُ عَبِيرِ هَذِهِ الْأَزْهَارِ مَعَ أَخٍ وَفِيٍّ بَدَّدَ ثِقَلَ صُدْغَيَّ. جَسَدِي مَا زَالَ مُتْعَبًا، لَكِنَّ رُوحِي انْتَعَشَتْ!',
      s202_b1: 'يَخْتَارُ عُثْمَانُ هُدُوءَ الْمُسْتَوْصَفِ الْمُخَمَّلَ. وَيَضَعُ الصَّيْدَلِيُّ بِرِفْقٍ عَلَى مَائِدَةِ الْبَلُّوطِ مَخْطُوطَةً قَدِيمَةً مُجَلَّدَةً بِجِلْدٍ دَاكِنٍ وَأَوْرَاقُهَا مُصْفَرَّةٌ.',
      s202_b2: '« اقْرَأْ هَذَا أَيُّهَا الْمُسَافِرُ الشَّابُّ. إِنَّهَا قِصَّةُ مَرَضِ النَّبِيِّ الْكَرِيمِ أَيُّوبَ (عَلَيْهِ السَّلَامُ) الطَّوِيلِ. رَغْمَ سَنَوَاتٍ مِنَ الْأَلَمِ الْجَسَدِيِّ، لَمْ تَخْرُجْ مِنْ شَفَتَيْهِ كَلِمَةُ ضَغِينَةٍ أَوْ عِتَابٍ. »',
      s202_b3: '« رَبِّ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنْتَ أَرْحَمُ الرَّاحِمِينَ » (الْأَنْبِيَاءُ ٨٣)... دُعَاءٌ مُتَوَاضِعٌ جِدًّا، بِلَا مُطَالَبَةٍ وَلَا مَرَارَةٍ.',
      s202_b4: 'عَلَّمَ النَّبِيُّ ﷺ : « مَا يُصِيبُ الْمُسْلِمَ مِنْ نَصَبٍ وَلَا وَصَبٍ وَلَا هَمٍّ وَلَا حُزْنٍ وَلَا أَذًى وَلَا غَمٍّ حَتَّى الشَّوْكَةِ يُشَاكُهَا إِلَّا كَفَّرَ اللهُ بِهَا مِنْ خَطَايَاهُ » (الْبُخَارِيُّ ٥٦٤١). لَا شَيْءَ مِمَّا تُعَانِيهِ ضَائِعٌ يَا عُثْمَانُ.',
      s202_b5: 'فَهْمُ الْمَعْنَى الْعَمِيقِ لِلِابْتِلَاءِ يُهَدِّئُ الذِّهْنَ أَكْثَرَ مِنْ أَيِّ مَرْهَمٍ. قَلْبِي يَقْبَلُ هَذَا التَّوَقُّفَ بِامْتِنَانٍ مُتَجَدِّدٍ.',
      s21_b1: 'عِنْدَ الْعَوْدَةِ إِلَى الْبَيْتِ، يُحَاوِلُ عُثْمَانُ الْمُسَاعَدَةَ فِي تَرْتِيبِ الْحَدِيقَةِ، لَكِنَّ دُوَارًا يُجْبِرُهُ عَلَى الْجُلُوسِ عَلَى السُّورِ الْحَجَرِيِّ الْجَافِّ. وَمِنْ بَعِيدٍ، تَرْتَفِعُ ضَحِكَاتُ رِفَاقِهِ مِنَ الدَّرْبِ.',
      s21_b2: 'مَشَيْتُ خَمْسَ دَقَائِقَ وَأَنَا مُنْهَكٌ بِالْفِعْلِ... أَصْدِقَائِي يَعْمَلُونَ، وَيَسْتَكْشِفُونَ الْوَادِيَ... وَأَنَا عَالِقٌ هُنَا. سَيَنْتَهِي بِهِمُ الْأَمْرُ إِلَى نِسْيَانِي.',
      s21_b3: 'إِيَّاكَ أَنْ تَكْتُبَ لَهُمْ! سَتُزْعِجُ الْجَمِيعَ بِشَكَاوَاكَ. اعْتَزِلْ فِي الظَّلَامِ، لَمْ يَعُدْ لَكَ مَكَانٌ بَيْنَهُمْ!',
      s21_b4: 'الِاسْتِرَاحَةُ حِينَ يَطْلُبُهَا جَسَدُكَ لَيْسَتْ اسْتِسْلَامًا يَا عُثْمَانُ. الْمُثَابَرَةُ الْحَقِيقِيَّةُ تَعْرِفُ مَتَى يَجِبُ أَنْ تَضَعَ حَقِيبَتَكَ. وَإِخْبَارُ مَنْ يُحِبُّونَكَ بِأَحْوَالِكَ لَيْسَ اسْتِجْدَاءً لِلشَّفَقَةِ: إِنَّهُ يَسْمَحُ لَهُمْ بِمُمَارَسَةِ أُخُوَّتِهِمْ.',
      s21_b4_choice: 'لِتَبْدِيدِ الْوَحْدَةِ وَحِفْظِ الصِّلَةِ، مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَ عُثْمَانَ؟',
      s21_b6: 'تُشْعِلُ نُورَا الْمِصْبَاحَ الزَّيْتِيَّ الصَّغِيرَ عَلَى السُّورِ. وَيَرْقُصُ لَهَبُهُ الذَّهَبِيُّ بِرِفْقٍ فِي هَوَاءِ الْمَسَاءِ، جَالِبًا رَاحَةً هَادِئَةً.',
      s22_b1: 'وَهُوَ يَمُرُّ أَمَامَ وَرْشَتِهِ، يَلْمَحُ عُثْمَانُ حَقِيبَةَ سَفَرِهِ وَأَدَوَاتِ نَحْتِهِ مَوْضُوعَةً فِي زَاوِيَةٍ. وَالْحِرَفِيُّ الْأُسْتَاذُ فِي الْقَرْيَةِ يَنْحِتُ قِطْعَةً مِنَ الْأَرْزِ بِصَبْرٍ تَحْتَ عَرِيشَةِ التِّينِ.',
      s22_b1_artisan: 'انْظُرْ إِلَى هَذَا الْخَشَبِ يَا عُثْمَانُ. قَبْلَ أَنْ يُصْبِحَ قَوْسًا مَتِينًا، كَانَ عَلَيْهِ أَنْ يَجِفَّ تَحْتَ الشَّمْسِ وَيَتَحَمَّلَ عَضَّةَ الْإِزْمِيلِ. هَذَا التَّوَقُّفُ لَيْسَ ضَائِعًا: إِنَّهُ يَصْقُلُ صَبْرَكَ.',
      s22_b2: 'لِمَاذَا أَنَا؟ لِمَاذَا الْآنَ؟ كُنْتُ أَبْذُلُ جُهْدِي، كُنْتُ أُحَاوِلُ أَنْ أَكُونَ طَيِّبًا! لِمَاذَا يَخُونُنِي جَسَدِي؟',
      s22_b3: 'لِأَنَّ جُهُودَكَ لَا قِيمَةَ لَهَا! لَقَدْ تُرِكْتَ! لَوْ كَانَ اللهُ يُحِبُّكَ لَكُنْتَ قَوِيًّا لَا تُقْهَرُ!',
      s22_b4: 'مِنْ حَقِّكَ أَنْ تَتَأَلَّمَ يَا عُثْمَانُ. مِنْ حَقِّكَ أَنْ تَحْزَنَ وَأَنْ تَجِدَ هَذَا التَّوَقُّفَ صَعْبًا. حَتَّى الْأَنْبِيَاءُ بَكَوْا مِنَ الْأَلَمِ! لَكِنْ لَا تَدَعِ الْمُعَانَاةَ تَهْمِسُ لَكَ بِأَنَّ نَفْسَكَ فَقَدَتْ قِيمَتَهَا.',
      s22_b7: 'وَضْعُ الْكَلِمَاتِ عَلَى أَلَمِي حَرَّرَنِي مِنْ ثِقَلٍ هَائِلٍ. أَنَا لَسْتُ غَاضِبًا مِنَ الْحَيَاةِ: كُنْتُ فَقَطْ بِحَاجَةٍ إِلَى اسْتِقْبَالِ حُزْنِي.',
      s23_b1: 'ظُهْرَ الْيَوْمِ التَّالِي، يُطْرَقُ بَابُ الْبَيْتِ بِرِفْقٍ. إِنَّهُ تَاجِرُ الرُّمَّانِ، وَمَعَهُ الْفَتَى ذُو الْجَبِيرَةِ، يَحْمِلَانِ سَلَّةَ رُمَّانٍ طَازَجٍ وَوِعَاءَ حَسَاءٍ يَتَصَاعَدُ مِنْهُ الْبُخَارُ.',
      s23_b2: 'السَّلَامُ عَلَيْكُمْ! عَلِمْنَا أَنَّ عُثْمَانَ الْبَاسِلَ يَمُرُّ بِأَيَّامٍ مِنَ الْحُمَّى. إِلَيْكَ مَرَقَةً مُقَوِّيَةً أَعَدَّهَا أَهْلُ بَيْتِي بِكُلِّ احْتِرَامٍ!',
      s23_b3: 'هَذَا... تَكْرِيمٌ كَبِيرٌ. أَشْعُرُ بِالْحَرَجِ... لَطَالَمَا أَرَدْتُ أَنْ أَكُونَ مَنْ يُسَاعِدُ، لَا مَنْ يُسَاعَدُ.',
      s23_b4: 'التَّلَقِّي بِامْتِنَانٍ أَحْيَانًا أَصْعَبُ مِنَ الْعَطَاءِ بِسَخَاءٍ يَا بُنَيَّ. دَعْ إِخْوَانَكَ يَنَالُونَ أَجْرَ الْكَرَمِ!',
      s23_b7: 'شُكْرًا مِنْ أَعْمَاقِ قَلْبِي يَا إِخْوَتِي. بَارَكَ اللهُ فِيكُمْ عَلَى طِيبَتِكُمْ!',
      s24_b1: 'بَعْدَ أَيَّامٍ مِنَ الْعِنَايَةِ الْمُنْتَظِمَةِ وَالرَّاحَةِ الْمُنْضَبِطَةِ، يَجْلِسُ عُثْمَانُ عِنْدَ جِذْعِ شَجَرَةِ تِينٍ كَبِيرَةٍ فِي الْبُسْتَانِ. وَرِيحُ الْمَسَاءِ تُحَرِّكُ الْأَغْصَانَ الذَّهَبِيَّةَ.',
      s24_b2: 'تَدَاوَيْتُ، وَشَرِبْتُ التَّلْبِينَةَ... وَمَعَ ذَلِكَ لَا أَشْعُرُ هَذِهِ اللَّيْلَةَ بِقُوَّةٍ تَفُوقُ كَثِيرًا مَا كُنْتُ عَلَيْهِ أَمْسِ. مَا فَائِدَةُ كُلِّ هَذَا الْجُهْدِ إِنْ لَمْ يَتَغَيَّرْ شَيْءٌ؟',
      s24_b3: 'لَقَدْ ضَيَّعْتَ وَقْتَكَ! الشِّفَاءُ لَنْ يَأْتِيَ أَبَدًا! سَتَبْقَى ضَعِيفًا إِلَى الْأَبَدِ!',
      s24_b4: 'انْظُرْ إِلَى هَذِهِ الْأَرْضِ عِنْدَ جِذْعِ الشَّجَرَةِ يَا عُثْمَانُ. حِينَ نَزْرَعُ بَذْرَةً، لَا يَخْرُجُ شَيْءٌ مِنَ التُّرَابِ لِأَيَّامٍ. وَمَعَ ذَلِكَ، فِي سِرِّ الظَّلَامِ تَغُوصُ الْجُذُورُ لِتُهَيِّئَ نَبْتَةَ الْغَدِ. الْأَمَلُ هُوَ أَنْ تَرْفُضَ أَنْ يَتَحَكَّمَ نَفَادُ الصَّبْرِ فِي مِزَاجِكَ.',
      s24_b6: 'عَلَى غُصْنٍ صَغِيرٍ مُنْخَفِضٍ مِنْ شَجَرَةِ التِّينِ، تَبْدَأُ زَهْرَةٌ بَيْضَاءُ رَقِيقَةٌ بِالتَّفَتُّحِ بِبُطْءٍ بَيْنَ الْأَوْرَاقِ الدَّاكِنَةِ. رَمْزٌ هَادِئٌ لِحَيَاةٍ تَتَجَدَّدُ.',
      s25_b1: 'فِي الْيَوْمِ التَّالِي، يَمْشِي عُثْمَانُ بِخُطًى مَوْزُونَةٍ وَثَابِتَةٍ حَتَّى النُّتُوءِ الصَّخْرِيِّ. وَفَجْأَةً تَتَلَفَّعُ الْجُرُوفُ بِضَبَابٍ بَنَفْسَجِيٍّ كَثِيفٍ وَبَارِدٍ: الْوَسْوَاسُ الْأَكْبَرُ لِلْهَجْرِ يَنْتَصِبُ أَمَامَهُ!',
      s25_b2: 'انْظُرْ إِلَى نَفْسِكَ! لَقَدْ ضَعُفْتَ! لَقَدْ تَبَاطَأْتَ! أَنْتَ تَعْتَمِدُ عَلَى الْآخَرِينَ وَعَلَى أَدْوِيَتِهِمْ! لَقَدْ فَقَدْتَ كُلَّ مَجْدِكَ كَمُسَافِرٍ!',
      s25_b3: '« أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ! » اسْكُتْ أَيُّهَا الْوَسْوَاسُ! جَسَدِي ابْتُلِيَ، لَكِنَّ قِيمَتِي أَمَامَ خَالِقِي لَا تَتَوَقَّفُ عَلَى قُوَّتِي الْيَوْمَ! أَتَقَدَّمُ بِالصَّبْرِ وَالتَّدَاوِي وَالتَّوَكُّلِ!',
      s25_b5: 'لَا... حَتَّى وَهُوَ ضَعِيفٌ، يَبْقَى قَلْبُهُ ثَابِتًا لَا يَتَزَعْزَعُ... الِابْتِلَاءُ لَمْ يَعُدْ يُغَذِّي الشَّكَّ بَلْ يُقَوِّي إِيمَانَهُ...!',
      s25_b6: 'تَتَبَدَّدُ خُيُوطُ الضَّبَابِ الْبَنَفْسَجِيِّ تَمَامًا تَحْتَ الْأَشِعَّةِ الْأُولَى لِفَجْرٍ صَافٍ ذَهَبِيٍّ. وَتَتَفَتَّحُ أَجْرَاسٌ بَرِّيَّةٌ صَغِيرَةٌ عَلَى بَلَاطَاتِ الْحَجَرِ الْقَدِيمِ. وَيَتَنَفَّسُ الْوَادِي سَلَامًا.',
      s25_b7: 'الْمُثَابَرَةُ الْحَقِيقِيَّةُ لَمْ تَطْلُبْ مِنْكَ أَنْ تَرْكُضَ يَا بُنَيَّ. طَلَبَتْ مِنْكَ أَنْ تَبْقَى كَرِيمًا وَوَاقِفًا فِي قَلْبِكَ، حَتَّى حِينَ كَانَ جَسَدُكَ يَتَقَدَّمُ بِخُطًى صَغِيرَةٍ. لَقَدْ فَتَحْتَ جَبَلَكَ الدَّاخِلِيَّ.'
    },
    variants: {
      's17_b1#0': 'كَانَ عُثْمَانُ يَتَقَدَّمُ دُونَ أَنْ يَلْتَفِتَ. الصُّعُوبَاتُ لَمْ تَخْتَفِ، لَكِنَّهُ تَعَلَّمَ أَنْ يُوَاصِلَ رَغْمَهَا. وَمَعَ ذَلِكَ، فِي هَذَا الصَّبَاحِ، تُسَمِّرُ حُمَّى مُفَاجِئَةٌ جَسَدَهُ فِي الْفِرَاشِ...',
      's17_b1#1': 'كَانَ عُثْمَانُ قَدْ فَهِمَ أَنَّ بَعْضَ الْمَعَارِكِ لَا تُكْسَبُ بِالْقُوَّةِ، بَلْ بِضَبْطِ النَّفْسِ. لَكِنَّ الِامْتِحَانَ الْيَوْمَ لَيْسَ فِي الْخَارِجِ: إِنَّهُ يَضْرِبُ جَسَدَهُ الضَّعِيفَ نَفْسَهُ.',
      's17_b1#2': 'كَانَ عُثْمَانُ قَدْ تَعَلَّمَ أَنْ يَبْحَثَ قَبْلَ أَنْ يَحْكُمَ. وَمَعَ ذَلِكَ بَقِيَ سُؤَالٌ : مَتَى يَجِبُ أَنْ نَتَوَقَّفَ عَنِ التَّفْكِيرِ وَنَسْتَقْبِلَ الرَّاحَةَ بِتَوَاضُعٍ؟',
      's17_b1#3': 'كَانَ عُثْمَانُ قَدِ اسْتَعَادَ كُلَّ طَاقَتِهِ وَانْدِفَاعِهِ. لَكِنْ عِنْدَ فَجْرِ هَذِهِ الْمَرْحَلَةِ الْجَدِيدَةِ، يَأْتِي إِرْهَاقٌ شَدِيدٌ لِيَمْتَحِنَ إِرَادَتَهُ.',
      's17_b1#4': 'كَانَ عُثْمَانُ يَتَقَدَّمُ بِخُطًى مَوْزُونَةٍ وَهَادِئَةٍ. لَكِنْ فِي هَذَا الصَّبَاحِ، تُعَكِّرُ حُمَّى ثَقِيلَةٌ انْسِجَامَ يَقَظَتِهِ.',
      's17_b3#0': 'كُلُّ رُوتِينِكَ قَدِ انْهَارَ! فَاتَكَ وَقْتُ الِاسْتِيقَاظِ، يَوْمُكَ ضَائِعٌ، لَا قِيمَةَ لَكَ بِمُجَرَّدِ أَنْ يَنْهَارَ جَدْوَلُكَ!',
      's17_b3#1': 'أَنْتَ الَّذِي ظَنَنْتَ نَفْسَكَ قَوِيًّا لَا يَتْعَبُ! انْظُرْ إِلَى ذِرَاعَيْكَ تَرْتَجِفَانِ. أَنْتَ قَوْقَعَةٌ فَارِغَةٌ عَاجِزَةٌ عَنْ ثَلَاثِ خُطُوَاتٍ!',
      's17_b3#2': 'مَا فَائِدَةُ كُلِّ هَذَا الْعِلْمِ الَّذِي جَمَعْتَهُ إِنْ كُنْتَ لَا تَسْتَطِيعُ حَتَّى الْوُقُوفَ؟ تَأَمُّلَاتُكَ لَنْ تَشْفِيَكَ!',
      's17_b3#3': 'لَقَدْ صِرْتَ عِبْئًا عَلَى نُورَا. إِنَّهَا تُرْهِقُ نَفْسَهَا فِي الْعِنَايَةِ بِكَ بَيْنَمَا كَانَ يَجِبُ أَنْ تُرِيحَهَا! إِنَّكَ تُخَيِّبُ ظَنَّهَا!',
      's17_b3#4': 'تَدَّعِي الصَّبْرَ... لَكِنَّكَ فِي أَعْمَاقِكَ تَعْلَمُ أَنَّ هَذَا الْمَرَضَ سَيَدُومُ إِلَى مَا لَا نِهَايَةَ. اتْرُكْ كُلَّ أَمَلٍ!',
      's17_b3#5': 'تَكْتُمُ شَكَاوَاكَ، لَكِنَّ غَضَبًا مَكْتُومًا يَغْلِي: لِمَاذَا يَسْقُطُ هَذَا التَّوَقُّفُ عَلَيْكَ أَنْتَ؟'
    },
    choices: {
      c3_discipline_soins: { label: 'الشُّرْبُ بِرَشَفَاتٍ صَغِيرَةٍ وَإِعَادَةُ تَنْظِيمِ الْيَوْمِ بِمَنْهَجٍ (الِانْضِبَاطُ وَالْحَيَوِيَّةُ)', responsePreview: '« لِجَسَدِي حَقٌّ عَلَيَّ. آخُذُ كَأْسَ الْمَاءِ هَذَا دُونَ شُعُورٍ بِالذَّنْبِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَتَّخِذُ عُثْمَانُ أَفْعَالًا مَدْرُوسَةً لِيَحْفَظَ جَسَدَهُ.' },
      c3_sabr_accueil: { label: 'اسْتِقْبَالُ الضَّعْفِ بِصَبْرٍ وَسَكِينَةٍ (الصَّبْرُ وَالْحِلْمُ)', responsePreview: '« هَذِهِ اسْتِرَاحَةٌ لَا فَشَلٌ، إِنَّهَا ابْتِلَاءٌ يَصْقُلُ التَّحَمُّلَ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَرْفُضُ عُثْمَانُ التَّمَرُّدَ وَيُمَارِسُ الصَّبْرَ الْجَمِيلَ.' },
      c3_ilm_comprehension: { label: 'التَّأَمُّلُ فِي حِكَمِ الِابْتِلَاءِ وَالْعِلَاجَاتِ النَّبَوِيَّةِ (الْعِلْمُ وَالصَّبْرُ)', responsePreview: '« الْمَرَضُ تَذْكِيرٌ بِهَشَاشَتِنَا وَفُرْصَةٌ لِلتَّعَلُّمِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُغَذِّي عُثْمَانُ فَهْمَهُ لِسُنَنِ الْحَيَاةِ.' },
      c3_adab_gratitude: { label: 'شُكْرُ نُورَا وَقَبُولُ مُسَاعَدَتِهَا بِرِفْقٍ (الْأَدَبُ وَالْحِلْمُ)', responsePreview: '« شُكْرًا يَا أُمِّي عَلَى صَبْرِكِ... أَقْبَلُ أَنْ أَدَعَكِ تُوَجِّهِينَنِي هَذَا الصَّبَاحَ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَسْتَقْبِلُ عُثْمَانُ حُبَّ الْأُمِّ بِتَوَاضُعٍ.' },
      c3_entraide_marche: { label: 'تَقْدِيمُ كَتِفِهِ وَصُعُودُ الدَّرَجَاتِ مَعًا (الْأَدَبُ وَالْحِلْمُ)', responsePreview: '« لِنَصْعَدْ مَعًا خُطْوَةً خُطْوَةً يَا أَخِي. لَا اسْتِعْجَالَ فِي طَرِيقِ الصَّلَاةِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُعَبِّرُ عُثْمَانُ عَنْ أُخُوَّةٍ صَادِقَةٍ وَفَاعِلَةٍ.' },
      c3_assise_humilite: { label: 'الْجُلُوسُ بِجَانِبِهِ عَلَى الدَّرَجَةِ لِمُشَارَكَةِ هَذِهِ اللَّحْظَةِ (الصَّبْرُ وَالْحِلْمُ)', responsePreview: '« شَجَاعَتُكَ تُلْهِمُنِي. لِنَجْلِسْ هُنَا لَحْظَةً فِي الظِّلِّ قَبْلَ الدُّخُولِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَسْتَقْبِلُ عُثْمَانُ اللَّحْظَةَ الْحَاضِرَةَ بِتَوَاضُعٍ.' },
      c3_ecoute_ilm: { label: 'الْحَدِيثُ عَنْ جَمَالِ تَكْيِيفِ الصَّلَاةِ بِكَرَامَةٍ (الْعِلْمُ وَالصَّبْرُ)', responsePreview: '« الدِّينُ يُسْرٌ. لِنُصَلِّ مَعًا بِحَسَبِ قُوَانَا! »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَتَذَكَّرُ عُثْمَانُ رَحْمَةَ الْأَحْكَامِ النَّبَوِيَّةِ.' },
      c3_verger: { label: 'مُرَافَقَةُ الطِّفْلِ الْمُصَابِ إِلَى بُسْتَانِ اللَّوْزِ (الْأَدَبُ وَالْحَيَوِيَّةُ)', responsePreview: '« لِنَمْشِ بِهُدُوءٍ تَحْتَ الْأَزْهَارِ. مُشَارَكَةُ الِابْتِلَاءِ تَجْعَلُ الْقَلْبَ أَقْوَى. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُفَضِّلُ عُثْمَانُ الْمَشْيَ الْهَادِئَ وَالسَّنَدَ الْأُخَوِيَّ.' },
      c3_manuscrit: { label: 'الْبَقَاءُ فِي الْمُسْتَوْصَفِ لِلتَّأَمُّلِ وَدِرَاسَةِ الْمَخْطُوطَةِ (الْعِلْمُ وَالصَّبْرُ)', responsePreview: '« الْهُدُوءُ وَالدِّرَاسَةُ سَيُسَكِّنَانِ ذِهْنِي. لِنَرَ مَاذَا تَقُولُ هَذِهِ الرَّقُّ الْقَدِيمَةُ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُعَمِّقُ عُثْمَانُ مَعْرِفَتَهُ بِالْعِلَاجَاتِ وَالْحِكَمِ.' },
      c3_message_fraternel: { label: 'إِرْسَالُ رِسَالَةٍ طَيِّبَةٍ وَدَافِئَةٍ إِلَى رِفَاقِهِ', responsePreview: '« كِتَابَةُ كَلِمَةٍ بَسِيطَةٍ لَهُمْ تُعِيدُ وَصْلِي بِالْعَالَمِ. الْأُخُوَّةُ لَا تَنْطَفِئُ بِالْبُعْدِ. »' },
      c3_gratitude_noura: { label: 'تَقْدِيمُ لَفْتَةِ حَنَانٍ وَامْتِنَانٍ لِنُورَا عَلَى وُجُودِهَا', responsePreview: '« أُمِّي تَسْهَرُ عَلَيَّ بِكُلِّ هَذَا الْحُبِّ. أَشْكُرُهَا مِنْ كُلِّ قَلْبِي قَبْلَ أَنْ أُفَكِّرَ فِي أَيِّ شَيْءٍ آخَرَ. »' },
      c_ch3_isolate_retreat: { label: 'الِانْغِلَاقُ فِي الظَّلَامِ وَقَطْعُ الصِّلَةِ بِالْجَمِيعِ' }
    },
    quizzes: {
      quiz_tawakkul_soins: {
        topic: 'التَّوَكُّلُ الْفَاعِلُ وَالطِّبُّ',
        question: 'مَا الْمَعْنَى الْحَقِيقِيُّ لِوَضْعِ الثِّقَةِ بِاللهِ (التَّوَكُّلِ) أَمَامَ مَرَضٍ أَوْ إِصَابَةٍ؟',
        options: {
          A: 'الِانْتِظَارُ دُونَ فِعْلِ شَيْءٍ، لِأَنَّ كُلَّ شَيْءٍ مَكْتُوبٌ مُسْبَقًا.',
          B: 'التَّدَاوِي بِجِدِّيَّةٍ، ثُمَّ تَفْوِيضُ النَّتِيجَةِ إِلَى اللهِ.',
          C: 'التَّدَاوِي، مَعَ تَرْكِ التَّفْكِيرِ فِي اللهِ مَا دُمْنَا لَمْ نَشْفَ.',
          D: 'الِاعْتِمَادُ فَقَطْ عَلَى أَدْوِيَةٍ سِرِّيَّةٍ يَتَوَارَثُهَا الْأَقَارِبُ.'
        },
        explanation: 'أَمَرَ النَّبِيُّ ﷺ صَرَاحَةً بِالتَّدَاوِي مُؤَكِّدًا أَنَّ اللهَ مَا خَلَقَ دَاءً إِلَّا خَلَقَ لَهُ دَوَاءً. وَاسْتِشَارَةُ الطَّبِيبِ وَتَنَاوُلُ الدَّوَاءِ هُمَا جَوْهَرُ التَّوَكُّلِ النَّبَوِيِّ.',
        theologicalNote: 'الْحِكْمَةُ النَّبَوِيَّةُ « اعْقِلْهَا وَتَوَكَّلْ » (التِّرْمِذِيُّ ٢٥١٧) تَنْطَبِقُ تَمَامًا عَلَى صِحَّةِ الْجَسَدِ.',
        citationText: '« تَدَاوَوْا عِبَادَ اللهِ، فَإِنَّ اللهَ لَمْ يُنْزِلْ دَاءً إِلَّا أَنْزَلَ لَهُ شِفَاءً. »',
        concept: 'التَّوَكُّلُ الْفَاعِلُ وَوُجُوبُ التَّدَاوِي'
      },
      quiz_capacite_ame: {
        topic: 'الِابْتِلَاءُ عَلَى قَدْرِ الطَّاقَةِ',
        question: 'مَاذَا يُعَلِّمُنَا الْقُرْآنُ عَنْ ثِقَلِ الِابْتِلَاءِ وَتَكْيِيفِ عِبَادَتِنَا حِينَ يَضْعُفُ الْجَسَدُ؟',
        options: {
          A: 'يَجِبُ انْتِظَارُ الشِّفَاءِ لِاسْتِئْنَافِ الصَّلَاةِ.',
          B: 'لَا يُكَلِّفُ اللهُ أَحَدًا فَوْقَ طَاقَتِهِ: نُصَلِّي بِحَسَبِ قُوَانَا.',
          C: 'الْأَصِحَّاءُ وَحْدَهُمْ يَنَالُونَ الْأَجْرَ كَامِلًا.',
          D: 'يَجِبُ أَنْ نُصَلِّيَ تَمَامًا كَمَا اعْتَدْنَا، حَتَّى لَوْ كَانَ ذَلِكَ مُؤْلِمًا جِدًّا.'
        },
        explanation: 'الْآيَةُ ٢٨٦ مِنَ الْبَقَرَةِ تَضْمَنُ أَنَّ اللهَ يُقَدِّرُ كُلَّ ابْتِلَاءٍ بِقَدْرِ قُوَّةِ النَّفْسِ. وَقَدْ عَلَّمَ النَّبِيُّ ﷺ أَنْ نُصَلِّيَ قِيَامًا بِحَسَبِ الطَّاقَةِ، فَإِنْ لَمْ نَسْتَطِعْ فَقُعُودًا، أَوْ حَتَّى عَلَى الْجَنْبِ، لِأَنَّ رَحْمَةَ اللهِ تُخَفِّفُ الْعِبَادَةَ.',
        theologicalNote: 'الْقَاعِدَةُ الْفِقْهِيَّةُ تَقُولُ : « الْمَشَقَّةُ تَجْلِبُ التَّيْسِيرَ ».',
        citationText: '« لَا يُكَلِّفُ اللهُ نَفْسًا إِلَّا وُسْعَهَا. »',
        concept: 'تَخْفِيفُ اللهِ عِنْدَ الضَّعْفِ'
      },
      quiz_remedes_prophetiques: {
        topic: 'حِكْمَةُ الْعِلَاجَاتِ النَّبَوِيَّةِ',
        question: 'مِنْ بَيْنِ هَذِهِ الْأَطْعِمَةِ، أَيُّهَا وَرَدَ مَدْحُهُ فِي السُّنَّةِ النَّبَوِيَّةِ؟',
        options: {
          A: 'الْعَسَلُ وَالتَّلْبِينَةُ (عَصِيدَةُ الشَّعِيرِ) وَحَبَّةُ الْبَرَكَةِ.',
          B: 'السُّكَّرُ الْمُكَرَّرُ وَالْمِلْحُ وَالْمَقْلِيَّاتُ.',
          C: 'الْمَشْرُوبَاتُ شَدِيدَةُ الْحَلَاوَةِ فِي أَيِّ وَقْتٍ مِنَ الْيَوْمِ.',
          D: 'الْأَطْعِمَةُ شَدِيدَةُ الْمُلُوحَةِ بِكَمِّيَّاتٍ كَبِيرَةٍ.'
        },
        explanation: 'تُبْرِزُ السُّنَّةُ أَسْبَابًا غِذَائِيَّةً لَطِيفَةً : الْعَسَلَ (النَّحْلُ ٦٩)، وَالتَّلْبِينَةَ الَّتِي تُرِيحُ قَلْبَ الْمَرِيضِ وَتُذْهِبُ بَعْضَ حُزْنِهِ (الْبُخَارِيُّ ٥٤١٧)، وَحَبَّةَ الْبَرَكَةِ (الْبُخَارِيُّ ٥٦٨٨)، دَائِمًا فِي انْسِجَامٍ مَعَ الْعِلْمِ.',
        theologicalNote: 'هَذِهِ الْفَوَائِدُ أَسْبَابٌ خَلَقَهَا اللهُ، تُسْتَعْمَلُ بِشُكْرٍ وَدُونَ إِهْمَالِ التَّشْخِيصِ الطِّبِّيِّ.',
        citationText: '« التَّلْبِينَةُ تُجِمُّ فُؤَادَ الْمَرِيضِ وَتُذْهِبُ بَعْضَ الْحُزْنِ. »',
        concept: 'التَّلْبِينَةُ وَفَوَائِدُ الْغِذَاءِ'
      },
      quiz_dignite_souffrance: {
        topic: 'الْكَرَامَةُ وَقَبُولُ الْمَشَاعِرِ',
        question: 'مَا مَوْقِفُ الْمُؤْمِنِ النَّبِيلُ أَمَامَ الْأَلَمِ وَالدُّمُوعِ حِينَ يَثْقُلُ الِابْتِلَاءُ؟',
        options: {
          A: 'حَبْسُ الدُّمُوعِ فِي كُلِّ الْأَحْوَالِ، لِأَنَّ الْبُكَاءَ ضَعْفٌ.',
          B: 'قَبُولُ الْأَلَمِ، وَالْبُكَاءُ دُونَ تَمَرُّدٍ، وَالْحِفَاظُ عَلَى الثِّقَةِ بِرَحْمَةِ اللهِ.',
          C: 'التَّمَرُّدُ عَلَى الْأَلَمِ، فَلَا مَعْنَى لَهُ.',
          D: 'الِانْعِزَالُ حَتَّى لَا نُزْعِجَ أَحَدًا، وَعَدَمُ طَلَبِ شَيْءٍ مِنَ الْأَقَارِبِ.'
        },
        explanation: 'النَّبِيُّ ﷺ نَفْسُهُ ذَرَفَ الدُّمُوعَ فِي الِابْتِلَاءَاتِ وَقَالَ : « الْعَيْنُ تَدْمَعُ وَالْقَلْبُ يَحْزَنُ وَلَا نَقُولُ إِلَّا مَا يُرْضِي رَبَّنَا » (الْبُخَارِيُّ ١٣٠٣). الدُّمُوعُ الصَّادِقَةُ لَا تُنَاقِضُ الصَّبْرَ أَبَدًا.',
        theologicalNote: 'الصَّبْرُ لَيْسَ تَبَلُّدَ الْحَجَرِ : إِنَّهُ كَفُّ اللِّسَانِ عَنِ التَّمَرُّدِ وَالْمُحَافَظَةُ عَلَى الْأَمَلِ.',
        citationText: '« إِنَّ الْعَيْنَ تَدْمَعُ، وَالْقَلْبَ يَحْزَنُ، وَلَا نَقُولُ إِلَّا مَا يُرْضِي رَبَّنَا. »',
        concept: 'دُمُوعُ الرَّحْمَةِ'
      },
      quiz_shukr_dependance: {
        topic: 'تَوَاضُعُ قَبُولِ الْمُسَاعَدَةِ',
        question: 'لِمَاذَا يُعَدُّ قَبُولُ مُسَاعَدَةِ قَرِيبٍ أَوْ مُعَالِجٍ عِنْدَ الضَّعْفِ عَمَلَ حِكْمَةٍ لَا ضَعْفٍ؟',
        options: {
          A: 'لِأَنَّنَا نَتْرُكُ الْآخَرِينَ يَفْعَلُونَ الْخَيْرَ، وَنُمَارِسُ الشُّكْرَ.',
          B: 'لِأَنَّ الَّذِينَ يُسَاعِدُونَ عَلَى حَقٍّ دَائِمًا، مَهْمَا ظَنَنَّا.',
          C: 'لِأَنَّنَا نُثْبِتُ بِذَلِكَ أَنَّنَا لَمْ نَعُدْ نَقْدِرُ عَلَى شَيْءٍ بِأَنْفُسِنَا.',
          D: 'لِأَنَّ الْأَفْضَلَ أَنْ نَقْبَلَ دُونَ شُكْرٍ، حَتَّى لَا نَشْعُرَ بِالدَّيْنِ.'
        },
        explanation: 'عَلَّمَ النَّبِيُّ ﷺ أَنَّ مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللهَ (التِّرْمِذِيُّ ١٩٥٤). وَالسَّمَاحُ لِأَخِيكَ أَوْ أُخْتِكَ بِالْمُسَاعَدَةِ بَرَكَةٌ مُشْتَرَكَةٌ تَنْسِجُ الْأُخُوَّةَ الْحَقِيقِيَّةَ.',
        theologicalNote: 'الْكِبْرُ يَرْفُضُ الْمُسَاعَدَةَ لِيَحْمِيَ وَهْمَ الِاكْتِفَاءِ الذَّاتِيِّ؛ أَمَّا الْقَلْبُ الْمُتَوَاضِعُ فَيَسْتَقْبِلُ الْيَدَ الْمَمْدُودَةَ بِمَحَبَّةٍ.',
        citationText: '« مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللهَ. »',
        concept: 'شُكْرُ الْمُحْسِنِينَ'
      }
    },
    realActions: {
      action_ecouter_corps: {
        title: 'الْإِصْغَاءُ إِلَى الْجَسَدِ وَتَسْمِيَةُ الْحَالَةِ',
        instruction: 'خُذْ دَقِيقَتَيْنِ فِي حَيَاتِكَ الْحَقِيقِيَّةِ: اجْلِسْ بِارْتِيَاحٍ، ضَعْ يَدَيْكَ عَلَى رُكْبَتَيْكَ وَتَنَفَّسْ بِبُطْءٍ مِنَ الْأَنْفِ. إِنْ شَعَرْتَ بِالتَّعَبِ أَوِ الْعَطَشِ أَوِ التَّوَتُّرِ، فَاعْتَرِفْ بِذَلِكَ دُونَ خَجَلٍ: اشْرَبْ كَأْسًا كَبِيرًا مِنَ الْمَاءِ الْبَارِدِ.',
        subtext: 'جَسَدُكَ أَمَانَةٌ مِنْ خَالِقِكَ؛ وَالْإِصْغَاءُ إِلَى حَاجَاتِهِ جُزْءٌ لَا يَتَجَزَّأُ مِنَ الْإِيمَانِ.',
        reflectionPrompt: 'هَلْ خَصَّصْتَ لَحْظَةً لِتَعْرِفَ مَا يَحْتَاجُ إِلَيْهِ جَسَدُكَ الْيَوْمَ؟'
      },
      action_conseil_sante: {
        title: 'خُطْوَةُ النَّصِيحَةِ وَالْعِنَايَةِ',
        instruction: 'الْتَزِمِ الْيَوْمَ بِدِقَّةٍ بِتَوْجِيهٍ صِحِّيٍّ حَقِيقِيٍّ: خُذْ عِلَاجَكَ الْمَوْصُوفَ فِي وَقْتِهِ، هَوِّ غُرْفَتَكَ، نَمْ فِي سَاعَةٍ مَعْقُولَةٍ، أَوِ اسْتَشِرْ وَالِدًا أَوْ طَبِيبًا إِنِ اسْتَمَرَّ أَلَمٌ مَا.',
        subtext: 'طَلَبُ النَّصِيحَةِ النَّافِعَةِ وَتَطْبِيقُ الْعِلَاجِ هُوَ التَّحْقِيقُ الْمُبَاشِرُ لِلتَّوَكُّلِ الْفَاعِلِ.',
        reflectionPrompt: 'الِاعْتِنَاءُ بِالصِّحَّةِ بِصَرَامَةٍ يُكَرِّمُ نِعْمَةَ الْحَيَاةِ.'
      },
      action_remede_sain_dua: {
        title: 'مِلْعَقَةُ الْعَسَلِ وَدُعَاءُ الشِّفَاءِ',
        instruction: 'تَنَاوَلِ الْيَوْمَ طَعَامًا صِحِّيًّا (مِلْعَقَةَ عَسَلٍ نَقِيٍّ، أَوْ عُشْبَةً دَافِئَةً، أَوْ فَاكِهَةً مَوْسِمِيَّةً). ثُمَّ اتْلُ بِخُشُوعٍ دُعَاءَ الشِّفَاءِ النَّبَوِيَّ لِنَفْسِكَ أَوْ لِلْمُبْتَلَيْنَ.',
        subtext: '« اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَاسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ » (الْبُخَارِيُّ ٥٧٤٣).',
        reflectionPrompt: 'هَلْ فَكَّرْتَ فِي أَنْ تَدْعُوَ بِالشِّفَاءِ لِكُلِّ مَنْ يُعَانِي فِي صَمْتٍ؟'
      },
      action_rompre_isolement: {
        title: 'كَسْرُ الْعُزْلَةِ بِلَا حَيَاءٍ زَائِفٍ',
        instruction: 'أَرْسِلْ رِسَالَةً بَسِيطَةً وَدَافِئَةً إِلَى قَرِيبٍ مَوْثُوقٍ: كَلِمَةً طَيِّبَةً، أَوْ خَبَرًا صَادِقًا، أَوِ اسْأَلْ عَنْ أَحْوَالِ فَرْدٍ مِنْ عَائِلَتِكَ لَمْ تَرَهُ مُنْذُ مُدَّةٍ.',
        subtext: 'الْأُخُوَّةُ تَهْدِمُ الْجُدْرَانَ الَّتِي يَحَاوِلُ الْوَسْوَاسُ بِنَاءَهَا حَوْلَ الْقُلُوبِ الْمُتْعَبَةِ.',
        reflectionPrompt: 'رِسَالَةٌ طَيِّبَةٌ تُضِيءُ فَانُوسًا فِي يَوْمِ قَرِيبٍ.'
      },
      action_nommer_emotions: {
        title: 'صَفَاءُ الْقَلْبِ (تَسْمِيَةُ الْمَشَاعِرِ)',
        instruction: 'عَلَى وَرَقَةٍ أَوْ فِي قَلْبِكَ، حَدِّدْ ثَلَاثَ مَشَاعِرَ حَقِيقِيَّةٍ عِشْتَهَا الْيَوْمَ (مِثْلَ الِارْتِيَاحِ، الْخَوْفِ، الْأَمَلِ، التَّعَبِ، الِامْتِنَانِ). سَلِّمْهَا بِتَوَاضُعٍ إِلَى اللهِ فِي دُعَاءٍ قَصِيرٍ صَادِقٍ.',
        subtext: 'تَسْمِيَةُ مَا نَشْعُرُ بِهِ تُحَرِّرُ الذِّهْنَ وَتَمْنَعُ الضَّغِينَةَ أَوِ الْقَلَقَ مِنَ التَّرَاكُمِ.',
        reflectionPrompt: 'الْوَضُوحُ الْعَاطِفِيُّ مَصْدَرٌ عَظِيمٌ لِلسَّلَامِ الدَّاخِلِيِّ.'
      },
      action_remercier_aidant: {
        title: 'شُكْرُ مَنْ يَعْتَنُونَ بِنَا',
        instruction: 'اذْهَبْ إِلَى وَالِدٍ أَوْ صَدِيقٍ أَوْ مُعَالِجٍ سَاعَدَكَ أَوْ أَعَدَّ لَكَ وَجْبَةً مُؤَخَّرًا. انْظُرْ فِي عَيْنَيْهِ، وَابْتَسِمْ لَهُ وَقُلْ لَهُ : « جَزَاكَ اللهُ خَيْرًا عَلَى كُلِّ مَا تَفْعَلُهُ »!',
        subtext: '« مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللهَ » (التِّرْمِذِيُّ ١٩٥٤).',
        reflectionPrompt: 'التَّعْبِيرُ عَنِ الِامْتِنَانِ يُفْرِحُ قَلْبَ مَنْ يُعْطِي دُونَ حِسَابٍ.'
      },
      action_micro_progres: {
        title: 'كَنْزُ التَّقَدُّمِ الصَّغِيرِ',
        instruction: 'حَدِّدْ تَقَدُّمًا صَغِيرًا حَقَّقْتَهُ الْيَوْمَ، وَلَوْ كَانَ خَفِيًّا عَنْ أَعْيُنِ النَّاسِ: أَنْ حَافَظْتَ عَلَى هُدُوئِكَ، أَوِ ارْتَحْتَ دُونَ شُعُورٍ بِالذَّنْبِ، أَوِ ابْتَسَمْتَ رَغْمَ التَّعَبِ. قُلْ بِامْتِنَانٍ : « الْحَمْدُ للهِ ».',
        subtext: 'الْبَذْرَةُ تَحْتَ الْأَرْضِ تَعْمَلُ فِي الْخَفَاءِ قَبْلَ أَنْ تُزْهِرَ. كُلُّ خُطْوَةٍ صَغِيرَةٍ ثَقِيلَةٌ عِنْدَ اللهِ.',
        reflectionPrompt: 'هَلْ عَرَفْتَ كَيْفَ تُقَدِّرُ انْتِصَارَكَ الصَّغِيرَ الصَّامِتَ الْيَوْمَ؟'
      },
      action_mission_malade: {
        title: 'الْمُهِمَّةُ الْكُبْرَى: الزِّيَارَةُ الْأُخَوِيَّةُ',
        instruction: 'زُرْ أَوِ اتَّصِلْ بِشَخْصٍ مُسِنٍّ أَوْ مَرِيضٍ أَوْ مَعْزُولٍ فِي مُحِيطِكَ. اجْلِبْ لَهُ ابْتِسَامَةً وَأَخْبَارًا مُطَمْئِنَةً وَادْعُ لَهُ بِالسَّلَامِ.',
        subtext: 'عَلَّمَ النَّبِيُّ ﷺ أَنَّ عِيَادَةَ الْمَرِيضِ تَغْمُرُ الزَّائِرَ فِي رَحْمَةِ اللهِ حَتَّى يَرْجِعَ.',
        reflectionPrompt: 'إِيصَالُ الْعَزَاءِ إِلَى مَرِيضٍ يَرْفَعُ النَّفْسَ إِلَى أَنْبَلِ الْحِكَمِ.'
      }
    },
    climaxSteps: {}
  }
};
