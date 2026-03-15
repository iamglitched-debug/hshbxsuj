import { useState, useEffect } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, Cake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

const questions = [
  {
    id: 1,
    question: "Do you love me? 🥺",
    options: ["Yes! ♥", "Definitely Yes! ♥♥"],
    emoji: "💕"
  },
  {
    id: 2,
    question: "Am I the cutest? 😊",
    options: ["Obviously!", "The Cutest Ever!"],
    emoji: "🌟"
  },
  {
    id: 3,
    question: "Are you happy with me? 🥰",
    options: ["So Happy!", "The Happiest!"],
    emoji: "😍"
  },
  {
    id: 4,
    question: "Will you keep loving me? 💖",
    options: ["Forever!", "Always & Forever!"],
    emoji: "💫"
  },
  {
    id: 5,
    question: "Ready for your surprise? 🎁",
    options: ["YES YES YES!", "I CAN'T WAIT!"],
    emoji: "🎉"
  }
];

const pages = [
  {
    id: 1,
    title: "To My Dearest Elvina",
    content: `My love,

As I sit here thinking about us, my heart fills with warmth and gratitude. Today marks 10 months since we embarked on this beautiful journey together – 10 months of love, laughter, and cherished moments despite the distance between us.

This letter is my way of expressing what words often fail to capture – the depth of my feelings for you and the joy you bring to my life every single day.`,
    image: "https://images.unsplash.com/photo-1653038417354-ee6bd03740eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlJTIwbGV0dGVyJTIwdmludGFnZSUyMHJvbWFudGljfGVufDF8fHx8MTc3MzU4Mjg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "The Distance That Brought Us Closer",
    content: `When people talk about long-distance relationships, they often focus on the challenges, the missed hugs, the screens between us. But with you, Elvina, I've discovered something magical – distance has only made our connection stronger.

Every video call is a date I look forward to. Every text message is a little love note that brightens my day. Every "good morning" and "goodnight" reminds me that no matter how many miles separate us, you're always with me in my heart.

You've taught me that love isn't measured by proximity, but by the effort we make, the trust we build, and the dreams we share for our future together.`,
    image: "https://images.unsplash.com/photo-1712146503065-63ac5510f2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldCUyMGRpc3RhbmNlfGVufDF8fHx8MTc3MzU4Mjg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "The Little Things I Cherish",
    content: `I love the way you laugh at my silly jokes, even the ones that aren't funny. I love how you share every detail of your day with me, making me feel like I'm right there beside you. I love your strength, your kindness, and the way you see beauty in the world.

I love our late-night conversations when the world is quiet and it feels like we're the only two people awake. I love how you support my dreams and how you inspire me to be better every day.

I love the way you say my name, the way you look at the camera when we video call, and that special smile that's just for me. These little moments make up the beautiful tapestry of our love story.`,
    image: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhhbmRzJTIwdG9nZXRoZXIlMjBsb3ZlfGVufDF8fHx8MTc3MzU4Mjg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Our Journey Through 10 Months",
    content: `These 10 months have been an adventure. We've navigated time zones, planned virtual dates, sent each other care packages, and counted down the days until we could see each other again.

We've celebrated victories together and supported each other through challenges. We've grown individually while growing closer as a couple. We've learned to communicate with honesty and openness, to trust completely, and to love unconditionally.

Every month with you has been a gift. Every day, I fall more deeply in love with the amazing woman you are – your intelligence, your humor, your compassion, and your beautiful soul.

This isn't just a milestone; it's a testament to our commitment, our patience, and the strength of what we've built together.`,
    image: "https://images.unsplash.com/photo-1582845715481-a810047ab56a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdW5zZXR8ZW58MXx8fHwxNzczNTc3OTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    title: "Looking Forward",
    content: `As we celebrate 10 months today, I can't help but dream about all the months and years ahead of us. I think about the day when distance will no longer separate us, when I can hold your hand whenever I want, when your good morning kiss will be real and not through a screen.

I think about all the adventures we'll have, the memories we'll create, the life we'll build together. I think about waking up next to you, cooking meals together, exploring new places, and simply enjoying the everyday moments that make life beautiful.

Until that day comes, I promise to keep choosing you every single day. I promise to be patient, to communicate, to trust, and to love you with everything I have.

You are my partner, my best friend, my confidant, and my greatest love. Distance is temporary, but what we have is forever.`,
    image: "https://images.unsplash.com/photo-1712146503065-63ac5510f2f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHN1bnNldCUyMGRpc3RhbmNlfGVufDF8fHx8MTc3MzU4Mjg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    title: "Forever Yours",
    content: `My dearest Elvina,

Thank you for these incredible 10 months. Thank you for your patience, your love, and your unwavering commitment to us. Thank you for making me laugh when I'm down, for believing in me when I doubt myself, and for being the light in my life.

You are worth every mile between us. You are worth every lonely night. You are worth the wait. Because loving you is the easiest and best thing I've ever done.

Here's to 10 months down and a lifetime to go. Here's to us, to our love, and to the beautiful future we're building together.

I love you more than words can express, more than the distance between us, more than yesterday but less than tomorrow.

Happy 10-month anniversary, my love.

Forever and always,
Your devoted partner ♥`,
    image: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhhbmRzJTIwdG9nZXRoZXIlMjBsb3ZlfGVufDF8fHx8MTc3MzU4Mjg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

// Floating hearts component
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: '120%',
            opacity: 0.7,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: '-20%',
            rotate: Math.random() * 360 + 180
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        >
          {['💕', '💖', '💗', '💝', '💓', '💞', '💘'][i % 7]}
        </motion.div>
      ))}
    </div>
  );
}

