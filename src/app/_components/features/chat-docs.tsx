"use client";

import React, { useState, useRef, useEffect } from "react";
import { api } from "src/trpc/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import Typed from "typed.js";
import Markdown from "../markdown";
import { Chat } from "./chat";
import { handler } from "./action";
const VectorSearchComponent = () => {
  return <Chat handler={handler} documentQuestion={true} />;
};

export default VectorSearchComponent;
