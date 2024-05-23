import { useState } from "react";
import "./toaster.css";

export default function useToasters() {
  const [ messages, setMessages ] = useState<string[]>([]);
  
  function add(message: string) {
    setMessages(prev => [ ...prev, message ]);
  }

  return [ <Toasters messages={messages} />, add ] as const;
}

function Toasters({ messages }: { messages: string[] }) {
  return (
    <div className="toaster-container">
      {messages.map((m, i) => <Toaster error={m} key={m+i} />)}
    </div>
  )
}

function Toaster({ error }: { error: string }) {
  return (
    <div className="toaster">
      {error}
    </div>
  )
}