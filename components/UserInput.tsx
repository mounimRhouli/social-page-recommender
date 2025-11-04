
import React, { useState } from 'react';
import type { Platform } from '../types';
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon, YouTubeIcon, RedditIcon } from './Icons';

interface UserInputProps {
  onSubmit: (interests: string, counts: Record<Platform, number>) => void;
  isLoading: boolean;
}

const platformOptions: Platform[] = ['Facebook', 'Instagram', 'X', 'LinkedIn', 'YouTube', 'Reddit'];

const platformIcons: Record<Platform, React.FC<React.ComponentProps<'svg'>>> = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    X: XIcon,
    LinkedIn: LinkedInIcon,
    YouTube: YouTubeIcon,
    Reddit: RedditIcon,
};

const defaultCounts: Record<Platform, number> = {
  Facebook: 3,
  Instagram: 3,
  X: 3,
  LinkedIn: 3,
  YouTube: 3,
  Reddit: 3,
};

export const UserInput: React.FC<UserInputProps> = ({ onSubmit, isLoading }) => {
  const [interests, setInterests] = useState<string>('Artificial Intelligence, Machine Learning, and UI/UX design trends');
  const [recommendationCounts, setRecommendationCounts] = useState<Partial<Record<Platform, number>>>({
    Facebook: 3,
    Instagram: 3,
    X: 3,
    LinkedIn: 3,
    YouTube: 3,
    Reddit: 3,
  });

  const handlePlatformToggle = (platform: Platform) => {
    setRecommendationCounts(prev => {
      const newCounts = { ...prev };
      if (newCounts[platform] !== undefined) {
        delete newCounts[platform];
      } else {
        newCounts[platform] = defaultCounts[platform];
      }
      return newCounts;
    });
  };

  const handleCountChange = (platform: Platform, count: number) => {
    if (isNaN(count) || count < 1 || count > 9) return;
    setRecommendationCounts(prev => ({
      ...prev,
      [platform]: count
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCounts = Object.entries(recommendationCounts)
      .filter(([, count]) => count !== undefined && count > 0)
      .reduce((acc, [platform, count]) => {
        acc[platform as Platform] = count!;
        return acc;
      }, {} as Record<Platform, number>);

    onSubmit(interests, finalCounts);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-6">
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-slate-300 mb-2">
          Your Interests & Topics
        </label>
        <textarea
          id="interests"
          rows={4}
          className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., sustainable energy, minimalist photography, web development..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Select Platforms &amp; Number of Recommendations
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {platformOptions.map(platform => {
            const Icon = platformIcons[platform];
            const isSelected = recommendationCounts[platform] !== undefined;

            return (
              <div key={platform} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handlePlatformToggle(platform)}
                  className={`flex items-center justify-center gap-2 p-3 border-2 transition-all duration-200 text-sm w-full ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500 text-white rounded-t-lg'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500 rounded-lg'
                  }`}
                  disabled={isLoading}
                >
                  <Icon className="w-5 h-5" />
                  <span>{platform}</span>
                </button>
                
                {isSelected && (
                  <input
                    id={`rec-count-${platform}`}
                    type="number"
                    min="1"
                    max="9"
                    aria-label={`Recommendations for ${platform}`}
                    value={recommendationCounts[platform]}
                    onChange={(e) => handleCountChange(platform, parseInt(e.target.value, 10))}
                    className="w-full bg-slate-700 border-x-2 border-b-2 border-cyan-500 text-white rounded-b-lg p-2 text-center focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                    disabled={isLoading}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {isLoading ? 'Thinking...' : 'Get Recommendations'}
      </button>
    </form>
  );
};
