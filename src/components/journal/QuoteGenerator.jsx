import React, { useEffect, useState } from "react";

const fallbackQuotes = [
  "Start where you are. Use what you have. Do what you can.",
  "Happiness is not something ready made. It comes from your own actions.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Small progress is still progress.",
  "Believe in yourself and all that you are."
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const savedQuote = localStorage.getItem(`quote-${today}`);

    if (savedQuote) {
   
      setQuote(savedQuote);
    } else {
     
      fetch("https://zenquotes.io/api/today")
        .then((res) => res.json())
        .then((data) => {
          if (data && data[0]?.q) {
            const newQuote = data[0].q;
            setQuote(newQuote);
            localStorage.setItem(`quote-${today}`, newQuote);
          } else {
    
            const index = new Date().getDate() % fallbackQuotes.length;
            const newQuote = fallbackQuotes[index];
            setQuote(newQuote);
            localStorage.setItem(`quote-${today}`, newQuote);
          }
        })
        .catch(() => {
  
          const index = new Date().getDate() % fallbackQuotes.length;
          const newQuote = fallbackQuotes[index];
          setQuote(newQuote);
          localStorage.setItem(`quote-${today}`, newQuote);
        });
    }
  }, []);

  return (
    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-2xl mb-4 shadow">
      <p className="italic text-purple-700">“{quote}”</p>
      <p className="text-sm text-gray-500 mt-2">🌸 Your daily motivation</p>
    </div>
  );
}
