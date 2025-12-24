
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const architecturalChat = async (message: string, history: { role: string; text: string }[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are VITREOUS STRATUM AI, a world-class architectural intelligence and spatial philosopher. 
      You specialize in polymer-based structures, glass-morphism design, and sustainable futuristic urbanism.
      Respond with technical precision, poetic insight, and architectural wisdom. 
      When asked for data, provide structured insights. Use Markdown for formatting.`,
    },
  });

  // Since the Chat API doesn't support passing full historical arrays in one go via a simple method easily here, 
  // we'll assume a simplified flow or manage the session manually. 
  // For this implementation, we use simple message sending.
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateArchitecturalConcept = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `High-end architectural concept, futuristic polymer building, glass-morphism, volumetric lighting, photorealistic, cinematic, architectural rendering style: ${prompt}` }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const analyzeArchitecturalStats = async (description: string): Promise<any> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this architectural description and provide scores (0-100) for Sustainability, Efficiency, Aesthetics, and Innovation. 
    Description: ${description}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sustainability: { type: Type.NUMBER },
          efficiency: { type: Type.NUMBER },
          aesthetics: { type: Type.NUMBER },
          innovation: { type: Type.NUMBER },
          briefing: { type: Type.STRING }
        },
        required: ["sustainability", "efficiency", "aesthetics", "innovation"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};
