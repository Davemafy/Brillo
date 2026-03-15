import { createLazyFileRoute, Link } from "@tanstack/react-router";
import CourseCard from "../../../components/CourseCard";
import { useUser } from "../../../hooks/useUser";
import NavBar from "../../../components/NavBar";
import { useMemo, useState } from "react";
import { useCourses } from "../../../hooks/useCourses";
import StatsBar from "../../../components/StatsBar";
import CoursesCarousel from "../../../components/CoursesCarousel";
import CourseEmpty from "../../../components/CourseEmpty";

export const Route = createLazyFileRoute("/app/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useUser();
  const [courses] = useCourses();
  const [filter, setFilter] = useState("all");

  const username = user.user_metadata.full_name.split(" ")[0]
  
  const sortedCourses = [...courses].sort((current, next) => {
    if (filter === "newest") {
      return next.date - current.date;
    } else if (filter === "top rated") {
      return next.rating - current.rating;
    } else if (filter === "most popular") {
      return next.duration - current.duration;
    }
    return true;
  });

  function getGreeting(name) {
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
      greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    return `${greeting} ${name.split(" ")[0]}!`;
  }

  const subGreeting = useMemo(() => {
    const subGreetings = [
      "It's good to see you again.",
      "Ready to get some work done?",
      "We've missed you!",
      "Let's make today count.",
    ];
    return subGreetings[Math.floor(Math.random() * subGreetings.length)];
  }, []);

  return (
    <>
      <title> Dashboard | Brillo </title>
      <div className="grid grid-dashboard  bg-linear-to-br from-lime-200/15 to-white  w-full h-full overflow-auto gap-8 p-5 px-0 ls:pl-0 xlg:p-0 pt-0 sm:py-0">
        <div className="h-full pb-5 overflow-auto no-scrollbar flex flex-col gap-6 rounded-xl px-5 sm:p-8 xlg:py-0 xlg:pr-0 ">
          <NavBar className="hidden md:flex xlg:hidden" />
          <div className="grid  mt-8 sm:mt-0 xlg:mt-8 xs:grid-cols-2 bg-accent border border-gray-200 items-stretch  rounded-[inherit]">
            <div className="p-4 py-8 sm:p-8">
              <h2 className="font-extrabold min-w-[4ch] xxs:max-w-full sm:text-xl">
                Hello {username}
              </h2>
              <p className="text-[0.7rem] sm:text-sm ">{subGreeting}</p>
            </div>
            <div className="flex h-full items-center xxs:block p-2 relative max-h-30 xxs:max-h-full">
              <img
                className="mx-auto xs:absolute xs:right-[15%]  xs:opacity-100 sm:right-[40%] h-full object-contain object-bottom bottom-0 sm:h-[110%] "
                src="/assets/img/user.svg"
                fetchPriority="high"
                alt="user.svg"
              />
            </div>
          </div>
          {courses.length > 0 && <CoursesCarousel courses={courses} />}
          <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
            <h3 className="font-bold">Courses</h3>
            <div className="flex flex-col gap-2 md:h-full md:overflow-auto">
              <ul className="flex text-xs  w-full px-4 -ml-4 p-0 sm:py-2 overflow-auto no-scrollbar  gap-6 font-bold">
                <li
                  className={`shrink-0 ${!(filter === "all") && "opacity-40"}`}
                >
                  <button onClick={() => setFilter("all")}>All Courses</button>
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
        </div>
        <StatsBar />
      </div>
    </>
  );
}

