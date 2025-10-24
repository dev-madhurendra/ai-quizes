export const generateQuestionPrompt = (todayKey: string) => `
    You are an expert Java interviewer.
    Generate 5 unique Java interview questions in JSON.

    Requirements:
    - 3 conceptual questions (OOP, Collections, Exception Handling, Threads)
    - 2 code-based questions (each must include a "code" field with a multi-line Java snippet asking the output)
    - All questions medium difficulty.
    - Use backticks (\`) for inline code terms like \`ArrayList\`.
    - Use today's date ${todayKey} as creative seed.
    Format strictly:
    [
    {
        "question": "Question text",
        "code": "optional multi-line code snippet",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "A",
        "explanation": "Short explanation (2–3 sentences)."
    }
    ]
    Return ONLY the JSON array.
`;
