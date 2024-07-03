import OpenAI from "openai";
const openai = new OpenAI();

const answer = async (systemPrompt = "You are a helpful assistant", userPrompt = "Hello, who are you?", model = "gpt-3.5-turbo") => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        model: model,
    });

    return completion.choices[0].message.content;
}

export { answer };
