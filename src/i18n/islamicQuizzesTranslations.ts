import { IslamicQuizQuestion } from '../types';
import { ISLAMIC_QUIZZES } from '../data/islamicQuizzes';

interface QuizLocalePatch {
  question: string;
  category: string;
  options: string[];
  explanation: string;
  hadithOrQuranRef?: string;
}

const ISLAMIC_QUIZZES_EN: Record<string, QuizLocalePatch> = {
  quiz_ablutions_ordre: {
    question: 'What is the proper order to perform ablutions (Al-Wudūʾ)?',
    category: 'Prayer & Worship',
    options: [
      'Hands ➔ Face ➔ Mouth/Nose ➔ Feet ➔ Arms ➔ Head',
      'Hands ➔ Mouth & Nose ➔ Face ➔ Arms to the elbows ➔ Head & Ears ➔ Feet',
      'Face ➔ Hands ➔ Arms ➔ Mouth/Nose ➔ Head ➔ Feet'
    ],
    explanation: 'The Prophetic order begins with washing the hands (3x), rinsing the mouth and nose (3x), washing the face (3x), washing the arms up to the elbows (3x), wiping the head and ears (1x), and finally washing the feet up to the ankles (3x).',
    hadithOrQuranRef: 'Surah Al-Māʾidah (5:6) & Hadith of ʿUthmān ibn ʿAffān (Al-Bukhārī & Muslim)'
  },
  quiz_piliers_islam: {
    question: 'How many pillars of Islam are there?',
    category: 'Pillars & Faith',
    options: [
      '3 pillars',
      '5 pillars (Shahādah, Prayer, Zakāt, Fasting, Hajj)',
      '7 pillars'
    ],
    explanation: 'The Prophet ﷺ said: "Islam is built upon five pillars: testifying that none has the right to be worshipped except Allah and that Muhammad is His Messenger, establishing prayer, paying Zakāt, fasting Ramadan, and performing Hajj for those who are able."',
    hadithOrQuranRef: 'Al-Bukhārī (no. 8) & Muslim (no. 16)'
  },
  quiz_piliers_foi: {
    question: 'How many pillars of Faith (Al-Īmān) are there?',
    category: 'Pillars & Faith',
    options: [
      '4 pillars',
      '5 pillars',
      '6 pillars (Allah, Angels, Books, Messengers, Last Day, Divine Decree)'
    ],
    explanation: 'The six pillars of faith are believing in Allah, His angels, His revealed books, His messengers, the Last Day, and Divine Decree (Al-Qadar), whether good or difficult.',
    hadithOrQuranRef: 'Hadith of Jibrīl (Muslim, no. 8)'
  },
  quiz_nombre_prieres: {
    question: 'How many obligatory prayers does a Muslim perform each day?',
    category: 'Prayer & Worship',
    options: [
      '3 prayers',
      '5 daily prayers (Fajr, Dhuhr, ʿAsr, Maghrib, ʿIshāʾ)',
      '7 prayers'
    ],
    explanation: 'The 5 daily obligatory prayers prescribed during the Night Journey (Al-Isrāʾ wal-Miʿrāj) are Fajr (dawn), Dhuhr (noon), ʿAsr (afternoon), Maghrib (sunset), and ʿIshāʾ (night).',
    hadithOrQuranRef: 'Hadith of Al-Isrāʾ wal-Miʿrāj (Sahīh Al-Bukhārī)'
  },
  quiz_sourate_fatiha: {
    question: 'Which is the first surah of the Quran, recited in every unit of prayer (rakʿah)?',
    category: 'Quran & Surahs',
    options: [
      'Surah Al-Ikhlās (Sincerity)',
      'Surah Al-Fātihah (The Opening)',
      'Surah An-Nās (Mankind)'
    ],
    explanation: 'The Prophet ﷺ said: "There is no valid prayer for the one who does not recite the Opening of the Book (Al-Fātihah)."',
    hadithOrQuranRef: 'Al-Bukhārī (no. 756) & Muslim (no. 394)'
  },
  quiz_nombre_sourates: {
    question: 'How many surahs are in the Noble Quran?',
    category: 'Quran & Surahs',
    options: ['99 surahs', '114 surahs', '120 surahs'],
    explanation: 'The Noble Quran consists of 114 surahs, beginning with Surah Al-Fātihah and ending with Surah An-Nās.',
    hadithOrQuranRef: 'The ʿUthmānī Mushaf'
  },
  quiz_sourate_longue: {
    question: 'Which is the longest surah of the Quran?',
    category: 'Quran & Surahs',
    options: [
      'Surah Al-Baqarah (The Cow — 286 verses)',
      'Surah An-Nisāʾ (The Women)',
      'Surah Yā-Sīn'
    ],
    explanation: 'Surah Al-Baqarah is the longest surah in the Quran with 286 verses. It also contains the greatest verse: Āyat al-Kursī (The Verse of the Throne).',
    hadithOrQuranRef: 'Surah Al-Baqarah (2:255)'
  },
  quiz_rakats_fajr: {
    question: 'How many obligatory rakʿahs (units) are in the Fajr (dawn) prayer?',
    category: 'Prayer & Worship',
    options: [
      '2 obligatory rakʿahs recited aloud',
      '4 rakʿahs',
      '3 rakʿahs'
    ],
    explanation: 'The obligatory Fajr prayer consists of 2 rakʿahs recited aloud, ideally preceded by 2 voluntary Sunnah rakʿahs of immense reward.',
    hadithOrQuranRef: 'Hadith: "The two rakʿahs of Fajr are better than this world and all it contains." (Muslim)'
  },
  quiz_mois_hegire: {
    question: 'What is the first month of the Islamic Hijri calendar?',
    category: 'Prophets & History',
    options: [
      'The month of Ramadan',
      'The month of Muharram (Al-Muharram)',
      'The month of Shawwāl'
    ],
    explanation: 'The Hijri year begins with the sacred month of Muharram (which includes the day of ʿĀshūrāʾ) and ends with Dhū al-Hijjah (the month of Hajj).',
    hadithOrQuranRef: 'Surah At-Tawbah (9:36)'
  },
  quiz_prophete_arche: {
    question: 'Which Prophet of Allah built the Ark to save the believers from the flood?',
    category: 'Prophets & History',
    options: [
      'Prophet Ibrāhīm (Abraham)',
      'Prophet Nūh (Noah)',
      'Prophet Mūsā (Moses)'
    ],
    explanation: 'Prophet Nūh (عليه السلام) called his people with patience for 950 years, then built the Ark by Allah’s command to save the believers.',
    hadithOrQuranRef: 'Surah Hūd (11:37) & Surah Nūh (71)'
  },
  quiz_laylat_qadr: {
    question: 'Which blessed night of Ramadan is better than a thousand months of worship?',
    category: 'Quran & Surahs',
    options: [
      'The Night of Decree (Laylat al-Qadr)',
      'The Night of the Hijrah',
      'The Night of Victory'
    ],
    explanation: 'Allah says in the Quran: "The Night of Decree is better than a thousand months" (more than 83 years of worship!). It is sought in the odd nights of the last ten days of Ramadan.',
    hadithOrQuranRef: 'Surah Al-Qadr (97:3)'
  },
  quiz_calife_othman: {
    question: 'Which rightly guided Caliph had the Quran compiled into a single unified official copy (Mushaf)?',
    category: 'Prophets & History',
    options: [
      'Caliph Abū Bakr As-Siddīq',
      'Caliph ʿUthmān ibn ʿAffān (Dhū an-Nūrayn)',
      'Caliph ʿAlī ibn Abī Tālib'
    ],
    explanation: 'The third rightly guided Caliph, ʿUthmān ibn ʿAffān (رضي الله عنه), had official copies of the Quran prepared and sent across the Muslim world to preserve uniform recitation.',
    hadithOrQuranRef: 'Reported by Al-Bukhārī (no. 4987)'
  },
  quiz_adab_verite: {
    question: 'Which moral quality did the Prophet ﷺ teach leads to righteousness and Paradise?',
    category: 'Character & Wisdom',
    options: [
      'Truthfulness and sincerity (As-Sidq)',
      'Accumulating wealth',
      'Pride in front of others'
    ],
    explanation: 'The Prophet ﷺ said: "Hold fast to truthfulness, for truthfulness leads to righteousness, and righteousness leads to Paradise."',
    hadithOrQuranRef: 'Al-Bukhārī & Muslim'
  },
  quiz_zakat: {
    question: 'What is the name of the obligatory charity that purifies the wealth of able Muslims for those in need?',
    category: 'Pillars & Faith',
    options: [
      'Zakāt (the third pillar of Islam)',
      'Waqf',
      'Spoils'
    ],
    explanation: 'Zakāt is an obligatory share (typically 2.5% of annual savings above the Nisāb threshold) given to the needy and eligible recipients mentioned in the Quran.',
    hadithOrQuranRef: 'Surah At-Tawbah (9:60)'
  },
  quiz_ange_jibril: {
    question: 'Which noble angel is entrusted with delivering divine revelation to the Prophets?',
    category: 'Pillars & Faith',
    options: [
      'Angel Mīkāʾīl (Michael)',
      'Angel Jibrīl (Gabriel)',
      'Angel Isrāfīl'
    ],
    explanation: 'Angel Jibrīl (عليه السلام) is the Trustworthy Spirit (Ar-Rūh al-Amīn) commanded by Allah to bring down the Quran and divine revelations to the Prophets.',
    hadithOrQuranRef: 'Surah Ash-Shuʿarāʾ (26:192-194)'
  },
  quiz_hilm_force: {
    question: 'According to the Messenger of Allah ﷺ, who is truly the strongest among people?',
    category: 'Hilm & Self-Control',
    options: [
      'The one who defeats opponents through physical strength.',
      'The one who controls himself when angry.',
      'The one who never feels any emotion or sadness.'
    ],
    explanation: 'The Prophet ﷺ taught that true strength does not lie in wrestling or muscles, but in the believer’s ability to master their soul and restrain anger.',
    hadithOrQuranRef: 'Sahīh Al-Bukhārī (no. 6114) & Sahīh Muslim (no. 2609)'
  },
  quiz_hilm_rifq: {
    question: 'What did the Prophet ﷺ say about gentleness (Ar-Rifq) in our actions?',
    category: 'Hilm & Self-Control',
    options: [
      'Gentleness is not found in anything except that it beautifies it, and is not removed from anything except that it mars it.',
      'Gentleness is a sign of weakness when facing disagreement.',
      'Gentleness is reserved only for small children.'
    ],
    explanation: 'Gentleness (Rifq) and forbearance calm tensions, disarm whispers of division, and bring blessing into difficult moments.',
    hadithOrQuranRef: 'Sahīh Muslim (no. 2594)'
  },
  quiz_hilm_colere_remede: {
    question: 'What does the Sunnah teach to calm anger and repel the whispers of Shaytān?',
    category: 'Hilm & Self-Control',
    options: [
      'Shouting loudly to release tension right away.',
      'Saying "Aʿūdhu billāh" and sitting or lying down to calm down.',
      'Isolating oneself for days without speaking to anyone.'
    ],
    explanation: 'When anger rises, the Sunnah teaches seeking refuge in Allah (Istiʿādhah) and changing posture (sitting or lying down) to calm the body and heart; cool water can also help soothe the heat of anger.',
    hadithOrQuranRef: 'Sahīh Al-Bukhārī (no. 3282) & Sunan Abī Dāwūd (no. 4782)'
  }
};

