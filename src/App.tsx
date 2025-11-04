import React, { useState, useCallback, useEffect } from 'react';
import { UserInput } from './components/UserInput';
import { Loader } from './components/Loader';
import { RecommendationCard } from './components/RecommendationCard';
import { SparklesIcon, CogIcon } from './components/Icons';
import { ApiKeyModal } from './components/ApiKeyModal';
import { fetchPages } from './services/socialApiMock';
import { getRecommendation } from './services/geminiService';
import type { Platform, Recommendation } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('Generating recommendations...');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = sessionStorage.getItem('gemini-api-key');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    sessionStorage.setItem('gemini-api-key', key);
    setApiKey(key);
    setIsModalOpen(false);
  };

  const handleGetRecommendations = useCallback(async (interests: string, counts: Record<Platform, number>) => {
    if (!apiKey) {
      setError('Please set your Gemini API key in the settings.');
      setIsModalOpen(true);
      return;
    }
    
    const platforms = Object.keys(counts) as Platform[];
    
    if (!interests.trim()) {
      setError('Please enter your interests.');
      return;
    }
    if (platforms.length === 0) {
      setError('Please select at least one platform.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const pages = await fetchPages(platforms);

      const recommendationPromises = pages.map(page =>
        getRecommendation(apiKey, interests, page)
          .then(geminiResponse => ({
            ...page,
            ...geminiResponse,
          }))
          .catch(e => {
            console.error(`Failed to process recommendation for ${page.name}`, e);
            return null; // Return null on error so Promise.all doesn't reject
          })
      );
      
      const resolvedRecommendations = await Promise.all(recommendationPromises);
      const allRecommendations = resolvedRecommendations.filter(
        (rec): rec is Recommendation => rec !== null
      );

      const successfulRecommendations = allRecommendations.filter(rec => rec.score > 0.5);

      successfulRecommendations.sort((a, b) => b.score - a.score);

      const groupedByPlatform = successfulRecommendations.reduce((
        acc: Record<Platform, Recommendation[]>,
        rec
      ) => {
        const platform = rec.platform;
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push(rec);
        return acc;
      }, {} as Record<Platform, Recommendation[]>);

      const finalRecommendations = (Object.entries(groupedByPlatform) as [Platform, Recommendation[]][])
        .flatMap(([platform, platformRecs]) => {
          const platformCount = counts[platform] || 0;
          return platformRecs.slice(0, platformCount);
        });

      setRecommendations(finalRecommendations);

    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('Generating recommendations...');
    }
  }, [apiKey]);
  
  const groupedRecommendations = recommendations.reduce((
    acc: Record<Platform, Recommendation[]>,
    rec
  ) => {
    const platform = rec.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(rec);
    return acc;
  }, {} as Record<Platform, Recommendation[]>);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
       <ApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveApiKey}
      />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10 relative">
          <div className="flex justify-center items-center gap-4 mb-4">
            <SparklesIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Social Page Recommender
            </h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover new social media pages tailored to your interests, powered by Gemini.
          </p>
           <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Settings"
            >
              <CogIcon className="w-6 h-6 text-slate-400" />
            </button>
        </header>

        <div className="max-w-2xl mx-auto mb-12">
          <UserInput onSubmit={handleGetRecommendations} isLoading={isLoading} />
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
        
        {isLoading && <Loader message={loadingMessage} />}

        {!isLoading && recommendations.length > 0 && (
          <div className="space-y-12">
            {/* FIX: Cast Object.entries to fix "Property 'map' does not exist on type 'unknown'" error. */}
            {(Object.entries(groupedRecommendations) as [Platform, Recommendation[]][]).map(([platform, recs]) => (
              <section key={platform}>
                <h2 className="text-2xl font-bold capitalize mb-6 border-b-2 border-slate-700 pb-2">
                  {platform} Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recs.map(rec => (
                    <RecommendationCard key={rec.id} recommendation={rec} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        
        {!isLoading && !error && recommendations.length === 0 && (
           <div className="text-center py-16 px-6 bg-slate-800/50 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white">Ready to find new pages?</h3>
              <p className="text-slate-400 mt-2">Enter your interests above and click "Get Recommendations" to start.</p>
           </div>
        )}

      </main>
      <footer className="text-center py-6 border-t border-slate-800">
        <p className="text-sm text-slate-500">
          Powered by Google Gemini. Social media data is mocked for this demo.
        </p>
      </footer>
    </div>
  );
}

export default App;
