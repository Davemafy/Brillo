// routes/users/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useCourses } from "../../../../hooks/useCourses";
import CourseCard from "../../../../components/CourseCard";

//function fetchCourse(id) {}

export const Route = createFileRoute(
  "/app/_authenticated/courses/$courseTitle",
)({
  component: CourseComponent,
});

function CourseComponent() {
  // Accessing the 'id' parameter
  const { courseTitle } = Route.useParams();

  const [courses] = useCourses();

  const course = courses.find(
    (course) => course.title.toLowerCase().replaceAll(" ", "-") === courseTitle,
  );

  return (
    <section className="p-6">
      <CourseCard course={course} index={courses.indexOf(course)}></CourseCard>
    </section>
  );
}
