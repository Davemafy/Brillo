import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseCard from "../../../../components/CourseCard";
import Form from "../../../../components/Form";
import { useMediaQuery } from "react-responsive";

export const Route = createLazyFileRoute("/app/_authenticated/courses/")({
  component: Courses,
});

function Courses() {
  const [courses] = useCourses();
  const [openModal, setOpenModal] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [filter, setFilter] = useState("all");
  const sortedCourses = [...courses].sort((current, next) => {
    console.log(current.rating);
    if (filter === "newest") {
      return next.date - current.date;
    } else if (filter === "top rated") {
      return next.rating - current.rating;
    } else if (filter === "most popular") {
      return next.duration - current.duration;
    }
    return true;
  });

  return (
    <>
      <title> Courses | Brillo </title>
      <div className="grid grid-cols-3">
        <section className=" h-full col-span-2 p-6 sm:p-8.25 overflow-auto">
          {openModal && (
            <div className="pop-up">
              <Form setOpenModal={setOpenModal} />
            </div>
          )}
          <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
            <div className="flex flex-col gap-2 md:h-full md:overflow-auto">
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
                      All Courses
                    </option>
                    <option
                      value="newest"
                      className="text-xs rounded-2xl font-bold border-gray-200"
                    >
                      The Newest
                    </option>
                    <option
                      value="top rated"
                      className="text-xs rounded-2xl font-bold border-gray-200"
                    >
                      Top Rated
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
                    onClick={() => setOpenModal(true)}
                    className="bg-dark text-xs big-shadow sm:shadow-none h-full  flex justify-center items-center justify-between gap-1 font-medium p-2 w-22 text-white text-sm rounded-xl"
                  >
                    Add <Plus size={18} stroke="white" />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto ">
                <ul className="grid lls:grid-cols-2  lg:grid-cols-1 xlg:grid-cols- gap-4 text-[0.65rem] verflow-y-auto scroll-m-6 pt-2 sm:pt-0 pr-1">
                  {sortedCourses.map((course, index) => (
                    <CourseCard course={course} index={index} />
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </section>
        <section></section>
      </div>
    </>
  );
}
