"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";

export default function Chat() {
  // Example: say hello action
  useCopilotAction({
    name: "sayHello",
    description: "Say hello to the user",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The user's name",
        required: true,
      },
    ],
    handler: async ({ name }) => {
      alert(`Hello, ${name}!`);
    },
  });

  return (
    <CopilotChat
      instructions="You're a helpful book assistant. Answer book-related queries and recommend books. Use frontend actions if needed."
      labels={{
        title: "AI Book Assistant 📚",
        initial: "Hi there! Ask me to recommend or summarize books.",
      }}
    />
  );
}
