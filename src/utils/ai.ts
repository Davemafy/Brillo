/**
 * Generates a catchy course subtitle using the Groq API.
 * @param {string} courseTitle - The user-provided title of the course.
 * @returns {Promise<string>} - Returns the generated subtitle string.
 */
export const generateCourseSubtitle = async (courseTitle: string) => {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a curriculum expert. Provide a catchy, professional one-sentence subtitle for a course. Return ONLY a JSON object with the key 'subtitle'.",
          },
          {
            role: "user",
            content: `Course Title: ${courseTitle}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || "Check your Groq console.");
    }

    // Parse the JSON content and return only the subtitle string
    const content = JSON.parse(result.choices[0].message.content);
    return content.subtitle;
  } catch (error) {
  if (error instanceof Error) {
      console.error("Subtitle Generation Error:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }   
    return "A comprehensive guide to mastering this course.";
  }
};
