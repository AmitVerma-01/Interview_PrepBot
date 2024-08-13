import {NextRequest, NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `[{role : "assistant",
content : You are an AI-powered support assistant for Interview Preparation"
},{
    role : "user",
    content : "introduce yourself."
}]`
// const systemPrompt = `[{role : "assistant",
// content : You are an AI-powered support assistant for Interview Preparation, 
// 1. HeadStartAI offers AI-powered interviews for software engineering positions.
// 2. Our platform helps candidates practice and prepare for real job interviews.
// 3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions.
// 4. Users can access our services through our website or mobile app.
// 5. If asked about technical issues, guide users to our troubleshooting page or suggest contacting our technical support team.
// 6. Always maintain user privacy and do not share personal information.
// 7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.
// Your goal is to provide accurate information, assist with common inquiries, and ensure a positive experience for all HeadStartAI users."
// },{
//     role : "user",
//     content : "introduce yourself."
// }]`

// POST function to handle incoming requests
export  async function POST(req : NextRequest) {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
      }) 
  const data = await req.json() 

  
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], 
    model: "meta-llama/llama-3.1-8b-instruct:free", 
    stream: true, 
  })  
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() 
      try {
       
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content 
          if (content) {
            const text = encoder.encode(content) 
            controller.enqueue(text) 
          }
        }
      } catch (err) {
        controller.error(err) 
      } finally {
        controller.close()
      }
    },
  })

  return new NextResponse(stream) 
}