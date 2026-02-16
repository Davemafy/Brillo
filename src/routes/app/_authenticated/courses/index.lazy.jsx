import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import { Plus } from "lucide-react";
import { useState } from "react";
import CourseCard from "../../../../components/CourseCard";
import Form from "../../../../components/Form";
import { useMediaQuery } from "react-responsive";
import NavBar from "../../../../components/NavBar";

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
      <section className="grid grid-dashboard w-full h-full overflow-auto gap-8 p-5 px-0 ls:pl-0 xlg:p-0 pt-0 sm:py-0">
        <section className="h-full pb-5 overflow-auto no-scrollbar flex flex-col gap-6 rounded-xl px-5 sm:p-8 xlg:py-0 xlg:pr-0 ">
          {openModal && (
            <div className="pop-up">
              <Form setOpenModal={setOpenModal} />
            </div>
          )}
          <section className="flex flex-col gap-4 pt-8 h-full xlg:overflow-auto">
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
        <section className="hidden xlg:flex rounded-xl flex-col gap-4 pt-8 pb-7 h-full w-full overflow-auto xlg:pr-8">
            <NavBar />
            <div className="flex gap-[inherit] text-xs">
              <div className="flex-1 flex items-center bg-accent border border-gray-200 p-[0.65625rem] pl-6 gap-2 rounded-xl">
                <h4 className="text-4xl font-black">11</h4>
                <p>
                  Courses <br /> completed
                </p>
              </div>
              <div className="flex-1 flex items-center bg-accent border border-gray-200 p-[0.65625rem] pl-6 gap-2 rounded-xl">
                <h4 className="text-4xl font-black">4</h4>
                <p>
                  Courses <br /> in progress
                </p>
              </div>
            </div>
            <section className="flex flex-col gap-4 mt-2 h-full overflow-auto no-scrollbar">
              <h4 className="font-bold pt-4 rounded-xl">Your statistics</h4>
              <div>
                <ul className="flex text-xs gap-6 font-bold">
                  <li>
                    <button>Learning Hours</button>
                  </li>
                  <li className={`opacity-45`}>
                    <button> My Courses</button>
                  </li>
                </ul>
              </div>
              <figure className="text-[0.68rem] w-full flex flex-col h-full overflow-auto ">
                <div className="py-1.75">5</div>
                <div className="py-1.75">4</div>
                <div className="py-1.75">3</div>
                <div className="py-1.75">2</div>
                <div className="py-1.75">1</div>
                <div className="py-1.75">0</div>
                <ul className="flex pl-5 gap-5">
                  <li>mon</li>
                  <li>tue</li>
                  <li>wed</li>
                  <li>thu</li>
                  <li>fri</li>
                  <li>sat</li>
                  <li>sun</li>
                </ul>
              </figure>
            </section>
            <article className="flex text-[0.7rem] p-3 pt-5 rounded-xl mt-auto bg-accent border border-gray-200">
              <div className="flex flex-col gap-1">
                <h4 className="text-[0.9rem] font-bold">Learn even more!</h4>
                <p>
                  Unlock premium features <br /> only for $9.99 per month.
                </p>
                <button className="mt-2 bg-dark text-[0.6rem] text-white rounded-md w-fit p-2 px-4">
                  Go Premium
                </button>
              </div>
              <div className="mx-auto">
                <img
                  src="/assets/img/book.png"
                  alt="book.png"
                  className={"w-26 h-auto"}
                />
              </div>
            </article>
        </section>
      </section>
    </>
  );
}
