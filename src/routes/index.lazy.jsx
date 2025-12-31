import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="text-center">
      <div className="absolute top-0 bottom-0 -z-100 mx-auto left-1/2 transform -translate-x-1/2 w-full h-full overflow-hidden max-w-screen">
        <img
          src="/assets/img/home-shapes-full.svg"
          className="hidden lg:block shapes-pos"
          alt="Shapes"
        />
        <img
          src="/assets/img/home-shapes-tablet.svg"
          className="hidden md:block lg:hidden w-full h-full object-cover"
          alt="Shapes"
        />
        <img
          src="/assets/img/home-shapes-mobile.svg"
          className="md:hidden w-full h-full object-cover"
          alt="Shapes"
        />
      </div>
      <div className="grid grid-rows-[min-content]">
        <header className="w-full px-4.5 sm:px-10 py-4.5">
          <nav className="flex justify-between sm:grid grid-cols-2 sm:grid-cols-3 ">
            <div className="">
              <button className="text-[14px] sm:text-base sm:hidden border bg-white border-grey font-medium px-4 sm:px-6 py-2 rounded-[6.25rem]">
                Login
              </button>
            </div>
            <div className="sm:mx-auto flex items-center sm:justify-center">
              <img src="/assets/img/brillo.svg" alt="brillo" className="h-6" />
            </div>
            <div className=" flex justify-end gap-2 ">
              <Link
                to="/auth/login"
                className="text-[14px] sm:text-base hidden sm:block border bg-white border-grey font-medium px-4 sm:px-6 py-2 rounded-[6.25rem]"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="text-[14px] sm:text-base text-white whitespace-nowrap bg-dark font-medium px-4 sm:px-6 py-2 rounded-[6.25rem]"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </header>
        <section className="h-full py-8 px-6 sm:py-24  sm:grid place-items-center">
          <div className="flex flex-col gap-9.5">
            <div className="grid place-items-center gap-5.5">
              <h1 className="text-[3rem] leading-12 tracking-[-0.075rem] sm:text-[4.5rem] font-bold max-w-[8ch] sm:max-w-[9ch] sm:leading-[72px]">
                Don’t let learning get in the way
              </h1>
              <p className="text-lightgrey text-base  sm:text-[1.25rem] max-w-[27ch] sm:max-w-[40ch] leading-7">
                Keep all your course notes and progress organized in one place.
                Brillo helps you stay consistent, so you never lose track of
                what you’ve learned — even when life gets
                <span className="italic"> busy</span>.
              </p>
            </div>
            <div>
              <Link
                to="/auth/signup"
                className=" block w-fit mx-auto font-semibold text-white text-base sm:text-xl bg-dark px-12 py-4 rounded-[6.25rem]"
              >
                Try Brillo free
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="flex items-center pt-8 justify-center">
        <div className="relative mx-auto max-w-[800px] w-auto">
          <img
            src="/assets/img/brillo-phones.png"
            className="w-full"
            alt="Jive phones"
          />
        </div>
      </section>
      <section on className="grid place-content-center px-6 py-24">
        <div className="flex flex-col items-center gap-11.5">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-[2.25rem] leading-10 tracking-[-0.9px] max-w-[7ch] md:max-w-full font-bold">
              Here’s how it works
            </h2>
            <p className="text-lightgrey text-xl ">
              Learn smarter, remember better.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 sm:px-25 gap-12">
            <article className="flex flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-1.svg"
                alt="feature-1"
                style={{ height: "48px", width: "48px" }}
              />
              <h3 className="text-2xl font-bold">Log what you learn</h3>
              <p className="leading-7 text-[1.125rem] text-lightgrey max-w-[28ch]">
                After every study session, quickly capture what you covered.
                Brillo keeps your notes organized and easy to find.
              </p>
            </article>
            <article className="flex flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-2.svg"
                alt="feature-2"
                style={{ height: "48px", width: "48px" }}
              />
              <h3 className="text-2xl font-bold">Build daily momentum</h3>
              <p className="leading-7 text-[1.125rem] text-lightgrey max-w-[28ch]">
                Brillo tracks your progress and encourages consistency with
                helpful reminders and streaks.
              </p>
            </article>
            <article className="flex flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-3.svg"
                alt="feature-3"
                style={{ height: "48px", width: "48px" }}
              />
              <h3 className="text-2xl font-bold">See your growth</h3>
              <p className="leading-7 text-[1.125rem] text-lightgrey max-w-[28ch]">
                Review your learning history anytime to stay motivated and
                focused on what’s next.
              </p>
            </article>
          </div>
          <Link
            to="/auth/signup"
            className="bg-dark text-white font-semibold px-12 py-4 rounded-[6.25rem]"
          >
            Start learning today
          </Link>
        </div>
      </section>
      <footer className="grid grid-rows-[min-content] p-10 pb-6">
        <div className="grid gap-5.5">
          <img src="/assets/img/brillo.svg" alt="" className="mx-auto" />
          <p className="text-lightgrey font-normal leading-7">
            Make learning simple again
          </p>
          <nav className="mx-auto">
            <ul className="mx-auto flex gap-5.5">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <p className="text-lightgrey mt-0.75 text-[0.875rem] ">
            <span>© 2025 </span>
            <a href="/" className="underline">
              Brillo
            </a>
            <span> by </span>
            <a href="https://github.com/Davemafy" className="underline">
              David Ventures
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
