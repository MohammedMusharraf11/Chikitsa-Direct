// Chatbot.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const generateAnswer = async (e) => {
    e.preventDefault();
    setGeneratingAnswer(true);
    setAnswer('Loading your answer... It might take up to 10 seconds');
    
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer('Sorry - Something went wrong. Please try again!');
    }

    setGeneratingAnswer(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button 
        onClick={toggleChatbot} 
        className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
      >
        🤖
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-2 w-80">
          <h2 className="font-bold text-lg mb-2">Chat with Bot</h2>
          <form onSubmit={generateAnswer}>
            <textarea
              required
              className="border border-gray-300 rounded w-full p-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white p-2 rounded mt-2 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </form>
          {answer && (
            <div className="mt-4">
              <h3 className="font-semibold">Response:</h3>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
