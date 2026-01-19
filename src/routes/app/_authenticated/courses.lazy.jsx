import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../hooks/useCourses";
import { Clock, Flame, Plus } from "lucide-react";
import { useState } from "react";
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

  function getDuration(time) { 
    const format = time.replace(".", "hrs ");
    return format.concat("mins");
  }

  function getRating(rating) {
    if (rating.length === 1) return rating + ",0";
    const format = rating.replace(".", ",");
    return format;
  }

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
                <div className="sticky -top-4 z-1">
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
              <ul className="grid ls:grid-cols-2  lg:grid-cols-3 xlg:grid-cols-1 gap-4 text-[0.65rem] verflow-y-auto scroll-m-6 pt-2 sm:pt-0 pr-1">
                {sortedCourses.map((course, index) => {
                  return (
                    <li
                      key={index}
                      className="flex flex-col  md:flex-row text-nowrap relative xlg:flex-row min-h-16 xlg:items-center gap-4 xlg:gap-4 p-4 xlg:p-2 bg-accent border border-gray-200 rounded-xl"
                    >
                      <div className="rounded-[0.43rem] hidden xlg:flex  sm:mx-0 overflow-hidden w-[calc(100%)] xlg:w-10 aspect-square bg-white">
                        <img
                          src={course.img || `https://picsum.photos/${index}00`}
                          alt={course.title}
                          className="h-full  w-full  rounded-[0.43rem] object-cover "
                        />
                      </div>
                      <div className="flex w-full items-stretch flex-col gap-4  justify-start xlg:items-center xlg:justify-between xlg:flex-row">
                        <div className="flex justify-between">
                          <div className="">
                            <h3 className="text-[0.8rem] font-bold truncate-text max-w-[15ch]">
                              {course.title}
                            </h3>
                            <p className="text-[0.65rem]">
                              by {course.instructor}
                            </p>
                          </div>
                          <div className="rounded-[0.43rem] absolute top-4 right-4 z-1 xlg:hidden flex  sm:mx-0 overflow-hidden h-16 aspect-square bg-white">
                            <img
                              src={
                                course.img || `https://picsum.photos/${index}00`
                              }
                              alt={course.title}
                              className="h-full  w-full  rounded-[0.43rem] object-cover "
                            />
                          </div>
                        </div>
                        <div className="flex flex-col xlg:flex-row gap-4  xlg:gap-4 ml:auto ml-0 xlg:ml-auto xlg:items-center">
                          <div className="flex gap-4 xlg:ml-auto items-center">
                            <p className="flex gap-1">
                              <Clock
                                className="bg-white rounded-full invert"
                                size={15}
                              />
                              {getDuration(course.duration)}
                            </p>
                            <p className="flex gap-1.5 items-center">
                              <Flame fill="black" size={15} />
                              {getRating(course.rating)}
                            </p>
                          </div>
                          <button className="border border-gray-200 font-medium transition-all bg-white hover:bg-dark hover:text-white rounded-xl text-[0.7rem] p-3 px-6">
                            View Course
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
