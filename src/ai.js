import Anthropic from "@anthropic-ai/sdk"

//import fs from "fs/promises"

//import vision from "@google-cloud/vision"

//const vision = require("@google-cloud/vision")

/*const client = new vision.ImageAnnotatorClient({
    keyFilename: "ustudy-483603-f4019647ec57.json"
})

/*const img = "../src/images/pfp.jpg"

const image = await fs.readFile(img)*/

export const ocrKey = import.meta.env.VITE_OCR_KEY

export const anthroKey = import.meta.env.VITE_ANTHROPIC_API_KEY

const anthropic = new Anthropic({
        apiKey: anthroKey,
        dangerouslyAllowBrowser: true
    })

export async function getAI(notesdata) {
    const notes = notesdata.join("...newline...")

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: `Create flashcards from the given notes, using as much of the information as possible. Format them as front -> back and then a new line. Make sure to specifically use "->" when doing front to back: ${notes}`
            }
        ]
    })

    return msg.content[0].text
}

export async function getAIMCQ(notesdata, context) {
    const newContext = context.join("...newline...")

    console.log("CXT: " + newContext)

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: `You will create 4 multiple-choice answers to the following question: ${notesdata}. Only one of these 4 should be correct. DO NOT write ANYTHING other than each potential answer, followed by an * to indicate the next one. For example: He was red*He was blue*He was purple*He was black. You will draw your potential answers from the following context: ${newContext}`
            }
        ]
    })

    return msg.content[0].text
}

export async function getAIQuestion(context, asked) {
    const newContext = context.join("...newline...")
    const newAsked = asked.join("...newline...")

    console.log("CXT: " + newContext)
    console.log("ASK", newAsked)

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: `You will write a question relating to this context: ${newContext}. DO NOT write ANYTHING other than just the pure question. This question will be eventually answered by one of four multiple choice prompts, so keep that in mind. Also, try not to do a repeat question. These questions have already been asked: ${newAsked}`
            }
        ]
    })

    return msg.content[0].text
}

export async function getAIChatbot(notesdata, context) {
    const newContext = context.join("...newline...")

    console.log("CXT: " + newContext)

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: `Answer the following question in 4 to 5 sentences: ${notesdata}. This answer exists within a chatbot where you act as an AI tutor on a certain flashcard set. The context for the flashcard set is as follows: ${newContext}. If the user asks to be quizzed on the flashcard set, please quiz them based on the provided context from earlier. Please do not answer any questions unrelated to the context provided.`
            }
        ]
    })

    return msg.content[0].text
}

export async function getAIFact(notesdata) {

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: "Come up with a NEW fun and interesting fact completely unrelated to any older ones you generated. Make the fact pretty long, with context when necessary, but not crazy long. About a paragraph worth of info. Only give the paragraph, no other words."
            }
        ]
    })

    return msg.content[0].text
}

export async function getAITitle(notesdata) {
    const notes = notesdata.join("...newline...")

    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: `The following notes were used to make flashcards. Generate a basic title describing the flashcard set, 2-10 words. Notes are as follows: ${notes}`
            }
        ]
    })

    return msg.content[0].text
}