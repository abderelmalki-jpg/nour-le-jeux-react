import { Scene, Quiz, RealAction } from '../types';

// Chapitre 5 : « Le Sommet de la Persévérance » (As-Sabr & La Constance — Finale Saison 1)
// ⚠️ Références religieuses (Coran 94:5-6, Coran 2:153, Bukhari 6464 / Muslim 782) : à faire relire par un savant.

export const CHAPTER_5_QUIZZES: Record<string, Quiz> = {
  quiz_sabr_constance: {
    id: 'quiz_sabr_constance',
    topic: 'La Constance dans le Bien (Al-Istiqāmah)',
    promptSpeaker: 'noura',
    question: 'Selon un célèbre hadith du Prophète ﷺ, quelles sont les œuvres les plus aimées d\'Allah ?',
    options: [
      { id: 'A', text: 'Celles que l\'on fait une seule fois de façon spectaculaire devant tout le monde.', isCorrect: false },
      { id: 'B', text: 'Les plus constantes dans le temps, même si elles sont peu nombreuses.', isCorrect: true },
      { id: 'C', text: 'Celles que l\'on accomplit uniquement lorsqu\'on ne ressent aucune fatigue.', isCorrect: false },
      { id: 'D', text: 'Celles qui demandent de tout réussir parfaitement dès le premier essai.', isCorrect: false }
    ],
    correctOptionId: 'B',
    explanation: 'Le Prophète ﷺ a enseigné que la régularité humble vaut mieux que l\'élan d\'un seul jour : un petit geste fidèle chaque matin transforme le cœur durablement.',
    theologicalNote: 'La persévérance (Sabr) se construit pas à pas, sans se décourager.',
    reference: {
      concept: 'Al-Mudāwamah (La constance dans les actes)',
      reference: 'Sahih al-Bukhari 6464 & Sahih Muslim 782 (à faire relire)',
      citationText: '« Les œuvres les plus aimées d\'Allah sont les plus constantes, même si elles sont peu nombreuses. »',
      sourceType: 'Hadith',
      arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ'
    }
  },
  quiz_sabr_facilite: {
    id: 'quiz_sabr_facilite',
    topic: 'Après la Difficulté, la Facilité',
    promptSpeaker: 'narration',
    question: 'Quelle promesse d\'espérance Allah répète-t-Il deux fois de suite dans la sourate Ash-Sharḥ (94:5-6) ?',
    options: [
      { id: 'A', text: 'Que le chemin du croyant ne comportera jamais aucune épreuve.', isCorrect: false },
      { id: 'B', text: 'Qu\'il faut attendre que les autres résolvent nos difficultés à notre place.', isCorrect: false },
      { id: 'C', text: 'Qu\'avec la difficulté vient certes la facilité.', isCorrect: true },
      { id: 'D', text: 'Que la fatigue disparaît dès qu\'on renonce à gravir la pente.', isCorrect: false }
    ],
    correctOptionId: 'C',
    explanation: 'Allah rappelle par deux fois que la facilité accompagne la difficulté : aucune côte n\'est interminable pour celui qui avance avec patience et confiance.',
    theologicalNote: 'Une difficulté ne vaincra jamais deux facilités.',
    reference: {
      concept: 'Al-Yusr maʿa al-ʿUsr (La facilité avec la difficulté)',
      reference: 'Coran 94:5-6 (à faire relire)',
      citationText: '« À côté de la difficulté est, certes, une facilité ! À côté de la difficulté est, certes, une facilité ! »',
      sourceType: 'Coran',
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا'
    }
  }
};

export const CHAPTER_5_REAL_ACTIONS: Record<string, RealAction> = {
  action_petite_constance: {
    id: 'action_petite_constance',
    title: 'Le Petit Pas Quotidien',
    instruction: 'Choisis une petite action simple que tu peux tenir chaque jour cette semaine (dire Bismillāh avant de manger, ranger ton bureau ou invoquer pour tes parents le soir).',
    subtext: '« Les œuvres les plus aimées d\'Allah sont les plus constantes, même si elles sont peu nombreuses. » (Bukhari 6464)',
    xpReward: 50,
    reflectionPrompt: 'Quelle petite habitude fidèle choisis-tu de garder cette semaine ?'
  },
  action_encourager_proche: {
    id: 'action_encourager_proche',
    title: 'La Lanterne Partagée',
    instruction: 'Pense à quelqu\'un autour de toi qui fournit un effort en ce moment (un frère, une sœur, un ami, un parent) et offre-lui une parole sincère d\'encouragement.',
    subtext: '« À côté de la difficulté est, certes, une facilité ! » (Coran 94:5-6)',
    xpReward: 50,
    reflectionPrompt: 'À qui as-tu choisi d\'offrir un mot d\'encouragement aujourd\'hui ?'
  }
};

