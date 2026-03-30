import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

function CourseEmpty() {
  return (
    <div className="text-center pt-10 md:pt-16 h-full flex flex-col items-center justify-center gap-4">
      <img
        src="/assets/img/empty.svg"
        alt=""
        className="w-full"
        style={{
          height: "150px",
          maxWidth: "400px",
        }}
      />
      <p className="font-semibold text-xs">
        Your journey hasn't started... yet.
      </p>
      <Link className="" to={"/app/courses"} search={{ addCourse: true }}>
        <button className="bg-dark text-x h-full  flex justify-center items-center gap-1 font-medium p-2 w-fit text-white text-sm rounded-xl">
          Add a course <Plus size={18} stroke="white" />
        </button>
      </Link>
    </div>
  );
}

export default CourseEmpty;
