const SLIDE_CONFIG = {
  TOTAL_SLIDES: 7,
  SLIDES: [
    {
      id: 0,
      type: "opening",
      title: "Welcome",
      content: "Intro...",
      buttonText: "Get a Reality Check",
      buttonStyle: "default",
    },
    // description group
    {
      id: 1,
      type: "description",
      title: "Step 2.1",
      content: "Desc 1...",
      buttonText: "Continue",
      buttonStyle: "black",
    },
    {
      id: 2,
      type: "description",
      title: "Step 2.2",
      content: "Desc 2...",
      buttonText: "Continue",
      buttonStyle: "black",
    },
    {
      id: 3,
      type: "description",
      title: "Step 2.3",
      content: "Desc 3...",
      buttonText: "Continue",
      buttonStyle: "black",
    },
    // forms
    {
      id: "4",
      type: "form",
      questionText: "What's your name?",
      inputType: "text",
      placeholder: "Enter your name",
      buttonText: "Continue",
    },
    {
      id: "5",
      type: "form",
      questionText: "What's your email?",
      inputType: "email",
      placeholder: "Enter your email",
      buttonText: "Continue",
    },
    // finish
    {
      id: 6,
      type: "finish",
      title: "Thanks!",
      content: "Done!",
      subtitle: "You are all set to start using the app.",
      buttonText: "Get Started",
      buttonStyle: "white",
    },
  ],
} as const;

export default SLIDE_CONFIG;
