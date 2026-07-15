import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(
  query: string,
  context: string
): Promise<string> {
  try {
    const message = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert startup advisor with deep knowledge of:
- Company registration and legal structure
- Funding and venture capital
- Hiring and team building
- Marketing and branding
- Taxation and compliance
- Business growth strategies
- AI tools and automation

Provide practical, actionable advice based on the provided context.
Always cite your sources from the provided articles.
Keep responses concise but comprehensive (200-300 words).`,
        },
        {
          role: 'user',
          content: `Based on this context:\n\n${context}\n\n\nAnswer this question: ${query}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return message.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export default openai;
