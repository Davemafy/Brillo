import { Pencil, Trash } from "lucide-react";

const NoteCard = ({ note, className, notes, setNotes }) => {
  return (
    <li
      className={`flex relative cursor-pointer outline w-full bg-[#f9f9f9] flex-col p-6 px-6 gap-2 border outline-accent border-grey rounded-2xl ${className || ""}`}
    >
      <div className="flex mb-2 justify-between items-center ">
        <p className="text-[0.5rem] p-2 px-3 font-semibold bg-neutral-200 rounded-2xl">
          {note.course_title.toUpperCase()}
        </p>
        <div className="flex gap-2">
          <button
            style={{ "--tooltip-text": '"Edit"' }}
            className="tooltip border-gray-200 ml-auto"
          >
            <Pencil size={15} />
          </button>
          <button
            className=""
            onClick={(e) => {
              setNotes(notes.filter((item) => item.id !== note.id));
            }}
          >
            <Trash size={15} />
          </button>
        </div>
      </div>
      <div className="flex h-full mb-2 justify-between">
        <div className="h-full">
          <h4 className="font-bold text-base">{note.title}</h4>
          <p className="flex-1 text-sm mt-2 max-w-[60ch] text-neutral-800 truncate-multiline leading-6 ">
            {note.description}
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
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
          alt=""
          className="w-full bject-cover "
        />
       </div>
      </div>
    </li>
  );
};

export default NoteCard;
