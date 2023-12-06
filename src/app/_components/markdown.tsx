"use client";
import ReactMarkdown from "react-markdown";
import React from "react";

type MarkdownProps = {
  markdownText: string; // Defining the type of markdownText
};

const Markdown: React.FC<MarkdownProps> = ({ markdownText }) => {
  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};

export default Markdown;
