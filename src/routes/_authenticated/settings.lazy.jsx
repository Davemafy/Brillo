import { createLazyFileRoute } from "@tanstack/react-router";
import { useTheme } from "../../hooks/useTheme";

export const Route = createLazyFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  const [theme, setTheme] = useTheme();

  return (
    <>
      <title> Settings | Brillo </title>
      <div className="w-full h-full overflow-auto">
        <form action="" className="p-8.25 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="theme" className="font-bold">
              Appearance
            </label>
            <div className="dropdown w-fit">
              <select
                name="theme"
                id="theme"
                autoFocus
                value={theme.current}
                onChange={(e) => {
                  setTheme({ ...theme, current: e.target.value });
                }}
                className="border border-grey w-[28ch]  rounded-2xl p-4"
              >
                <option
                  value="light"
                  className={theme.themes[theme.current].style}
                >
                  Light
                </option>
                <option
                  value="dark"
                  className={theme.themes[theme.current].style}
                >
                  Dark
                </option>
                <option
                  value="system"
                  className={theme.themes[theme.current].style}
                >
                  System
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Language" className="font-bold">
              Language
            </label>
            <div className="dropdown w-fit">
              <select
                name="Language"
                id="Language"
                autoFocus
                className="border border-grey w-[28ch]  rounded-2xl p-4"
              >
                {" "}
                className={theme.themes[theme.current].style}
                <option
                  value="English"
                  className={theme.themes[theme.current].style}
                >
                  English
                </option>
                <option
                  value="French"
                  className={theme.themes[theme.current].style}
                >
                  French
                </option>
                <option
                  value="German"
                  className={theme.themes[theme.current].style}
                >
                  System
                </option>
              </select>
            </div>
          </div>
          <button className="w-fit bg-black text-white mt-4 p-6.25 py-3 hover:shadow-2xl rounded-2xl">
            Save
          </button>
        </form>
      </div>
    </>
  );
}
