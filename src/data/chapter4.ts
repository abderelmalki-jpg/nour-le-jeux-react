import { Scene, Quiz, RealAction } from '../types';

// Chapitre 4 : « Ce que tu as encore » (Birr al-Wālidayn — La Bonté envers les Parents)
// ⚠️ Références religieuses (Coran 17:23-24, 31:14, Bukhari 5971 / Muslim 2548, Tirmidhi 1899) : à faire relire par un savant.

export const CHAPTER_4_QUIZZES: Record<string, Quiz> = {
  quiz_birr_parole: {
    id: 'quiz_birr_parole',
    topic: 'La Parole Noble envers les Parents',
    promptSpeaker: 'noura',
    question: 'Dans la sourate Al-Isrāʾ (17:23), quelle attitude le Coran enseigne-t-il face à l\'agacement envers ses parents ?',
    options: [
      { id: 'A', text: 'Répondre vivement sur le coup, puis revenir s\'excuser le lendemain.', isCorrect: false },
      { id: 'B', text: 'Ne pas même leur dire « Ouf ! », ne pas les brusquer et leur adresser des paroles nobles.', isCorrect: true },
      { id: 'C', text: 'Rester silencieux en tournant le dos jusqu\'à ce qu\'ils changent d\'avis.', isCorrect: false },
      { id: 'D', text: 'Ne parler doucement que lorsqu\'on est d\'accord avec leur demande.', isCorrect: false }
    ],
    correctOptionId: 'B',
    explanation: 'Le verset 17:23 rappelle de ne même pas exprimer un soupir d\'agacement (« Ouf ! ») envers ses parents et de toujours choisir des paroles respectueuses et bienveillantes.',
    theologicalNote: 'La bonté envers les parents commence par le ton de la voix, même quand on est fatigué ou contrarié.',
    reference: {
      concept: 'Birr al-Wālidayn (La parole noble)',
      reference: 'Coran 17:23 (à faire relire)',
      citationText: '« Ne leur dis point : "Fi !" et ne les brusque pas, mais adresse-leur des paroles respectueuses. »',
      sourceType: 'Coran',
      arabic: 'فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا'
    }
  },
  quiz_birr_mere: {
    id: 'quiz_birr_mere',
    topic: 'La Place de la Mère et du Père',
    promptSpeaker: 'grand_pere',
    question: 'Lorsqu\'un homme demanda au Prophète ﷺ qui méritait le plus sa bonne compagnie, que répondit-il ?',
    options: [
      { id: 'A', text: '« Tes amis les plus fidèles, puis ton voisinage proche. »', isCorrect: false },
      { id: 'B', text: '« Ton père en premier, puis ton maître, puis ta mère. »', isCorrect: false },
      { id: 'C', text: '« Ta mère », répéta-t-il trois fois, puis la quatrième fois : « Ton père. »', isCorrect: true },
      { id: 'D', text: '« Celui qui te rend le plus de services dans la journée. »', isCorrect: false }
    ],
    correctOptionId: 'C',
    explanation: 'Le Prophète ﷺ a cité la mère trois fois avant de citer le père, rappelant la tendresse, les peines et l\'attention silencieuse qu\'elle porte dès le premier jour.',
    theologicalNote: 'Les deux parents occupent un rang immense ; la répétition honore les efforts discrets de la mère.',
    reference: {
      concept: 'La bonne compagnie envers les parents',
      reference: 'Sahih al-Bukhari 5971 & Sahih Muslim 2548 (à faire relire)',
      citationText: '« Ta mère. — Et ensuite ? — Ta mère. — Et ensuite ? — Ta mère. — Et ensuite ? — Ton père. »',
      sourceType: 'Hadith',
      arabic: 'أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أَبُوكَ'
    }
  },
  quiz_birr_shukr: {
    id: 'quiz_birr_shukr',
    topic: 'La Gratitude (Shukr) envers Allah et les Parents',
    promptSpeaker: 'pere',
    question: 'Dans la sourate Luqmān (31:14), à quoi Allah associe-t-Il directement la reconnaissance envers Lui ?',
    options: [
      { id: 'A', text: 'À la reconnaissance envers ses parents.', isCorrect: true },
      { id: 'B', text: 'À la réussite dans les voyages lointains.', isCorrect: false },
      { id: 'C', text: 'À l\'accumulation de biens pour l\'avenir.', isCorrect: false },
      { id: 'D', text: 'À la victoire dans les débats devant le village.', isCorrect: false }
    ],
    correctOptionId: 'A',
    explanation: 'Le Coran lie la gratitude envers Allah à la gratitude envers ses parents : remercier ceux qui prennent soin de nous chaque jour est une porte de bénédiction.',
    theologicalNote: 'Celui qui ne remercie pas les gens ne remercie pas pleinement Allah.',
    reference: {
      concept: 'Shukr al-Wālidayn (Reconnaissance envers les parents)',
      reference: 'Coran 31:14 (à faire relire)',
      citationText: '« Sois reconnaissant envers Moi ainsi qu\'envers tes parents. Vers Moi est la destination. »',
      sourceType: 'Coran',
      arabic: 'أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ'
    }
  },
  quiz_birr_invocation: {
    id: 'quiz_birr_invocation',
    topic: 'L\'Invocation pour ses Parents',
    promptSpeaker: 'noura',
    question: 'Quelle invocation coranique (17:24) enseigne à demander la miséricorde d\'Allah pour ses parents ?',
    options: [
      { id: 'A', text: '« Seigneur, rends-moi plus fort que tous mes camarades. »', isCorrect: false },
      { id: 'B', text: '« Seigneur, fais-leur miséricorde comme ils m\'ont élevé tout petit. »', isCorrect: true },
      { id: 'C', text: '« Seigneur, éloigne de moi toute tâche difficile à la maison. »', isCorrect: false },
      { id: 'D', text: '« Seigneur, donne-moi la patience d\'attendre qu\'ils changent. »', isCorrect: false }
    ],
    correctOptionId: 'B',
    explanation: 'Cette invocation de la sourate Al-Isrāʾ (17:24) adoucit le cœur et rappelle que nos parents nous ont portés et accompagnés quand nous étions tout petits.',
    theologicalNote: 'Invoquer pour ses parents est un cadeau qui dure toute la vie.',
    reference: {
      concept: 'Duʿāʾ pour les parents',
      reference: 'Coran 17:24 (à faire relire)',
      citationText: '« Ô mon Seigneur, fais-leur à tous deux miséricorde comme ils m\'ont élevé tout petit. »',
      sourceType: 'Coran',
      arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا'
    }
  }
};

