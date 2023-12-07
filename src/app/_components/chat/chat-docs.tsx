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

  const handleSearchClick = () => {
    setIsLoading(true);
    convertTextToVector.mutate(
      { text: queryText },
      {
        onSuccess: (vector) => {
          vectorSearch.mutate(
            { queryVector: vector, topK: 5 },
            {
              onSuccess: (searchResults) => {
                openAIQueryAnalysis.mutate(
                  {
                    userQuery: queryText,
                    pages: searchResults.map((result) => ({
                      fileName: result.fileName,
                      textData: result.textData,
                      pageNumber: result.pageNumber,
                    })),
                  },
                  {
                    onSuccess: (llmResponse) => {
                      setCompletion(llmResponse);
                      setIsLoading(false);
                    },
                    onError: (error) => {
                      console.error("Error in openAIQueryAnalysis:", error);
                      setIsLoading(false);
                    },
                  },
                );
              },
              onError: (error) => {
                console.error("Error in vector search:", error);
                setIsLoading(false);
              },
            },
          );
        },
        onError: (error) => {
          console.error("Error converting text to vector:", error);
          setIsLoading(false);
        },
      },
    );
  };

  useEffect(() => {
    const typedInstance = new Typed(el.current, {
      strings: [
        "Enter text to search for relevant information accross all the selected documents.",
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
