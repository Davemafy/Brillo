import { createFileRoute, Outlet } from "@tanstack/react-router";

interface CourseSearch {
  addCourse?: boolean;
}

export const Route = createFileRoute("/app/_authenticated/courses")({
  validateSearch: (search: Record<string, unknown>): CourseSearch => {
    return {
      addCourse:
        search.addCourse === "true" || search.addCourse === true || undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
