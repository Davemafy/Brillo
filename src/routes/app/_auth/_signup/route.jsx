import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_auth/_signup')({
  component: Layout,
})

function Layout() {
  return <Outlet />
}
