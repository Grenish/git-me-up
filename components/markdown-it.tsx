"use client";

import React from "react";
import MarkdownItLib from "markdown-it";

type Props = {
  children: string;
};

export default function MarkdownIt({ children }: Props) {
  const md = React.useMemo(() => {
    return new MarkdownItLib({
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
    });
  }, []);

  const html = React.useMemo(() => {
    return md.render(children);
  }, [children, md]);

  return (
    <div
      className="markdown-preview max-w-none p-6 rounded-xl border overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
