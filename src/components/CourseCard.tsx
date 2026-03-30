import { Link } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

interface CourseCardProps {
  course: Course;
  setSelectedCourse?: Dispatch<SetStateAction<Course | null>>;
  selecting?: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setOpenSelectModal?: Dispatch<SetStateAction<boolean>>;
}

const CourseCard = ({
  course,
  selecting,
  setSelectedCourse,
  setOpenModal,
  setOpenSelectModal,
}: CourseCardProps) => {
  function getDuration(time: string): string {
    const format = time.replace(".", "h ");
    return format.concat("m");
  }

  function getRating(rating: number) {
    const strRating = rating.toString();
    if (strRating.length === 1) return rating + ",0";

    const format = strRating.replace(".", ",");
    return format;
  }

  return (
    <li
      key={course.id}
      className="flex flex-col  min-h-fit text-[0.65rem] md:flex-row text-nowrap relative xlg:flex-row xlg:items-center gap-4 xlg:gap-4 p-4 xlg:p-2 bg-accent border border-gray-200 rounded-xl"
    >
      <div className="rounded-[0.43rem] img-container hidden xlg:flex  sm:mx-0 overflow-hidden xlg:w-10 aspect-square bg-white">
        <img
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
          src={course.img}
          alt={course.title}
          style={{ contentVisibility: "auto", backgroundColor: "#ffffff" }}
          className="h-full  w-full rounded-[0.43rem] object-cover"
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
            <img
              key={course.img}
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              src={course.img}
              alt={course.title}
              className="h-full  w-full  rounded-[0.43rem] object-cover "
            />
          </div>
        </div>
        <div className="flex flex-col xlg:flex-row gap-4  xlg:gap-4 ml:auto ml-0 xlg:ml-auto xlg:items-center">
          <div className="flex gap-4 xlg:ml-auto items-center">
            <p className="flex gap-1 items-center justify-center">
              <img src="/assets/img/clock.svg" className="h-3" alt="clock" />
              {getDuration(course.duration)}
            </p>
            <p className="flex gap-1 items-center justify-center">
              <img src="/assets/img/flame.svg" className="h-3" alt="clock" />
              {getRating(course.rating)}
            </p>
          </div>
          {selecting ? (
            <div>
              <button
                onClick={() => {
                  setSelectedCourse?.(course);
                  setOpenSelectModal?.(false);
                  setOpenModal?.(true);
                }}
                className="border border-gray-200 w-full font-medium text-center transition hover:bg-white bg-dark hover:text-dark text-white rounded-xl text-[0.7rem] p-3 px-6"
              >
                Select Course
              </button>
            </div>
          ) : (
            <Link
              to={"/app/courses/$courseTitle"}
              params={{
                courseTitle: course.title.replaceAll(" ", "-").toLowerCase(),
              }}
            >
              <button className="border border-gray-200 w-full font-medium text-center transition hover:bg-white bg-dark hover:text-dark text-white rounded-xl text-[0.7rem] p-3 px-6">
                View Course
              </button>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
};

export default CourseCard;
