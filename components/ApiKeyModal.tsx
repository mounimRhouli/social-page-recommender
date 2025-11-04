import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './Icons';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [localApiKey, setLocalApiKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError('');
      // Optional: Fetch existing key from session storage to pre-fill, if desired.
      // const storedKey = sessionStorage.getItem('gemini-api-key');
      // if (storedKey) setLocalApiKey(storedKey);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!localApiKey.trim()) {
      setError('API key cannot be empty.');
      return;
    }
    onSave(localApiKey);
    setLocalApiKey(''); // Clear field after saving
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-slate-800 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md mx-4 relative border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            Set Your Gemini API Key
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <p className="text-slate-400 mb-6">
          To use this application, you need to provide your own API key from Google AI Studio.
          Your key is stored securely in your browser's session storage and is never sent anywhere else.
        </p>

        <div className="space-y-2">
          <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300">
            Gemini API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Enter your API key here"
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Save Key
          </button>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Get an API Key
          </a>
        </div>
      </div>
    </div>
  );
};
