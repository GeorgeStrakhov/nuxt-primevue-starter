import { answer } from '../services/openai';

// get a post request with system prompt, user message and model (optional) and get an answer from the llm
export default defineEventHandler(async (event) => {
    const data = await readBody(event)

    //validate that at leaste userMessage is there. otherwise - throw an error
    if (!data.userMessage) {
        throw new Error('userMessage is required')
    }

    // get the answer from the llm
    const response = await answer(data.systemPrompt, data.userMessage, data.model)
    return {
        answer: response
    }
})
