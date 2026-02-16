import { Link } from "@tanstack/react-router";
import { Clock, Flame } from "lucide-react";

const CourseCard = ({ course, index }) => {
  function getDuration(time) {
    const format = time.replace(".", "h ");
    return format.concat("m");
  }

  function getRating(rating) {
    if (rating.length === 1) return rating + ",0";
    const format = rating.replace(".", ",");
    return format;
  }
  return (
    <li
      key={index}
      className="flex flex-col text-[0.65rem]  md:flex-row text-nowrap relative xlg:flex-row min-h-16 xlg:items-center gap-4 xlg:gap-4 p-4 xlg:p-2 bg-accent border border-gray-200 rounded-xl"
    >
      <div className="rounded-[0.43rem] hidden xlg:flex  sm:mx-0 overflow-hidden xlg:w-10 aspect-square bg-white">
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
            <p className="text-[0.65rem]">by {course.instructor}</p>
          </div>
          <div className="rounded-[0.43rem] bg-white hidden xs:flex absolute top-4 right-4 z-1 xlg:hidden  sm:mx-0 overflow-hidden h-16 lls:h-13 llg:h-16 aspect-square">
            <img onError={(e) => e.target.src = "/favicon.png"}
              src={course.img || `https://picsum.photos/${index}00`}
              alt={course.title}
              className="h-full  w-full  rounded-[0.43rem] object-cover "
            />
          </div>
        </div>
        <div className="flex flex-col xlg:flex-row gap-4  xlg:gap-4 ml:auto ml-0 xlg:ml-auto xlg:items-center">
          <div className="flex gap-4 xlg:ml-auto items-center">
            <p className="flex gap-0.5">
              <Clock className="bg-white rounded-full invert" size={15} />
              {getDuration(course.duration)}
            </p>
            <p className="flex gap-0.5 items-center">
              <Flame fill="black" size={15} />
              {getRating(course.rating)}
            </p>
          </div>
          <Link
            to={"/app/courses/$courseTitle"}
            params={{
              courseTitle: course.title.replaceAll(" ", "-").toLowerCase(),
            }}
            className="border border-gray-200 font-medium transition-all bg-white text-center hover:bg-dark hover:text-white rounded-xl text-[0.7rem] p-3 px-6"
          >
            View Course
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
