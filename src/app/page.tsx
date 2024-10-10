"use client";

import { useState, useEffect } from 'react';

type Emoji = {
  name: string;
  htmlCode: string[];
  category: string;
};

export default function Home() {
  const [currentEmoji, setCurrentEmoji] = useState<Emoji | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://emojihub-1001447344924.asia-southeast2.run.app/api/all/category/smileys-and-people');
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
      }, 3000);
    }
  };

  const copyToClipboard = () => {
    if (currentEmoji) {
      const textToCopy = `${currentEmoji.htmlCode.join('')} - ${currentEmoji.category}`;
      navigator.clipboard.writeText(textToCopy);
      alert('Copied to clipboard!');
    }
  };

  if (!currentEmoji) return <div>Loading...</div>;

  return (
    <div className="border-4 p-4 w-[430px] h-[932px] relative bg-[#FAF4E1]">
      <header className="w-full p-4 h-24 flex items-start">
        <h1 className="text-[#F3CF56] text-4xl font-bold relative" style={{ 
          WebkitTextStroke: '1px #4A7582', 
          
        }}>
          emojilogy
        </h1>
      </header>
      
      <div className="bg-[#F8DD84] p-4 h-[calc(841px-4rem)] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-5xl font-bold text-[#4C9BB9] mb-4 text-center">
            What's your <span className="text-[#1C5469] font-extrabold">emoji</span> today?
          </p>
          <p className="italic text-lg mb-4 text-[#1C5469]">Click it!</p>
          <div
            className={`text-7xl cursor-pointer mb-4 ${isShuffling ? 'animate-spin' : ''}`}
            onClick={shuffleEmoji}
            dangerouslySetInnerHTML={{ __html: currentEmoji.htmlCode.join('') }}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="italic text-lg text-[#4A7582] mb-1 text-center">
            You’re sad and you know it.
          </p>
          <p className="italic text-lg text-[#4A7582] text-center">
            Just give up, don’t try.
          </p>
        </div>
      </div>
    </div>
  );
}
