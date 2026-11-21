// Web Audio API sound synthesis for peaceful, responsive RPG feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy init on first user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playDialogueClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playSelect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(330, now);
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.1);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playQuizSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (warm major arpeggio)

    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.08, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.35);
    });
  }

  public playActionComplete() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5

    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.09);

      gain.gain.setValueAtTime(0.1, now + index * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.09 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + index * 0.09);
      osc.stop(now + index * 0.09 + 0.4);
    });
  }

  public playWaswasDissolve() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Radiant celestial crystal chime (ascending pure harmony: F5 -> A5 -> C6)
    const notes = [698.46, 880.00, 1046.50];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.45);
    });
  }

  public playWaswasGain() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Ominous, cinematic dark resonance (soft tritone harmonic with resonant low-pass filter)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    // Mysterious dark interval: 130.81Hz (C3) & 185.00Hz (F#3 tritone)
    osc1.frequency.setValueAtTime(130.81, now);
    osc1.frequency.exponentialRampToValueAtTime(123.47, now + 0.55);

    osc2.frequency.setValueAtTime(185.00, now);
    osc2.frequency.exponentialRampToValueAtTime(174.61, now + 0.55);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + 0.55);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  public playClimaxStep() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(440, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.25);

    osc2.frequency.setValueAtTime(554.37, now);
    osc2.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  }

  public playSceneTransition() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Harmonious chord fanfare with wind chimes
    const chord = [329.63, 440.00, 523.25, 659.25, 880.00]; // E4, A4, C5, E5, A5
    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.09, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.6);
    });
  }

  public playChapterComplete() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];

    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0.12, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.6);
    });
  }

  public playContemplationChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Meditative resonant chords (F4, A4, C5, E5) with soft sine harmonics
    const chord = [349.23, 440.00, 523.25, 659.25];

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.045, now + idx * 0.08 + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 3.2);
    });
  }

  public playXpHarvest() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Ascending arpeggio of bright, sparkling chimes (C5, D5, E5, G5, A5, C6, E6)
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1318.51];

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.09, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.35);
    });

    // Final resonant high chime
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const bellTime = this.ctx.currentTime;
      const bellOsc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();
      bellOsc.type = 'triangle';
      bellOsc.frequency.setValueAtTime(1567.98, bellTime);
      bellGain.gain.setValueAtTime(0.12, bellTime);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, bellTime + 0.7);
      bellOsc.connect(bellGain);
      bellGain.connect(this.ctx.destination);
      bellOsc.start(bellTime);
      bellOsc.stop(bellTime + 0.7);
    }, notes.length * 70);
  }

  // --- CONTEMPLATIVE AMBIENT SOUND GENERATORS ---
  private ambientGain: GainNode | null = null;
  private ambientInterval: any = null;
  private currentAmbience: 'none' | 'fountain' | 'breeze' | 'contemplation' = 'none';

  public stopAmbient() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      } catch (e) {}
    }
    this.currentAmbience = 'none';
  }

  /**
   * Generates a soft, soothing water fountain murmur (ideal for mosque patio & tea break)
   */
  public startFountainAmbience() {
    if (this.isMuted || this.currentAmbience === 'fountain') return;
    this.initCtx();
    if (!this.ctx) return;
    this.stopAmbient();
    this.currentAmbience = 'fountain';

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 1.2);
    masterGain.connect(this.ctx.destination);
    this.ambientGain = masterGain;

    // Pink noise water stream generator
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter for gentle dripping and flowing water
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    whiteNoise.start();

    // Occasional subtle droplets
    this.ambientInterval = setInterval(() => {
      if (!this.ctx || this.isMuted || this.currentAmbience !== 'fountain') return;
      const dropTime = this.ctx.currentTime;
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      dropOsc.type = 'sine';
      const dropFreq = 1200 + Math.random() * 800;
      dropOsc.frequency.setValueAtTime(dropFreq, dropTime);
      dropOsc.frequency.exponentialRampToValueAtTime(dropFreq * 1.5, dropTime + 0.08);

      dropGain.gain.setValueAtTime(0.015, dropTime);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, dropTime + 0.12);

      dropOsc.connect(dropGain);
      dropGain.connect(masterGain);
      dropOsc.start(dropTime);
      dropOsc.stop(dropTime + 0.12);
    }, 1800);
  }

  /**
   * Generates a warm contemplative drone with soft harmonics for reflection scenes
   */
  public startContemplationAmbience() {
    if (this.isMuted || this.currentAmbience === 'contemplation') return;
    this.initCtx();
    if (!this.ctx) return;
    this.stopAmbient();
    this.currentAmbience = 'contemplation';

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2.0);
    masterGain.connect(this.ctx.destination);
    this.ambientGain = masterGain;

    // Soft celestial chord: D3 (146.83Hz), A3 (220.00Hz), D4 (293.66Hz), F#4 (369.99Hz)
    const freqs = [146.83, 220.00, 293.66, 369.99];
    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      // Lowpass for warmth
      const lpf = this.ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.setValueAtTime(600, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(lpf);
      lpf.connect(masterGain);
      osc.start();
    });
  }
}

export const soundManager = new SoundEffects();
