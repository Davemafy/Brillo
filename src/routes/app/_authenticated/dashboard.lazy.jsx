import { createLazyFileRoute, Link } from "@tanstack/react-router";
import Note from "../../../components/Note";
import {
  ChevronRightCircleIcon,
  Clock,
  Flame,
  FolderOpenDot,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { useRecord } from "../../../hooks/useRecord";
import Form from "../../../components/Form";
import { useTheme } from "../../../hooks/useTheme";
import { useUser } from "../../../hooks/useUser";
import NavBar from "../../../components/NavBar";
import { useEffect, useRef, useState } from "react";
import { useCourses } from "../../../hooks/useCourses";

export const Route = createLazyFileRoute("/app/_authenticated/dashboard")({
  component: NewDash,
});

function NewDash() {
  const { user } = useUser();
  const [courses] = useCourses();
  const carouselRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [maxScrollable, setMaxScrollable] = useState(null);

  useEffect(() => {
    if (carouselRef.current) {
      const maxWidth =
        carouselRef.current.scrollWidth - carouselRef.current.scrollWidth / 5;
      setMaxScrollable(maxWidth);
    }

    console.log("maxScrollable: ", maxScrollable);
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
      console.log("scrollLeft: ", newTarget);
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
    <>
      <title> Dashboard | Brillo </title>
      <div className="grid grid-dashboard w-full h-full overflow-auto gap-8 p-5 px-0 ls:pl-0 xlg:p-0 pt-0 sm:py-0">
        <div className="h-full pb-5 overflow-auto no-scrollbar flex flex-col gap-6 rounded-xl px-5 sm:p-8 xlg:py-0 xlg:pr-0 ">
          <NavBar className="hidden md:flex xlg:hidden" />
          <div className="grid mt-8 sm:mt-0 xlg:mt-8 xs:grid-cols-2 bg-accent border border-gray-200 items-stretch  rounded-[inherit]">
            <div className="p-4 py-8 sm:p-8">
              <h2 className="font-extrabold min-w-[4ch] xxs:max-w-full text-xl">
                Hello {user.given_name}!
              </h2>
              <p className="text-[0.7rem] ">It's good to see you again.</p>
            </div>
            <div className="flex h-full items-center xxs:block p-2 relative max-h-30 xxs:max-h-full">
              <img
                className="mx-auto xs:absolute xs:right-[15%]  xs:opacity-100 sm:right-[40%] h-full object-contain object-bottom bottom-0 sm:h-[110%] "
                src="/assets/img/user.svg"
                alt="user.svg"
              />
            </div>
          </div>
          <div className="flex relative flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div
              ref={carouselRef}
              className="w-full h-full flex rounded-xl gap-4 overflow-x-scroll snap-x snap-mandatory"
            >
              {courses.map((course, index) => {
                return (
                  <div className=" min-w-full snap-center flex flex-col gap-2 pb-2 items-end  rounded-xl">
                    <div
                      key={index}
                      className=" min-w-full snap-center flex flex-col xxs:flex-row min-h-16 xxs:items-center gap-4 p-2 bg-accent border border-gray-200 rounded-xl"
                    >
                      <div className="shrink-0 rounded-[inherit] w-10 aspect-square bg-white">
                        <img src={course.img} className="rounded-xl" alt="" />
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
                        <button className="hidden ls:block bg-black text-white rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit">
                          Continue
                        </button>
                      </div>
                    </div>
                    {/* DUPLICATE BUTTON FOR MOBILE VIEW */}
                    <button className="ls:hidden bg-black text-white rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit">
                      Continue
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="absolute sm:static top-[calc(100%-3.5rem)] sm:top-0 z-10 sm:z-auto -ml-5 pl-5 pt-4 pb-3 w-[calc(50%+1.25rem)] sm:m-0 sm:w-fit sm:p-0 bg-[linear-gradient(to_right,white,#fff9,transparent)] rounded-tr-2xl rounded-br-2xl ls:static flex items-end sm:justify-end lg:justify-start sm:items-center gap-2">
              <button
                onClick={scrollToLeft}
                disabled={
                  console.log(scrollDistance, scrollDistance == 0) ||
                  scrollDistance <= 0
                }
                className="rounded-full p-1.5 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black hover:bg-black hover:text-white border"
              >
                <MoveLeft size={15} strokeWidth={2} />
              </button>
              <button
                onClick={scrollToRight}
                disabled={scrollDistance >= maxScrollable}
                className="rounded-full p-1.5 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black hover:bg-black hover:text-white border"
              >
                <MoveRight size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
          <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
            <h3 className="font-bold">Courses</h3>
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
        </div>
        <div className="hidden xlg:flex rounded-xl flex-col gap-4 pt-8 pb-7 h-full w-full overflow-auto xlg:pr-8">
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
              <button className="mt-2 bg-black text-[0.6rem] text-white rounded-md w-fit p-2 px-4">
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
        </div>
      </div>
    </>
  );
}

function Dashboard() {
  const [record] = useRecord();
  const [theme] = useTheme();

  const darkMode = theme.current === "dark";

  const recordEmpty = record.length === 0;

  const recentNotes = record
    .slice(0, 3)
    .reduce((acc, current) => {
      return acc.concat(current.notes);
    }, [])
    .slice(0, 3);

  return (
    <div className="w-full h-full overflow-auto">
      <Form />

      {!recordEmpty ? (
        <section className="p-8.25 flex flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-medium">Recent</h3> <FolderOpenDot />
            </div>
            {!recordEmpty && (
              <div className="flex justify-end sm:justify-end w-full items-center text-[#0007] hover:text-black">
                <Link to="/notes">
                  <p className=" flex gap-2 p-4 py-2 border-[#0007]  border rounded-2xl hover:bg-black hover:text-white w-fit">
                    View all
                    <ChevronRightCircleIcon fontWeight={300} />
                  </p>
                </Link>
              </div>
            )}
          </div>
          <ul
            className={`grid sm:grid-cols gap-4 flex-wrap sm:grid-cols-2 ${recentNotes.length === 3 ? "md:grid-cols-3" : ""}`}
          >
            {!recordEmpty ? (
              <>
                {recentNotes.map((note, index) => (
                  <Note key={index} note={note} className={""} />
                ))}
              </>
            ) : (
              <li>
                <p className={`${darkMode ? "text-darkgrey" : "text-[#0009]"}`}>
                  No recents found.
                </p>
              </li>
            )}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