export const CHAPTER_4_REAL_ACTIONS: Record<string, RealAction> = {
  action_observer_soin: {
    id: 'action_observer_soin',
    title: 'Voir l\'Invisible',
    instruction: 'Aujourd\'hui, remarque au moins un geste discret qu\'un de tes parents fait pour toi sans rien demander (repas, linge, trajet, conseil) et remercie Allah dans ton cœur.',
    subtext: '« Sois reconnaissant envers Moi ainsi qu\'envers tes parents. » (Coran 31:14)',
    xpReward: 40,
    reflectionPrompt: 'Quel geste silencieux de ta mère ou de ton père as-tu remarqué aujourd\'hui ?'
  },
  action_merci_parent: {
    id: 'action_merci_parent',
    title: 'La Parole Douce',
    instruction: 'Va voir ta mère ou ton père (ou appelle-les) et dis-leur simplement « Merci pour tout ce que tu fais pour moi » avec un sourire sincère.',
    subtext: '« Adresse-leur des paroles respectueuses. » (Coran 17:23)',
    xpReward: 50,
    reflectionPrompt: 'Quelle a été leur réaction en entendant ton merci sincère ?'
  },
  action_service_maison: {
    id: 'action_service_maison',
    title: 'Le Geste Réparateur',
    instruction: 'Sans attendre qu\'on te le demande, rends un service concret à la maison (débarrasser la table, ranger une pièce, porter un sac ou préparer un verre d\'eau).',
    subtext: '« Ô mon Seigneur, fais-leur miséricorde comme ils m\'ont élevé tout petit. » (Coran 17:24)',
    xpReward: 50,
    reflectionPrompt: 'Qu\'as-tu ressenti en rendant ce service spontanément ?'
  }
};

