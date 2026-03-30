import { useFont } from "../hooks/useFont";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

interface SpanStyledProps {
  word: string;
  wordIndex: number;
}

function SpanStyled({ word, wordIndex }: SpanStyledProps) {
  const [textColor, setTextColor] = useState("");

  return (
    <span
      key={wordIndex}
      className="inline-block px-1.5 transition hover:outline hover:bg-white rounded-xl hover:z-1 hover:relative hover:backdrop-blur-[0.8em] hover:scale-[1.3]"
      style={{
        color: textColor,
        transitionDelay: `${wordIndex}9ms`,
      }}
      onMouseEnter={() => {
        setTextColor(
          `rgba(${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)},${Math.floor(Math.random() * 200)}, 1)`,
        );
      }}
      onMouseLeave={() => {
        setTextColor("");
      }}
    >
      {word}
    </span>
  );
}

function Index() {
  const headCopy = "Don’t let learning get in the way";
  const fontLoaded = useFont("Uncut Sans");

  return (
    <div className={`text-center`}>
      <div className="absolute inset-0 -z-100 mx-auto left-1/2 -translate-x-1/2 w-full h-full overflow-hidden max-w-screen">
        <picture>
          {/* Desktop: lg (1024px) and up */}
          <source
            media="(min-width: 1024px)"
            srcSet="/assets/img/home-shapes-full.svg"
          />

          {/* Tablet: md (768px) to lg (1023px) */}
          <source
            media="(min-width: 768px)"
            srcSet="/assets/img/home-shapes-tablet.svg"
          />

          {/* Mobile: default fallback */}
          <img
            src="/assets/img/home-shapes-mobile.svg"
            className="w-full h-full object-cover shapes-pos"
            alt="Background Shapes"
          />
        </picture>
      </div>
      <div className="grid grid-rows-[min-content]">
        <header className="w-full px-4.5 sm:px-10 py-4.5">
          <nav className="flex justify-between sm:grid grid-cols-2 sm:grid-cols-3 ">
            <div className="">
              <Link
                to="/app/login"
                className="text-[14px] sm:text-base sm:hidden border bg-white border-grey font-medium px-4 sm:px-6 py-2 rounded-[6.25rem]"
              >
                Login
              </Link>
            </div>
            <Link
              to="/"
              className="sm:mx-auto flex items-center sm:justify-center"
            >
              <img src="/assets/img/brillo.svg" alt="brillo" className="h-7" />
            </Link>
            <div className=" flex justify-end gap-2 ">
              <Link
                to="/app/login"
                className="text-[14px] sm:text-base hidden sm:block border bg-white border-grey font-medium px-4 sm:px-6 py-2 rounded-[6.25rem] hover:bg-golden"
              >
                Login
              </Link>
              <Link
                to="/app/signup"
                className="text-[14px] sm:text-base text-white whitespace-nowrap bg-dark font-medium px-4 sm:px-6 py-2 rounded-[6.25rem] hover:bg-turq"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </header>
        <section className="h-full py-8 px-6 sm:py-24  sm:grid place-items-center">
          <div className="flex flex-col gap-9.5">
            <div className="grid place-items-center gap-5.5">
              <h1
                className={`text-[3rem] leading-12 tracking-[-0.075rem] sm:text-[4.5rem] font-bold max-w-[8ch] sm:max-w-[9ch] ${fontLoaded ? "" : "max-w-[40ch] sm:max-w-[9ch]"} sm:leading-18`}
              >
                {headCopy.split(" ").map((word, wordIndex) => {
                  return (
                    <SpanStyled key={wordIndex} word={word} wordIndex={wordIndex} />
                  );
                })}
              </h1>
              <p
                className={`text-lightgrey text-base  sm:text-[1.25rem] max-w-[27ch] sm:max-w-[40ch] ${fontLoaded ? "" : "max-w-[48ch] sm:max-w-[48ch]"} leading-7`}
              >
                Keep all your course notes and progress organized in one place.
                Brillo helps you stay consistent, so you never lose track of
                what you’ve learned — even when life gets
                <span className="italic"> busy</span>.
              </p>
            </div>
            <div>
              <Link
                to="/app/signup"
                className=" block w-fit mx-auto font-semibold text-white text-base sm:text-xl bg-dark px-12 py-4 rounded-[6.25rem] transition hover:bg-teal"
              >
                Try Brillo free
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className="flex items-center pt-8 justify-center">
        <div className="relative mx-auto max-w-200 w-auto">
          <img
            src="/assets/img/brillo-phones.webp"
            loading="lazy"
            className="w-full"
            alt="Jive phones"
          />
        </div>
      </section>
      <section className="grid place-content-center px-6 py-24">
        <div className="flex flex-col items-center gap-11.5">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-[2.25rem] leading-10 tracking-[-0.9px] max-w-[7ch] md:max-w-full font-bold">
              Here’s how it works
            </h2>
            <p className="text-lightgrey text-xl ">
              Learn smarter, remember better.
            </p>
          </div>
          <div className="flex flex-col flex-wrap justify-center sm:px-25 gap-12 ls:flex-row">
            <article className="flex flex-1 sm:max-w-77.5 sm:min-w-62.5 flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-1.svg"
                loading="lazy"
                alt="feature-1"
                style={{ height: "48px", width: "48px" }}
              />
              <h3 className="text-2xl font-bold">Log what you learn</h3>
              <p className="leading-7 text-[1.125rem] text-lightgrey max-w-[28ch]">
                After every study session, quickly capture what you covered.
                Brillo keeps your notes organized and easy to find.
              </p>
            </article>
            <article className="flex flex-1 sm:max-w-77.5 sm:min-w-62.5 flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-2.svg"
                loading="lazy"
                alt="feature-2"
                style={{ height: "48px", width: "48px" }}
              />
              <h3 className="text-2xl font-bold">Build daily momentum</h3>
              <p className="leading-7 text-[1.125rem] text-lightgrey max-w-[28ch]">
                Brillo tracks your progress and encourages consistency with
                helpful reminders and streaks.
              </p>
            </article>
            <article className="flex flex-1 sm:max-w-77.5 sm:min-w-62.5 flex-col items-center gap-3.5">
              <img
                src="/assets/img/feature-3.svg"
                loading="lazy"
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
            to="/app/signup"
            className="bg-dark text-white font-semibold px-12 py-4 rounded-[6.25rem] hover:bg-rose"
          >
            Start Today
          </Link>
        </div>
      </section>
      <footer className="grid grid-rows-[min-content] p-10 pb-6">
        <div className="grid gap-5.5">
          <img
            src="/assets/img/brillo.svg"
            loading="lazy"
            alt=""
            className="mx-auto"
          />
          <p className="text-lightgrey font-normal leading-7">
            Make learning simple again
          </p>
          <nav className="mx-auto">
            <ul className="mx-auto flex gap-5.5">
              <li>
                <Link to="/" className="hover:text-golden">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-teal">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#8b7fff]">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-[#fe8363]">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-lightgrey mt-0.75 text-[0.875rem] ">
            <span>© 2025 </span>
            <a href="/" className="hover:text-[#7de2f2]">
              Brillo
            </a>
            <span> by </span>
            <a
              href="https://github.com/Davemafy"
              className="hover:text-rose"
            >
              David Ventures
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
