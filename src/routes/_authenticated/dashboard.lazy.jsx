import { createLazyFileRoute, Link } from "@tanstack/react-router";
import Note from "../../components/Note";
import {
  ChevronRightCircleIcon,
  Clock,
  Flame,
  FolderOpenDot,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { useRecord } from "../../hooks/useRecord";
import Form from "../../components/Form";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";

export const Route = createLazyFileRoute("/_authenticated/dashboard")({
  component: NewDash,
});

function NavBar({ pictureUrl, className }) {
  return (
    <nav
      className={`sticky top-0 z-10 backdrop-blur-sm bg-white pb-5 flex justify-between items-stretch gap-2 ${className}`}
    >
      <div className="flex-[0.5] sm:flex-2 flex rounded-xl px-2 items-center bg-accent">
        <button className="py-2 shrink-0 flex place-items-center">
          <img
            src="/assets/img/search.svg"
            alt="search"
            style={{ height: "20.5px" }}
          />
        </button>
        <input
          type="text"
          className=" w-0 p-0 ls:px-4 ls:w-full h-full border-0 bg-inherit focus::border-0 focus:outline-0 text-sm"
        />
      </div>
      <div className="ls:flex-1 shrink-0 flex items-center justify-end gap-4">
        <button className="relative shrink-0">
          <img
            src="/assets/img/bell.svg"
            alt="bell"
            className="block h-5 xs:h-6"
          />
          <div className="absolute -top-[25%] right-0 flex justify-center items-center rounded-full w-2.5 h-2.5  aspect-square bg-red-400 text-[0.5rem] text-white">
            1
          </div>
        </button>
        <div className="shrink-0 flex items-center gap-2">
          <button className="w-9 aspect-square bg-black rounded-lg overflow-hidden">
            <img src={pictureUrl} alt="profile" />
          </button>
          <button>
            <img src="/assets/img/arrow-down.svg" alt="arrow down" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NewDash() {
  const [user] = useUser();
  console.log(user)

  const mockCourses = [
    {
      title: "Learn Figma",
      instructor: "Christopher Morgan",
      duration: "6h 30min",
      rating: "4,9",
      img: "https://picsum.photos/200",
    },
    {
      title: "Analog photography",
      instructor: "Gordon Norman",
      duration: "3h 15min",
      rating: "4,7",
      img: "https://picsum.photos/200",
    },
    {
      title: "Master Instagram",
      instructor: "Sophie Gill",
      duration: "7h 40min",
      rating: "4,6",
      img: "https://picsum.photos/200",
    },
    {
      title: "Basics of drawing",
      instructor: "Jean Tate",
      duration: "11h 30min",
      rating: "4,8",
      img: "https://picsum.photos/200",
    },
    {
      title: "Photoshop - Essence",
      instructor: "David Green",
      duration: "5h 35min",
      rating: "4,7",
      img: "https://picsum.photos/200",
    },
  ];

  return (
    <>
      <title> Dashboard | Brillo </title>
      <div className="grid grid-dashboard  w-full h-full overflow-auto gap-8 p-5 px-8 ls:pl-4 sm:p-8 pt-0 sm:py-0">
        <div className="h-full pb-5 overflow-auto no-scrollbar flex flex-col gap-6 rounded-xl">
          <NavBar className="xlg:hidden pt-6" pictureUrl={user.picture}/>
          <div className="grid xlg:mt-8 xs:grid-cols-2 bg-accent items-stretch  rounded-[inherit]">
            <div className="p-4 py-8 sm:p-8">
              <h2 className="font-extrabold max-w-[4ch] xxs:max-w-full text-xl">
                Hello {user.given_name}!
              </h2>
              <p className="text-[0.7rem] ">It's good to see you again.</p>
            </div>
            <div className="flex justify- h-full items-center xxs:block p-2 relative max-h-30 xxs:max-h-full">
              <img
                className="mx-auto xs:absolute xs:right-[15%]  xs:opacity-100 sm:right-[40%] h-full object-contain object-bottom bottom-0 sm:h-[110%] "
                src="/assets/img/user.svg"
                alt="user.svg"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 flex flex-col xxs:flex-row min-h-16 xxs:items-center gap-4 p-2 bg-accent rounded-xl">
              <div className="shrink-0 rounded-[inherit] w-10 aspect-square bg-white">
                <img
                  src="https://picsum.photos/200"
                  className="rounded-xl"
                  alt=""
                />
              </div>
              <div className="flex flex-col xxs:flex-row gap-2 justify-between">
                <div>
                  <h3 className="text-[0.7rem] whitespace-nowrap sm:text-[0.8rem]  font-bold">
                    Spanish B2
                  </h3>
                  <p className="text-[0.6rem] whitespace-nowrap sm:text-[0.65rem]">
                    by Alejandro Velazquez
                  </p>
                </div>
                <p className="xxs:hidden grid place-items-center text-[0.65rem]  border-[2.5px] rounded-full  w-9 h-9 aspect-square">
                  99%
                </p>
              </div>
              <div className="flex gap-4 xxs:ml-auto">
                <div className="hidden xxs:flex justify-center xxs:px-2">
                  <p className="grid place-items-center text-[0.65rem] border-[2.5px] rounded-full w-10 aspect-square">
                    99%
                  </p>
                </div>
                <button className="hidden sm:block bg-black text-white rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit">
                  Continue
                </button>
              </div>
            </div>
            <div className="flex rounded-xl sm:justify-end lg:justify-start items-center gap-2">
              <button className="sm:hidden bg-black text-white rounded-xl text-[0.7rem] p-3 px-6 w-full xxs:w-fit">
                Continue
              </button>
              <button className="rounded-full p-1.5 border">
                <MoveLeft size={15} strokeWidth={2} />
              </button>
              <button className="rounded-full p-1.5 border">
                <MoveRight size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
          <section className="flex flex-col gap-4 h-full xlg:overflow-auto">
            <h3 className="font-bold">Courses</h3>
            <div className="flex flex-col gap-2 md:h-full md:overflow-auto">
              <ul className="flex text-xs  w-full px-4 -ml-4 py-2 overflow-auto no-scrollbar  gap-6 font-bold">
                <li className="shrink-0 ">
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
              <ul className="grid ls:grid-cols-2 md:grid-cols-3 xlg:grid-cols-1 gap-3 text-[0.65rem] xlg:overflow-auto no-scrollbar">
                {mockCourses.map((course, index) => {
                  return (
                    <li className="h-max flex isolate backdrop-blur-3xl flex-col relative xlg:flex-row min-h-16 items-start xlg:items-center gap-2 xlg:gap-4 p-4 lg:p-2  bg-accent rounded-xl">
                      <div className="rounded-xl overflow-hidden w-10 aspect-square bg-white">
                        <img
                          src={`https://picsum.photos/${index}00`}
                          alt={course.title}
                          className="h-full  w-full top-0 left-0 -z-1 rounded-xl object-cover "
                        />
                      </div>
                      <div className="flex w-full items-stretch flex-col gap-2  justify-start xlg:justify-between xlg:flex-row">
                        <div className="">
                          <h3 className="text-[0.8rem] font-bold">
                            {course.title}
                          </h3>
                          <p className="text-[0.65rem]">
                            by {course.instructor}
                          </p>
                        </div>
                        <div className="flex flex-col xlg:flex-row gap-2  xlg:gap-4 ml:auto ml-0 xlg:ml-auto items-center  xlg:items-center">
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
                          <button className="bg-black text-white rounded-xl text-[0.7rem] p-3 px-6">
                            View Course
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
        <div className="hidden xlg:flex rounded-xl flex-col gap-4 pt-8 pb-7 h-full w-full overflow-auto">
          <NavBar pictureUrl={user.picture} />
          <div className="flex gap-[inherit] text-xs">
            <div className="flex-1 flex items-center bg-accent p-[0.65625rem] pl-6 gap-2 rounded-xl">
              <h4 className="text-4xl font-black">11</h4>
              <p>
                Courses <br /> completed
              </p>
            </div>
            <div className="flex-1 flex items-center bg-accent p-[0.65625rem] pl-6 gap-2 rounded-xl">
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
          <article className="flex text-[0.7rem] p-3 pt-5 rounded-xl mt-auto bg-accent">
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
