export const generateQuestionPrompt = (questionDate: string) => `
    You are an expert Java interviewer specializing in comprehensive core Java assessments.
    Generate 5 unique, interview-focused Java questions in JSON format.

    CRITICAL REQUIREMENTS:
    - Use the date ${questionDate} as a unique seed to ensure different questions each day
    - Questions MUST cover diverse core Java topics to ensure comprehensive coverage
    - All questions should be medium-to-hard difficulty, reflecting real interview scenarios
    - Focus on practical, value-oriented questions that interviewers actually ask
    - Avoid repetitive patterns; vary question styles and domains daily

    TOPIC DISTRIBUTION (5 questions):
    1. OOP Concepts (inheritance, polymorphism, encapsulation, abstraction, interfaces vs abstract classes)
    2. Collections Framework (List, Set, Map implementations, complexity, thread-safety, comparisons)
    3. Exception Handling (checked vs unchecked, custom exceptions, try-catch-finally, exception hierarchy)
    4. Multithreading & Concurrency (Thread lifecycle, synchronization, locks, ExecutorService, volatile, deadlock)
    5. String & Immutability (String pool, StringBuilder vs StringBuffer, immutability benefits)
    6. Memory Management & Garbage Collection (heap vs stack, GC algorithms, memory leaks, strong/weak references)
    7. Java 8+ Features (Streams, Lambda, Optional, functional interfaces, default methods, method references)
    8. Generics & Type Safety (wildcards, type erasure, bounded types)
    9. I/O & Serialization (File handling, NIO, serialization mechanisms, transient keyword)
    10. Core Fundamentals (static vs instance, final keyword, equals() & hashCode(), wrapper classes, autoboxing)

    QUESTION TYPE BREAKDOWN:
    - 6 conceptual/theoretical questions (covering topics 1-10 strategically)
    - 4 code-based questions with output prediction or error identification
    
    CODE FORMATTING RULES (CRITICAL):
    - For code-based questions, the "code" field MUST contain properly formatted multi-line Java code
    - Use actual newline characters (\\n) between each line of code
    - Properly indent code with spaces or tabs (use \\t for tabs or spaces)
    - Each line of code should be on a separate line when rendered
    - Example format for code field:
      "code": "public class Test {\\n    public static void main(String[] args) {\\n        int x = 5;\\n        System.out.println(x);\\n    }\\n}"
    - DO NOT put all code on a single line without newlines
    - Code should be 5-15 lines, realistically formatted as it would appear in an IDE

    CODE QUESTION GUIDELINES:
    - Include "code" field with realistic, multi-line Java snippets (MUST use \\n for line breaks)
    - Focus on tricky scenarios: method overriding, collection behavior, exception flow, thread execution, stream operations
    - Use backticks (\`) for inline code terms in question/explanation text like \`HashMap\`, \`volatile\`, \`synchronized\`

    QUALITY STANDARDS:
    - Each question must test practical knowledge, not just memorization
    - Options should be plausible and challenging (avoid obvious wrong answers)
    - Explanations must be 2-4 sentences, providing clear reasoning
    - Vary the correct answer position (A, B, C, D) naturally
    - Use the date ${questionDate} creatively: vary topic selection order, code examples, edge cases

    OUTPUT FORMAT (strict JSON):
    [
        {
            "question": "Clear, specific question text",
            "code": "public class Example {\\n    public static void main(String[] args) {\\n        // Multi-line code with \\\\n between lines\\n        int result = 10;\\n        System.out.println(result);\\n    }\\n}",
            "options": ["Option A with technical accuracy", "Option B", "Option C", "Option D"],
            "correctAnswer": "B",
            "explanation": "Concise 2-4 sentence explanation with reasoning and key concepts."
        }
    ]

    CRITICAL REMINDER FOR CODE FIELD:
    - ALWAYS use \\n (newline escape sequence) between each line of Java code
    - Code must be readable and properly formatted with line breaks
    - Example: "String s = \\"Hello\\";\\nSystem.out.println(s);" NOT "String s = \\"Hello\\"; System.out.println(s);"
    - Think of how code appears in an IDE with proper line breaks

    IMPORTANT: 
    - Return ONLY the JSON array, no additional text
    - Ensure questions rotate through all 10 topic areas across different days
    - Make each day's quiz feel fresh by varying domains, code patterns, and question angles
    - Balance difficulty: avoid all easy or all hard questions
    - REMEMBER: Multi-line code MUST use \\n escape sequences in JSON strings
`;
