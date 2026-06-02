import { EarIcon, Pencil, Save, Trash, X, XCircle } from "lucide-react";
import { supabase } from "../superbaseClient";
import { useState, type Dispatch, type SetStateAction } from "react";
import type React from "react";

interface NoteCardProps {
  note: Note;
  className?: string;
  notes?: Note[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
}

const NoteCard = ({ note, className, notes, setNotes }: NoteCardProps) => {
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useState(note.title);
  const [descValue, setDescValue] = useState(note.description);

  const deleteNote = async (noteId: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", noteId);

    if (error) {
      console.error("Error deleting note:", error.message);
      alert("Could not delete note!");
    } else {
      setNotes?.((notes) => notes.filter((item) => item.id !== note.id));
      console.log("Note deleted!");
    }
  };

  const saveEdit = async function () {
    console.log("Saving...");

    const { data, error } = await supabase
      .from("notes")
      .update({ title: titleValue, description: descValue })
      .eq("id", note.id)
      .select();

    console.log(data);

    if (error) {
      console.log("Failed to save!");
    }
    if (data) {
      setNotes?.((notes) => [...notes, ...data]);
      console.log("Succesfully Saved!");
    }

    setEditing(false);
  };

  function cancelEdit() {
    setEditing(false);
    setTitleValue(note.title);
    setDescValue(note.description);
  }

  return (
    <li
      className={`note-card 90${editing ? " border-black bg-linear-120 from-[#f9f9f9] to-[#FFF9E6] " : "border-grey bg-[#f9f9f9] "}  flex relative cursor-pointer outline w-full flex-col p-6 px-6 gap-2 border outline-accent rounded-2xl ${className || ""}`}
    >
      <div className="flex mb-2 justify-between items-center ">
        <p className="text-[0.5rem] p-2 px-3 font-semibold bg-neutral-200 rounded-2xl">
          {note.course_title.toUpperCase()}
        </p>
        <div className="flex gap-2">
          {!editing ? (
            <div className="action-btns flex gap-[inherit]">
              <button
                style={
                  {
                    "--tooltip-text": '"Edit"',
                  } as React.CSSProperties
                } 
                onClick={() => setEditing(true)}
                className="tooltip border-gray-200 ml-auto"
              >
                <Pencil size={15} className="hover:text-orange-500" />
              </button>
              <button
                style={{ "--tooltip-text": '"Delete"' } as React.CSSProperties}
                className=" tooltip hover:text-red-500 "
                onClick={(e) => {
                  deleteNote(note.id);
                }}
              >
                <Trash size={15} />
              </button>
            </div>
          ) : (
            <>
              <button
                style={
                  {
                    "--tooltip-text": '"Cancel"',
                  } as React.CSSProperties
                }
                onClick={() => cancelEdit()}
                className="tooltip border-gray-200 ml-auto"
              >
                <X size={15} className="hover:text-red-500" />
              </button>
              <button
                style={
                  {
                    "--tooltip-text": '"Save"',
                  } as React.CSSProperties
                }
                onClick={() => saveEdit()}
                className="tooltip border-gray-200 ml-auto"
              >
                <Save size={15} className="hover:text-green-600" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex h-full mb-2 justify-between">
        <div className="h-full">
          <h4 className="font-bold text-base">
            {editing ? (
              <input
                value={titleValue}
                autoFocus
                className="border-0 p-0 bg-transparent ring-0"
                onChange={(e) => setTitleValue(e.currentTarget.value)}
              />
            ) : (
              note.title
            )}
          </h4>
          <p className="flex-1 text-sm mt-2 max-w-[60ch] text-neutral-800 truncate-multiline leading-6 ">
            {editing ? (
              <input
                value={descValue}
                className="border-0 p-0 text-sm bg-transparent ring-0"
                onChange={(e) => setDescValue(e.currentTarget.value)}
              />
            ) : (
              note.description
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 mt-auto ">
        <p className="text-xs opacity-80  flex gap-0.5">
          <span>{note.duration.replace(".", "h ") + "m"}</span>
        </p>
        <div className="img-container w-10 h-10 rounded-2xl overflow-clip">
          <img
            src={note.img}
            loading="eager"
            onLoad={(e) => e.currentTarget.classList.add("loaded")}
            alt=""
            className="w-full bject-cover "
          />
        </div>
      </div>
    </li>
  );
};

export default NoteCard;
