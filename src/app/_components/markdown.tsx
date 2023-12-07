"use client";
import ReactMarkdown from "react-markdown";
import React from "react";

type MarkdownProps = {
  markdownText: string;
};

const Markdown: React.FC<MarkdownProps> = ({ markdownText }) => {
  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};

export default Markdown;
