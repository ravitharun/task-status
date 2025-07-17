import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

function NotesEditor() {
  const editor = useEditor({
    extensions: [StarterKit, Link, TaskList, TaskItem],
    content: `<h2>📝 Project Notes</h2><p><strong>Start writing...</strong></p>`,
  });

  const addTask = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  const addBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 space-x-2">
        <button onClick={addBold} className="px-3 py-1 bg-blue-500 text-white rounded">Bold</button>
        <button onClick={addLink} className="px-3 py-1 bg-green-500 text-white rounded">Add Link</button>
        <button onClick={addTask} className="px-3 py-1 bg-purple-500 text-white rounded">Task List</button>
      </div>
      <div className="border border-gray-300 rounded p-3 min-h-[300px] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default NotesEditor;
