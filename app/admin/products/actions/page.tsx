"use client";
import {
  exportProductsToStripe,
  importStripeProducts,
} from "@/app/admin/products/actions/actions";
import { useCallback, useState } from "react";

//A page displaying the following actions:
const actions: Action[] = [
  {
    name: "Import Stripe->Products",
    description: "Imports all products from stripe",
    callback: importStripeProducts,
  },
  {
    name: "Export Products->Stripe",
    description: "Exports all products to stripe",
    callback: exportProductsToStripe,
  },
];

type Action = {
  name: string;
  description?: string;
  callback: () => Promise<any>;
};

type ActionButtonProps = {
  action: Action;
  onResult: (result: any) => void;
};

export function ActionButton({
  action: { name, description, callback },
  onResult,
}: ActionButtonProps) {
  const onClick = useCallback(async () => {
    onResult(await callback());
  }, [callback, onResult]);

  return (
    <form action={onClick}>
      <button type="submit">
        {name}
        <br />
        {description && <small>{description}</small>}
      </button>
    </form>
  );
}

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);
  const appendMessage = (msg: any) => {
    setMessages([...messages, msg]);
  };

  return (
    <div>
      {messages &&
        messages.map((message) => {
          const key = JSON.stringify(message);
          return (
            <li key={key}>
              <pre>{JSON.stringify(message, undefined, 1)}</pre>
            </li>
          );
        })}
      <ul>
        {actions.map((action) => (
          <li key={action.name}>
            <ActionButton action={action} onResult={appendMessage} />
          </li>
        ))}
      </ul>
    </div>
  );
}
