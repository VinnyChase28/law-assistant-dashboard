import ReactMarkdown from "react-markdown";
import React from "react";
import remarkGfm from "remark-gfm";
//create a type for the props
type MarkdownProps = {
  markdownText: string;
};

const Markdown = ({ markdownText }: MarkdownProps) => {
  return (
    <div className="markdown mx-auto max-w-3xl p-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="markdown-content list-inside list-decimal"
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
