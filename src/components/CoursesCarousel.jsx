import { Link } from "@tanstack/react-router";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CoursesCarousel({ courses }) {
  const carouselRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [maxScrollable, setMaxScrollable] = useState(null);

  useEffect(() => {
    if (carouselRef.current) {
      const maxWidth =
        carouselRef.current.scrollWidth - carouselRef.current.scrollWidth / 5;
      setMaxScrollable(maxWidth);
    }
  }, [maxScrollable]);

  function scrollToLeft() {
    const container = carouselRef.current;
    if (container) {
      const scrollStep = container.scrollWidth / courses.length;

      const newTarget = container.scrollLeft - scrollStep;

      container.scrollTo({
        left: newTarget,
        behavior: "smooth",
      });

      setScrollDistance(newTarget);
    }
  }

  function scrollToRight() {
    const container = carouselRef.current;
    if (container) {
      const scrollStep = container.scrollWidth / courses.length;

      const newTarget = container.scrollLeft + scrollStep;

      container.scrollTo({
        left: newTarget,
        behavior: "smooth",
      });

      setScrollDistance(newTarget);
      console.log("scrollLeft: ", newTarget);
    }
  }

  return (
    <div className="flex relative flex-col sm:flex-row sm:items-center justify-between gap-4">
      <ul
        ref={carouselRef}
        className="w-full h-full flex rounded-xl gap-4 overflow-x-scroll snap-x snap-mandatory"
      >
        {courses.map((course, index) => {
          return (
            <li
              key={course.id}
              className="min-w-full snap-center flex flex-col gap-2 pb-2 items-end  rounded-xl"
            >
              <div className="min-w-full snap-center flex flex-col xxs:flex-row min-h-16 xxs:items-center gap-4 p-2 bg-accent border border-gray-200 rounded-xl">
                <div className="shrink-0 rounded-[inherit] w-10 aspect-square bg-white">
                  <img
                    onError={(e) => (e.target.style.visibility = "hidden")}
                    src={course.img}
                    decoding="async"
                    className="h-full w-full object-cover rounded-xl"
                    alt=""
                  />
                </div>
                <div className="flex flex-col xxs:flex-row gap-2 justify-between">
                  <div>
                    <h3 className="text-[0.7rem] whitespace-nowrap sm:text-[0.8rem]  font-bold">
                      {course.title}
                    </h3>
                    <p className="text-[0.6rem] whitespace-nowrap sm:text-[0.65rem]">
                      by {course.instructor}
                    </p>
                  </div>
                  <p className="xxs:hidden grid place-items-center text-[0.65rem]  border-[2.5px] rounded-full  w-9 h-9 aspect-square">
                    {course.progress}%
                  </p>
                </div>
                <div className="flex gap-4 xxs:ml-auto">
                  <div className="hidden xxs:flex justify-center xxs:px-2">
                    <p className="grid place-items-center text-[0.65rem] border-[2.5px] rounded-full w-10 aspect-square">
                      {course.progress}%
                    </p>
                  </div>
                  <Link
                    to={"/app/courses/$courseTitle"}
                    params={{
                      courseTitle: course.title
                        .replaceAll(" ", "-")
                        .toLowerCase(),
                    }}
                    className="hidden ls:block bg-dark text-white transition hover:bg-white hover:text-dark rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit"
                  >
                    <button>Continue</button>
                  </Link>
                </div>
              </div>
              {/* DUPLICATE BUTTON FOR MOBILE VIEW */}
              <Link
                to={"/app/courses/$courseTitle"}
                params={{
                  courseTitle: course.title.replaceAll(" ", "-").toLowerCase(),
                }}
                className="ls:hidden bg-dark text-white rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit"
              >
                Continue
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="absolute sm:static top-[calc(100%-3.5rem)] sm:top-0 z-10 sm:z-auto -ml-5 pl-5 pt-4 pb-3 w-[calc(50%+1.25rem)] sm:m-0 sm:w-fit sm:p-0 rounded-tr-2xl rounded-br-2xl ls:static flex items-end sm:justify-end lg:justify-start sm:items-center gap-2">
        <button
          onClick={scrollToLeft}
          disabled={scrollDistance <= 0}
          className="rounded-full p-1.5 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black hover:bg-dark hover:text-white border"
        >
          <MoveLeft size={15} strokeWidth={2} />
        </button>
        <button
          onClick={scrollToRight}
          disabled={scrollDistance >= maxScrollable}
          className="rounded-full p-1.5 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black hover:bg-dark hover:text-white border"
        >
          <MoveRight size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default CoursesCarousel;
