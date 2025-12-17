import { useState, useRef } from "react";
import { useTheme } from "../hooks/useTheme";

const Form = ({ record, courses, handleSubmit }) => {
  const [selectedCourse, setSelectedCourse] = useState("React Basics");

  const now = new Date();

  const [theme] = useTheme();
  const darkMode = theme.current === "dark";

  const formattedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const today = now.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const userLogged =
    !(record.length === 0) &&
    record[0].date === today &&
    record[0].notes.some((note) => note.course === selectedCourse);

  const [startTime, setStartTime] = useState(formattedTime);
  const [endTime, setEndTime] = useState(
    `${+formattedTime.split(":")[0] === 23 ? "23" : +formattedTime.split(":")[0] + 1}:${+formattedTime.split(":")[0] === 23 ? "59" : formattedTime.split(":")[1]}`.padStart(
      5,
      "0",
    ),
  );

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  function handleSelect(e) {
    setSelectedCourse(e.target.value);
  }

  function showStartTimePicker() {
    if (
      startTimeRef.current &&
      typeof startTimeRef.current.showPicker === "function"
    ) {
      startTimeRef.current.showPicker();
    }
  }

  function showEndTimePicker() {
    if (
      endTimeRef.current &&
      typeof endTimeRef.current.showPicker === "function"
    ) {
      endTimeRef.current.showPicker();
    }
  }

  function minutesSpent(startTime, endTime) {
    const start = startTime.replace(":", "");
    const end = endTime.replace(":", "");

    const diff = end - start;
    const timeDiff = String(
      Math.abs(diff) === diff ? diff : diff + 2400,
    ).padStart(4, 0);

    let format = `${timeDiff[0] === "0" ? timeDiff[1] : timeDiff.slice(0, 2)}hrs ${timeDiff.slice(-2, -1) === "0" ? timeDiff.slice(-1) : timeDiff.slice(-2)}min`;

    if (+timeDiff.slice(-2) > 59) {
      format = `${timeDiff[0] === "0" ? timeDiff[1] : timeDiff.slice(0, 2)}hrs ${timeDiff.slice(-2) - 40}min`;
    } else if (diff < 0) {
      format = "N/A";
    }

    return format;
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-5
       p-8.5 sm:text-[1.05rem]"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="course" className="flex gap-2 font-bold">
          Course
        </label>
        <div className="dropdown w-fit">
          <select
            name="course"
            id="course"
            autoFocus
            onChange={handleSelect}
            value={selectedCourse}
            className="border border-grey w-[28ch] rounded-2xl p-4"
          >
            {courses.map((course, index) => {
              return (
                <option
                  key={index}
                  value={course.title}
                  className={theme.themes[theme.current].style}
                >
                  {course.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex gap-4 select-none">
        <div className="flex flex-col gap-1">
          <label htmlFor="start-time" className="font-bold">
            Start time
          </label>
          <input
            type="time"
            name="start-time"
            ref={startTimeRef}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            onFocus={showStartTimePicker}
            required
            className={`border border-grey rounded-2xl p-2 py-2 ${theme.current == "dark" ? "darkmode" : ""}`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="start-time" className="font-bold">
            End time
          </label>
          <input
            type="time"
            name="end-time"
            ref={endTimeRef}
            value={endTime}
            min={startTime}
            max="23:59"
            onChange={(e) => setEndTime(e.target.value)}
            onFocus={showEndTimePicker}
            required
            className={`border rounded-2xl p-2 py-2 border-grey ${theme.current == "dark" ? "darkmode" : ""} invalid:border-red-500 invalid:outline-red-500`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1  w-fit">
        <label htmlFor="start-time" className="font-medium">
          Total time
        </label>
        <p
          className={`h-full border ${darkMode ? "" : "text-gray-700"}  border-grey rounded-2xl p-2 py-2 ${theme.current == "dark" ? "darkmode" : ""}`}
        >
          {minutesSpent(startTime, endTime)}
        </p>
      </div>

      <textarea
        name="description"
        placeholder="Description..."
        required
        className="p-6 border border-grey font-medium rounded-2xl"
      ></textarea>
      <button
        type="submit"
        disabled={userLogged}
        className={`p-4 px-8.25 ${darkMode ? "bg-[#fff1] text-inherit" : "bg-black text-white "} w-fit rounded-[0.625rem] font-bold text-base transition hover:shadow-2xl disabled:bg-[#0007] disabled:text-[#eee] disabled:shadow-none`}
      >
        Log Today
      </button>
    </form>
  );
};

export default Form;
