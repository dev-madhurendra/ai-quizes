export const generateQuestionPrompt = (questionDate: string) => `
    You are an expert Java interviewer designing professional, real-world interview questions.

    Generate exactly 5 **unique and challenging** Java interview questions in **strict JSON format** as below:
    [
    {
        "question": "Question text here",
        "code": "public class Test {\\n    public static void main(String[] args) {\\n        ...\\n    }\\n}",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "B",
        "explanation": "2–4 sentence explanation with reasoning and key concepts."
    }
    ]

    ### RULES:
    - Use the date **${questionDate}** as a seed — ensure new questions daily (topic mix, code, focus area).
    - Cover **diverse, high-value Core Java concepts** — focus on what’s **commonly tested in product-based interviews**.
    - Maintain **medium-to-hard** difficulty.
    - Balance **conceptual** and **code-based** questions (≈60% conceptual, 40% code-based).
    - Each code snippet must:
    - Be **multi-line**, formatted with \\n for line breaks and proper indentation.
    - Be **5–15 lines**, realistic and compilable.
    - Reflect practical behavior or tricky scenarios (e.g., overriding, concurrency, collections quirks).
    - Use **realistic, confusing, or edge-case scenarios** that test understanding—not rote memory.

    ### TOPIC POOL (rotate daily, pick 5 unique):
    1. OOP & Abstraction (inheritance, polymorphism, interfaces vs abstract classes)
    2. Collections Framework (List, Set, Map, thread safety, complexity, behavior)
    3. Exception Handling (checked vs unchecked, try-catch-finally flow)
    4. Multithreading & Concurrency (locks, volatile, ExecutorService, deadlocks)
    5. String & Immutability (String pool, StringBuilder, StringBuffer)
    6. Memory Management & GC (heap vs stack, GC roots, memory leaks)
    7. Java 8+ Features (streams, lambda, functional interfaces, Optional)
    8. Generics (wildcards, bounded types, type erasure)
    9. I/O & Serialization (File I/O, NIO, serialization, transient)
    10. Core Fundamentals (static, final, equals/hashCode, autoboxing)

    ### OUTPUT QUALITY:
    - Each question must be **practical, relevant, and interview-grade**.
    - **Options**: all should be believable, technically sound.
    - **Explanations**: concise (2–4 sentences), technically correct, mention key Java behavior.
    - **No extra commentary or text** outside JSON.
    - Vary correct answer positions naturally (A–D).

    ### REMINDERS:
    - Code field must contain **multi-line Java code** with proper \\n and indentation.
    - Avoid trivial, repetitive, or syntax-only questions.
    - Ensure **different topic combinations daily** based on ${questionDate}.
    - Return **only** the JSON array. No introductions, comments, or markdown.
`;
