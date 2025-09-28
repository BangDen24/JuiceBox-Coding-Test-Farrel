
const SLIDE_CONFIG = {
  TOTAL_SLIDES: 5, 
  SLIDES: [
    {
      id: "opening",
      type: "opening",
      title: "Compare your thoughts on technology with current industry opinions.",
      buttonText: "Get a Reality Check",
      buttonStyle: "default",
    },
    {
      id: "description",
      type: "description",
      children: [
        {
          id: "desc1",
          content:
            "Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn.",
          buttonText: "Continue",
          buttonStyle: "black",
        },
        {
          id: "desc2",
          content:
            "I’ll ask you a handful of meaningful questions and compare your responses with people in your industry.",
          buttonText: "Continue",
          buttonStyle: "black",
        },
        {
          id: "desc3",
          content:
            "You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
          buttonText: "Continue",
          buttonStyle: "black",
        },
      ],
    },
    {
      id: "name",
      type: "form",
      questionText: "Let’s start with the basics. Type in your first name.",
      inputType: "text",
      placeholder: "Enter your name",
      buttonText: "Continue",
    },
    {
      id: "email",
      type: "form",
      questionText: "What's your email?",
      inputType: "email",
      placeholder: "Enter your email",
      buttonText: "Continue",
    },
    {
      id: "finish",
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
