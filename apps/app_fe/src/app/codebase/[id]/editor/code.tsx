import React from "react";
import Highlight from "react-highlight";
import "./highlight.css";

function Code({ selectedFile, ...props }: any) {
  if (!selectedFile) return null;

  const code = selectedFile.code;
  let extension = selectedFile.name.split(".").pop();

  return <Highlight className={extension}>{code}</Highlight>;
}

export default Code;
