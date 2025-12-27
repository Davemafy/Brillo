import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute("/signup")({
  component: Signup,
})

function Signup() {
  return (
    <>
      <title> Signup | Brillo </title>
    <div>
      Hello <Link to="/dashboard">Signup</Link> Already have an account{" "}
      <Link to="/login">Login</Link>
    </div>
    </>
  );
}
