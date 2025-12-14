import React, { useState, useEffect, useRef } from 'react';
import { Topic, Message } from '../types';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Bot, RefreshCw, AlertTriangle } from 'lucide-react';

interface MockInterviewProps {
  topic: Topic;
}

const MockInterview: React.FC<MockInterviewProps> = ({ topic }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize greeting on topic change
  useEffect(() => {
    setMessages([{
      role: 'model',
      text: `Bonjour! Je suis ton recruteur technique pour aujourd'hui. Nous allons parler de ${topic.title}. Es-tu prêt pour la première question?`
    }]);
    setError(null);
  }, [topic]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found in environment.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct prompt context
      const history = messages.map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.text}`).join('\n');
      const systemInstruction = `
        You are a strict but fair technical recruiter at a Job Fair. 
        The topic is: ${topic.title}.
        
        Your Goal:
        1. Ask one technical question about ${topic.title}.
        2. Wait for the candidate's answer.
        3. Provide very brief, constructive feedback on their answer (correct/incorrect/missing details).
        4. Immediately ask the NEXT question.
        
        Keep your responses concise. Do not write long paragraphs. Focus on the core concepts:
        ${topic.mustKnow.map(s => s.items.join(', ')).join(', ')}.
        
        Current conversation history:
        ${history}
        
        Candidate: ${userMsg}
        Interviewer:
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemInstruction, // Using prompt as single turn for simplicity in this context or could use chat history
      });

      const text = response.text;
      if (text) {
        setMessages(prev => [...prev, { role: 'model', text }]);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion avec l'IA. Vérifiez votre clé API ou réessayez.");
    } finally {
      setLoading(false);
      // Keep focus on input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      
      {/* Chat Header */}
      <div className={`p-4 ${topic.color} bg-opacity-20 border-b flex justify-between items-center`}>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Simulateur d'Entretien: {topic.title}</span>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', text: `Recommençons. Parlons de ${topic.title}. Prêt ?` }])}
          className="p-2 hover:bg-black hover:bg-opacity-5 rounded-full transition-colors"
          title="Restart Interview"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gray-700" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </span>
            </div>
          </div>
        )}
        {error && (
            <div className="mx-auto max-w-md bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {error}
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écris ta réponse ici..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          Appuyez sur Entrée pour envoyer. L'IA agit comme un recruteur strict.
        </p>
      </div>
    </div>
  );
};

export default MockInterview;