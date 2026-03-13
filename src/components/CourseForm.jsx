import { useCourses } from "../hooks/useCourses";
import { supabase } from "../superbaseClient";
import {
  Bookmark,
  Hourglass,
  ImageDown,
  School,
  Star,
  Timer,
  X,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { generateCourseSubtitle } from "../utils/ai";

const CourseForm = ({ setOpenModal }) => {
  const [courses, setCourses] = useCourses();

  const previewRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [courseImg, setCourseImg] = useState(null);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setCourseImg(file);
      }
    };

    node.addEventListener("change", handleChange);

    return () => {
      node.removeEventListener("change", handleChange);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!courseImg) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fileName = `courses/${Date.now()}-${formData.get("course").replace(/\s+/g, "-")}`;

    // Use 'courseImg' from state instead of trying to find it in the DOM
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("app-assets")
      .upload(fileName, courseImg, {
        contentType: courseImg.type, // Ensures it's not 'octet-stream'
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      return;
    }

    // Get the permanent Public URL
    const { data: urlData } = supabase.storage
      .from("app-assets")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const generatedSubtitle =
      await generateCourseSubtitle(formData.get("course"));

    const newCourse = {
      id: uuidv4(),
      subtitle: generateCourseSubtitle || "",
      created: Date.now(),
      title: formData.get("course"),
      instructor: formData.get("instructor"),
      duration: `${formData.get("hrs")}.${formData.get("mins")}`,
      rating: formData.get("rating"),
      progress: 0,
      img: publicUrl,
    };

    setCourses([newCourse, ...courses]);
    setOpenModal(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="  relative ls:max-w-fit  md:min-w-125 grid gap-4 p-6 pt-
        bg-white text-sm  border border-gray-400 min-w-0 ls:h-auto max-h-full overflow-y-auto w-full font-sm  rounded-2xl"
    >
      <div className="absolute right-4   top-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            setCourseImg(null);
            setOpenModal(false);
          }}
          className="bg-[#eee] rounded-sm p-1"
        >
          <X size={25} strokeWidth={1.1} />
        </button>
      </div>
      <div>
        <h3 className="text-[1.2rem] font-medium">Taking a course</h3>
        <p className="text-gray-500">Let's help track your learning progress</p>
      </div>
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="course" className="flex items-center gap-1.5">
          <Bookmark size={16} />
          Course
        </label>
        <input
          type="text"
          id="course"
          name="course"
          placeholder="e.g., Intro to Design."
          min="4"
          className="ml-0 border text-sm  focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
          required
        />
      </div>
      <div className="flex flex-col gap-1  w-full">
        <label htmlFor="instructor" className="flex items-center gap-1.5">
          <School size={16} />
          Instructor
        </label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          placeholder="e.g., Jucy Lane"
          className="border text-sm focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
          required
        />
      </div>
      <div className="flex flex-col lg:flex-col justify-between gap-4">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="rating" className="flex items-center gap-1">
            <Star size={16} />
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="4.5"
            step="0.1"
            min="1"
            max="5"
            className="border focus:ring-0 text-sm border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
            required
          />
        </div>
        <div className="flex gap-1 ">
          <div className="flex gap-1 items-end">
            <div className="flex flex-col gap-1">
              <label htmlFor="hrs" className="flex items-center gap-1">
                <Hourglass size={16} />
                Hours
              </label>
              <input
                type="number"
                placeholder="2hrs"
                name="hrs"
                className="rounded-xl w-22 focus:ring-0 text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none"
              />
            </div>
            <p className="text-xl pb-2 font-semibold text-gray-500">:</p>
            <div className="flex flex-col gap-1">
              <label htmlFor="hrs" className="flex items-center gap-1">
                <Timer size={16} />
                Minutes
              </label>
              <input
                type="number"
                placeholder="4mins"
                name="mins"
                max="59"
                className="rounded-xl w-22 focus:ring-0 text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      {previewUrl && (
        <div className="relative w-fit h-18  rounded-xl aspect-square object-cover">
          <img
            src={previewUrl}
            alt=""
            className="h-full rounded-xl aspect-square object-cover"
          />
          <p
            onClick={() => setPreviewUrl(null)}
            className=" absolute top-0 -right-1 bg-white rounded-full p-0.5 ml-auto w-fit"
          >
            <X size={12} />
          </p>
        </div>
      )}

      <div
        className="flex flex-col gap-2  w-full overflow-hidden transition"
        style={{
          scale: previewUrl ? "0" : "1",
          height: previewUrl ? "0" : undefined,
        }}
      >
        <div className="hidden">
          <label htmlFor="course-image">Select an image:</label>
          <input
            ref={previewRef}
            type="file"
            id="course-image"
            name="course-image"
            accept="image/*"
          />
        </div>
        <div className="flex gap-4 text-sm">
          <div
            onClick={() => previewRef.current && previewRef.current.click()}
            className="w-full  p-3 hover:bg-blue-50 text-xs border-dashed text-gray-600 border text-center flex flex-col items-center border-gray-400 rounded-2xl"
          >
            <ImageDown className="mb-2" />
            <p>
              <a
                href=""
                onClick={(e) => e.preventDefault()}
                className="underline inline-block mr-1 focus:text-purple-500 text-blue-500"
              >
                Click to upload
              </a>
              or drag and drop
            </p>
            <p className="text-[0.6rem]">Max, File Size: 15MB</p>
          </div>
        </div>
      </div>
      <div className="">
        <button className="bg-dark shadow-sm   flex items-center justify-center gap-1  text-white text-sm p-2.5 px-7 ml-auto    w-fit flex-1   rounded-2xl">
          Add course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
