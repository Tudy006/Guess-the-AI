import { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [selected, setSelected] = useState(null);

  const startGame = () => {
    // Pick random item
    const randomItem = data[Math.floor(Math.random() * data.length)];
    setCurrentItem(randomItem);
    setGameStarted(true);
    setSelected(null);
  };
  const categories = [
    "Creative Writing",
    "Science & Physics",
    "Politics & Ethics",
    "Logic & Math",
    "Pop Culture",
    "History",
    "Philosophy",
    "Business & Professional",
  ];

  const handleGuess = (option) => {
    setSelected(option);
  };
  const logoMap = {
    Gemini: "/gemini.jpg",
    ChatGPT: "/chatgpt.jpg",
    Claude: "/claude.jpg",
    Grok: "/grok.png",
    Deepseek: "/deepseek.png",
  };
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 font-sans">
      {!gameStarted ? (
        /* --- HOME SCREEN --- */
        <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl border border-gray-700 max-w-5xl text-center">
          <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_35px_rgba(130,130,130,1)]">
            Can you guess the AI?
          </h1>
          <p className="text-gray-400 mt-4 text-xl">
            Test your knowledge of LLM personalities.
          </p>
          <button
            onClick={startGame}
            className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            Start Game
          </button>
        </div>
      ) : (
        /* --- GAME SCREEN (Chat Style) --- */
        <div className="w-full max-w-3xl min-h-[90vh] flex flex-col gap-6 bg-gray-900 p-5 rounded-3xl">
          {/* User Prompt (Right) */}
          <div className="self-end max-w-[80%]">
            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-lg">
              {currentItem.prompt}
            </div>
          </div>

          {/* AI Response (Left) */}
          <div className="self-start max-w-[80%]">
            <div className="bg-gray-800 text-gray-100 p-4 rounded-2xl rounded-tl-sm border border-gray-700 shadow-lg">
              {currentItem.response}
            </div>
          </div>

          {/* Answer Buttons */}
          <div className="mt-auto flex flex-wrap justify-center gap-20 pb-6">
            {currentItem.options.map((option) => {
              // Determine button color based on state
              let btnClass = "bg-white border-gray-600"; // Default

              if (selected) {
                if (option === currentItem.model)
                  btnClass =
                    "bg-white border-green-500 border-4 shadow-[0_0_20px_rgba(22,163,74,0.6)]";
                // Correct
                else if (option === selected)
                  btnClass = "bg-white border-red-500 border-4"; // Wrong guess
                else btnClass = "bg-white opacity-50"; // Others dimmed
              }

              return (
                <button
                  key={option}
                  onClick={() => handleGuess(option)}
                  disabled={!!selected}
                  className={`w-16 h-16 rounded-full border-2 relative overflow-hidden text-white font-bold transition-all transform hover:scale-105 cursor-pointer ${btnClass}`}
                >
                  <img
                    src={logoMap[option]}
                    alt={option}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Next Button (Shows after guess) */}
          {selected && (
            <div className="flex justify-center mt-4">
              <button
                onClick={startGame}
                className="text-white underline hover:text-blue-400 cursor-pointer"
              >
                Next Round →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
