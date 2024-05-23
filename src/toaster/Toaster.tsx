import { useState } from "react";
import "./toaster.css";

export default function useToasters() {
  const [ messages, setMessages ] = useState<string[]>([]);
  const [ timeouts, setTimeouts ] = useState<number[]>([]);

  function add(message: string) {
    setMessages(prev => [ ...prev, message ]);

    const timeout = setTimeout(() => {
      deleteToaster(timeout);
    }, 3000);

    setTimeouts(prev => [ ...prev, timeout ]);
  }

  function deleteToaster(timeout: number) {
    clearTimeout(timeout);

    setTimeouts(prev => prev.filter(t => t === timeout));
  }

  return [
    <Toasters
      messages={messages}
      timeouts={timeouts}
      deleteToaster={deleteToaster}
    />,
    add
  ] as const;
}

function Toasters({
  messages,
  timeouts,
  deleteToaster
}: {
  messages: string[],
  timeouts: number[],
  deleteToaster: (timeout: number) => void
}) {
  return (
    <div className="toaster-container">
      {messages.map((m, i) =>
        <Toaster
          key={timeouts[i]}
          error={m}
          deleteToaster={() => deleteToaster(timeouts[i])}
        />
      )}
    </div>
  )
}

function Toaster({
  error,
  deleteToaster
}: {
  error: string,
  deleteToaster: () => void
}) {
  return (
    <div className="toaster" onClick={deleteToaster}>
      {error}
    </div>
  )
}