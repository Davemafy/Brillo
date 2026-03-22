import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Plus, X } from "lucide-react";
import NoteCard from "../../../components/NoteCard";
import { useNotes } from "../../../hooks/useNotes";
import { useCourses } from "../../../hooks/useCourses";
import NoteForm from "../../../components/NoteForm";
import { useState } from "react";
import CourseCard from "../../../components/CourseCard";
import { formatDate } from "../../../utils/formatDate";
import { isoToDate } from "../../../utils/isoToDate";

export const Route = createLazyFileRoute("/app/_authenticated/notes")({
  component: Notes,
});

function Notes() {
  const [notes, setNotes] = useNotes();
  const [courses, setCourses] = useCourses();

 const [openModal, setOpenModal] = useState(false);
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [filter, setFilter] = useState("all");

  const sortedNotes = [...notes].sort((current, next) => {
    if (filter === "newest") {
      return next.created_at - current.created_at;
    } else if (filter === "longest") {
      return next.description.length > current.description.length;
    } else if (filter === "most popular") {
      return next.duration - current.duration;
    }
    
    return true;
  });

  const dates = notes.reduce((all, note) => {
    if (!all.includes(note.created_at)) {
      all.push(note.created_at);
    }
    return all;
  }, []);

  const mappedByDate = dates.map((date) => {
    return {
      date: isoToDate(date),
      notes: sortedNotes.filter((note) => note.created_at === date),
    };
  });

  return (
    <>
      <title> Notes | Brillo </title>

      <div className="relative w-full bg-linear-to-bl from-indigo-300/20 to-white h-full p-5 sm:p-8 sm:px-6 md:px-8 overflow-auto">
        {openSelectModal && (
          <SelectCoursePopUp
            courses={courses}
            setOpenSelectModal={setOpenSelectModal}
            setOpenModal={setOpenModal}
            setSelectedCourse={setSelectedCourse}
          />
        )}
        {openModal && (
          <div className="pop-up">
            <NoteForm
              course={selectedCourse}
              setCourses={setCourses}
              setNotes={setNotes}
              setOpenModal={setOpenModal}
              setOpenSelectModal={setOpenSelectModal}
            />
          </div>
        )}
        <div className="flex mb-4 justify-between">
          <div className="sticky top-0 z-1 sm:static sm:top-auto sm:z-0">
            <select
              name="filter"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs rounded-2xl py-3 px-4 w-31 font-bold border-gray-200 focus:ring-0 focus:invert"
            >
              <option
                value="all"
                className="text-xs rounded-2xl font-bold border-gray-200"
              >
                All Notes
              </option>
              <option
                value="newest"
                className="text-xs rounded-2xl font-bold border-gray-200"
              >
                The Newest
              </option>
              <option
                value="longest"
                className="text-xs rounded-2xl font-bold border-gray-200"
              >
                The Longest
              </option>
              <option
                value="most popular"
                className="text-xs rounded-2xl font-bold border-gray-200"
              >
                Most Popular
              </option>
            </select>
          </div>

          <div className="flex items-center gap-10 fixed sm:static bottom-4 z-2 sm:bottom-0 right-6 justify-between">
            <button
              onClick={() => setOpenSelectModal(true)}
              className="bg-dark text-xs big-shadow sm:shadow-none! h-full  flex justify-center items-center gap-1 font-medium p-4 sm:p-2 sm:w-22 text-white rounded-xl"
            >
              <span className="hidden sm:inline">Add</span>{" "}
              <Plus size={18} stroke="white" />
            </button>
          </div>
        </div>
        {notes.length == 0 && (
          <div>
            <figure className="p-8.25 flex flex-col items-center justify-center">
              <img
                src="/assets/img/file-search.svg"
                decoding="async"
                className="h-40 grayscale"
                alt=""
              />
              <p className="p-8.25 border-0 text-center border-grey opacity-65">
                No notes yet.
              </p>
            </figure>
          </div>
        )}
        {mappedByDate.map((item, index) => {
          return (
            <section key={index} className="mt-8 grid gap-3">
              <div>
                <h2 className="font-bold ">{formatDate(item.date)}</h2>
              </div>
              <ul className="flex flex-wrap gap-4">
                {item.notes.map((note) => {
                  note.created_at = isoToDate(note.created_at);
                  return (
                    <NoteCard
                      key={note.id}
                      className={"max-w-[370px]"}
                      note={note}
                      notes={notes}
                      setNotes={setNotes}
                    />
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

function SelectCoursePopUp({
  courses,
  setOpenModal,
  setOpenSelectModal,
  setSelectedCourse,
}) {
  return (
    <div className="fixed inset-0  p-4 pt-6 sm:p-8 bg-[#3335] backdrop-blur-[0.2rem] grid place-items-center overflow-auto w-full z-30">
      <div className="relative h-full w-full md:w-[55%] sm:border rounded-2xl border-gray-200 bg-white flex flex-col gap-3 overflow-auto  p-6 sm:p-6">
        <div>
          <h3 className="font-semibold">Select a course</h3>
          <div className="absolute right-4 sm:right-6 top-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenSelectModal(false);
              }}
              className="bg-[#eee] rounded-sm p-1"
            >
              <X size={25} strokeWidth={1.1} />
            </button>
          </div>
        </div>{" "}
        <ul className="flex-1 flex flex-col pt-3 pb-6 pr-2 gap-4 text-[0.65rem] overflow-y-auto">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              selecting={true}
              setOpenModal={setOpenModal}
              setOpenSelectModal={setOpenSelectModal}
              setSelectedCourse={setSelectedCourse}
            />
          ))}
        </ul>
        <div>
          <p className="mt-auto text-xs text-center">
            Didn't find your course?{" "}
            <Link
              className="font-medium text-dark"
              to={"../courses"}
              search={{ addCourse: true }}
            >
              Add it here
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