export const CHAPTER_5_SCENES: Scene[] = [
  // SCÈNE 40 : Le sentier des crêtes
  {
    id: 40,
    title: 'Le Sentier des Crêtes',
    subtitle: '« Le premier souffle de l\'ascension »',
    location: 'Versant de la vallée, aube fraîche',
    backgroundTheme: 'vallee',
    beats: [
      {
        id: 's40_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'L\'air frais du matin effleure les collines. Devant Othmân s\'élève le sentier pierreux qui mène au belvédère des crêtes, là où toute la vallée s\'offre au regard.'
      },
      {
        id: 's40_b2',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'worried',
        text: 'La montée est bien plus raide que je ne l\'imaginais… Mes jambes sont lourdes et le sommet paraît encore si loin.'
      },
      {
        id: 's40_b3',
        type: 'dialogue',
        speaker: 'waswas',
        speakerName: 'Le Waswâs',
        emotion: 'shadow',
        text: 'À quoi bon continuer ? Tu as déjà fait quatre chapitres, c\'est bien assez ! Redescends te reposer, personne ne te reprochera d\'abandonner.'
      },
      {
        id: 's40_b4',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'smiling',
        text: 'Ne regarde pas toute la montagne d\'un seul coup, Othmân. Regarde seulement la prochaine pierre devant ton pied, et avance avec constance.'
      },
      {
        id: 's40_choice',
        type: 'choice',
        speaker: 'personnage',
        speakerName: 'Othmân',
        text: 'La fatigue pèse sur les épaules d\'Othmân. Comment choisit-il d\'aborder la montée ?',
        choices: [
          {
            id: 'c40_pas',
            label: '« Un pas à la fois, avec Bismillāh. Même lentement, j\'avance. »',
            habitMessage: 'La persévérance calme transforme les grandes pentes en petits pas accessibles.',
            traitGains: { sabr: 3, discipline: 2 }
          },
          {
            id: 'c40_souffle',
            label: '« Je reprends mon souffle calmement et je fixe mon cap vers la lumière. »',
            habitMessage: 'Savoir s\'arrêter pour respirer sans renoncer est une vraie force.',
            traitGains: { hilm: 2, sabr: 2 }
          }
        ]
      }
    ]
  },

  // SCÈNE 41 : L'ancrage dans le refuge (Rappel Ch. 1)
  {
    id: 41,
    title: 'L\'Ancrage dans le Refuge',
    subtitle: '« La constance face au doute »',
    location: 'Sentier des oliviers sous la brume',
    backgroundTheme: 'waswas',
    beats: [
      {
        id: 's41_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Un voile de brume violette glisse entre les rochers. Les vieux doutes du premier jour reviennent murmurer à l\'oreille d\'Othmân.'
      },
      {
        id: 's41_b2',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'determined',
        text: 'Aʿūdhu billāhi mina sh-shayṭāni r-rajīm ! Je te reconnais maintenant, Waswâs. Tu veux me faire oublier tout ce que j\'ai déjà traversé.'
      },
      {
        id: 's41_b3',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'smiling',
        text: 'Souviens-toi de la règle d\'or de la persévérance : ce ne sont pas les exploits d\'un jour qui bâtissent un caractère, mais les petits pas fidèles.'
      },
      {
        id: 's41_quiz',
        type: 'quiz',
        speaker: 'noura',
        speakerName: 'Noura',
        text: 'Noura pose une question sur la valeur de la constance :',
        quizId: 'quiz_sabr_constance'
      },
      {
        id: 's41_action',
        type: 'real_action',
        speaker: 'noura',
        speakerName: 'Pont de Nour',
        text: 'Ancre ta persévérance dans un geste simple de ton quotidien.',
        realActionId: 'action_petite_constance'
      }
    ]
  },

  // SCÈNE 42 : La halte de l'eau et du calme (Rappel Ch. 2)
  {
    id: 42,
    title: 'La Halte sur la Pente',
    subtitle: '« Garder sa douceur dans la fatigue »',
    location: 'Terrasse de pierre à mi-hauteur',
    backgroundTheme: 'halte_the',
    beats: [
      {
        id: 's42_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'À mi-chemin du sommet, un sentier étroit longe une petite terrasse. Un jeune voyageur pressé bouscule Othmân en descendant et fait tomber sa gourde dans la poussière.'
      },
      {
        id: 's42_b2',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'thoughtful',
        text: 'J\'ai failli m\'énerver à cause de la fatigue… Mais j\'ai appris le Hilm au marché. La colère n\'a jamais aidé personne à grimper plus vite.'
      },
      {
        id: 's42_b3',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'smiling',
        text: 'Ce n\'est rien, mon frère ! Le chemin est glissant ici. Tiens, prends soin de tes pas en descendant, as-salāmu ʿalaykum.'
      },
      {
        id: 's42_b4',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Le voyageur s\'arrête, surpris par tant de douceur, présente ses excuses et repart le sourire aux lèvres. La fatigue d\'Othmân semble déjà plus légère.'
      },
      {
        id: 's42_quiz',
        type: 'quiz',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Le Sage rappelle la promesse coranique qui soutient chaque effort :',
        quizId: 'quiz_sabr_facilite'
      }
    ]
  },

  // SCÈNE 43 : La force de la fraternité (Rappel Ch. 3 & 4)
  {
    id: 43,
    title: 'Les Mains qui Soutiennent',
    subtitle: '« Jamais seul sur la voie »',
    location: 'Verger en altitude, lanterne allumée',
    backgroundTheme: 'verger_lanterne',
    beats: [
      {
        id: 's43_b1',
        type: 'dialogue',
        speaker: 'enfant',
        speakerName: 'Bilâl',
        emotion: 'smiling',
        text: 'Othmân ! Je t\'ai rattrapé ! Ton père m\'a confié cette petite lanterne et quelques dattes pour la dernière montée.'
      },
      {
        id: 's43_b2',
        type: 'dialogue',
        speaker: 'personnage',
        speakerName: 'Othmân',
        emotion: 'smiling',
        text: 'Al-Hamdulillāh ! Entre les prières de mes parents, la patience de l\'enfant à l\'attelle et ta présence, Bilâl, je comprends qu\'on n\'est jamais seul quand on avance pour le bien.'
      },
      {
        id: 's43_choice',
        type: 'choice',
        speaker: 'personnage',
        speakerName: 'Othmân',
        text: 'Avant le dernier virage vers le sommet, quelle intention Othmân place-t-il dans son cœur ?',
        choices: [
          {
            id: 'c43_partage',
            label: '« Partager la lumière que j\'ai reçue avec ceux qui doutent encore. »',
            habitMessage: 'La vraie lumière grandit lorsqu\'on la partage.',
            traitGains: { adab: 2, sabr: 2 }
          },
          {
            id: 'c43_confiance',
            label: '« Placer mon Tawakkul en Allah et continuer d\'apprendre toute ma vie. »',
            habitMessage: 'L\'humilité et la confiance en Allah sont les meilleurs compagnons de route.',
            traitGains: { ilm: 2, sabr: 2 }
          }
        ]
      },
      {
        id: 's43_action',
        type: 'real_action',
        speaker: 'enfant',
        speakerName: 'Pont de Nour',
        text: 'Deviens à ton tour une lanterne pour quelqu\'un autour de toi.',
        realActionId: 'action_encourager_proche'
      }
    ]
  },

  // SCÈNE 44 : Le Sommet du Grand Waswâs (Climax Combat Final)
  {
    id: 44,
    title: 'Le Sommet de l\'Épreuve',
    subtitle: '« Le Duel Final de la Persévérance »',
    location: 'Col des crêtes, ciel embrasé',
    backgroundTheme: 'climax_hilm',
    beats: [
      {
        id: 's44_b1',
        type: 'dialogue',
        speaker: 'waswas',
        speakerName: 'Le Grand Waswâs',
        emotion: 'shadow',
        text: 'Juste avant le sommet, l\'Ombre rassemble tous ses murmures : la solitude, la colère, le découragement et l\'ingratitude ! Mais Othmân tient sa lanterne bien haute.'
      },
      {
        id: 's44_climax',
        type: 'climax_combat',
        speaker: 'grand_waswas',
        speakerName: 'Le Grand Waswâs',
        text: 'Convoque toutes les vertus apprises depuis le Chapitre 1 pour franchir le sommet !'
      }
    ]
  },

  // SCÈNE 45 : La Lumière sur la Vallée (Grande Finale)
  {
    id: 45,
    title: 'La Lumière sur la Vallée',
    subtitle: '« Le vrai voyage commence maintenant »',
    location: 'Sommet panoramique, aube dorée sur toute la vallée',
    backgroundTheme: 'epilogue',
    beats: [
      {
        id: 's45_b1',
        type: 'dialogue',
        speaker: 'narration',
        speakerName: 'Le Sage',
        text: 'Othmân atteint enfin le sommet. Sous ses yeux s\'étend toute la vallée baignée d\'or : sa chambre, le carrefour, le marché réconcilié, le verger et la cour familiale.'
      },
      {
        id: 's45_b2',
        type: 'dialogue',
        speaker: 'pere',
        speakerName: 'Le Père',
        emotion: 'smiling',
        text: 'Tu as franchi chaque étape non par la force des bras, mais par la noblesse du cœur : l\'Istiʿādhah, le Hilm, le Tawakkul, le Birr et le Sabr.'
      },
      {
        id: 's45_b3',
        type: 'dialogue',
        speaker: 'noura',
        speakerName: 'Noura',
        emotion: 'smiling',
        text: 'Et toi qui as accompagné Othmân jusqu\'ici : merci pour chaque choix réfléchi et chaque geste posé dans ta vraie vie. La plus belle aventure continue maintenant, hors de l\'écran.'
      },
      {
        id: 's45_end',
        type: 'chapter_end',
        speaker: 'narration',
        speakerName: 'Fin de la Saison 1',
        text: 'Félicitations ! Tu as accompli les 5 chapitres de NOUR : La Voie de la Sagesse.'
      }
    ]
  }
];
