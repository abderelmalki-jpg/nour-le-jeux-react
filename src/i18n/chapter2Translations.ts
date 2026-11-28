import type { Chapter1TranslationSet } from './chapter1Translations';

// Traductions du chapitre 2 (« Le chemin du Hilm ») : anglais et arabe.
// Le texte français reste la source (src/data/chapter2.ts) ; les clés sont les identifiants des répliques.
// ⚠️ La version arabe est à faire relire par un arabophone natif et par un savant (citations religieuses).

export const CHAPTER_2_TRANSLATIONS: { en: Chapter1TranslationSet; ar: Chapter1TranslationSet } = {
  en: {
    scenes: {
      10: { title: 'Dawn at the Great Signpost', subtitle: '« The Crossroads »', location: 'Crossroads of the paths, golden dawn' },
      11: { title: 'The Market Outburst', subtitle: '« The Unjust Accusation »', location: 'Market square, lively morning' },
      12: { title: 'The Test of Silence', subtitle: '« Self-Control in the Storm »', location: 'Market alley, tension in the air' },
      13: { title: 'The Fountain of Vines', subtitle: '« Putting Out the Fire with Water »', location: 'Shaded courtyard of the mosque' },
      14: { title: 'The Ornament of Gentleness', subtitle: '« Defusing the Quarrel »', location: 'Market stall, reconciliation' },
      15: { title: 'The Shadow of Resentment', subtitle: '« The Fight Against the Inner Fire »', location: 'Rocky pass of the ridges' },
      16: { title: 'The Peaceful Heart', subtitle: '« The Bearer of Gentleness »', location: 'Heights of the valley, golden sunset' },
      142: { title: 'The Whisper Under the Vine', subtitle: '« The Secret Prayer »', location: 'Shaded mosque courtyard, vine arbor and a steaming teapot' }
    },
    beats: {
      s10_b1: 'Which chapter would you like to go to today, Othman?',
      s11_b1: 'The market square rings with the bustle of spice sellers, colorful fabrics and the scent of ripe pomegranates.',
      s11_b2: 'There are so many people here! Everyone is busy. I will buy some figs for Noura...',
      s11_b3: 'Suddenly, a mule loaded with baskets of figs and pomegranates rears up in the narrow lane. In the crush, a big basket crashes to the ground. Fruit rolls to Othman’s feet.',
      s11_b4: 'HEY YOU THERE! Watch where you put your feet, you clumsy boy! My whole stall is on the ground because of your daydreaming!',
      s11_b5: 'But... it was not me! The mule backed up in the lane! I did nothing!',
      s11_b6: 'You are letting him insult you in front of the whole square? He blames you for a fault you did not commit! Shout louder than him, show him he cannot disrespect you!',
      s11_b7: 'Look at the little traveler! He is red as a tomato, he is going to burst!',
      s11_b8: 'My hands are shaking... A ball of fire burns my throat. I want to knock everything over and tell him exactly what I think!',
      s11_colere_choice: 'The blood rushes to Othman’s face. What would you do in his place?',
      s12_b1: 'Othman! Stop. Breathe deeply. Do not let this fire consume your reason.',
      s12_b2: 'But Noura, he is lying shamelessly! Everyone is looking at me! If I say nothing, they will all think I am guilty and weak!',
      s12_b3: 'And what would shouting like him bring you? You would be two fools drawing a crowd. Listen carefully to what the Messenger of Allah ﷺ taught:',
      s12_villageoise_step: 'Gently, brothers and sisters... Do not let anger spoil this beautiful morning. Look at this young man: his face stays pure of any insult. Peace is worth more than the clamor of words.',
      s12_b5: '« The strong one is not the one who wins at wrestling, but the one who controls himself in anger »... That is so true.',
      s12_b5_choice: 'Othman feels his heart pounding under the crowd’s eyes. What would you do in his place?',
      s12_b7: 'I closed my mouth. I held back the hurtful reply that was on my lips. The merchant keeps grumbling, but my throat no longer burns.',
      s12_b8: 'You have won the first round against your own ego, my son. Come, let us walk away to the mosque courtyard.',
      s13_b1: 'Under the cool arches of the courtyard, a stone fountain murmurs softly. The vine leaves filter the burning rays of the sun.',
      s13_b2: 'The coolness of this place does me so much good... Yet as soon as I think of that man’s furious face, my heart starts racing again.',
      s13_b3: 'That is natural, Othman. Anger is like smoke that takes time to clear. That is why it is good to sit down, seek refuge in Allah, and refresh yourself with water.',
      s13_b6: 'Subhān Allāh... The water on my forearms and face has washed away all the heaviness. I feel light, calm and clear-headed.',
      s13_b7: 'Now that the fire is out, you can see the truth: this man is under pressure, tired of his debts and worried about his goods. What do you decide to do?',
      s13_b8: 'What would you do in Othman’s place?',
      s14_b1: 'Othman returns to the market square. The merchant, crouched in the dust, is painfully trying to sort his crushed pomegranates.',
      s14_b2: 'Do not go there! You will be humiliated again! Why help a man who insulted you?',
      s14_b3: '« Aʿūdhu billāhi mina sh-shayṭāni r-rajīm! » Be quiet, Waswas. Resentment will not decide my steps.',
      s14_b5: 'Othman crouches quietly next to the merchant. Without a word of bitterness, he sets a basket upright and begins picking up the unbroken fruit to wipe it clean.',
      s14_b6: 'You?! But... a moment ago I shouted at you like a savage... Why are you helping me?',
      s14_b7: 'As-salāmu ʿalaykum, uncle. You were worried about your livelihood, and the crowd was thick. No harm was done on purpose. Let us pick up these pomegranates together.',
      s14_b9: 'May Allah bless you, young man... I acted in the heat of anger and I was wrong. Here, take these two golden pomegranates, they are for you with all my gratitude.',
      s142_b1: 'Othman chooses to sit in the kind shade of the vine arbor. The crystal trickle of the fountain soothes his racing heart.',
      s142_b2: 'You have chosen the path of modesty and inner stillness, Othman. Facing an offense, withdrawing to pray sincerely for the one who hurt us is a strength reserved for pure souls.',
      s142_b3: 'You pray for a stranger who insulted you in front of everyone?! He deserved your curse, not your prayers! Keep your prayers for yourself alone!',
      s142_b4: 'Never! The Prophet ﷺ even prayed for those who had rejected him: « O Allah, guide my people, for they do not know. » Me too: O Allah, calm the pomegranate merchant, forgive his outburst, bless his stall and spread serenity in his home.',
      s142_b6: 'Listen to this peace, Othman. When you make a secret duʿāʾ for your absent brother, an angel stands beside you and declares: « Amīn, and the same for you! »',
      s142_b8: 'Al-Hamdulillāh... My chest is free of all bitterness. It is as if the cool water of ablution and this secret prayer had put out the fire even in my thoughts. Let us continue on our way!',
      s15_b1: 'On the way back, the sky above the ridges darkens with a burning haze the color of ash and purple.\nA gigantic shadow gathers between the rocks.',
      s15_b2: 'You think you are wise, Othman?! You bowed to that merchant! You smiled at the one who accused you! In this world, the gentle are crushed by the strong! Let anger burn within you!',
      s15_b3: 'This is his last trap, Othman! The Waswas wants you to believe that gentleness is weakness. Raise the prophetic truths you learned today!',
      s15_b5: 'No... This coolness... This forgiveness... The flame of hatred can no longer take root in this heart...!',
      s15_b6: 'In a breath of golden light, the whirl of ash dissolves completely. The mountain breathes a heavenly peace.',
      s16_b1: 'The sun slowly sets behind the distant minarets. A pure, clear light bathes the valley.',
      s16_b2: 'You have overcome the hardest of trials, Othman. Taming the fire of anger and answering it with Hilm and gentleness... You have climbed a huge step.',
      s16_b3: 'Al-Hamdulillāh... I understand now why the Prophet ﷺ said that the truly strong one is the one who controls himself. Anger destroys everything, but gentleness builds unbreakable bridges.',
      s16_b5: 'At the crossroads, the direction of a new stage appears clearly:\n« The Path of Tawakkul — Chapter 3: Trust in Allah in the Face of Hardship ».'
    },
    variants: {
      's11_b7#0': 'Wait, master merchant! It is the boy who blessed me so gently yesterday at the workshop... He has no malice, he did not push your mule!',
      's11_b7#1': 'Master merchant, calm down! This is the young traveler who encouraged me yesterday with my order. He is kind, look at the mule’s hooves instead!',
      's11_b7#2': 'Master merchant, look carefully: this boy is very calm and measured. I saw him yesterday at the workshop, he never looks for trouble.',
      's11_b7#3': 'Wait! This is the boy who praised my work with so much respect yesterday. He knows how to observe, he did not cause this panic!',
      's11_b7#4': 'Wait, master merchant! This is the boy who stopped by the workshop yesterday... He is not the kind to push your mule!',
      's14_b6#0': 'You?! Wait... are you the young man who helped the old farmer carry his jars yesterday? He told me about your kindness this morning... And I shouted at you! Why are you helping me after my outburst?',
      's14_b6#1': 'You?! A moment ago you wished me peace so calmly... And now you come back to help me pick up my fruit?'
    },
    choices: {
      c2_chap2: { label: '« The Path of Hilm » — Chapter 2 (Self-control)', badge: '✦ Continue' },
      c1_replay: { label: '« Overcoming Loneliness » — Chapter 1 (Replay)', badge: '✓ Chapter 1' },
      c3_chap3: { label: '« The Path of Tawakkul » — Chapter 3 (Trust in Allah in the face of hardship)', badge: '✦ Chapter 3' },
      c_colere_respiration: { label: 'Sit on the low wall and breathe in through the nose for 3 seconds', responsePreview: 'Change body posture to break the impulse of aggression.', habitMessage: 'Moral decision • Othman applies self-control (Hilm) in the trial.' },
      c_colere_faits: { label: 'State the facts in a firm voice, without shouting', responsePreview: '« Uncle, look at the mule: it reared up on its own. Let us talk with dignity. »', habitMessage: 'Moral decision • Othman answers with rigor and a cool head.' },
      c_colere_adab: { label: 'Pick up the unbroken figs to calm the merchant’s panic', responsePreview: 'Disarm aggression with a direct act of service.', habitMessage: 'Moral decision • Othman puts out the fire of discord through Adab.' },
      c_ch2_anger_retreat: { label: 'Give in to anger and shout back at the merchant' },
      c2_silence_digne: { label: 'The Shield of Silence (Al-Hilm)', responsePreview: '« I close my lips, I breathe and I refuse to feed the quarrel. »', habitMessage: 'Moral decision • Othman tames his impulse with a noble, measured silence.' },
      c2_parole_douce: { label: 'The Soothing Greeting (As-Salām)', responsePreview: '« Peace be upon you, my brother. Forgive me if I bothered you. »', habitMessage: 'Moral decision • Othman defuses the tension with the greeting of peace.' },
      c2_comprehension_lucide: { label: 'Understand the other’s distress before reacting', responsePreview: '« This man saw his harvest on the ground... His panic speaks before his reason. »', habitMessage: 'Moral decision • Othman wisely analyzes the cause of the conflict.' },
      c2_rifq: { label: 'Go back to the market and help him gently (Rifq)', responsePreview: '« Let us go back and help him pick up his fruit! Let us answer evil with good! »', habitMessage: 'Moral decision • Othman turns the offense into active reconciliation.' },
      c2_meditation: { label: 'Stay under the vine and pray for him in secret', responsePreview: '« Let the crowd calm down. I will stay here and sincerely pray for him in secret. »', habitMessage: 'Moral decision • Othman purifies his soul through the unseen prayer.' }
    },
    quizzes: {
      quiz_hilm_force: {
        topic: 'The Truly Strong (Al-Hilm)',
        question: 'According to the Messenger of Allah ﷺ, who is truly the strongest among people?',
        options: {
          A: 'The one who wins every fight and never backs down.',
          B: 'The one who controls himself when anger rises.',
          C: 'The one who keeps everything inside and never shows what he feels.',
          D: 'The one who knows how to answer an offense most harshly.'
        },
        explanation: 'The Prophet ﷺ taught that true strength does not lie in muscle power, but in the believer’s ability to tame his soul and hold back his anger when Satan tries to inflame it.',
        theologicalNote: 'The word « Al-Hilm » means noble patience, self-control and restraint of the mind in the face of offenses.',
        citationText: '« The strong man is not the one who overcomes others in wrestling, but the one who controls himself when he is angry. »',
        concept: 'Al-Hilm (Self-control in anger)'
      },
      quiz_hilm_colere_remede: {
        topic: 'Remedies for Anger',
        question: 'According to the Prophet’s ﷺ teachings, what can we do to calm anger when it rises?',
        options: {
          A: 'Answer right away, so the other understands he is wrong.',
          B: 'Seek refuge in Allah, then sit down or lie down to calm down.',
          C: 'Leave the room slamming the door and speak to no one.',
          D: 'Wait for the other to apologize first, without moving or saying anything.'
        },
        explanation: 'The Prophet ﷺ taught us to seek refuge in Allah from Satan when anger rises (Bukhari 3282), and to sit, then lie down if we are standing (Abu Dawud 4782). Refreshing oneself with water also helps the body calm down.',
        theologicalNote: 'Changing position (sitting down if standing) breaks the physical impulse to lash out.',
        citationText: '« I know a word that, if he said it, what he feels would go away: Aʿūdhu billāhi mina sh-shayṭāni r-rajīm. »',
        concept: 'Prophetic remedies for anger'
      },
      quiz_hilm_rifq: {
        topic: 'Gentleness (Ar-Rifq)',
        question: 'What is the noble promise the Prophet ﷺ made about gentleness (Ar-Rifq)?',
        options: {
          A: 'Gentleness is never found in a thing without adorning it, and is never removed from it without making it ugly.',
          B: 'Gentleness is reserved for important people; others deserve it less.',
          C: 'Gentleness is useful only when you are sure the other will return it.',
          D: 'Gentleness slows things down: it only gets in the way.'
        },
        explanation: 'The Messenger of Allah ﷺ taught that gentleness beautifies every word and every action. It is the ornament of noble character that defuses the fiercest conflicts.',
        theologicalNote: 'Ar-Rifq turns a destructive confrontation into a chance for closeness and blessing.',
        citationText: '« Gentleness is not found in anything except that it adorns it, and it is not removed from anything except that it makes it ugly. »',
        concept: 'Ar-Rifq (Gentleness as an ornament)'
      },
      quiz_hilm_afw: {
        topic: 'Forgiveness & Elevation (Al-ʿAfw)',
        question: 'What does Allah promise to the one who forgives and overcomes an offense with nobility?',
        options: {
          A: 'That he will be considered the loser of the quarrel.',
          B: 'Allah adds nothing to the forgiving servant except honor and nobility.',
          C: 'That he must demand immediate financial compensation.',
          D: 'That he no longer has the right to defend himself.'
        },
        explanation: 'The Prophet ﷺ affirmed that no forgiveness ever diminished a believer’s honor: on the contrary, Allah raises in dignity and esteem the one who knows how to forgive.',
        theologicalNote: 'Forgiving when one has the power to take revenge is the highest mark of Hilm.',
        citationText: '« Charity never decreases wealth, and Allah increases a servant in honor through forgiveness, and whoever humbles himself for Allah, Allah raises him. »',
        concept: 'Al-ʿAfw (The nobility of forgiveness)'
      },
      quiz_dua_secret: {
        topic: 'Secret Prayer for Others',
        question: 'Why does a secret prayer for someone else have such great value in Islam?',
        options: {
          A: 'Because it is easier to recite, and Allah surely accepts it.',
          B: 'Because it is free from showing off, and an angel answers: « Amīn, and the same for you ».',
          C: 'Because it proves to others that we are generous.',
          D: 'Because it replaces concrete efforts to repair a wrong.'
        },
        explanation: 'The Prophet ﷺ taught that when a Muslim prays for his brother in secret, an appointed angel says: « Amīn, and for you the like of it » (Sahih Muslim 2732). It is the supreme remedy to purify the heart of all resentment.',
        theologicalNote: 'Praying for the one who hurt us destroys the poison of bitterness and draws the immediate blessing of the angels.',
        citationText: '« The prayer of a Muslim for his brother in his absence is answered. By his head is an angel who says: “Amīn, and the same for you.” »',
        concept: 'Ad-Duʿāʾ bi-dhahr al-ghayb (The secret prayer)'
      }
    },
    realActions: {
      action_fraicheur: {
        title: 'The Dawn & the Intention of Peace',
        instruction: 'Go to a source of water in real life: splash cool water on your face. Take a breath and make the sincere intention (Niyyah) to be a sower of peace today, patient and gentle with those around you.',
        subtext: 'Morning water wakes the mind, and a pure intention directs every action of the day.',
        reflectionPrompt: 'Did you take a moment to renew your intention of peace this morning?'
      },
      action_silence_colere: {
        title: 'The Test of Silence in the Face of Provocation',
        instruction: 'Think of a small recent annoyance, or keep this action ready for today: when someone irritates you, interrupts you or criticizes you, take 3 deep breaths through your nose. Hold your tongue and choose soothing silence over an impulsive reply.',
        subtext: '« Whoever believes in Allah and the Last Day, let him speak good or keep silent » (Bukhari 6018). Silence at the critical moment is the greatest proof of inner strength.',
        reflectionPrompt: 'Did you manage to hold back an aggressive word when anger was rising?'
      },
      action_ablution_calme: {
        title: 'Putting Out the Fire with Cool Water (Wudu)',
        instruction: 'Perform your ablutions (Wudu) or carefully wash your hands, face and forearms with cool water in real life. Feel the coolness ease the physical tension and repeat: « Aʿūdhu billāhi mina sh-shayṭāni r-rajīm ».',
        subtext: 'Anger is a heat that rises to the face; the water of ablution restores the calm of body and soul.',
        reflectionPrompt: 'Did you feel the immediate relief that cool water on the face brings?'
      },
      action_pardon_noble: {
        title: 'The Step of Forgiveness & Gentleness (Al-ʿAfw)',
        instruction: 'Today, in real life: free your heart from all resentment. Sincerely forgive a person who hurt or annoyed you. If possible, offer them a kind word or a smile without bitterness.',
        subtext: '« Whoever forgives and makes reconciliation, his reward is with Allah » (Quran 42:40). Forgiveness frees the one who gives it.',
        reflectionPrompt: 'Have you ever felt the inner lightness that comes from letting go of a grudge?'
      },
      action_dua_secret: {
        title: 'The Secret Prayer of Peace (Duʿāʾ)',
        instruction: 'Think of a person who hurt, criticized or upset you recently. In secret, where no one can hear you, make a sincere prayer for them: ask Allah to guide their heart, ease their worries and grant you both peace.',
        subtext: '« Amīn, and the same for you » answers the heavenly angel (Sahih Muslim 2732). Praying for the one who wronged you is the summit of self-control.',
        reflectionPrompt: 'Did you feel the resentment leave your chest as you prayed for the one who hurt you?'
      },
      action_mission_hilm: {
        title: 'Ultimate Mission: The Outstretched Hand',
        instruction: 'Today, make a brotherly gesture toward someone you tended to avoid or judge. Offer a sincere compliment, some help or a modest gift to seal the brotherhood.',
        subtext: '« Repel evil with what is better; and behold, the one with whom you had enmity will become like a close friend » (Quran 41:34).',
        reflectionPrompt: 'A gentle heart defuses even the most stubborn hostilities.'
      }
    },
    climaxSteps: {
      step_c2_istiadhah: { title: '1. Putting Out the Spark', meaning: 'I seek refuge in Allah from the fire of anger and resentment.', description: 'Against the inner boiling, calling on divine protection smothers the blaze of the Waswas.' },
      step_c2_force: { title: '2. True Strength', meaning: 'The truly strong one is not the one who strikes down, but the one who rules himself.', description: 'Refusing to act on impulse: restraint is the mark of noble souls.' },
      step_c2_eau: { title: '3. The Coolness of Water', meaning: 'The water of ablution and a change of posture restore peace.', description: 'Prophetic wisdom cools the blood and clears the confusion of the mind.' },
      step_c2_rifq: { title: '4. The Ornament of Gentleness', meaning: 'Gentleness beautifies every reaction and defuses hatred.', description: 'Answering with kindness where the opponent expected violence.' },
      step_c2_afw: { title: '5. The Nobility of Forgiveness', meaning: 'Forgiving raises the servant in dignity before the Most High.', description: 'Breaking the chains of revenge: the believer seeks his reward from Allah.' },
      step_c2_salam: { title: '6. The Triumph of Serenity', meaning: 'The light of peace dissolves the Shadow of the Waswas for good.', description: 'The heart regains its clear purity, free of all hostility.' }
    }
  },
  ar: {
    scenes: {
      10: { title: 'الْفَجْرُ عِنْدَ اللَّافِتَةِ الْكُبْرَى', subtitle: '« مُفْتَرَقُ الطُّرُقِ »', location: 'مُفْتَرَقُ الطُّرُقِ، فَجْرٌ ذَهَبِيٌّ' },
      11: { title: 'ثَوْرَةُ السُّوقِ', subtitle: '« الِاتِّهَامُ الظَّالِمُ »', location: 'سَاحَةُ السُّوقِ، صَبَاحٌ مُزْدَحِمٌ' },
      12: { title: 'اخْتِبَارُ الصَّمْتِ', subtitle: '« ضَبْطُ النَّفْسِ وَسْطَ الْعَاصِفَةِ »', location: 'زُقَاقُ السُّوقِ، تَوَتُّرٌ ظَاهِرٌ' },
      13: { title: 'نَافُورَةُ الْعَرِيشَةِ', subtitle: '« إِطْفَاءُ النَّارِ بِالْمَاءِ »', location: 'فِنَاءُ الْمَسْجِدِ الظَّلِيلُ' },
      14: { title: 'زِينَةُ الرِّفْقِ', subtitle: '« نَزْعُ فَتِيلِ الْخِصَامِ »', location: 'كُشْكُ السُّوقِ، مُصَالَحَةٌ' },
      15: { title: 'ظِلُّ الضَّغِينَةِ', subtitle: '« الْمَعْرَكَةُ مَعَ النَّارِ الدَّاخِلِيَّةِ »', location: 'مَمَرٌّ صَخْرِيٌّ بَيْنَ الْقِمَمِ' },
      16: { title: 'الْقَلْبُ الْهَادِئُ', subtitle: '« حَامِلُ اللُّطْفِ »', location: 'مُرْتَفَعَاتُ الْوَادِي، غُرُوبٌ ذَهَبِيٌّ' },
      142: { title: 'الْهَمْسُ تَحْتَ الْعَرِيشَةِ', subtitle: '« الدُّعَاءُ فِي السِّرِّ »', location: 'فِنَاءُ الْمَسْجِدِ الظَّلِيلُ، عَرِيشَةُ عِنَبٍ وَإِبْرِيقُ شَايٍ يَتَصَاعَدُ مِنْهُ الْبُخَارُ' }
    },
    beats: {
      s10_b1: 'إِلَى أَيِّ فَصْلٍ تُرِيدُ أَنْ تَذْهَبَ الْيَوْمَ يَا عُثْمَانُ؟',
      s11_b1: 'تَرِنُّ سَاحَةُ السُّوقِ بِضَجِيجِ بَاعَةِ التَّوَابِلِ وَالْأَقْمِشَةِ الْمُلَوَّنَةِ وَعَبِيرِ الرُّمَّانِ النَّاضِجِ.',
      s11_b2: 'مَا أَكْثَرَ النَّاسَ هُنَا! الْكُلُّ مَشْغُولٌ. سَأَشْتَرِي بَعْضَ التِّينِ لِنُورَا...',
      s11_b3: 'فَجْأَةً، تَجْفُلُ بَغْلَةٌ مُحَمَّلَةٌ بِسِلَالِ التِّينِ وَالرُّمَّانِ فِي الْمَمَرِّ الضَّيِّقِ. وَفِي الزِّحَامِ تَسْقُطُ سَلَّةٌ كَبِيرَةٌ عَلَى الْأَرْضِ، وَتَتَدَحْرَجُ الثِّمَارُ تَحْتَ قَدَمَيْ عُثْمَانَ.',
      s11_b4: 'هَيْ، أَنْتَ! انْتَبِهْ أَيْنَ تَضَعُ قَدَمَيْكَ يَا غُلَامُ يَا أَخْرَقُ! بَسْطَتِي كُلُّهَا عَلَى الْأَرْضِ بِسَبَبِ شُرُودِكَ!',
      s11_b5: 'لَكِنْ... لَمْ أَفْعَلْ شَيْئًا! الْبَغْلَةُ هِيَ الَّتِي تَرَاجَعَتْ فِي الْمَمَرِّ! أَنَا لَمْ أَفْعَلْ شَيْئًا!',
      s11_b6: 'أَتَتْرُكُهُ يُهِينُكَ أَمَامَ السَّاحَةِ كُلِّهَا؟ إِنَّهُ يَتَّهِمُكَ بِذَنْبٍ لَمْ تَرْتَكِبْهُ! اصْرُخْ أَعْلَى مِنْهُ، أَرِهِ أَنَّهُ لَا يَسْتَطِيعُ الِاسْتِخْفَافَ بِكَ!',
      s11_b7: 'انْظُرُوا إِلَى الْمُسَافِرِ الصَّغِيرِ! وَجْهُهُ أَحْمَرُ كَالطَّمَاطِمِ، سَيَنْفَجِرُ!',
      s11_b8: 'يَدَايَ تَرْتَجِفَانِ... كُرَةُ نَارٍ تُحْرِقُ حَلْقِي. أُرِيدُ أَنْ أَقْلِبَ كُلَّ شَيْءٍ وَأَقُولَ لَهُ كُلَّ مَا أَفْكِّرُ فِيهِ!',
      s11_colere_choice: 'يَصْعَدُ الدَّمُ إِلَى وَجْهِ عُثْمَانَ. مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَهُ؟',
      s12_b1: 'عُثْمَانُ! تَوَقَّفْ. تَنَفَّسْ بِعُمْقٍ. لَا تَدَعْ هَذِهِ النَّارَ تَلْتَهِمُ عَقْلَكَ.',
      s12_b2: 'لَكِنْ يَا نُورَا، إِنَّهُ يَكْذِبُ بِوَقَاحَةٍ! الْجَمِيعُ يَنْظُرُونَ إِلَيَّ! إِنْ لَمْ أَرُدَّ فَسَيَظُنُّونَ كُلُّهُمْ أَنَّنِي مُذْنِبٌ وَضَعِيفٌ!',
      s12_b3: 'وَمَاذَا سَتَكْسِبُ مِنَ الصُّرَاخِ مِثْلَهُ؟ سَتَكُونَانِ أَحْمَقَيْنِ تَجْمَعَانِ النَّاسَ حَوْلَكُمَا. أَصْغِ جَيِّدًا إِلَى مَا عَلَّمَهُ رَسُولُ اللهِ ﷺ:',
      s12_villageoise_step: 'مَهْلًا يَا إِخْوَتِي وَأَخَوَاتِي... لَا تَدَعُوا الِانْفِعَالَ يُفْسِدُ هَذَا الصَّبَاحَ الْجَمِيلَ. انْظُرُوا إِلَى هَذَا الشَّابِّ: وَجْهُهُ بَقِيَ نَقِيًّا مِنْ كُلِّ إِسَاءَةٍ. السَّلَامُ خَيْرٌ مِنْ ضَجِيجِ الْكَلِمَاتِ.',
      s12_b5: '« الشَّدِيدُ لَيْسَ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ »... مَا أَصْدَقَ هَذَا الْكَلَامَ.',
      s12_b5_choice: 'يَشْعُرُ عُثْمَانُ بِقَلْبِهِ يَخْفِقُ بِقُوَّةٍ تَحْتَ أَنْظَارِ النَّاسِ. مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَهُ؟',
      s12_b7: 'أَطْبَقْتُ فَمِي. كَتَمْتُ الرَّدَّ الْجَارِحَ الَّذِي كَانَ عَلَى شَفَتَيَّ. التَّاجِرُ مَا زَالَ يَتَذَمَّرُ، لَكِنَّ حَلْقِي لَمْ يَعُدْ يَحْتَرِقُ.',
      s12_b8: 'لَقَدْ فُزْتَ بِالْجَوْلَةِ الْأُولَى ضِدَّ نَفْسِكَ يَا بُنَيَّ. تَعَالَ، لِنَبْتَعِدْ نَحْوَ فِنَاءِ الْمَسْجِدِ.',
      s13_b1: 'تَحْتَ الْأَقْوَاسِ الْبَارِدَةِ لِلْفِنَاءِ، تَهْمِسُ نَافُورَةٌ حَجَرِيَّةٌ بِلُطْفٍ. وَأَوْرَاقُ الْعِنَبِ تُرَشِّحُ أَشِعَّةَ الشَّمْسِ الْحَارِقَةَ.',
      s13_b2: 'بُرُودَةُ هَذَا الْمَكَانِ تُرِيحُنِي كَثِيرًا... وَمَعَ ذَلِكَ، كُلَّمَا تَذَكَّرْتُ وَجْهَ ذَلِكَ الرَّجُلِ الْغَاضِبَ، عَادَ قَلْبِي يَخْفِقُ بِسُرْعَةٍ.',
      s13_b3: 'هَذَا طَبِيعِيٌّ يَا عُثْمَانُ. الْغَضَبُ كَالدُّخَانِ، يَحْتَاجُ وَقْتًا لِيَتَلَاشَى. لِذَلِكَ يَحْسُنُ أَنْ تَجْلِسَ، وَأَنْ تَسْتَعِيذَ بِاللهِ، وَأَنْ تُنْعِشَ نَفْسَكَ بِالْمَاءِ.',
      s13_b6: 'سُبْحَانَ اللهِ... الْمَاءُ عَلَى سَاعِدَيَّ وَوَجْهِي حَمَلَ كُلَّ الثِّقَلِ بَعِيدًا. أَشْعُرُ بِالْخِفَّةِ وَالسَّكِينَةِ وَصَفَاءِ الذِّهْنِ.',
      s13_b7: 'الْآنَ وَقَدْ انْطَفَأَتِ النَّارُ، تَسْتَطِيعُ أَنْ تَرَى الْحَقِيقَةَ: هَذَا الرَّجُلُ تَحْتَ الضَّغْطِ، مُتْعَبٌ مِنْ دُيُونِهِ وَقَلِقٌ عَلَى بِضَاعَتِهِ. مَاذَا تُقَرِّرُ أَنْ تَفْعَلَ؟',
      s13_b8: 'مَاذَا كُنْتَ سَتَفْعَلُ مَكَانَ عُثْمَانَ؟',
      s14_b1: 'يَعُودُ عُثْمَانُ إِلَى سَاحَةِ السُّوقِ. التَّاجِرُ، جَاثِمٌ فِي الْغُبَارِ، يُحَاوِلُ بِمَشَقَّةٍ فَرْزَ رُمَّانِهِ الْمَسْحُوقِ.',
      s14_b2: 'لَا تَذْهَبْ! سَتُهَانُ مِنْ جَدِيدٍ! لِمَاذَا تُسَاعِدُ رَجُلًا أَهَانَكَ؟',
      s14_b3: '« أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ! » اسْكُتْ أَيُّهَا الْوَسْوَاسُ. الضَّغِينَةُ لَنْ تَقُودَ خُطُوَاتِي.',
      s14_b5: 'يَجْثُو عُثْمَانُ بِهُدُوءٍ بِجَانِبِ التَّاجِرِ. بِلَا كَلِمَةِ مَرَارَةٍ، يُقِيمُ سَلَّةً وَيَبْدَأُ بِجَمْعِ الثِّمَارِ السَّلِيمَةِ لِيَمْسَحَهَا.',
      s14_b6: 'أَنْتَ؟! لَكِنْ... قَبْلَ قَلِيلٍ صَرَخْتُ فِي وَجْهِكَ كَالْمُتَوَحِّشِ... لِمَاذَا تُسَاعِدُنِي؟',
      s14_b7: 'السَّلَامُ عَلَيْكُمْ يَا عَمِّي. كُنْتَ قَلِقًا عَلَى رِزْقِكَ، وَكَانَ الزِّحَامُ شَدِيدًا. لَمْ يَحْدُثْ ضَرَرٌ عَنْ قَصْدٍ. فَلْنَجْمَعْ هَذَا الرُّمَّانَ مَعًا.',
      s14_b9: 'بَارَكَ اللهُ فِيكَ يَا فَتَى... تَصَرَّفْتُ تَحْتَ وَطْأَةِ الْغَضَبِ وَأَخْطَأْتُ. خُذْ، هَاتَيْنِ الرُّمَّانَتَيْنِ الذَّهَبِيَّتَيْنِ، هُمَا لَكَ مَعَ كُلِّ امْتِنَانِي.',
      s142_b1: 'يَخْتَارُ عُثْمَانُ أَنْ يَجْلِسَ فِي ظِلِّ عَرِيشَةِ الْعِنَبِ الْوَدِيعِ. خَرِيرُ النَّافُورَةِ الصَّافِي يُهَدِّئُ خَفَقَانَ قَلْبِهِ.',
      s142_b2: 'لَقَدِ اخْتَرْتَ طَرِيقَ الْحَيَاءِ وَالْخُلْوَةِ الدَّاخِلِيَّةِ يَا عُثْمَانُ. أَمَامَ الْإِسَاءَةِ، الِانْزِوَاءُ لِلدُّعَاءِ بِصِدْقٍ لِمَنْ آذَانَا قُوَّةٌ مَحْفُوظَةٌ لِلنُّفُوسِ النَّقِيَّةِ.',
      s142_b3: 'أَتَدْعُو لِغَرِيبٍ أَهَانَكَ أَمَامَ الْجَمِيعِ؟! كَانَ يَسْتَحِقُّ لَعْنَتَكَ لَا دُعَاءَكَ! احْتَفِظْ بِأَدْعِيَتِكَ لِنَفْسِكَ وَحْدَكَ!',
      s142_b4: 'أَبَدًا! كَانَ النَّبِيُّ ﷺ يَدْعُو حَتَّى لِمَنْ رَدُّوهُ: « اللَّهُمَّ اهْدِ قَوْمِي فَإِنَّهُمْ لَا يَعْلَمُونَ ». وَأَنَا كَذَلِكَ: اللَّهُمَّ سَكِّنْ تَاجِرَ الرُّمَّانِ، وَاغْفِرْ لَهُ انْفِعَالَهُ، وَبَارِكْ فِي بَسْطَتِهِ، وَانْشُرِ السَّكِينَةَ فِي بَيْتِهِ.',
      s142_b6: 'أَصْغِ إِلَى هَذَا السَّلَامِ يَا عُثْمَانُ. حِينَ تَدْعُو سِرًّا لِأَخِيكَ الْغَائِبِ، يَقِفُ مَلَكٌ بِجَانِبِكَ وَيَقُولُ: « آمِينَ، وَلَكَ بِمِثْلٍ! »',
      s142_b8: 'الْحَمْدُ للهِ... صَدْرِي خَالٍ مِنْ كُلِّ مَرَارَةٍ. وَكَأَنَّ مَاءَ الْوُضُوءِ الْبَارِدَ وَهَذَا الدُّعَاءَ السِّرِّيَّ أَطْفَآ النَّارَ حَتَّى فِي أَفْكَارِي. هَيَّا نُوَاصِلْ طَرِيقَنَا!',
      s15_b1: 'فِي طَرِيقِ الْعَوْدَةِ، تُظْلِمُ السَّمَاءُ فَوْقَ الْقِمَمِ بِضَبَابٍ مُلْتَهِبٍ بِلَوْنِ الرَّمَادِ وَالْأُرْجُوَانِ.\nوَيَتَكَثَّفُ ظِلٌّ ضَخْمٌ بَيْنَ الصُّخُورِ.',
      s15_b2: 'أَتَظُنُّ نَفْسَكَ حَكِيمًا يَا عُثْمَانُ؟! لَقَدِ انْحَنَيْتَ أَمَامَ ذَلِكَ التَّاجِرِ! وَابْتَسَمْتَ لِمَنِ اتَّهَمَكَ! فِي هَذَا الْعَالَمِ يَسْحَقُ الْأَقْوِيَاءُ الْحُلَمَاءَ! دَعِ الْغَضَبَ يَشْتَعِلُ فِيكَ!',
      s15_b3: 'هَذَا فَخُّهُ الْأَخِيرُ يَا عُثْمَانُ! الْوَسْوَاسُ يُرِيدُ أَنْ يُقْنِعَكَ بِأَنَّ اللُّطْفَ ضَعْفٌ. ارْفَعْ حَقَائِقَ النُّبُوَّةِ الَّتِي تَعَلَّمْتَهَا الْيَوْمَ!',
      s15_b5: 'لَا... هَذِهِ الْبُرُودَةُ... هَذَا الْعَفْوُ... لَهَبُ الْكُرْهِ لَمْ يَعُدْ يَسْتَطِيعُ أَنْ يَتَجَذَّرَ فِي هَذَا الْقَلْبِ...!',
      s15_b6: 'فِي نَفَسٍ مِنَ النُّورِ الذَّهَبِيِّ، يَتَلَاشَى إِعْصَارُ الرَّمَادِ تَمَامًا. وَيَتَنَفَّسُ الْجَبَلُ سَلَامًا سَمَاوِيًّا.',
      s16_b1: 'تَغِيبُ الشَّمْسُ بِبُطْءٍ خَلْفَ الْمَآذِنِ الْبَعِيدَةِ. وَيَغْمُرُ الْوَادِيَ ضِيَاءٌ نَقِيٌّ صَافٍ.',
      s16_b2: 'لَقَدِ انْتَصَرْتَ عَلَى أَقْسَى الِامْتِحَانَاتِ يَا عُثْمَانُ. تَرْوِيضُ نَارِ الْغَضَبِ وَالرَّدُّ عَلَيْهَا بِالْحِلْمِ وَاللُّطْفِ... لَقَدْ تَجَاوَزْتَ دَرَجَةً عَظِيمَةً.',
      s16_b3: 'الْحَمْدُ للهِ... أَفْهَمُ الْآنَ لِمَاذَا كَانَ النَّبِيُّ ﷺ يَقُولُ إِنَّ الْقَوِيَّ حَقًّا هُوَ مَنْ يَمْلِكُ نَفْسَهُ. الْغَضَبُ يُدَمِّرُ كُلَّ شَيْءٍ، أَمَّا اللُّطْفُ فَيَبْنِي جُسُورًا لَا تَنْهَدِمُ.',
      s16_b5: 'عِنْدَ مُفْتَرَقِ الطُّرُقِ، يَتَّضِحُ اتِّجَاهُ مَرْحَلَةٍ جَدِيدَةٍ:\n« طَرِيقُ التَّوَكُّلِ — الْفَصْلُ ٣ : الثِّقَةُ بِاللهِ فِي مُوَاجَهَةِ الِابْتِلَاءِ ».'
    },
    variants: {
      's11_b7#0': 'مَهْلًا أَيُّهَا التَّاجِرُ! هَذَا هُوَ الْفَتَى الَّذِي بَارَكَنِي بِلُطْفٍ بِالْأَمْسِ فِي الْوَرْشَةِ... لَيْسَ فِيهِ خُبْثٌ، وَلَمْ يَدْفَعْ بَغْلَتَكَ!',
      's11_b7#1': 'هَدِّئْ مِنْ رَوْعِكَ أَيُّهَا التَّاجِرُ! هَذَا هُوَ الْمُسَافِرُ الشَّابُّ الَّذِي شَجَّعَنِي بِالْأَمْسِ عَلَى طَلَبِيَّتِي. إِنَّهُ طَيِّبٌ، انْظُرْ بِالْأَحْرَى إِلَى حَوَافِرِ الْبَغْلَةِ!',
      's11_b7#2': 'أَيُّهَا التَّاجِرُ، انْظُرْ جَيِّدًا: هَذَا الْفَتَى هَادِئٌ جِدًّا وَمُتَّزِنٌ. رَأَيْتُهُ بِالْأَمْسِ فِي الْوَرْشَةِ، وَهُوَ لَا يَبْحَثُ أَبَدًا عَنِ الْمَشَاكِلِ.',
      's11_b7#3': 'انْتَظِرْ! هَذَا هُوَ الْفَتَى الَّذِي أَثْنَى عَلَى عَمَلِي بِكُلِّ احْتِرَامٍ بِالْأَمْسِ. إِنَّهُ يُجِيدُ الْمُلَاحَظَةَ، وَلَمْ يَتَسَبَّبْ فِي هَذَا الذُّعْرِ!',
      's11_b7#4': 'مَهْلًا أَيُّهَا التَّاجِرُ! هَذَا هُوَ الْفَتَى الَّذِي مَرَّ بِالْأَمْسِ عَلَى الْوَرْشَةِ... لَيْسَ مِمَّنْ يَدْفَعُونَ بَغْلَتَكَ!',
      's14_b6#0': 'أَنْتَ؟! انْتَظِرْ... أَأَنْتَ الشَّابُّ الَّذِي سَاعَدَ الْفَلَّاحَ الْعَجُوزَ فِي حَمْلِ جِرَارِهِ بِالْأَمْسِ؟ حَدَّثَنِي عَنْ طِيبَتِكَ هَذَا الصَّبَاحَ... وَأَنَا الَّذِي صَرَخْتُ فِي وَجْهِكَ! لِمَاذَا تُسَاعِدُنِي بَعْدَ انْفِعَالِي؟',
      's14_b6#1': 'أَنْتَ؟! قَبْلَ قَلِيلٍ تَمَنَّيْتَ لِيَ السَّلَامَ بِكُلِّ هُدُوءٍ... وَالْآنَ تَعُودُ لِتُسَاعِدَنِي فِي جَمْعِ ثِمَارِي؟'
    },
    choices: {
      c2_chap2: { label: '« طَرِيقُ الْحِلْمِ » — الْفَصْلُ ٢ (ضَبْطُ النَّفْسِ)', badge: '✦ مُتَابَعَةٌ' },
      c1_replay: { label: '« التَّغَلُّبُ عَلَى الْوَحْدَةِ » — الْفَصْلُ ١ (إِعَادَةُ اللَّعِبِ)', badge: '✓ الْفَصْلُ ١' },
      c3_chap3: { label: '« طَرِيقُ التَّوَكُّلِ » — الْفَصْلُ ٣ (الثِّقَةُ بِاللهِ فِي مُوَاجَهَةِ الِابْتِلَاءِ)', badge: '✦ الْفَصْلُ ٣' },
      c_colere_respiration: { label: 'الْجُلُوسُ عَلَى السُّورِ الصَّغِيرِ وَالتَّنَفُّسُ ٣ ثَوَانٍ مِنَ الْأَنْفِ', responsePreview: 'تَغْيِيرُ وَضْعِيَّةِ الْجِسْمِ لِكَسْرِ نَزْعَةِ الْعُدْوَانِ.', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُطَبِّقُ عُثْمَانُ ضَبْطَ النَّفْسِ (الْحِلْمَ) فِي الِامْتِحَانِ.' },
      c_colere_faits: { label: 'عَرْضُ الْوَقَائِعِ بِصَوْتٍ حَازِمٍ دُونَ صُرَاخٍ', responsePreview: '« يَا عَمِّي، انْظُرْ إِلَى الْبَغْلَةِ: لَقَدْ جَفَلَتْ مِنْ تِلْقَاءِ نَفْسِهَا. لِنَتَحَدَّثْ بِكَرَامَةٍ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُجِيبُ عُثْمَانُ بِصَرَامَةٍ وَرَبَاطَةِ جَأْشٍ.' },
      c_colere_adab: { label: 'جَمْعُ التِّينِ السَّلِيمِ لِتَهْدِئَةِ ذُعْرِ التَّاجِرِ', responsePreview: 'نَزْعُ فَتِيلِ الْعُدْوَانِ بِفِعْلِ خِدْمَةٍ مُبَاشِرٍ.', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُطْفِئُ عُثْمَانُ نَارَ الْخِلَافِ بِالْأَدَبِ.' },
      c_ch2_anger_retreat: { label: 'الِاسْتِسْلَامُ لِلْغَضَبِ وَالصُّرَاخُ فِي وَجْهِ التَّاجِرِ' },
      c2_silence_digne: { label: 'دِرْعُ الصَّمْتِ (الْحِلْمُ)', responsePreview: '« أُطْبِقُ شَفَتَيَّ، وَأَتَنَفَّسُ، وَأَرْفُضُ تَغْذِيَةَ الْخِصَامِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُرَوِّضُ عُثْمَانُ انْدِفَاعَهُ بِصَمْتٍ نَبِيلٍ مُتَّزِنٍ.' },
      c2_parole_douce: { label: 'التَّحِيَّةُ الْمُهَدِّئَةُ (السَّلَامُ)', responsePreview: '« السَّلَامُ عَلَيْكَ يَا أَخِي. سَامِحْنِي إِنْ أَزْعَجْتُكَ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يَنْزِعُ عُثْمَانُ فَتِيلَ التَّوَتُّرِ بِتَحِيَّةِ السَّلَامِ.' },
      c2_comprehension_lucide: { label: 'فَهْمُ ضِيقِ الْآخَرِ قَبْلَ التَّصَرُّفِ', responsePreview: '« هَذَا الرَّجُلُ رَأَى مَحْصُولَهُ عَلَى الْأَرْضِ... ذُعْرُهُ يَتَكَلَّمُ قَبْلَ عَقْلِهِ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُحَلِّلُ عُثْمَانُ بِبَصِيرَةٍ سَبَبَ النِّزَاعِ.' },
      c2_rifq: { label: 'الْعَوْدَةُ إِلَى السُّوقِ لِمُسَاعَدَتِهِ بِرِفْقٍ (الرِّفْقُ)', responsePreview: '« لِنَعُدْ إِلَى السُّوقِ وَنُسَاعِدْهُ فِي جَمْعِ ثِمَارِهِ! لِنَرُدَّ الْإِسَاءَةَ بِالْإِحْسَانِ! »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُحَوِّلُ عُثْمَانُ الْإِسَاءَةَ إِلَى مُصَالَحَةٍ فِعْلِيَّةٍ.' },
      c2_meditation: { label: 'الْبَقَاءُ تَحْتَ الْعَرِيشَةِ وَالدُّعَاءُ لَهُ سِرًّا', responsePreview: '« لِيَهْدَأِ الزِّحَامُ. سَأَبْقَى هُنَا وَأَدْعُو لَهُ بِصِدْقٍ فِي السِّرِّ. »', habitMessage: 'قَرَارٌ أَخْلَاقِيٌّ • يُطَهِّرُ عُثْمَانُ نَفْسَهُ بِالدُّعَاءِ الْخَفِيِّ.' }
    },
    quizzes: {
      quiz_hilm_force: {
        topic: 'الْقَوِيُّ حَقًّا (الْحِلْمُ)',
        question: 'مَنْ هُوَ الْقَوِيُّ حَقًّا بَيْنَ النَّاسِ، بِحَسَبِ رَسُولِ اللهِ ﷺ؟',
        options: {
          A: 'مَنْ يَفُوزُ فِي كُلِّ الْمَعَارِكِ وَلَا يَتَرَاجَعُ أَبَدًا.',
          B: 'مَنْ يَمْلِكُ نَفْسَهُ حِينَ يَشْتَدُّ الْغَضَبُ.',
          C: 'مَنْ يَحْتَفِظُ بِكُلِّ شَيْءٍ فِي دَاخِلِهِ وَلَا يُظْهِرُ مَا يَشْعُرُ بِهِ أَبَدًا.',
          D: 'مَنْ يُجِيدُ الرَّدَّ بِأَشَدِّ قَسْوَةٍ عَلَى الْإِسَاءَةِ.'
        },
        explanation: 'عَلَّمَنَا النَّبِيُّ ﷺ أَنَّ الْقُوَّةَ الْحَقِيقِيَّةَ لَيْسَتْ فِي الْعَضَلَاتِ، بَلْ فِي قُدْرَةِ الْمُؤْمِنِ عَلَى تَرْوِيضِ نَفْسِهِ وَكَظْمِ غَيْظِهِ حِينَ يُحَاوِلُ الشَّيْطَانُ إِشْعَالَهُ.',
        theologicalNote: 'كَلِمَةُ « الْحِلْمِ » تَعْنِي الصَّبْرَ النَّبِيلَ وَضَبْطَ النَّفْسِ وَالتَّرَيُّثَ أَمَامَ الْإِسَاءَاتِ.',
        citationText: '« لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ. »',
        concept: 'الْحِلْمُ (ضَبْطُ النَّفْسِ عِنْدَ الْغَضَبِ)'
      },
      quiz_hilm_colere_remede: {
        topic: 'عِلَاجُ الْغَضَبِ',
        question: 'مَاذَا يُمْكِنُ أَنْ نَفْعَلَ، بِحَسَبِ تَعَالِيمِ النَّبِيِّ ﷺ، لِتَهْدِئَةِ الْغَضَبِ حِينَ يَشْتَدُّ؟',
        options: {
          A: 'الرَّدُّ فَوْرًا، لِيَفْهَمَ الْآخَرُ أَنَّهُ مُخْطِئٌ.',
          B: 'الِاسْتِعَاذَةُ بِاللهِ، ثُمَّ الْجُلُوسُ أَوِ الِاضْطِجَاعُ لِلتَّهْدِئَةِ.',
          C: 'مُغَادَرَةُ الْغُرْفَةِ مَعَ صَفْقِ الْبَابِ وَعَدَمُ كَلَامِ أَحَدٍ.',
          D: 'انْتِظَارُ أَنْ يَعْتَذِرَ الْآخَرُ أَوَّلًا، دُونَ حَرَاكٍ أَوْ كَلَامٍ.'
        },
        explanation: 'عَلَّمَنَا النَّبِيُّ ﷺ أَنْ نَسْتَعِيذَ بِاللهِ مِنَ الشَّيْطَانِ حِينَ يَشْتَدُّ الْغَضَبُ (الْبُخَارِيُّ ٣٢٨٢)، وَأَنْ نَجْلِسَ ثُمَّ نَضْطَجِعَ إِنْ كُنَّا وُقُوفًا (أَبُو دَاوُدَ ٤٧٨٢). وَالتَّبَرُّدُ بِالْمَاءِ يُعِينُ الْجِسْمَ عَلَى الْهُدُوءِ أَيْضًا.',
        theologicalNote: 'تَغْيِيرُ الْوَضْعِيَّةِ (الْجُلُوسُ لِمَنْ كَانَ وَاقِفًا) يَكْسِرُ الِانْدِفَاعَ الْجَسَدِيَّ لِلِاعْتِدَاءِ.',
        citationText: '« إِنِّي لَأَعْلَمُ كَلِمَةً لَوْ قَالَهَا لَذَهَبَ عَنْهُ مَا يَجِدُ : أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. »',
        concept: 'عِلَاجُ الْغَضَبِ فِي السُّنَّةِ'
      },
      quiz_hilm_rifq: {
        topic: 'الرِّفْقُ',
        question: 'مَا الْوَعْدُ الْكَرِيمُ الَّذِي ذَكَرَهُ النَّبِيُّ ﷺ عَنِ الرِّفْقِ؟',
        options: {
          A: 'الرِّفْقُ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.',
          B: 'الرِّفْقُ مَقْصُورٌ عَلَى الْوُجَهَاءِ، وَغَيْرُهُمْ أَقَلُّ اسْتِحْقَاقًا لَهُ.',
          C: 'الرِّفْقُ نَافِعٌ فَقَطْ حِينَ نَتَيَقَّنُ أَنَّ الْآخَرَ سَيَرُدُّهُ.',
          D: 'الرِّفْقُ يُبَطِّئُ الْأُمُورَ: فَلَا يَفْعَلُ إِلَّا أَنْ يُعِيقَ.'
        },
        explanation: 'عَلَّمَنَا رَسُولُ اللهِ ﷺ أَنَّ الرِّفْقَ يُجَمِّلُ كُلَّ كَلَامٍ وَكُلَّ فِعْلٍ. إِنَّهُ زِينَةُ الْخُلُقِ الْكَرِيمِ الَّتِي تَنْزِعُ فَتِيلَ أَشَدِّ الْخِلَافَاتِ.',
        theologicalNote: 'يُحَوِّلُ الرِّفْقُ الْمُوَاجَهَةَ الْمُدَمِّرَةَ إِلَى فُرْصَةٍ لِلتَّقَارُبِ وَالْبَرَكَةِ.',
        citationText: '« إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ. »',
        concept: 'الرِّفْقُ (اللُّطْفُ زِينَةٌ)'
      },
      quiz_hilm_afw: {
        topic: 'الْعَفْوُ وَالرِّفْعَةُ',
        question: 'مَاذَا وَعَدَ اللهُ مَنْ يَعْفُو وَيَتَجَاوَزُ الْإِسَاءَةَ بِنُبْلٍ؟',
        options: {
          A: 'أَنْ يُعَدَّ الْمَغْلُوبَ فِي الْخِصَامِ.',
          B: 'مَا زَادَ اللهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا وَشَرَفًا.',
          C: 'أَنْ يُطَالِبَ بِتَعْوِيضٍ مَالِيٍّ فَوْرِيٍّ.',
          D: 'أَنْ لَا يَحِقَّ لَهُ بَعْدَ ذَلِكَ الدِّفَاعُ عَنْ نَفْسِهِ.'
        },
        explanation: 'أَكَّدَ النَّبِيُّ ﷺ أَنَّ عَفْوًا لَمْ يُنْقِصْ يَوْمًا مِنْ كَرَامَةِ الْمُؤْمِنِ، بَلْ يَرْفَعُ اللهُ مَنْ يَعْفُو قَدْرًا وَمَكَانَةً.',
        theologicalNote: 'الْعَفْوُ مَعَ الْقُدْرَةِ عَلَى الِانْتِقَامِ هُوَ أَسْمَى عَلَامَاتِ الْحِلْمِ.',
        citationText: '« مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ للهِ إِلَّا رَفَعَهُ اللهُ. »',
        concept: 'الْعَفْوُ (نُبْلُ الصَّفْحِ)'
      },
      quiz_dua_secret: {
        topic: 'الدُّعَاءُ لِلْغَيْرِ فِي السِّرِّ',
        question: 'لِمَاذَا لِلدُّعَاءِ لِلْغَيْرِ فِي السِّرِّ قِيمَةٌ عَظِيمَةٌ فِي الْإِسْلَامِ؟',
        options: {
          A: 'لِأَنَّهُ أَسْهَلُ فِي التِّلَاوَةِ، وَاللهُ يَقْبَلُهُ حَتْمًا.',
          B: 'لِأَنَّهُ خَالٍ مِنَ الرِّيَاءِ، وَيُجِيبُ الْمَلَكُ : « آمِينَ، وَلَكَ بِمِثْلٍ ».',
          C: 'لِأَنَّهُ يُثْبِتُ لِلنَّاسِ أَنَّنَا كُرَمَاءُ.',
          D: 'لِأَنَّهُ يَحُلُّ مَحَلَّ الْجُهُودِ الْعَمَلِيَّةِ لِإِصْلَاحِ خَطَأٍ.'
        },
        explanation: 'عَلَّمَنَا النَّبِيُّ ﷺ أَنَّ الْمُسْلِمَ إِذَا دَعَا لِأَخِيهِ بِظَهْرِ الْغَيْبِ قَالَ الْمَلَكُ الْمُوَكَّلُ : « آمِينَ، وَلَكَ بِمِثْلٍ » (صَحِيحُ مُسْلِمٍ ٢٧٣٢). وَهُوَ الدَّوَاءُ الْأَعْظَمُ لِتَطْهِيرِ الْقَلْبِ مِنْ كُلِّ ضَغِينَةٍ.',
        theologicalNote: 'الدُّعَاءُ لِمَنْ آذَانَا يَقْضِي عَلَى سُمِّ الْمَرَارَةِ وَيَجْلِبُ بَرَكَةَ الْمَلَائِكَةِ فَوْرًا.',
        citationText: '« دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ، عِنْدَ رَأْسِهِ مَلَكٌ مُوَكَّلٌ كُلَّمَا دَعَا لِأَخِيهِ بِخَيْرٍ قَالَ الْمَلَكُ الْمُوَكَّلُ بِهِ : آمِينَ، وَلَكَ بِمِثْلٍ. »',
        concept: 'الدُّعَاءُ بِظَهْرِ الْغَيْبِ'
      }
    },
    realActions: {
      action_fraicheur: {
        title: 'الْفَجْرُ وَنِيَّةُ السَّلَامِ',
        instruction: 'اذْهَبْ إِلَى مَصْدَرِ مَاءٍ فِي حَيَاتِكَ الْحَقِيقِيَّةِ: بَلِّلْ وَجْهَكَ بِالْمَاءِ الْبَارِدِ. خُذْ نَفَسًا، وَاعْقِدِ النِّيَّةَ بِصِدْقٍ أَنْ تَكُونَ الْيَوْمَ زَارِعَ سَلَامٍ، صَبُورًا وَلَطِيفًا مَعَ مَنْ حَوْلَكَ.',
        subtext: 'مَاءُ الصَّبَاحِ يُوقِظُ الذِّهْنَ، وَالنِّيَّةُ الْخَالِصَةُ تُوَجِّهُ كُلَّ أَعْمَالِ الْيَوْمِ.',
        reflectionPrompt: 'هَلْ خَصَّصْتَ لَحْظَةً لِتَجْدِيدِ نِيَّةِ السَّلَامِ هَذَا الصَّبَاحَ؟'
      },
      action_silence_colere: {
        title: 'اخْتِبَارُ الصَّمْتِ أَمَامَ الِاسْتِفْزَازِ',
        instruction: 'فَكِّرْ فِي ضِيقٍ صَغِيرٍ حَدَثَ لَكَ مُؤَخَّرًا، أَوِ احْتَفِظْ بِهَذَا الْعَمَلِ جَاهِزًا لِلْيَوْمِ: حِينَ يُغْضِبُكَ أَحَدٌ أَوْ يَقْطَعُ كَلَامَكَ أَوْ يَنْتَقِدُكَ، خُذْ ٣ أَنْفَاسٍ عَمِيقَةٍ مِنَ الْأَنْفِ. اِمْسِكْ لِسَانَكَ وَاخْتَرِ الصَّمْتَ الْمُهَدِّئَ بَدَلَ رَدٍّ مُنْدَفِعٍ.',
        subtext: '« مَنْ كَانَ يُؤْمِنُ بِاللهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ » (الْبُخَارِيُّ ٦٠١٨). الصَّمْتُ فِي اللَّحْظَةِ الْحَرِجَةِ أَعْظَمُ دَلِيلٍ عَلَى الْقُوَّةِ الدَّاخِلِيَّةِ.',
        reflectionPrompt: 'هَلْ نَجَحْتَ فِي كَتْمِ كَلِمَةٍ عُدْوَانِيَّةٍ حِينَ كَانَ الْغَضَبُ يَشْتَدُّ؟'
      },
      action_ablution_calme: {
        title: 'إِطْفَاءُ النَّارِ بِالْمَاءِ الْبَارِدِ (الْوُضُوءُ)',
        instruction: 'تَوَضَّأْ، أَوِ اغْسِلْ يَدَيْكَ وَوَجْهَكَ وَسَاعِدَيْكَ بِعِنَايَةٍ بِالْمَاءِ الْبَارِدِ فِي حَيَاتِكَ الْحَقِيقِيَّةِ. أَحْسِسْ بِالْبُرُودَةِ تُخَفِّفُ التَّوَتُّرَ الْجَسَدِيَّ وَكَرِّرْ: « أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ».',
        subtext: 'الْغَضَبُ حَرَارَةٌ تَصْعَدُ إِلَى الْوَجْهِ؛ وَمَاءُ الْوُضُوءِ يُعِيدُ سَكِينَةَ الْجَسَدِ وَالرُّوحِ.',
        reflectionPrompt: 'هَلْ أَحْسَسْتَ بِالرَّاحَةِ الْفَوْرِيَّةِ الَّتِي يَمْنَحُهَا الْمَاءُ الْبَارِدُ عَلَى الْوَجْهِ؟'
      },
      action_pardon_noble: {
        title: 'خُطْوَةُ الْعَفْوِ وَاللُّطْفِ',
        instruction: 'الْيَوْمَ فِي حَيَاتِكَ الْحَقِيقِيَّةِ: حَرِّرْ قَلْبَكَ مِنْ كُلِّ ضَغِينَةٍ. اِعْفُ بِصِدْقٍ عَنْ شَخْصٍ آذَاكَ أَوْ أَزْعَجَكَ. وَإِنْ أَمْكَنَ فَوَجِّهْ إِلَيْهِ كَلِمَةً طَيِّبَةً أَوِ ابْتِسَامَةً بِلَا حِقْدٍ.',
        subtext: '« فَمَنْ عَفَا وَأَصْلَحَ فَأَجْرُهُ عَلَى اللهِ » (الشُّورَى ٤٠). الْعَفْوُ يُحَرِّرُ مَنْ يَمْنَحُهُ.',
        reflectionPrompt: 'هَلْ جَرَّبْتَ يَوْمًا خِفَّةَ الرُّوحِ الَّتِي تَأْتِي مِنَ التَّخَلِّي عَنِ الْحِقْدِ؟'
      },
      action_dua_secret: {
        title: 'الدُّعَاءُ السِّرِّيُّ لِلسَّلَامِ',
        instruction: 'فَكِّرْ فِي شَخْصٍ آذَاكَ أَوِ انْتَقَدَكَ أَوْ أَزْعَجَكَ مُؤَخَّرًا. فِي السِّرِّ، دُونَ أَنْ يَسْمَعَكَ أَحَدٌ، ادْعُ لَهُ بِصِدْقٍ: اسْأَلِ اللهَ أَنْ يَهْدِيَ قَلْبَهُ وَيُخَفِّفَ هُمُومَهُ وَيَمْنَحَكُمَا السَّلَامَ.',
        subtext: '« آمِينَ، وَلَكَ بِمِثْلٍ » يَرُدُّ الْمَلَكُ السَّمَاوِيُّ (صَحِيحُ مُسْلِمٍ ٢٧٣٢). الدُّعَاءُ لِمَنْ أَسَاءَ إِلَيْكَ قِمَّةُ ضَبْطِ النَّفْسِ.',
        reflectionPrompt: 'هَلْ أَحْسَسْتَ بِالضَّغِينَةِ تُغَادِرُ صَدْرَكَ وَأَنْتَ تَدْعُو لِمَنْ آذَاكَ؟'
      },
      action_mission_hilm: {
        title: 'الْمُهِمَّةُ الْكُبْرَى: الْيَدُ الْمَمْدُودَةُ',
        instruction: 'اصْنَعِ الْيَوْمَ مَعْرُوفًا أُخَوِيًّا تُجَاهَ شَخْصٍ كُنْتَ تَمِيلُ إِلَى تَجَنُّبِهِ أَوْ الْحُكْمِ عَلَيْهِ. قَدِّمْ لَهُ مُجَامَلَةً صَادِقَةً أَوْ مُسَاعَدَةً أَوْ هَدِيَّةً بَسِيطَةً لِتَوْثِيقِ الْأُخُوَّةِ.',
        subtext: '« ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ » (فُصِّلَتْ ٣٤).',
        reflectionPrompt: 'الْقَلْبُ اللَّطِيفُ يَنْزِعُ فَتِيلَ أَعْنَدِ الْعَدَاوَاتِ.'
      }
    },
    climaxSteps: {
      step_c2_istiadhah: { title: '١. إِطْفَاءُ الشَّرَارَةِ', meaning: 'أَسْتَعِيذُ بِاللهِ مِنْ نَارِ الْغَضَبِ وَالضَّغِينَةِ.', description: 'أَمَامَ الْغَلَيَانِ الدَّاخِلِيِّ، تُخْمِدُ الِاسْتِعَاذَةُ بِحِمَايَةِ اللهِ لَهَبَ الْوَسْوَاسِ.' },
      step_c2_force: { title: '٢. الْقُوَّةُ الْحَقِيقِيَّةُ', meaning: 'الْقَوِيُّ حَقًّا لَيْسَ مَنْ يَصْرَعُ، بَلْ مَنْ يَمْلِكُ نَفْسَهُ.', description: 'رَفْضُ التَّصَرُّفِ تَحْتَ وَطْأَةِ الِانْدِفَاعِ: ضَبْطُ النَّفْسِ عَلَامَةُ النُّفُوسِ النَّبِيلَةِ.' },
      step_c2_eau: { title: '٣. بُرُودَةُ الْمَاءِ', meaning: 'مَاءُ الْوُضُوءِ وَتَغْيِيرُ الْوَضْعِيَّةِ يُعِيدَانِ السَّلَامَ.', description: 'حِكْمَةُ النُّبُوَّةِ تُبَرِّدُ الدَّمَ وَتُبَدِّدُ ارْتِبَاكَ الذِّهْنِ.' },
      step_c2_rifq: { title: '٤. زِينَةُ الرِّفْقِ', meaning: 'الرِّفْقُ يُجَمِّلُ كُلَّ رَدِّ فِعْلٍ وَيَنْزِعُ فَتِيلَ الْكُرْهِ.', description: 'الرَّدُّ بِالْإِحْسَانِ حَيْثُ تَوَقَّعَ الْخَصْمُ الْعُنْفَ.' },
      step_c2_afw: { title: '٥. نُبْلُ الْعَفْوِ', meaning: 'الْعَفْوُ يَرْفَعُ الْعَبْدَ قَدْرًا عِنْدَ الْعَلِيِّ.', description: 'كَسْرُ قُيُودِ الِانْتِقَامِ: الْمُؤْمِنُ يَطْلُبُ أَجْرَهُ مِنَ اللهِ.' },
      step_c2_salam: { title: '٦. انْتِصَارُ السَّكِينَةِ', meaning: 'نُورُ السَّلَامِ يُذِيبُ ظِلَّ الْوَسْوَاسِ إِلَى الْأَبَدِ.', description: 'يَسْتَعِيدُ الْقَلْبُ صَفَاءَهُ النَّقِيَّ، خَالِيًا مِنْ كُلِّ عَدَاوَةٍ.' }
    }
  }
};