// Animated cake component
function AnimatedCake() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-8xl md:text-9xl">🎂</div>
      <motion.div
        className="absolute -top-4 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers([...selectedAnswers, answerIndex]);
    
    // Mini confetti on each answer
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    if (questionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(questionIndex + 1);
      }, 800);
    } else {
      // Last question - big celebration
      setTimeout(() => {
        setShowCelebration(true);
        
        // Big confetti celebration
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        
        const randomInRange = (min: number, max: number) => {
          return Math.random() * (max - min) + min;
        };
        
        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          
          if (timeLeft <= 0) {
            clearInterval(interval);
            setTimeout(() => {
              setShowQuiz(false);
            }, 1000);
            return;
          }
          
          confetti({
            particleCount: 3,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
          });
        }, 50);
      }, 800);
    }
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prev) => {
      const next = prev + newDirection;
      if (next < 0) return pages.length - 1;
      if (next >= pages.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8
    })
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Doodle Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-spin-slow">⭐</div>
          <div className="absolute top-20 right-20 text-5xl animate-bounce">💫</div>
          <div className="absolute bottom-20 left-20 text-6xl animate-pulse">✨</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-bounce">🌟</div>
          <div className="absolute top-1/2 left-10 text-4xl rotate-12">💝</div>
          <div className="absolute top-1/3 right-10 text-4xl -rotate-12">💖</div>
        </div>

        <FloatingHearts />

        <AnimatePresence mode="wait">
          {!showCelebration ? (
            <motion.div
              key={currentQuestion}
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-8 border-dashed border-pink-300 relative">
                {/* Doodle decorations on card */}
                <div className="absolute -top-6 -left-6 text-5xl rotate-12">🎈</div>
                <div className="absolute -top-6 -right-6 text-5xl -rotate-12">🎈</div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-4xl">
                  {questions[currentQuestion].emoji}
                </div>

                {/* Progress */}
                <div className="flex justify-center gap-2 mb-8">
                  {questions.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-3 rounded-full ${
                        index <= currentQuestion ? 'bg-pink-500 w-12' : 'bg-pink-200 w-8'
                      }`}
                      animate={{
                        scale: index === currentQuestion ? [1, 1.2, 1] : 1
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: index === currentQuestion ? Infinity : 0
                      }}
                    />
                  ))}
                </div>

                {/* Question */}
                <motion.h2
                  className="text-3xl md:text-5xl text-center mb-12 text-pink-600"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                >
                  {questions[currentQuestion].question}
                </motion.h2>

                {/* Options */}
                <div className="flex flex-col gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(currentQuestion, index)}
                      className="bg-gradient-to-r from-pink-400 to-purple-400 text-white text-xl md:text-2xl py-6 px-8 rounded-2xl border-4 border-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      style={{ fontFamily: 'Comic Sans MS, cursive' }}
                      whileHover={{ rotate: [-2, 2, -2, 2, 0] }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                {/* Cute decorative stars around the card */}
                <motion.div
                  className="absolute -top-3 left-1/4 text-yellow-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-8 h-8 fill-yellow-400" />
                </motion.div>
                <motion.div
                  className="absolute -top-3 right-1/4 text-pink-400"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-8 h-8 fill-pink-400" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-center"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border-8 border-dashed border-purple-300 relative">
                {/* Celebration decorations */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    🎉
                  </motion.div>
                </div>

                <AnimatedCake />
                
                <motion.h2
                  className="text-4xl md:text-6xl text-purple-600 mt-8 mb-6"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                >
                  YAY! 🎊
                </motion.h2>
                
                <p className="text-2xl md:text-3xl text-pink-500 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  I knew all the answers! 💕
                </p>
                
                <p className="text-xl md:text-2xl text-purple-400" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Now... time for your special surprise! 🎁
                </p>

                {/* Dancing emojis */}
                <div className="flex justify-center gap-4 mt-8 text-4xl">
                  {['🥳', '💝', '🎈', '🎀', '💖'].map((emoji, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Letter Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 p-6 text-white">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-6 h-6 fill-white" />
                <h1 className="text-2xl md:text-3xl text-center">10 Months of Love</h1>
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <p className="text-center text-white/90">For Elvina ♥</p>
            </div>

            {/* Content Area */}
            <div className="relative h-[600px] md:h-[500px]" style={{ perspective: '2000px' }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    rotateY: { duration: 0.8, ease: "easeInOut" },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.8, ease: "easeInOut" }
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  className="absolute inset-0"
                >
                  <div className="h-full overflow-y-auto">
                    <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                      {/* Image */}
                      <div className="order-2 md:order-1">
                        <div className="rounded-xl overflow-hidden h-64 md:h-full shadow-lg">
                          <ImageWithFallback 
                            src={pages[currentPage].image}
                            alt="Love"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="order-1 md:order-2 flex flex-col">
                        <h2 className="text-2xl md:text-3xl mb-4 text-rose-600">
                          {pages[currentPage].title}
                        </h2>
                        <div className="flex-1 overflow-y-auto">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                            {pages[currentPage].content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <button
                  onClick={() => paginate(-1)}
                  className="p-2 rounded-full hover:bg-rose-100 transition-colors text-rose-600"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentPage ? 1 : -1);
                        setCurrentPage(index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentPage 
                          ? 'w-8 bg-rose-500' 
                          : 'w-2 bg-rose-200 hover:bg-rose-300'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => paginate(1)}
                  className="p-2 rounded-full hover:bg-rose-100 transition-colors text-rose-600"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-2">
                Page {currentPage + 1} of {pages.length}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-6 text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span>Made with love for you</span>
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
          </p>
        </div>
      </div>
    </div>
  );
}