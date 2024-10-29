"use client";

import { useState, useEffect } from "react";

type Emoji = {
  name: string;
  htmlCode: string[];
  category: string;
};

export default function Home() {
  const [currentEmoji, setCurrentEmoji] = useState<Emoji | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [theme, setTheme] = useState<"basic" | "dark" | "neon">("basic");

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          "https://emojihub-1001447344924.asia-southeast2.run.app/api/all/category/smileys-and-people"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data: Emoji[] = await response.json();
        setEmojis(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmojis();
  }, []);

  useEffect(() => {
    if (emojis.length > 0) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      setCurrentEmoji(emojis[randomIndex]);
    }
  }, [emojis]);

  const shuffleEmoji = () => {
    if (emojis.length > 0) {
      setIsShuffling(true);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        setCurrentEmoji(emojis[randomIndex]);
        setIsShuffling(false);
      }, 1500);
    }
  };


  const getThemeClass = () => {
    switch (theme) {
      case "dark":
        return "bg-gradient-to-b from-gray-800 to-black text-white";
      case "neon":
        return "bg-gradient-to-b from-purple-500 via-pink-400 to-cyan-500 text-white";
      default:
        return "bg-[#FAF4E1] text-black"; // Basic theme
    }
  };

  if (!currentEmoji)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div
        className={`border-4 w-[430px] h-[932px] rounded-2xl shadow-2xl relative transform transition-all duration-500 ${getThemeClass()}`}
        style={{ boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <header className="w-full p-4 h-24 flex items-center justify-between">
          <h1
            className="text-4xl font-extrabold"
            style={{
              WebkitTextStroke: "1px #4A7582",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            emojilogy
          </h1>

          <div className="flex items-center space-x-4">
            {["basic", "dark", "neon"].map((option) => (
              <button
                key={option}
                className={`h-4 w-4 rounded-full shadow-md ${
                  theme === option
                    ? option === "dark"
                      ? "bg-gray-800"
                      : option === "neon"
                      ? "bg-purple-400"
                      : "bg-gray-400"
                    : "bg-gray-300"
                }`}
                onClick={() => setTheme(option as "basic" | "dark" | "neon")}
              />
            ))}
          </div>
        </header>

        <div className="flex flex-col items-center justify-center h-[calc(841px-4rem)] space-y-6">
          <div className="text-center">
            <p className={`text-5xl font-bold ${theme === "basic" ? "text-gray-600" : "text-white"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
              What&apos;s your
            </p>
            <p className={`text-5xl font-bold ${theme === "neon" ? "text-yellow-400" : "bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
              emoji
            </p>
            <p className={`text-5xl font-bold ${theme === "basic" ? "text-gray-600" : "text-white"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
              today?
            </p>
          </div>
          <p className="italic text-lg text-[#4A7582]">Click it!</p>
          <div
            className={`text-7xl cursor-pointer ${isShuffling ? "animate-spin" : ""}`}
            onClick={shuffleEmoji}
            dangerouslySetInnerHTML={{ __html: currentEmoji.htmlCode.join("") }}
          />
          
        </div>

        <footer className="absolute bottom-4 w-full text-center">
          <p className="text-sm text-gray-500">
            Template by{" "}
            <a
              href="https://adimasimmanuel.vercel.app"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Adimas Immanuel
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
