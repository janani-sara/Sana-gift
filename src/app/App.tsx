import { useState, useEffect, useRef } from 'react';
import { LandingPage } from './components/LandingPage';
import { Question1 } from './components/Question1';
import { Question2 } from './components/Question2';
import { RoastQuestions } from './components/RoastQuestions';
import { BirthdayInteractive } from './components/BirthdayInteractive';
import { MemoryAlbum } from './components/MemoryAlbum';
import { FinalWishes } from './components/FinalWishes';

type Step = 'landing' | 'question1' | 'question2' | 'roast' | 'celebration' | 'memories' | 'wishes';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('landing');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const TRACKS = {
    landing: '/data/songs/song1.mp3',
    wishes: '/data/songs/song2.mp3',
  };
  const currentSongRef = useRef(TRACKS.landing);
  const canPlayRef = useRef(false);
  const friendName = 'Sathana';

  const goToStep = (step: Step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!canPlayRef.current) return;
    audio.play().catch((err) => {
      console.error('Audio playback error:', err);
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentSongRef.current;
    audio.loop = true;
    audio.preload = 'auto';

    const handleCanPlay = () => {
      canPlayRef.current = true;
      playAudio();
    };

    const handleUserInteraction = () => {
      playAudio();
    };

    audio.addEventListener('canplay', handleCanPlay);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    playAudio();

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (currentStep !== 'wishes') return;
    const audio = audioRef.current;
    if (!audio) return;
    if (currentSongRef.current === TRACKS.wishes) return;

    currentSongRef.current = TRACKS.wishes;
    canPlayRef.current = false;
    audio.src = TRACKS.wishes;
    audio.currentTime = 0;
    audio.loop = true;

    const handleCanPlay = () => {
      canPlayRef.current = true;
      playAudio();
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.load();

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentStep]);

  const goBack = () => {
    const stepOrder: Step[] = ['landing', 'question1', 'question2', 'roast', 'celebration', 'memories', 'wishes'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      goToStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="relative min-h-screen">
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      />

      {currentStep === 'landing' && (
        <LandingPage onNext={() => goToStep('question1')} />
      )}

      {currentStep === 'question1' && (
        <Question1 
          onNext={() => goToStep('question2')} 
          onBack={goBack}
        />
      )}

      {currentStep === 'question2' && (
        <Question2 
          onNext={() => goToStep('roast')} 
          onBack={goBack}
        />
      )}

      {currentStep === 'roast' && (
        <RoastQuestions 
          friendName={friendName}
          onNext={() => goToStep('celebration')} 
          onBack={goBack}
        />
      )}

      {currentStep === 'celebration' && (
        <BirthdayInteractive 
          friendName={friendName}
          onNext={() => goToStep('memories')} 
          onBack={goBack}
        />
      )}

      {currentStep === 'memories' && (
        <MemoryAlbum 
          onNext={() => goToStep('wishes')} 
          onBack={goBack}
        />
      )}

      {currentStep === 'wishes' && (
        <FinalWishes 
          onBack={goBack}
        />
      )}
    </div>
  );
}
