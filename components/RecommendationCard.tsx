import React from 'react';
import type { Recommendation, Platform } from '../types';
import { FacebookIcon, InstagramIcon, XIcon, LinkedInIcon, YouTubeIcon, RedditIcon, SparklesIcon } from './Icons';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const formatFollowers = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M followers`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K followers`;
  }
  return `${count} followers`;
};

const platformConfig: Record<Platform, { Icon: React.FC<React.ComponentProps<'svg'>>; borderColor: string; }> = {
    Facebook: { Icon: FacebookIcon, borderColor: 'hover:border-blue-500' },
    Instagram: { Icon: InstagramIcon, borderColor: 'hover:border-pink-500' },
    X: { Icon: XIcon, borderColor: 'hover:border-gray-400' },
    LinkedIn: { Icon: LinkedInIcon, borderColor: 'hover:border-sky-600' },
    YouTube: { Icon: YouTubeIcon, borderColor: 'hover:border-red-600' },
    Reddit: { Icon: RedditIcon, borderColor: 'hover:border-orange-500' },
};


export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const { name, platform, description, followers, explanation, link, avatar } = recommendation;
  
  const { Icon, borderColor } = platformConfig[platform];

  return (
    <div className={`bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 border-2 border-transparent ${borderColor}`}>
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
                <img src={avatar} alt={`${name} avatar`} className="w-12 h-12 rounded-full object-cover border-2 border-slate-600" />
                <div>
                    <h3 className="font-bold text-lg text-white leading-tight">{name}</h3>
                    <p className="text-sm text-slate-400">{formatFollowers(followers)}</p>
                </div>
            </div>
          <Icon className="w-6 h-6 text-slate-500" />
        </div>
        
        <p className="text-sm text-slate-300 mb-4 h-20 overflow-y-auto pr-2">
          {description}
        </p>
        
        <div className="bg-slate-700/50 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <SparklesIcon className="w-5 h-5 text-cyan-400" />
            <h4 className="font-semibold text-sm text-cyan-300">Why it's a match</h4>
          </div>
          <p className="text-sm text-slate-300 italic">"{explanation}"</p>
        </div>
      </div>
      
      <div className="bg-slate-700/50 p-4 mt-auto">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Visit Page
        </a>
      </div>
    </div>
  );
};