import { useState } from "react";
import "./toaster.css";

export enum ToasterType {
  INFO = "info",
  ERROR = "error"
}

export default function useToasters() {
  const [ toasters, setToasters ] = useState<{ message: string, type: ToasterType }[]>([]);
  const [ timeouts, setTimeouts ] = useState<number[]>([]);

  function add(message: string, type: ToasterType) {
    setToasters(prev => [ ...prev, { message, type } ]);

    const timeout = setTimeout(() => {
      deleteToaster(timeout);
    }, 3000);

    setTimeouts(prev => [ ...prev, timeout ]);
  }

  function deleteToaster(timeout: number) {
    clearTimeout(timeout);

    setTimeouts(prev => prev.filter((t, i) => {
      if (t !== timeout)
        return true;

      setToasters(prev => prev.filter((_, index) => index !== i))
      return false;
    }));
  }

  return [
    <Toasters
      toasters={toasters}
      timeouts={timeouts}
      deleteToaster={deleteToaster}
    />,
    add
  ] as const;
}

function Toasters({
  toasters,
  timeouts,
  deleteToaster
}: {
  toasters: { message: string, type: ToasterType }[],
  timeouts: number[],
  deleteToaster: (timeout: number) => void
}) {
  return (
    <div className="toaster-container">
      {toasters.map((t, i) =>
        <Toaster
          key={timeouts[i]}
          toasterInfo={t}
          deleteToaster={() => deleteToaster(timeouts[i])}
        />
      )}
    </div>
  )
}

function Toaster({
  toasterInfo,
  deleteToaster
}: {
  toasterInfo: { message: string, type: ToasterType },
  deleteToaster: () => void
}) {
  return (
    <div className={`toaster ${toasterInfo.type}`} onClick={deleteToaster}>
      {toasterInfo.message}
    </div>
  )
}