// Arabe entièrement vocalisé (⚠️ à faire relire par un arabophone natif et un savant)
const ISLAMIC_QUIZZES_AR: Record<string, QuizLocalePatch> = {
  quiz_ablutions_ordre: {
    question: 'مَا هُوَ التَّرْتِيبُ الصَّحِيحُ لِأَدَاءِ الْوُضُوءِ؟',
    category: 'الصَّلَاةُ وَالْعِبَادَةُ',
    options: [
      'الْيَدَانِ ➔ الْوَجْهُ ➔ الْفَمُ وَالْأَنْفُ ➔ الرِّجْلَانِ ➔ الذِّرَاعَانِ ➔ الرَّأْسُ',
      'الْيَدَانِ ➔ الْمَضْمَضَةُ وَالِاسْتِنْشَاقُ ➔ الْوَجْهُ ➔ الذِّرَاعَانِ إِلَى الْمِرْفَقَيْنِ ➔ الرَّأْسُ وَالْأُذُنَانِ ➔ الرِّجْلَانِ',
      'الْوَجْهُ ➔ الْيَدَانِ ➔ الذِّرَاعَانِ ➔ الْفَمُ وَالْأَنْفُ ➔ الرَّأْسُ ➔ الرِّجْلَانِ'
    ],
    explanation: 'يَبْدَأُ الْوُضُوءُ بِغَسْلِ الْكَفَّيْنِ ثَلَاثًا، ثُمَّ الْمَضْمَضَةِ وَالِاسْتِنْشَاقِ ثَلَاثًا، ثُمَّ غَسْلِ الْوَجْهِ ثَلَاثًا، ثُمَّ الْيَدَيْنِ إِلَى الْمِرْفَقَيْنِ ثَلَاثًا، ثُمَّ مَسْحِ الرَّأْسِ وَالْأُذُنَيْنِ مَرَّةً وَاحِدَةً، وَأَخِيرًا غَسْلِ الرِّجْلَيْنِ إِلَى الْكَعْبَيْنِ ثَلَاثًا.',
    hadithOrQuranRef: 'سُورَةُ الْمَائِدَةِ (٥:٦) وَحَدِيثُ عُثْمَانَ بْنِ عَفَّانَ (الْبُخَارِيُّ وَمُسْلِمٌ)'
  },
  quiz_piliers_islam: {
    question: 'كَمْ عَدَدُ أَرْكَانِ الْإِسْلَامِ؟',
    category: 'الْأَرْكَانُ وَالْإِيمَانُ',
    options: [
      '٣ أَرْكَانٍ',
      '٥ أَرْكَانٍ (الشَّهَادَتَانِ، الصَّلَاةُ، الزَّكَاةُ، الصَّوْمُ، الْحَجُّ)',
      '٧ أَرْكَانٍ'
    ],
    explanation: 'قَالَ النَّبِيُّ ﷺ: «بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَصَوْمِ رَمَضَانَ، وَحَجِّ الْبَيْتِ لِمَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا».',
    hadithOrQuranRef: 'رَوَاهُ الْبُخَارِيُّ (٨) وَمُسْلِمٌ (١٦)'
  },
  quiz_piliers_foi: {
    question: 'كَمْ عَدَدُ أَرْكَانِ الْإِيمَانِ؟',
    category: 'الْأَرْكَانُ وَالْإِيمَانُ',
    options: [
      '٤ أَرْكَانٍ',
      '٥ أَرْكَانٍ',
      '٦ أَرْكَانٍ (اللَّهُ، الْمَلَائِكَةُ، الْكُتُبُ، الرُّسُلُ، الْيَوْمُ الْآخِرُ، الْقَدَرُ)'
    ],
    explanation: 'أَرْكَانُ الْإِيمَانِ السِّتَّةُ هِيَ: الْإِيمَانُ بِاللَّهِ، وَمَلَائِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الْآخِرِ، وَالْقَدَرِ خَيْرِهِ وَشَرِّهِ.',
    hadithOrQuranRef: 'حَدِيثُ جِبْرِيلَ (رَوَاهُ مُسْلِمٌ، ٨)'
  },
  quiz_nombre_prieres: {
    question: 'كَمْ صَلَاةً مَفْرُوضَةً يُؤَدِّيهَا الْمُسْلِمُ فِي الْيَوْمِ وَاللَّيْلَةِ؟',
    category: 'الصَّلَاةُ وَالْعِبَادَةُ',
    options: [
      '٣ صَلَوَاتٍ',
      '٥ صَلَوَاتٍ يَوْمِيَّةً (الْفَجْرُ، الظُّهْرُ، الْعَصْرُ، الْمَغْرِبُ، الْعِشَاءُ)',
      '٧ صَلَوَاتٍ'
    ],
    explanation: 'الصَّلَوَاتُ الْخَمْسُ الْمَفْرُوضَةُ لَيْلَةَ الْإِسْرَاءِ وَالْمِعْرَاجِ هِيَ: الْفَجْرُ، وَالظُّهْرُ، وَالْعَصْرُ، وَالْمَغْرِبُ، وَالْعِشَاءُ.',
    hadithOrQuranRef: 'حَدِيثُ الْإِسْرَاءِ وَالْمِعْرَاجِ (صَحِيحُ الْبُخَارِيِّ)'
  },
  quiz_sourate_fatiha: {
    question: 'مَا هِيَ أَوَّلُ سُورَةٍ فِي الْقُرْآنِ الْكَرِيمِ، وَتُقْرَأُ فِي كُلِّ رَكْعَةٍ مِنَ الصَّلَاةِ؟',
    category: 'الْقُرْآنُ وَالسُّوَرُ',
    options: [
      'سُورَةُ الْإِخْلَاصِ',
      'سُورَةُ الْفَاتِحَةِ',
      'سُورَةُ النَّاسِ'
    ],
    explanation: 'قَالَ النَّبِيُّ ﷺ: «لَا صَلَاةَ لِمَنْ لَمْ يَقْرَأْ بِفَاتِحَةِ الْكِتَابِ».',
    hadithOrQuranRef: 'رَوَاهُ الْبُخَارِيُّ (٧٥٦) وَمُسْلِمٌ (٣٩٤)'
  },
  quiz_nombre_sourates: {
    question: 'كَمْ عَدَدُ سُوَرِ الْقُرْآنِ الْكَرِيمِ؟',
    category: 'الْقُرْآنُ وَالسُّوَرُ',
    options: ['٩٩ سُورَةً', '١١٤ سُورَةً', '١٢٠ سُورَةً'],
    explanation: 'يَتَكَوَّنُ الْقُرْآنُ الْكَرِيمُ مِنْ ١١٤ سُورَةً، تَبْدَأُ بِسُورَةِ الْفَاتِحَةِ وَتَنْتَهِي بِسُورَةِ النَّاسِ.',
    hadithOrQuranRef: 'الْمُصْحَفُ الْعُثْمَانِيُّ'
  },
  quiz_sourate_longue: {
    question: 'مَا هِيَ أَطْوَلُ سُورَةٍ فِي الْقُرْآنِ الْكَرِيمِ؟',
    category: 'الْقُرْآنُ وَالسُّوَرُ',
    options: [
      'سُورَةُ الْبَقَرَةِ (٢٨٦ آيَةً)',
      'سُورَةُ النِّسَاءِ',
      'سُورَةُ يس'
    ],
    explanation: 'سُورَةُ الْبَقَرَةِ هِيَ أَطْوَلُ سُوَرِ الْقُرْآنِ وَعَدَدُ آيَاتِهَا ٢٨٦ آيَةً، وَفِيهَا أَعْظَمُ آيَةٍ فِي كِتَابِ اللَّهِ: آيَةُ الْكُرْسِيِّ.',
    hadithOrQuranRef: 'سُورَةُ الْبَقَرَةِ (٢:٢٥٥)'
  },
  quiz_rakats_fajr: {
    question: 'كَمْ عَدَدُ رَكَعَاتِ صَلَاةِ الْفَجْرِ (الصُّبْحِ) الْمَفْرُوضَةِ؟',
    category: 'الصَّلَاةُ وَالْعِبَادَةُ',
    options: [
      'رَكْعَتَانِ مَفْرُوضَتَانِ جَهْرًا',
      '٤ رَكَعَاتٍ',
      '٣ رَكَعَاتٍ'
    ],
    explanation: 'صَلَاةُ الْفَجْرِ الْمَفْرُوضَةُ رَكْعَتَانِ يُجْهَرُ فِيهِمَا بِالْقِرَاءَةِ، وَيُسَنُّ قَبْلَهُمَا رَكْعَتَا سُنَّةِ الْفَجْرِ لِعِظَمِ أَجْرِهِمَا.',
    hadithOrQuranRef: 'حَدِيثٌ: «رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا» (مُسْلِمٌ)'
  },
  quiz_mois_hegire: {
    question: 'مَا هُوَ أَوَّلُ شَهْرٍ فِي التَّقْوِيمِ الْهِجْرِيِّ؟',
    category: 'الْأَنْبِيَاءُ وَالتَّارِيخُ',
    options: [
      'شَهْرُ رَمَضَانَ',
      'شَهْرُ الْمُحَرَّمِ',
      'شَهْرُ شَوَّالٍ'
    ],
    explanation: 'تَبْدَأُ السَّنَةُ الْهِجْرِيَّةُ بِشَهْرِ اللَّهِ الْمُحَرَّمِ (وَفِيهِ يَوْمُ عَاشُورَاءَ) وَتَنْتَهِي بِشَهْرِ ذِي الْحِجَّةِ (شَهْرِ الْحَجِّ).',
    hadithOrQuranRef: 'سُورَةُ التَّوْبَةِ (٩:٣٦)'
  },
  quiz_prophete_arche: {
    question: 'مَنِ النَّبِيُّ الَّذِي بَنَى السَّفِينَةَ لِإِنْقَاذِ الْمُؤْمِنِينَ مِنَ الطُّوفَانِ؟',
    category: 'الْأَنْبِيَاءُ وَالتَّارِيخُ',
    options: [
      'النَّبِيُّ إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ',
      'النَّبِيُّ نُوحٌ عَلَيْهِ السَّلَامُ',
      'النَّبِيُّ مُوسَى عَلَيْهِ السَّلَامُ'
    ],
    explanation: 'دَعَا نَبِيُّ اللَّهِ نُوحٌ عَلَيْهِ السَّلَامُ قَوْمَهُ بِصَبْرٍ تِسْعَمِائَةٍ وَخَمْسِينَ عَامًا، ثُمَّ صَنَعَ السَّفِينَةَ بِأَمْرِ اللَّهِ لِيَنْجُوَ الْمُؤْمِنُونَ.',
    hadithOrQuranRef: 'سُورَةُ هُودٍ (١١:٣٧) وَسُورَةُ نُوحٍ (٧١)'
  },
  quiz_laylat_qadr: {
    question: 'مَا هِيَ اللَّيْلَةُ الْمُبَارَكَةُ فِي رَمَضَانَ الَّتِي هِيَ خَيْرٌ مِنْ أَلْفِ شَهْرٍ؟',
    category: 'الْقُرْآنُ وَالسُّوَرُ',
    options: [
      'لَيْلَةُ الْقَدْرِ',
      'لَيْلَةُ الْهِجْرَةِ',
      'لَيْلَةُ الْفَتْحِ'
    ],
    explanation: 'قَالَ اللَّهُ تَعَالَى: «لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ»، وَتُلْتَمَسُ فِي اللَّيَالِي الْوِتْرِيَّةِ مِنَ الْعَشْرِ الْأَوَاخِرِ مِنْ رَمَضَانَ.',
    hadithOrQuranRef: 'سُورَةُ الْقَدْرِ (٩٧:٣)'
  },
  quiz_calife_othman: {
    question: 'مَنِ الْخَلِيفَةُ الرَّاشِدُ الَّذِي جَمَعَ النَّاسَ عَلَى مُصْحَفٍ وَاحِدٍ؟',
    category: 'الْأَنْبِيَاءُ وَالتَّارِيخُ',
    options: [
      'الْخَلِيفَةُ أَبُو بَكْرٍ الصِّدِّيقُ رَضِيَ اللَّهُ عَنْهُ',
      'الْخَلِيفَةُ عُثْمَانُ بْنُ عَفَّانَ (ذُو النُّورَيْنِ) رَضِيَ اللَّهُ عَنْهُ',
      'الْخَلِيفَةُ عَلِيُّ بْنُ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ'
    ],
    explanation: 'أَمَرَ الْخَلِيفَةُ الثَّالِثُ عُثْمَانُ بْنُ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ بِنَسْخِ الْمُصْحَفِ وَإِرْسَالِ نُسَخِهِ إِلَى الْأَمْصَارِ لِتَوْحِيدِ الْقِرَاءَةِ.',
    hadithOrQuranRef: 'رَوَاهُ الْبُخَارِيُّ (٤٩٨٧)'
  },
  quiz_adab_verite: {
    question: 'مَا الْخُلُقُ الَّذِي أَخْبَرَ النَّبِيُّ ﷺ أَنَّهُ يَهْدِي إِلَى الْبِرِّ وَالْجَنَّةِ؟',
    category: 'الْأَدَبُ وَالْحِكْمَةُ',
    options: [
      'الصِّدْقُ وَالْأَمَانَةُ',
      'جَمْعُ الْأَمْوَالِ',
      'التَّكَبُّرُ عَلَى النَّاسِ'
    ],
    explanation: 'قَالَ النَّبِيُّ ﷺ: «عَلَيْكُمْ بِالصِّدْقِ، فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ، وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ».',
    hadithOrQuranRef: 'رَوَاهُ الْبُخَارِيُّ وَمُسْلِمٌ'
  },
  quiz_zakat: {
    question: 'مَا اسْمُ الصَّدَقَةِ الْمَفْرُوضَةِ الَّتِي تُطَهِّرُ أَمْوَالَ الْأَغْنِيَاءِ لِمَصْلَحَةِ الْفُقَرَاءِ؟',
    category: 'الْأَرْكَانُ وَالْإِيمَانُ',
    options: [
      'الزَّكَاةُ (الرُّكْنُ الثَّالِثُ مِنَ الْإِسْلَامِ)',
      'الْوَقْفُ',
      'الْغَنِيمَةُ'
    ],
    explanation: 'الزَّكَاةُ حَقٌّ مَفْرُوضٌ فِي الْمَالِ إِذَا بَلَغَ النِّصَابَ وَحَالَ عَلَيْهِ الْحَوْلُ، وَتُصْرَفُ لِلْمُسْتَحِقِّينَ الْمَذْكُورِينَ فِي الْقُرْآنِ.',
    hadithOrQuranRef: 'سُورَةُ التَّوْبَةِ (٩:٦٠)'
  },
  quiz_ange_jibril: {
    question: 'مَنِ الْمَلَكُ الْمُوَكَّلُ بِتَبْلِيغِ الْوَحْيِ إِلَى الْأَنْبِيَاءِ؟',
    category: 'الْأَرْكَانُ وَالْإِيمَانُ',
    options: [
      'الْمَلَكُ مِيكَائِيلُ عَلَيْهِ السَّلَامُ',
      'الْمَلَكُ جِبْرِيلُ عَلَيْهِ السَّلَامُ',
      'الْمَلَكُ إِسْرَافِيلُ عَلَيْهِ السَّلَامُ'
    ],
    explanation: 'جِبْرِيلُ عَلَيْهِ السَّلَامُ هُوَ الرُّوحُ الْأَمِينُ الَّذِي نَزَلَ بِالْقُرْآنِ وَالْوَحْيِ عَلَى قُلُوبِ الْأَنْبِيَاءِ بِإِذْنِ اللَّهِ.',
    hadithOrQuranRef: 'سُورَةُ الشُّعَرَاءِ (٢٦:١٩٢-١٩٤)'
  },
  quiz_hilm_force: {
    question: 'بِحَسَبِ حَدِيثِ رَسُولِ اللَّهِ ﷺ، مَنْ هُوَ الشَّدِيدُ الْقَوِيُّ حَقًّا؟',
    category: 'الْحِلْمُ وَضَبْطُ النَّفْسِ',
    options: [
      'مَنْ يَصْرَعُ خُصُومَهُ بِقُوَّتِهِ الْجَسَدِيَّةِ.',
      'مَنْ يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ.',
      'مَنْ لَا يَشْعُرُ بِأَيِّ حُزْنٍ أَوْ انْفِعَالٍ.'
    ],
    explanation: 'عَلَّمَنَا النَّبِيُّ ﷺ أَنَّ الْقُوَّةَ الْحَقِيقِيَّةَ لَيْسَتْ فِي الْعَضَلَاتِ، بَلْ فِي قُدْرَةِ الْإِنْسَانِ عَلَى ضَبْطِ نَفْسِهِ عِنْدَ الْغَضَبِ.',
    hadithOrQuranRef: 'صَحِيحُ الْبُخَارِيِّ (٦١١٤) وَصَحِيحُ مُسْلِمٍ (٢٦٠٩)'
  },
  quiz_hilm_rifq: {
    question: 'مَاذَا أَخْبَرَنَا النَّبِيُّ ﷺ عَنْ فَضْلِ الرِّفْقِ فِي تَعَامُلِنَا؟',
    category: 'الْحِلْمُ وَضَبْطُ النَّفْسِ',
    options: [
      'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ.',
      'إِنَّ الرِّفْقَ عَلَامَةُ ضَعْفٍ عِنْدَ الْخِلَافِ.',
      'إِنَّ الرِّفْقَ خَاصٌّ بِالْأَطْفَالِ الصِّغَارِ فَقَطْ.'
    ],
    explanation: 'الرِّفْقُ وَاللِّينُ يُطْفِئَانِ نَارَ الْخِلَافِ وَيَجْلِبَانِ الْبَرَكَةَ وَالْجَمَالَ لِكُلِّ مَوْقِفٍ.',
    hadithOrQuranRef: 'صَحِيحُ مُسْلِمٍ (٢٥٩٤)'
  },
  quiz_hilm_colere_remede: {
    question: 'مَاذَا تُعَلِّمُنَا السُّنَّةُ النَّبَوِيَّةُ لِإِطْفَاءِ الْغَضَبِ وَدَفْعِ وَسْوَسَةِ الشَّيْطَانِ؟',
    category: 'الْحِلْمُ وَضَبْطُ النَّفْسِ',
    options: [
      'الصُّرَاخُ بِصَوْتٍ عَالٍ لِتَفْرِيغِ التَّوَتُّرِ فَوْرًا.',
      'قَوْلُ «أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ» وَالْجُلُوسُ أَوِ الِاضْطِجَاعُ لِلْهُدُوءِ.',
      'الْعُزْلَةُ أَيَّامًا طَوِيلَةً دُونَ التَّحَدُّثِ مَعَ أَحَدٍ.'
    ],
    explanation: 'عِنْدَ الْغَضَبِ، تُرْشِدُنَا السُّنَّةُ إِلَى الِاسْتِعَاذَةِ بِاللَّهِ وَتَغْيِيرِ الْوَضْعِيَّةِ (الْجُلُوسِ أَوِ الِاضْطِجَاعِ)، كَمَا يُسَاعِدُ الْمَاءُ الْبَارِدُ عَلَى تَهْدِئَةِ النَّفْسِ.',
    hadithOrQuranRef: 'صَحِيحُ الْبُخَارِيِّ (٣٢٨٢) وَسُنَنُ أَبِي دَاوُدَ (٤٧٨٢)'
  }
};

export type LocalizedIslamicQuizQuestion = Omit<IslamicQuizQuestion, 'category'> & {
  category: string;
};

export function getLocalizedIslamicQuizzes(language: string): LocalizedIslamicQuizQuestion[] {
  if (language === 'fr') return ISLAMIC_QUIZZES;
  const dict = language === 'ar' ? ISLAMIC_QUIZZES_AR : ISLAMIC_QUIZZES_EN;
  return ISLAMIC_QUIZZES.map((q) => {
    const patch = dict[q.id];
    if (!patch) return q;
    return {
      ...q,
      question: patch.question,
      category: patch.category,
      options: patch.options,
      explanation: patch.explanation,
      hadithOrQuranRef: patch.hadithOrQuranRef ?? q.hadithOrQuranRef
    };
  });
}
