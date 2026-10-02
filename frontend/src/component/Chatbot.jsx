import React, { useState, useRef, useEffect, useContext } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your OneCart AI assistant. How can I help you today?", isUser: false }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { serverUrl } = useContext(authDataContext);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsLoading(true);

        try {
            const response = await axios.post(`${serverUrl}/api/ai/chat`, { message: userMessage });

            if (response.data.success) {
                setMessages(prev => [...prev, { text: response.data.response, isUser: false }]);
            } else {
                setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", isUser: false }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { text: "Network error. Please try again later.", isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            {/* Chat Start Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-subtle pointer-events-auto"
                >
                    <FaRobot className="w-7 h-7" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 max-h-[80vh] pointer-events-auto">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white shrink-0 z-10 shadow-sm">
                        <div className="flex items-center gap-2">
                            <FaRobot className="w-5 h-5" />
                            <h3 className="font-semibold text-lg">OneCart Assistant</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer" title="Minimize">
                                <FaMinus className="w-3 h-3" />
                            </button>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer" title="Close">
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 relative" style={{ minHeight: '300px', overscrollBehavior: 'contain' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isUser
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none prose prose-sm max-w-none'
                                    }`}>
                                    {msg.isUser ? (
                                        msg.text
                                    ) : (
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => {
                                                    // Handle internal React Router links vs external
                                                    return props.href?.startsWith('/') ? (
                                                        <Link to={props.href} className="text-blue-600 font-semibold hover:text-blue-800 underline break-words">{props.children}</Link>
                                                    ) : (
                                                        <a {...props} className="text-blue-600 font-semibold hover:text-blue-800 underline break-words" target="_blank" rel="noopener noreferrer">{props.children}</a>
                                                    );
                                                },
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0 z-10 shadow-sm">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-sm text-gray-700"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
                            >
                                <FaPaperPlane className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-gray-400">Powered by Google Gemini</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
