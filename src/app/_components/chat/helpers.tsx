
export const TypingIndicator = () => {
  return (
    <div className="typing-indicator flex items-center space-x-1">
      <span className="dot h-2 w-2 animate-bounce rounded-full bg-gray-300"></span>
      <span className="dot animate-bounce200 h-2 w-2 rounded-full bg-gray-300"></span>
      <span className="dot animate-bounce400 h-2 w-2 rounded-full bg-gray-300"></span>
    </div>
  );
};
