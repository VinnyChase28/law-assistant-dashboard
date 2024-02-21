"use client";

import React, { useState, useRef, useEffect } from "react";
import { api } from "src/trpc/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Typed from "typed.js";
import Markdown from "../markdown";

const VectorSearchComponent = () => {
  const el = useRef(null);
  const [queryText, setQueryText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [completion, setCompletion] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  //mutations
  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const openAIQueryAnalysis = api.llm.openAIQueryAnalysis.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQueryText(e.target.value);
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    try {
      const vector = await convertTextToVector.mutateAsync({ text: queryText });

      const searchResults = await vectorSearch.mutateAsync({
        queryVector: vector,
        topK: 3,
      });

      const llmResponse = await openAIQueryAnalysis.mutateAsync({
        userQuery: queryText,
        pages: searchResults.map((result) => ({
          fileName: result.fileName,
          textData: result.textData,
          pageNumber: result.pageNumber,
        })),
      });

      setCompletion(llmResponse);
    } catch (error) {
      console.error("Error during vector search operations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const typedInstance = new Typed(el.current, {
      strings: [
        "Enter text to search for relevant information accross all uploaded documents. I will then use the information to generate a summary for you.",
      ],
      typeSpeed: 25,
    });

    return () => typedInstance.destroy();
  }, []);

  const resetSearch = () => {
    setQueryText("");
    setSearchResults([]);
    setIsLoading(false);
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <span ref={el} />
      </div>
      <div className="mb-4">
        <Textarea
          className="w-full rounded border border-gray-300 p-2"
          value={queryText}
          onChange={handleInputChange}
          aria-label="Search Query"
        />
      </div>
      <div className="mb-4 flex gap-2">
        <Button
          onClick={handleSearchClick}
          variant="default"
          disabled={isLoading}
        >
          Search
        </Button>
        <Button
          onClick={resetSearch}
          disabled={isLoading}
          variant="destructive"
        >
          Reset
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {completion && <Markdown markdownText={completion} />}
    </div>
  );
};

export default VectorSearchComponent;
