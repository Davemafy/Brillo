import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../hooks/useCourses";
import { useTheme } from "../../hooks/useTheme";
import { ArrowRightSquare, AwardIcon } from "lucide-react";

export const Route = createLazyFileRoute("/_authenticated/courses")({
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
        <button className="bg-black text-white text-sm p-2 -y-4 rounded-2xl mb-4">
          Add course
        </button>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6.25 ">
          {courses.map((course, index) => {
            return (
              <article
                key={index}
                className={`flex flex-col h-min justify-between gap-4 border border-[#5554] hover:border-black shadow-amber-100 hover:opacity-100 transition-shadow p-4 rounded-2xl`}
              >
                <header className="flex justify-between">
                  <h2 className="truncate max-w-[10ch] sm:max-w-min">
                    {course.title}
                  </h2>
                  <AwardIcon strokeWidth={"1"} />
                </header>
                <div className="flex items-end gap-4">
                  <p className="text-[0.83rem] flex-1">
                    {course.progress}% completed
                  </p>
                  <div
                    className={`h-4 overflow-hidden flex-2 ${darkMode ? "bg-[#4446]" : "border border-[#0004] progress-light"} w-full rounded-2xl `}
                  >
                    <div
                      className={`h-full ${darkMode ? "bg-grey" : "bg-[#282828]"}  rounded-2xl `}
                      style={{
                        transform: `translateX(-${10 - course.progress}%)`,
                      }}
                    ></div>
                  </div>
                </div>
                <footer className="flex flex-col gap-[inherit] items-start">
                  <div className="flex flex-col sm:flex-row justify-between items-stretch lg:flex-row w-full gap-3">
                    <button className="text-[0.699rem]  border-black cursor-pointer  border rounded-xl p-2 px-4">
                      View Course
                    </button>
                    <Link to="/dashboard" className="">
                      <button className="text-[0.699rem] w-full h-full bg-[#282828]  text-white rounded-xl p-2 px-4">
                        Check In
                      </button>
                    </Link>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
