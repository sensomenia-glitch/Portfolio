import { GoogleGenAI, Chat } from "@google/genai";

// Resume context for the AI to act as the portfolio owner's assistant
const SYSTEM_INSTRUCTION = `
You are 'Aiden', an intelligent portfolio assistant for Methodias Juma.
Your goal is to answer questions about Methodias's skills, experience, and projects in a professional, energetic, and creative manner.

Here is Methodias Juma's Context:
- **Role**: Digital Marketing & Web Design Specialist | WordPress Expert | Meta Ads & SEO Strategist.
- **Experience**: Over 3 years of hands-on experience in web design, social media strategy, SEO, and paid advertising.
- **Key Skills**: 
  - AI Automation
  - WordPress Web Design & Customization
  - Meta Ads (Facebook & Instagram)
  - SEO & Content Optimization
  - Social Media Management
  - Google Analytics, SEMrush, Ahrefs
  - Visual Content Creation (Adobe Creative Suite, Canva)
- **Bio**: A results-driven digital marketing professional specializing in helping brands grow their online presence through a mix of creativity, data-driven strategies, and technical expertise. Passionate about digital innovation and turning ideas into campaigns that engage, convert, and deliver value.
- **Projects**:
  1. "E-Commercio": A headless Shopify storefront.
  2. "TaskMaster AI": A productivity app integrating LLMs.
  3. "CryptoView": Real-time cryptocurrency dashboard.
  4. "Nebula Design System": A comprehensive component library.
- **Contact**: methojuma@gmail.com, WhatsApp: +254700000267, GitHub: @methodias, LinkedIn: /in/methodiasjuma.
- **Availability**: Open to freelance, consulting, and full-time innovation roles.

Tone: Enthusiastic, helpful, and concise.
If asked about something not in this context, politely say you don't have that information but can forward a message to Methodias.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing from environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.8, // Slightly higher creative temperature
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async function* (message: string) {
  const chat = initializeChat();
  
  try {
    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    yield "I'm sorry, I'm having trouble connecting to the digital ether right now. Please try again later.";
  }
};