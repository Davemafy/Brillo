import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../hooks/useCourses";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseCard from "../../../components/CourseCard";
import Form from "../../../components/Form";
import { useMediaQuery } from "react-responsive";

export const Route = createLazyFileRoute("/app/_authenticated/courses")({
  component: Courses,
});

function Courses() {
  const [courses] = useCourses();
  const [openModal, setOpenModal] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [filter, setFilter] = useState("all");
  const sortedCourses = [...courses].sort((current, next) => {
    console.log(current.rating)
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
      <section className=" h-full p-6 sm:p-8.25 overflow-auto">
        {openModal && (
          <div className="pop-up">
            <Form setOpenModal={setOpenModal} />
          </div>
        )}
        <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
          <div className="flex items-center gap-10 fixed sm:static bottom-4 z-2 sm:bottom-0  right-6 justify-between">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-dark big-shadow sm:shadow-none  flex justify-center items-center gap-1 font-medium  text-white text-sm p-3.5 w-fit aspect-square   rounded-xl"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 md:h-full md:overflow-auto">
            {isSmallScreen ? (
              <>
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
              </>
            ) : (
              <>
                <ul className="flex text-xs  w-full px-4 -ml-4 p-0 sm:py-2 overflow-auto no-scrollbar  gap-6 font-bold">
                  <li
                    className={`shrink-0 ${!(filter === "all") && "opacity-40"}`}
                  >
                    <button onClick={() => setFilter("all")}>
                      All Courses
                    </button>
                  </li>
                  <li
                    className={`shrink-0 ${!(filter === "newest") && "opacity-40"}`}
                  >
                    <button onClick={() => setFilter("newest")}>
                      The Newest
                    </button>
                  </li>
                  <li
                    className={`shrink-0 ${!(filter === "top rated") && "opacity-40"}`}
                  >
                    <button onClick={() => setFilter("top rated")}>
                      Top Rated
                    </button>
                  </li>
                  <li
                    className={`shrink-0 ${!(filter === "most popular") && "opacity-40"}`}
                  >
                    <button onClick={() => setFilter("most popular")}>
                      Most Popular
                    </button>
                  </li>
                </ul>
              </>
            )}
            <div className="overflow-y-auto ">
              <ul className="grid lls:grid-cols-2  lg:grid-cols-3 xlg:grid-cols-1 gap-4 text-[0.65rem] verflow-y-auto scroll-m-6 pt-2 sm:pt-0 pr-1">
                {sortedCourses.map((course, index) => <CourseCard course={course} index={index} /> )}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
