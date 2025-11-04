import { GoogleGenAI, Type } from "@google/genai";
import type { Page, GeminiResponse } from '../types';

const model = 'gemini-2.5-flash';

export const getRecommendation = async (apiKey: string, interests: string, page: Page): Promise<GeminiResponse> => {
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are an expert social media analyst. Your task is to analyze the relevance of a social media page to a user's interests.
Based on the user's interests and the page's description, you must return a JSON object with two keys:
1. "score": A number between 0.0 and 1.0, where 1.0 is a perfect match and 0.0 is completely irrelevant.
2. "explanation": A short, compelling, one-sentence explanation of why this page is a good match for the user's interests.`;

  const contents = `
    **User Interests:**
    ${interests}

    **Social Media Page:**
    - Name: ${page.name}
    - Platform: ${page.platform}
    - Description: ${page.description}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "A relevance score from 0.0 to 1.0."
            },
            explanation: {
              type: Type.STRING,
              description: "A one-sentence explanation for the recommendation."
            }
          },
          required: ["score", "explanation"]
        }
      }
    });
    
    const jsonString = response.text.trim();
    if (!jsonString) {
        console.error("Empty JSON response from Gemini for page", page.name);
        return { score: 0, explanation: "Could not analyze this page." };
    }
    const parsedResponse = JSON.parse(jsonString) as GeminiResponse;
    
    if (typeof parsedResponse.score !== 'number' || typeof parsedResponse.explanation !== 'string') {
        console.error("Invalid JSON structure from Gemini", parsedResponse);
        return { score: 0, explanation: "Could not analyze this page." };
    }

    return parsedResponse;

  } catch (error) {
    console.error(`Error fetching recommendation for page "${page.name}":`, error);
    return {
      score: 0,
      explanation: 'Could not be analyzed due to an API error.',
    };
  }
};