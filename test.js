// const data =  "It seems like you're having some trouble with getting information from the Uttar Pradesh Higher Education Service Commission regarding the DigiShakti Scheme at Babu Banarasi Das University. I understand this can be frustrating.  \n\nWhile I can't provide information about specific institutions or government programs, I can offer some advice: \n\n* **Clarify the Department:** The Commission's response states that the information you requested is not within their purview.  You might need to contact the specific department responsible for the DigiShakti Scheme in Uttar Pradesh. This might be a different branch of the higher education commission or a separate government agency altogether.  \n* **Review the RTI Act:** You can review the Right to Information Act, 2005 (RTI Act) to understand your rights and obligations when making information requests.  \n* **Contact the University Directly:** You can also try contacting Babu Banarasi Das University directly. They might be able to provide the information you need.  \n\nIt's important to remember that each government body and institution will have its own procedures for handling RTI requests. It's essential to be persistent and follow up with the relevant authorities. \n\nI hope this helps, and good luck with your information request! \n"

// const resData = data.replaceAll('\n','<br>')
// // console.log(resData);
// console.log(process.env.OPENROUTER_API_KEY);


// fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "meta-llama/llama-3.1-8b-instruct:free",
//       "messages": [
//         {"role": "user", "content": "What is the meaning of life?"},
//       ],
//     })
//   }).then(res => res.json())
//   .then(data => {
//     console.log(data);
    
//   })

// const OpenAI =  require("openai")

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: "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",
// })
// async function main() {
//   const completion = await openai.chat.completions.create({
//     model: "meta-llama/llama-3.1-8b-instruct:free",
//     messages: [
//       { role: "user", content: "Say this is a test" }
//     ],
//   })

//   console.log(completion.choices[0].message)
// }
// main()