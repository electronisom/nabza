import { GoogleGenAI } from "@google/genai";
import { BookCardData } from '../types';

if (!import.meta.env.VITE_API_KEY) {
    throw new Error("VITE_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const generateBookCard = async (bookTitle: string): Promise<BookCardData> => {
  const prompt = `
    حلل الكتاب الذي يحمل عنوان "${bookTitle}".
    بناءً على تحليلك، قم بإنشاء كائن JSON بالهيكل التالي:
    {
      "title": "عنوان الكتاب الكامل باللغة العربية",
      "author": "اسم المؤلف باللغة العربية",
      "summary": "ملخص موجز وجذاب للكتاب باللغة العربية، حوالي 50-70 كلمة.",
      "takeaways": [
        "فكرة رئيسية أو درس مستفاد من الكتاب باللغة العربية.",
        "درس مهم آخر أو مفهوم باللغة العربية.",
        "نقطة ثالثة مهمة باللغة العربية."
      ],
      "quote": "اقتباس ملهم أو مثير للتفكير من الكتاب باللغة العربية.",
      "detailedAnalysis": [
        "تحليل متعمق للمواضيع الرئيسية للكتاب باللغة العربية (حوالي 80-100 كلمة).",
        "وصف لتطور الشخصيات الرئيسية وتأثيرها على القصة باللغة العربية (حوالي 80-100 كلمة).",
        "شرح لكيفية حل الحبكة الرئيسية وأثر الخاتمة باللغة العربية (حوالي 80-100 كلمة)."
      ],
      "themeColor": "رمز لون سداسي عشري واحد (مثل '#4A90E2') يمثل الحالة المزاجية أو موضوع أو غلاف الكتاب."
    }

    تأكد من أن جميع القيم النصية مكتوبة بالكامل باللغة العربية.
    تأكد من أن detailedAnalysis عبارة عن مصفوفة من ثلاثة أجزاء بالضبط.
    يجب أن يكون ملف JSON منظمًا بشكل جيد ويتبع الهيكل المحدد بدقة.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    // Extract the text from the response
    let jsonStr = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    // Remove markdown code fences if present
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr) as BookCardData;

    // Basic validation
    if (
      !parsedData.title ||
      !parsedData.summary ||
      !parsedData.takeaways ||
      !parsedData.quote ||
      !parsedData.themeColor ||
      !parsedData.detailedAnalysis ||
      !Array.isArray(parsedData.detailedAnalysis) ||
      parsedData.detailedAnalysis.length < 3
    ) {
      throw new Error("AI response is missing required fields or detailed analysis is incomplete.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error generating book card:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate card from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the book card.");
  }
};