import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_login')({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
        state: {
          redirect: location.pathname,
        },
      })
    }
  },

  component: Layout,
})

function Layout() {
  return <Outlet />
}
