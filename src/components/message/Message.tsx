import React from "react";

type MessageProps = {
  content: string;
};

export const Message = ({ content }: MessageProps) => {
  return <p className="text-center text-zinc-500">{content}</p>;
};