export const CHAPTER_4_SCENES: Scene[] = [
  // SCÈNE 30 : Le matin agacé
  {
    id: 30,
    title: 'Le Matin Agacé',
    subtitle: '« Le mot qui dépasse la pensée »',
    location: 'Cour familiale, matin clair',
    backgroundTheme: 'cour_parents',
    beats: [
      {
        id: 's30_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Le soleil du matin filtre doucement à travers le feuillage de la cour familiale. L\'odeur du pain chaud flotte dans l\'air, mais Othmân est pressé de retrouver ses amis.'
      },
      {
        id: 's30_b2',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'neutral',
        text: 'Othmân, mon fils, avant de partir, peux-tu m\'aider à rentrer les paniers d\'olives et ranger ta besace ? Ton père a déjà porté les caisses ce matin.'
      },
      {
        id: 's30_b4',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'worried',
        text: 'Ouf ! Toujours moi ! Je voulais juste partir cinq minutes plus tôt… Tu ne vois pas que je suis déjà en retard ?'
      },
      {
        id: 's30_b5',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'La porte de bois claque sèchement derrière Othmân. Dans la cour, Noura ne répond pas par la colère : elle baisse simplement les yeux, un peu peinée, et ramasse le panier seule.'
      },
      {
        id: 's30_choice',
        type: 'choice',
        speaker: 'narration',
        text: 'À peine quelques pas hors de la maison, le cœur d\'Othmân se serre. Que ferais-tu à sa place ?',
        choices: [
          {
            id: 'c30_regret',
            label: '« J\'ai parlé trop vite… Ce "Ouf" ne me ressemble pas. »',
            habitMessage: 'Reconnaître son erreur est déjà le premier pas vers la réparation.',
            traitGains: { adab: 2, hilm: 1 }
          },
          {
            id: 'c30_marcher',
            label: '« J\'ai besoin de marcher jusqu\'au grand arbre pour réfléchir au calme. »',
            habitMessage: 'Prendre du recul aide à voir plus clair avant de revenir parler avec douceur.',
            traitGains: { sabr: 2, discipline: 1 }
          }
        ]
      },
      {
        id: 's30_quiz',
        type: 'quiz',
        speaker: 'noura',
        speakerName: 'Le Rappel',
        text: 'Un verset que Noura récitait souvent revient à l\'esprit d\'Othmân…',
        quizId: 'quiz_birr_parole'
      }
    ]
  },

  // SCÈNE 31 : Sous le grand arbre
  {
    id: 31,
    title: 'Sous le Grand Arbre',
    subtitle: '« Les racines qui nourrissent »',
    location: 'Colline de l\'arbre ancien, lumière matinale',
    backgroundTheme: 'arbre_racines',
    beats: [
      {
        id: 's31_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Sur la colline qui domine la vallée, un immense arbre ancien déploie ses racines noueuses sur les pierres moussues. L\'ami d\'enfance d\'Othmân est assis sur le banc de bois, le regard levé vers les branches.'
      },
      {
        id: 's31_b2',
        type: 'dialogue',
        speaker: 'enfant',
        speakerName: 'Bilâl',
        emotion: 'smiling',
        text: 'As-salāmu ʿalaykum Othmân ! Viens voir là-haut, sur la branche basse : un petit oiseau fait des allers-retours depuis une heure.'
      },
      {
        id: 's31_b3',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'thoughtful',
        text: 'Wa ʿalaykum as-salām Bilâl… Il a l\'air épuisé, et pourtant il repart aussitôt chercher des brindilles et des graines pour son nid.'
      },
      {
        id: 's31_b4',
        type: 'dialogue',
        speaker: 'grand_pere',
        speakerName: 'Le Grand-Père',
        emotion: 'smiling',
        text: 'Vous observez un beau signe, mes enfants. Regardez aussi les racines de cet arbre : on ne les voit presque pas sous la terre, et pourtant sans elles, pas une feuille ne verdirait.'
      },
      {
        id: 's31_b5',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'surprised',
        text: 'Les racines… Elles travaillent en silence pour que l\'arbre tienne debout. Comme ma mère et mon père à la maison.'
      },
      {
        id: 's31_quiz',
        type: 'quiz',
        speaker: 'grand_pere',
        speakerName: 'Le Grand-Père',
        text: 'Le Grand-Père sourit et pose une question aux deux enfants :',
        quizId: 'quiz_birr_mere'
      },
      {
        id: 's31_action',
        type: 'real_action',
        speaker: 'grand_pere',
        speakerName: 'Pont de Nour',
        text: 'Avant de continuer, prends un instant pour voir ce que l\'on ne remarque plus.',
        realActionId: 'action_observer_soin'
      }
    ]
  },

  // SCÈNE 32 : La confidence
  {
    id: 32,
    title: 'La Confidence',
    subtitle: '« Ce que tu as encore »',
    location: 'Terrasse ombragée de la halte du thé',
    backgroundTheme: 'halte_the',
    beats: [
      {
        id: 's32_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Sous la pergola de vigne, deux verres de thé à la menthe fument doucement. Othmân avoue à Bilâl qu\'il s\'est agacé contre sa mère ce matin.'
      },
      {
        id: 's32_b2',
        type: 'dialogue',
        speaker: 'enfant',
        speakerName: 'Bilâl',
        emotion: 'thoughtful',
        text: 'Tu sais Othmân… Mon père travaille loin dans la ville voisine toute la semaine, et quand il rentre, il est si fatigué qu\'on a à peine le temps de discuter.'
      },
      {
        id: 's32_b3',
        type: 'dialogue',
        speaker: 'enfant',
        speakerName: 'Bilâl',
        emotion: 'neutral',
        text: 'Parfois, j\'aimerais tellement qu\'il me demande de porter un panier avec lui ou de ranger la cour ensemble. Toi, tu les as près de toi tous les matins…'
      },
      {
        id: 's32_b4',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'worried',
        text: 'Pardonne-moi, Bilâl… Je me suis plaint de ce que d\'autres aimeraient tant avoir. Je croyais que leur présence allait de soi.'
      },
      {
        id: 's32_choice',
        type: 'choice',
        speaker: 'narration',
        text: 'Face à la confidence de son ami, que ferais-tu à la place d\'Othmân ?',
        choices: [
          {
            id: 'c32_soutien',
            label: '« Qu\'Allah facilite le travail de ton père et vous réunisse souvent dans la paix. »',
            habitMessage: 'Une invocation sincère console le cœur d\'un ami et rappelle la valeur des bienfaits.',
            traitGains: { adab: 2, sabr: 1 }
          },
          {
            id: 'c32_promesse',
            label: '« Merci de m\'avoir ouvert les yeux. Je vais rentrer tout de suite réparer ma parole. »',
            habitMessage: 'Transformer la prise de conscience en action rapide est une marque de maturité.',
            traitGains: { discipline: 2, hilm: 1 }
          },
          {
            id: 'c_ch4_pride_retreat',
            label: 'Garder son orgueil et refuser d’aller s’excuser auprès de ses parents'
          }
        ]
      }
    ]
  },

  // SCÈNE 33 : Le retour à la maison
  {
    id: 33,
    title: 'Le Retour à la Maison',
    subtitle: '« Les gestes silencieux »',
    location: 'Cour familiale, milieu de journée',
    backgroundTheme: 'cour_parents',
    beats: [
      {
        id: 's33_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Quand Othmân pousse doucement le portail de la cour, il voit son père réparer la sangle usée de sa besace, pendant que Noura prépare un repas simple avec soin.'
      },
      {
        id: 's33_b2',
        type: 'dialogue',
        speaker: 'pere',
        speakerName: 'Le Père',
        emotion: 'smiling',
        text: 'Te voilà de retour, Othmân. Ta sangle menaçait de céder sur le chemin, je l\'ai recousue pour qu\'elle tienne longtemps.'
      },
      {
        id: 's33_b3',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'surprised',
        text: 'Papa… Tu as pris le temps de réparer ma besace sans même me le dire ? Et moi qui suis parti en râlant ce matin…'
      },
      {
        id: 's33_b4',
        type: 'dialogue',
        speaker: 'pere',
        speakerName: 'Le Père',
        emotion: 'thoughtful',
        text: 'Un parent n\'aide pas pour compter les points, mon fils. Mais un mot doux, un merci sincère, cela repose plus qu\'une heure de sommeil.'
      },
      {
        id: 's33_quiz',
        type: 'quiz',
        speaker: 'pere',
        speakerName: 'Le Père',
        text: 'Le père d\'Othmân évoque le conseil du sage Luqmān dans le Coran :',
        quizId: 'quiz_birr_shukr'
      },
      {
        id: 's33_action',
        type: 'real_action',
        speaker: 'pere',
        speakerName: 'Pont de Nour',
        text: 'Ne garde pas ta gratitude enfermée dans ton cœur.',
        realActionId: 'action_merci_parent'
      }
    ]
  },

  // SCÈNE 34 : Le geste réparateur
  {
    id: 34,
    title: 'Le Geste Réparateur',
    subtitle: '« Mieux que des mots : un acte »',
    location: 'Cour familiale, après-midi paisible',
    backgroundTheme: 'cour_parents',
    beats: [
      {
        id: 's34_b1',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'determined',
        text: 'Maman… Je suis désolé pour mon "Ouf" de ce matin et d\'avoir claqué la porte. Tu fais tellement pour nous, et j\'ai manqué de douceur.'
      },
      {
        id: 's34_b2',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'smiling',
        text: 'Ton cœur est revenu vers la lumière, Othmân, et c\'est tout ce qui compte. Je te pardonne de tout cœur.'
      },
      {
        id: 's34_choice',
        type: 'choice',
        speaker: 'narration',
        text: 'Pour accompagner ses excuses d\'un vrai geste de Birr, que ferais-tu à la place d\'Othmân ?',
        choices: [
          {
            id: 'c34_paniers',
            label: 'Rentrer immédiatement tous les paniers d\'olives et balayer la cour.',
            habitMessage: 'Un service concret soulage immédiatement les épaules de ceux qu\'on aime.',
            traitGains: { discipline: 2, adab: 2 }
          },
          {
            id: 'c34_the',
            label: 'Préparer le plateau de thé à la menthe et inviter ses parents à s\'asseoir.',
            habitMessage: 'Offrir du repos à ses parents est une attention délicate et pleine de tendresse.',
            traitGains: { adab: 3, hilm: 1 }
          }
        ]
      },
      {
        id: 's34_quiz',
        type: 'quiz',
        speaker: 'noura',
        speakerName: 'Noura',
        text: 'Avant de terminer l\'après-midi, Noura rappelle une belle invocation coranique :',
        quizId: 'quiz_birr_invocation'
      },
      {
        id: 's34_action',
        type: 'real_action',
        speaker: 'noura',
        speakerName: 'Pont de Nour',
        text: 'À ton tour de poser un geste concret dans ta propre maison.',
        realActionId: 'action_service_maison'
      }
    ]
  },

  // SCÈNE 35 : L'Ombre de l'Ingratitude (Climax Combat Ch. 4)
  {
    id: 35,
    title: 'L\'Ombre de l\'Ingratitude',
    subtitle: '« Le Duel du Birr al-Wālidayn »',
    location: 'Sentier du crépuscule, brume violette',
    backgroundTheme: 'climax_hilm',
    beats: [
      {
        id: 's35_b1',
        type: 'dialogue',
        speaker: 'waswas',
        speakerName: 'Le Grand Waswâs',
        emotion: 'shadow',
        text: 'Une brume violette tente une dernière fois de voiler la gratitude d\'Othmân : « Tes parents n\'ont fait que leur devoir ! Pourquoi te fatiguer à les remercier ? Tu as mieux à faire ! »'
      },
      {
        id: 's35_climax',
        type: 'climax_combat',
        speaker: 'grand_waswas',
        speakerName: 'Le Grand Waswâs',
        text: 'Défends la gratitude et la bonté envers les parents face aux murmures de l\'ingratitude !'
      }
    ]
  },

  // SCÈNE 36 : Le soir qui apaise (Épilogue Ch. 4)
  {
    id: 36,
    title: 'Le Soir qui Apaise',
    subtitle: '« La bénédiction du foyer »',
    location: 'Hauteurs de la vallée, crépuscule doré',
    backgroundTheme: 'epilogue',
    beats: [
      {
        id: 's36_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Le soleil descend lentement derrière les collines. La lanterne de la cour familiale brille d\'une chaleur nouvelle, plus douce que jamais.'
      },
      {
        id: 's36_b2',
        type: 'dialogue',
        speaker: 'pere',
        speakerName: 'Le Père',
        emotion: 'smiling',
        text: 'Qu\'Allah te bénisse, Othmân. Celui qui honore ses racines ne craint pas le vent des sommets.'
      },
      {
        id: 's36_b3',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'smiling',
        text: 'Tu as appris à voir ce que tu as encore : des mains qui veillent, des cœurs qui prient pour toi. Demain, un dernier sommet t\'attendra sur la voie de la persévérance.'
      },
      {
        id: 's36_end',
        type: 'chapter_end',
        speaker: 'narration',
        speakerName: 'Fin du Chapitre 4',
        text: 'Bravo ! Tu as achevé le Chapitre 4 : « Ce que tu as encore » (Birr al-Wālidayn).'
      }
    ]
  }
];
