import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../hooks/useCourses";
import { useTheme } from "../../../hooks/useTheme";
import { ArrowRightSquare, AwardIcon, Clock, Flame, Plus } from "lucide-react";

export const Route = createLazyFileRoute("/app/_authenticated/courses")({
  component: Courses,
});

function Courses() {
  const [courses] = useCourses();
  const [theme] = useTheme();
  const darkMode = theme.current === "dark";

  return (
    <>
      <title> Courses | Brillo </title>
      <section className="p-8.25">
        <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
          <div className="flex items-center gap-10 justify-between">
            <h3 className="font-bold">Courses</h3>
            <button className="bg-black flex gap-1 text-white text-sm p-2 px-4 w-fit  rounded-2xl">
              <Plus size={20}/>
              Add course
            </button>
          </div>

          <div className="flex flex-col gap-2 md:h-full md:overflow-auto">
            <ul className="flex text-xs  w-full px-4 -ml-4 py-2 overflow-auto no-scrollbar  gap-6 font-bold">
              <li className="shrink-0">
                <button>All Courses</button>
              </li>
              <li className="shrink-0 opacity-40">
                <button>The Newest</button>
              </li>
              <li className="shrink-0 opacity-40">
                <button>Top Rated</button>
              </li>
              <li className="shrink-0 opacity-40">
                <button>Most Popular</button>
              </li>
            </ul>
            <div className="overflow-y-auto ">
              <ul className="grid ls:grid-cols-2  lg:grid-cols-3 xlg:grid-cols-1 gap-3 text-[0.65rem] verflow-y-auto scroll-m-6 pt-2 sm:pt-0 pr-1">
                {courses.map((course, index) => {
                  return (
                    <li
                      key={index}
                      className="max-h- flex flex-col md:flex-row text-nowrap relative xlg:flex-row min-h-16 items- lg:items-center xlg:items-center gap-4 xlg:gap-4 p-4 lg:p-2  bg-accent border border-gray-200 rounded-xl"
                    >
                      <div className="rounded-[0.43rem] hidden lg:flex  sm:mx-0 overflow-hidden w-[calc(100%)] lg:w-10 aspect-square bg-white">
                        <img
                          src={`https://picsum.photos/${index}00`}
                          alt={course.title}
                          className="h-full  w-full top-0 left-0 -z-1 rounded-[0.43rem] object-cover "
                        />
                      </div>
                      <div className="flex w-full items-stretch flex-col gap-4  justify-start xlg:items-center xlg:justify-between xlg:flex-row">
                        <div className="">
                          <h3 className="text-[0.8rem] font-bold truncate-text max-w-[15ch]">
                            {course.title}
                          </h3>
                          <p className="text-[0.65rem]">
                            by {course.instructor}
                          </p>
                        </div>
                        <div className="flex flex-col xlg:flex-row gap-4  xlg:gap-4 ml:auto ml-0 xlg:ml-auto xlg:items-center">
                          <div className="flex gap-4 xlg:ml-auto items-center">
                            <p className="flex gap-1">
                              <Clock
                                className="bg-white rounded-full invert"
                                size={15}
                              />
                              {course.duration}
                            </p>
                            <p className="flex gap-1.5 items-center">
                              <Flame fill="black" size={15} />
                              {course.rating}
                            </p>
                          </div>
                          <button className="border border-gray-200 font-medium transition-all bg-white hover:bg-black hover:text-white rounded-xl text-[0.7rem] p-3 px-6">
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
