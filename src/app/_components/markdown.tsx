// Markdown.js

import ReactMarkdown from "react-markdown";
import React from "react";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";

//create a type for the props
type MarkdownProps = {
  markdownText: string;
};

const Markdown = ({ markdownText }: MarkdownProps) => {
  return (
    <div className="markdown mx-auto max-w-3xl p-4">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        className="markdown-content list-inside list-decimal"
      >
        {markdownText.replace(/\n/gi, "&nbsp; \n")}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
