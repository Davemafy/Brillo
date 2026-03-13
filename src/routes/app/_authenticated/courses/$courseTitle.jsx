// routes/users/$id.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import { useEffect, useRef, useState } from "react";
import NoteForm from "../../../../components/NoteForm";
import { GoogleGenAI } from "@google/genai";

import {
  ChevronLeft,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useNotes } from "../../../../hooks/useNotes";

//function fetchCourse(id) {}

export const Route = createFileRoute(
  "/app/_authenticated/courses/$courseTitle",
)({
  component: CourseComponent,
});

function CourseComponent() {
  // Accessing the 'id' parameter
  const { courseTitle } = Route.useParams();
  const [notes, setNotes] = useNotes();

  const [openModal, setOpenModal] = useState(false);

  const [courses, setCourses] = useCourses();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    console.log("Loading...")

    // 1. Initialize the new Unified Client
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    async function fetchAIContent() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Generate pageTitle and description for Learn Figma by Christopher Morgan.",
                },
              ],
            },
          ],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                pageTitle: { type: "string" },
                description: { type: "string" },
              },
              required: ["pageTitle", "description"],
            },
          },
        });

        console.log(response.value);
      } catch (error) {
        // If you still get a 429, it will show here
        console.error("AI Error:", error.message);
      }
    }

    fetchAIContent();
  }, []);

  const course = courses.find(
    (course) => course.title.toLowerCase().replaceAll(" ", "-") === courseTitle,
  );

  const courseNotes = notes.filter((note) => note.courseId === course.id);

  return (
    <section className="p-6 bg-accent">
      {openModal && (
        <div className="pop-up">
          <NoteForm
            course={course}
            setCourses={setCourses}
            setNotes={setNotes}
            setOpenModal={setOpenModal}
          />
        </div>
      )}
      <div>
        <Link to="../">
          <button className="flex bg-white border border-accent">
            {" "}
            <ChevronLeft size={25} /> Go back
          </button>
        </Link>
        <h2 className="font-bold text-2xl">Title</h2>
        <p>Sub title</p>
        <p>Rating</p>
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="border border-gray-200 font-medium text-center transition hover:bg-white bg-dark hover:text-dark text-white rounded-xl text-sm   p-3 px-6"
      >
        Add Note
      </button>
      <p>Progress:{course.progress} </p>
      <input type="search" name="search" id="search" />
      <div>
        <p>Total time spent: </p>
      </div>
      <div>
        Notes:{" "}
        {courseNotes.map((note, index) => {
          return <div key={index}>{note.title}</div>;
        })}
      </div>
      <div>Insights</div>
    </section>
  );
}
