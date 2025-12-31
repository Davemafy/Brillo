import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_signup')({
  component: Layout,
})

function Layout() {
  return <Outlet />
}
