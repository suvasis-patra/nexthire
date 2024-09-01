"use client";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Undo,
  Redo,
  Underline,
  Quote,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  // if (!editor || editor?.isEmpty) return null;

  return (
    <div className="flex flex-wrap px-4 py-3 justify-between w-full rounded-t-md gap-4 bg-white">
      <div className="flex flex-wrap w-8/12 justify-between items-center">
        <button
          className={
            editor?.isActive("bold") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleBold().run();
          }}
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("heading", { level: 1 })
              ? "bg-gray-200 rounded-md p-1"
              : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
          }}
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("heading", { level: 2 })
              ? "bg-gray-200 rounded-md p-1"
              : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
        >
          <Heading2 className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("italic") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleItalic().run();
          }}
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("bulletList") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleBulletList().run();
          }}
        >
          <List className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("orderedList") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleOrderedList().run();
          }}
        >
          <ListOrdered className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("blockQuote") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleBlockquote().run();
          }}
        >
          <Quote className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("underline") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().toggleUnderline().run();
          }}
        >
          <Underline className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("undo") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().undo().run();
          }}
        >
          <Undo className="h-5 w-5" />
        </button>
        <button
          className={
            editor?.isActive("redo") ? "bg-gray-200 rounded-md p-1" : ""
          }
          onClick={(e) => {
            e.preventDefault();
            editor?.chain().focus().redo().run();
          }}
        >
          <Redo className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
