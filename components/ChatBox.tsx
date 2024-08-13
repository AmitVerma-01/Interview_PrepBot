'use client'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

export default function ChatBox() {
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! I'm the Interview Preparation assistant. How can I help you today?",
        },
    ])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const mes = localStorage.getItem("messages")
        if (mes) setMessages(JSON.parse(mes))
    }, [])

    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages))
    }, [messages])

    const sendMessage = async () => {
        if (!message.trim()) return;

        setMessage('')  // Clear the input field
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },  
            { role: 'assistant', content: '' },  
        ])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, { role: 'user', content: message }]),
            })

            const reader = response.body?.getReader()  // Get a reader to read the response body
            const decoder = new TextDecoder()  // Create a decoder to decode the response text

            let result = ''
            // Function to process the text from the response
            await reader?.read().then(function processText({ done, value }) :any{
                if (done) {
                    return result
                }
                const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
                    let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
                    ]
                })

                return reader.read().then(processText)  // Continue reading the next chunk of the response
            })
        } catch (error) {
            console.error('Error sending message:', error)
            // Handle error (optional)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) 
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="w-full h-full bg-zinc-200 p-5 flex flex-col justify-between overflow-auto">
            <div className="overflow-auto h-[95%]">
                {messages ? (
                    <>
                        {
                            messages.map((item, i) => (
                                Object.keys(item).length ? <Chat key={i} userType={item.role} chatContent={item.content} messagesEndRef={messagesEndRef} /> : null
                            ))
                        }
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="w-full h-[8%] flex justify-center items-end">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Enter here..."
                        className="text-xl p-2 w-[80%] rounded-2xl mx-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="text-xl w-[15%] bg-gray-600 p-2 rounded-2xl" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ChatInputProps {
    chatContent: string;
    userType: string;
    messagesEndRef: any
}

export const Chat = ({ chatContent, userType, messagesEndRef }: ChatInputProps) => {
    return (
        <div className={`flex items-center ${userType === "user" ? "justify-end" : "justify-start"} my-1`}>
            <div className={`p-3 rounded-2xl text-white text-md font-semibold max-w-[60%] shadow-md ${userType === "user" ? 'bg-gradient-to-r from-violet-400 to-indigo-600' : "bg-gradient-to-r from-red-400 to-orange-500"}`}>
                
                <Markdown>{chatContent}</Markdown>
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
