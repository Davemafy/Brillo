import { useCourses } from "../hooks/useCourses";
import { CircleX } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

const Form = ({ setOpenModal }) => {
  const [courses, setCourses] = useCourses();

  const previewRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("#");

  useEffect(() => {
    if (!previewRef.current) return;

    previewRef.current.addEventListener("change", function () {
      const file = this.files[0]; // Get the first selected file
      if (file) {
        const reader = new FileReader(); // Create a FileReader object

        // Set the onload event handler
        reader.onload = function (e) {
          setPreviewUrl(e.target.result);
        };

        // Read the file as a Data URL
        reader.readAsDataURL(file);
      } else {
        // Hide the image if no file is selected or the selection is canceled
        setPreviewUrl("#");
      }
    });

    return previewRef.current.removeEventListener("change", () => {});
  });

  function handleSubmit(formData) {
    const newNote = {
      id: uuidv4(),
      created: Date.now(),
      title: formData.get("course"),
      instructor: formData.get("instructor"),
      duration: `${formData.get("hrs")}.${formData.get("mins")}`,
      rating: formData.get("rating"),
      progress: 0,
      img: previewUrl,
    };

    setCourses([newNote, ...courses]);
    setOpenModal(false);
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-[300px] ls:max-w-sm flex flex-col justify-center-center gap-4
       p-6  bg-white border text-sm  border-gray-400 min-w-0 ls:h-auto w-[90%] ls:w-full font-sm  rounded-2xl"
    >
      <div className="absolute right-4 top-4">
        <button onClick={() => setOpenModal(false)}>
          <CircleX stroke="white" size={30} />
        </button>
      </div>
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="course">Course</label>
        <input
          type="text"
          id="course"
          name="course"
          placeholder="Course"
          min="4"
          className=" border border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
          required
        />
      </div>
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="instructor">Instructor</label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          placeholder="Instructor"
          className=" border border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
          required
        />
      </div>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="">Duration</label>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1">
              <input
                type="number"
                placeholder="Hrs"
                name="hrs"
                className="rounded-xl text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="number"
                placeholder="Min"
                name="mins"
                max="59"
                className="rounded-xl text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-fit">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="4.5"
            step="0.1"
            min="1"
            max="5"
            className=" border text-sm border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2  w-full">
        <label htmlFor="picture">Select an image:</label>
        <input
          ref={previewRef}
          type="file"
          id="picture"
          name="picture"
          accept="image/*"
        />
        <img src={previewUrl} alt="" className="w-10" />
      </div>
      <div className="flex gap-2 flex-row justify-between">
        <button className="bg-dark shadow-sm  flex items-center justify-center gap-1  text-white text-sm p-2.5 px-7 flex-1   rounded-2xl">
          Add course
        </button>
      </div>
    </form>
  );
};

export default Form;
