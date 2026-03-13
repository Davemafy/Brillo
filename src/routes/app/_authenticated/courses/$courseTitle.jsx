import { createFileRoute, Link } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import { useState, useMemo } from "react";
import NoteForm from "../../../../components/NoteForm";
import { ChevronLeft, Plus, Clock, BarChart3, Star } from "lucide-react";
import { useNotes } from "../../../../hooks/useNotes";
import NoteCard from "../../../../components/NoteCard";

export const Route = createFileRoute(
  "/app/_authenticated/courses/$courseTitle",
)({
  component: CourseComponent,
});

function CourseComponent() {
  const { courseTitle } = Route.useParams();
  const [notes, setNotes] = useNotes();
  const [openModal, setOpenModal] = useState(false);
  const [courses, setCourses] = useCourses();

  // Memoize course lookup for performance
  const course = useMemo(() => 
    courses.find((c) => c.title.toLowerCase().replaceAll(" ", "-") === courseTitle),
    [courses, courseTitle]
  );

  // Memoize filtered notes
  const courseNotes = useMemo(() => 
    notes.filter((note) => note.courseId === course?.id),
    [notes, course?.id]
  );

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 font-medium">Course not found.</p>
        <Link to="/app/_authenticated/courses" className="text-blue-600 underline">Return to Dashboard</Link>
      </div>
    );
  }

  // Helper for star ratings to handle potential undefined/null
  const renderStars = (rating) => {
    const r = Math.min(Math.max(Number(rating) || 0, 0), 5);
    return (
      <div className="flex gap-0.5 text-yellow-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill={i < r ? "currentColor" : "none"} strokeWidth={2} />
        ))}
      </div>
    );
  };

  return (
    <section className="p-4 md:p-8 bg-[#F9FAFB] min-h-screen">
      {/* Modal Overlay */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <NoteForm
              course={course}
              setCourses={setCourses}
              setNotes={setNotes}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-6xl mx-auto">
        <Link to="../" className="inline-block group">
          <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            <span className="font-medium">Back to Courses</span>
          </button>
        </Link>

        {/* Header Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
                {course.title}
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                {course.subtitle || "AI-generated curriculum overview."}
              </p>
              <div className="pt-2 flex items-center gap-3">
                {renderStars(course.rating)}
                <span className="text-sm font-semibold text-gray-400">
                  {course.rating ? `${course.rating}/5` : "Unrated"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 transition-all font-semibold rounded-xl px-8 py-3.5 shadow-lg shadow-black/10 active:scale-95"
            >
              <Plus size={20} />
              Add New Note
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stats Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 size={18} className="text-blue-500" />
                Course Insights
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 font-medium">Course Progress</span>
                    <span className="text-blue-600 font-bold">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <Clock size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time Invested</p>
                    <p className="text-gray-900 font-semibold">0 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Column */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Personal Notes</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-bold">
                  {courseNotes.length} Total
                </span>
              </div>

              {courseNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Plus size={32} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium italic">
                    Capture your first thought for this course.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}