import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseCard from "../../../../components/CourseCard";
import CourseForm from "../../../../components/CourseForm";
import { useMediaQuery } from "react-responsive";
import StatsBar from "../../../../components/StatsBar";
import CourseEmpty from "../../../../components/CourseEmpty";

export const Route = createLazyFileRoute("/app/_authenticated/courses/")({
  component: Courses,
});


function Courses() {
  const [courses] = useCourses();

  const { addCourse } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setOpenModal = (open) => {
    navigate({
      search: (prev) => ({ ...prev, addCourse: open ? true : undefined }),
    });
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const [filter, setFilter] = useState("all");

  const sortedCourses = [...courses].sort((current, next) => {
    if (filter === "newest") {
      return next.date - current.date;
    } else if (filter === "top rated") {
      return next.rating - current.rating;
    } else if (filter === "most popular") {
      return next.duration - current.duration;
    }
    return -1;
  });

  return (
    <>
      <title> Courses | Brillo </title>
      <section className="grid grid-dashboard w-full h-full overflow-auto gap-8 sm:px-2">
        <section
          id="target"
          className="h-full pb-5 overflow-auto no-scrollbar flex flex-col gap-6 rounded-xl px-5 xlg:py-0 xlg:pr-0 "
        >
          {addCourse && (
            <div className="pop-up">
              <CourseForm setOpenModal={setOpenModal} />
            </div>
          )}
          <section className="flex flex-col gap-4 pt-8  h-full xlg:overflow-auto">
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

                {courses.length > 0 && (
                  <div className="flex items-center gap-10 fixed sm:static bottom-4 z-2 sm:bottom-0 right-6 justify-between">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="bg-dark text-xs border  sm:border-0 h-full  flex justify-center items-center gap-1 font-medium p-4 sm:p-2 sm:w-22 text-white rounded-xl"
                    >
                      <span className="hidden sm:inline">Add</span>{" "}
                      <Plus size={18} stroke="white" />
                    </button>
                  </div>
                )}
              </div>
              <div className="overflow-y-auto ">
                {courses.length === 0 ? (
                  <CourseEmpty />
                ) : (
                  <ul className="grid lls:grid-cols-2  lg:grid-cols-3 xlg:grid-cols-1 gap-4 text-[0.65rem] overflow-y-auto scroll-m-6 pt-2 sm:pt-0 pr-1">
                    {sortedCourses.map((course, index) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        index={index}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        </section>
        <StatsBar />
      </section>
    </>
  );
}
