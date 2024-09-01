"use client";

import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";

import Toolbar from "@/components/toolbar";

interface TiptapProps {
  onChange: (richText: string) => void;
}

const Tiptap = ({ onChange }: TiptapProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex bg-white text-black border-black rounded-md min-h-[200px] p-4 md:p-6",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div className="w-full flex flex-col gap-1 min-h-[250px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="text-base" />
    </div>
  );
};

export default Tiptap;
