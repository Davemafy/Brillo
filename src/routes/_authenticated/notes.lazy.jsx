import { createLazyFileRoute } from "@tanstack/react-router";
import { FolderOpenDot } from "lucide-react";
import Note from "../../components/Note";
import { useRecord } from "../../hooks/useRecord";
import Sidebar from "../../components/Sidebar";

export const Route = createLazyFileRoute("/_authenticated/notes")({
  component: Notes,
});

function Notes() {
  const [record] = useRecord();

  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-8.25 border-b border-grey">
        <h2 className="text-[1.75rem] font-bold leading-6">Notes</h2>
      </div>

      {record.map((record, index) => (
        <section key={index} className="p-8.25 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{formatDate(record.date)}</h3>
            <FolderOpenDot />
          </div>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3  gap-4 flex-wrap">
            {record.notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const format = [
    "en-us",
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    },
  ];

  const todayDate = today.toLocaleDateString(...format);
  const yesterdayDate = yesterday.toLocaleDateString(...format);

  return date === todayDate
    ? "Today"
    : date === yesterdayDate
      ? "Yesterday"
      : date;
}
