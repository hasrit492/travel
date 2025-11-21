import React, { useState } from 'react';
import { getTravelSuggestion } from '../services/geminiService';
import { TripSuggestion } from '../types';

export const TravelAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<TripSuggestion | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSuggestion(null);
    const result = await getTravelSuggestion(query);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-12 px-6 transition-opacity duration-1000 animate-draw">
      
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where calls your spirit? (e.g. 'Quiet beaches')"
          className="w-full bg-white/80 backdrop-blur-sm border-2 border-rahhala-green/20 rounded-full py-4 px-6 text-right pr-14 text-rahhala-dark placeholder-rahhala-blue/60 focus:outline-none focus:border-rahhala-orange focus:ring-1 focus:ring-rahhala-orange transition-all font-cairo shadow-sm"
          disabled={loading}
        />
        <button 
          type="submit"
          disabled={loading}
          className="absolute left-2 top-2 bottom-2 bg-rahhala-green text-rahhala-cream rounded-full w-10 h-10 flex items-center justify-center hover:bg-rahhala-dark transition-colors disabled:opacity-70"
        >
          {loading ? (
             <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transform -scale-x-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          )}
        </button>
      </form>

      {/* Results Card */}
      {suggestion && (
        <div className="mt-8 bg-white border border-rahhala-green/10 rounded-2xl p-6 shadow-xl shadow-rahhala-green/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rahhala-orange/10 rounded-bl-full -mr-4 -mt-4"></div>
          
          <h3 className="text-2xl font-amiri font-bold text-rahhala-green mb-2 border-b border-rahhala-green/10 pb-2">
            {suggestion.location}
          </h3>
          
          <p className="font-cairo text-rahhala-blue text-lg leading-relaxed mb-6 italic">
            "{suggestion.description}"
          </p>
          
          <div className="space-y-3">
            <h4 className="font-cairo font-bold text-sm uppercase text-rahhala-orange tracking-wider">Experiences</h4>
            <ul className="space-y-2">
              {suggestion.activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3 font-cairo text-rahhala-dark">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rahhala-green flex-shrink-0"></span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
