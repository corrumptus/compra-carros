import { useState } from "react";

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
      {messages.map(m => <Toaster error={m} key={m} />)}
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