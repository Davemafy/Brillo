import { useEffect, useRef, useState } from "react";
import { supabase } from "../superbaseClient";
import {
  AlignLeft,
  Hourglass,
  ImageDown,
  Notebook,
  Timer,
  X,
} from "lucide-react";
import { Squircle } from "ldrs/react";

export default function NoteForm({
  course,
  setNotes,
  setOpenModal,
  setOpenSelectModal,
}) {
  const previewRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [noteImg, setNoteImg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const handleChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        setNoteImg(file);
      }
    };

    node.addEventListener("change", handleChange);

    return () => {
      node.removeEventListener("change", handleChange);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!noteImg) {
      alert("Please select an image first!");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fileName = `notes/${Date.now()}-${formData.get("title").replace(/\s+/g, "-")}`;

    // Use 'noteImg' from state instead of trying to find it in the DOM
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("app-assets")
      .upload(fileName, noteImg, {
        contentType: noteImg.type, // Ensures it's not 'octet-stream'
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("app-assets")
      .getPublicUrl(fileName);

    const { data: newNote, error } = await supabase
      .from("notes")
      .insert([
        {
          course_id: course.id,
          course_title: course.title,
          title: formData.get("title"),
          description: formData.get("description"),
          duration: `${formData.get("hrs")}.${formData.get("mins")}`,
          img: urlData.publicUrl,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    if (newNote) {
      console.log("newNote: ", newNote);
    }

    setNotes((notes) => [...newNote, ...notes]);
    setOpenModal(false);
    setOpenSelectModal(false);

    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="  relative ls:max-w-md  md:min-w-125 grid gap-4 p-6 pt-
          bg-white text-sm  border border-gray-400 min-w-0 ls:h-auto max-h-full overflow-y-auto w-full font-sm  rounded-2xl"
      >
        {loading && (
          <div className="absolute z-10 w-full bg-linear-to-r from-neutral-400/30 to-white/30  backdrop-blur-[0.2rem]  h-full grid place-content-center">
            <Squircle
              size="37"
              stroke="5"
              strokeLength="0.15"
              bgOpacity="0.1"
              speed="0.9"
              color="black"
            />
          </div>
        )}

        <div>
          <h3 className="text-[1.2rem] font-medium">Track your progress</h3>
          <p className="text-gray-500">
            Every minute spent learning counts. Let's record it.
          </p>
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label htmlFor="title" className="flex items-center gap-1.5">
            <div>
              <Notebook size={16} />
            </div>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            autoFocus
            placeholder="e.g., Figma Basics"
            min="4"
            className="ml-0 border text-sm  focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
            required
          />
        </div>
        <div className="flex flex-col gap-1  w-full">
          <label htmlFor="description" className="flex items-center gap-1.5">
            <AlignLeft size={16} />
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="What did you learn?"
            rows={5}
            className="border text-sm focus:ring-0 border-gray-400 bg-inherit focus:border-dark focus-within:outline-none rounded-xl"
            required
          ></textarea>
        </div>
        <div className="flex flex-col lg:flex-col justify-between gap-4">
          <div className="flex gap-1 ">
            <div className="flex gap-1 items-end">
              <div className="flex flex-col gap-1">
                <label htmlFor="hrs" className="flex items-center gap-1">
                  <Hourglass size={13} />
                  Hours
                </label>
                <input
                  type="number"
                  required
                  placeholder="00"
                  name="hrs"
                  className="rounded-xl w-22 focus:ring-0 text-sm border-b border-gray-400 bg-inherit focus:border-dark focus-within:outline-none"
                />
              </div>
              <p className="text-xl pb-2 font-semibold text-gray-500">:</p>
              <div className="flex flex-col gap-1">
                <label htmlFor="hrs" className="flex items-center gap-1">
                  <Timer size={13} />
                  Minutes
                </label>
                <input
                  type="number"
                  required
                  placeholder="00"
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
              onClick={(e) => {
                e.preventDefault();
                setPreviewUrl(null);
                setNoteImg(null);
              }}
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
            <label htmlFor="picture">Select an image:</label>
            <input
              ref={previewRef}
              type="file"
              id="picture"
              name="picture"
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
        <div className="flex gap-2 justify-end">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(false);
              setOpenSelectModal(false);
            }}
            className="border transition opacity-80 hover:opacity-100 text-red-500  w-fit    flex items-center justify-center gap-1 text-sm p-2.5 px-7   rounded-2xl"
          >
            Cancel
          </button>
          <button disabled={loading} className="btn">
            {loading ? "Adding Note..." : "Add Note"}
          </button>
        </div>
      </form>
    </>
  );
}
