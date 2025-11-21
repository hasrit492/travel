import { GoogleGenAI, Type } from "@google/genai";
import { TripSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTravelSuggestion = async (query: string): Promise<TripSuggestion> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `You are Rahhala (رحالة), a wise and experienced travel guide. 
    The user is asking about: "${query}".
    Provide a travel suggestion including a brief poetic description and 3 key activities.
    Respond in the language the user used (Arabic or English), but default to Arabic if ambiguous.
    If the input is just a greeting, suggest a random beautiful place in the Middle East or North Africa.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            location: { type: Type.STRING },
            description: { type: Type.STRING },
            activities: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["location", "description", "activities"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as TripSuggestion;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      location: "Unknown Land",
      description: "The compass spins wildly... please try again.",
      activities: []
    };
  }
};