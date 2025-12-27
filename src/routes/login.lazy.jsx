import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <>
      <title> Login | Brillo </title>
      <div>
        Hello <Link to="/dashboard">Login</Link>! New here ?{" "}
        <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
}