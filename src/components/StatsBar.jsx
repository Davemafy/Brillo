import { useCourses } from "../hooks/useCourses";
import NavBar from "./NavBar";

function StatsBar() {
  const [courses] = useCourses();

  const completedCount = courses.filter(
    (course) => course.progress === 100,
  ).length;
  const progressCount = courses.filter((course) => course.progress > 0).length;

  return (
    <section className="hidden xlg:flex flex-col gap-4 pt-8 pb-7 h-full w-full overflow-auto xlg:pr-8">
      <NavBar />
      <div className="flex gap-[inherit] text-xs">
        <div className="flex-1 flex items-center bg-accent border border-gray-200 p-[0.65625rem] pl-6 gap-2 rounded-xl">
          <h4 className="text-4xl font-black">{completedCount}</h4>
          <p>
            Courses <br /> completed
          </p>
        </div>
        <div className="flex-1 flex items-center bg-accent border border-gray-200 p-[0.65625rem] pl-6 gap-2 rounded-xl">
          <h4 className="text-4xl font-black">{progressCount}</h4>
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
        <figure className="relative text-[0.68rem] w-full flex flex-col h-full xlg:h-min overflow-auto ">
          <div className="absolute grid place-items-center inset-0 bottom-4 left-4">
            {courses.length === 0 ? (
              <p className="text-neutral-300  font-semibold -rotate-45">
                No Activity
              </p>
            ) : (
              <img
                className="mt-auto mb-3"
                src="/assets/img/today-graph.png"
                alt=""
              />
            )}
          </div>
          <div className="py-1.75 border-b border-neutral-200">5</div>
          <div className="py-1.75 border-b border-neutral-200">4</div>
          <div className="py-1.75 border-b border-neutral-200">3</div>
          <div className="py-1.75 border-b border-neutral-200">2</div>
          <div className="py-1.75 border-b border-neutral-200">1</div>
          <div className="py-1.75 border-b border-neutral-200">0</div>
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
      {courses.length > 0 && (
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
      )}
    </section>
  );
}

export default StatsBar;
