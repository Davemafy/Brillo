import { createLazyFileRoute } from "@tanstack/react-router";
import Note from "../../components/Note";
import { FolderOpenDot } from "lucide-react";
import { useRecord } from "../../hooks/useRecord";
import { useState } from "react";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [record, setRecord] = useRecord();
  const [selectedCourse, setSelectedCourse] = useState("React Basics");

  const today = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const recordEmpty = record.length === 0;

  const userLogged = !recordEmpty && record[0].date === today;

  const recentNotes = record.slice(0, 3).reduce((acc, current) => {
    return acc.concat(current.notes);
  }, []);

  function handleSubmit(formData) {
    const newNote = {
      id: crypto.randomUUID(),
      date: today,
      course: formData.get("course"),
      description: formData.get("description"),
    };

    setRecord([{ date: today, notes: [newNote] }, ...record]);
  }

  function handleSelect(e) {
    setSelectedCourse(e.target.value);
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="p-8.25 border-b border-grey">
        <h2 className="text-[1.75rem] font-bold leading-6">Dashboard</h2>
      </div>
      <form
        action={handleSubmit}
        className="flex flex-col gap-5
       p-8.5 "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="course">Courses</label>
          <div className="dropdown w-fit">
            <select
              name="course"
              id="course"
              autoFocus
              onChange={handleSelect}
              value={selectedCourse}
              className="border border-grey w-[28ch]  rounded-2xl p-4"
            >
              <option value="React Basics">React Basics</option>
              <option value="Javascript Deep Dive">Javascript Deep Dive</option>
              <option value="CSS Mastery">CSS Mastery</option>
              <option value="Frontend Project Workshop">
                Frontend Project Workshop
              </option>
              <option value="TypeScript Fundamentals">
                TypeScript Fundamentals
              </option>
              <option value="Node.js Basics">Node.js Basics</option>
              <option value="Data Structures & Algorithms">
                Data Structures & Algorithms
              </option>
            </select>
          </div>
        </div>
        <textarea
          name="description"
          placeholder="Description..."
          className="p-6 border border-grey font-medium rounded-2xl"
        ></textarea>
        <button
          type="submit"
          disabled={userLogged}
          className="p-4 px-8.25 bg-black text-white w-fit rounded-[0.625rem] font-bold text-base transition hover:shadow-2xl disabled:bg-[#0007] disabled:text-[#eee] disabled:shadow-none"
        >
          Log Today
        </button>
      </form>

      <section className="p-8.25 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">Recent</h3> <FolderOpenDot />
        </div>
        <ul className="grid sm:grid-cols md:grid-cols-3  gap-4 flex-wrap">
          {!recordEmpty ? (
            recentNotes.map((note, index) => <Note key={index} note={note} />)
          ) : (
            <p className="text-[#0009]">No recents found.</p>
          )}
        </ul>
      </section>
    </div>
  );
}
