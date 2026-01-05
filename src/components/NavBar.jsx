import { useUser } from "../hooks/useUser";

function formatName(name) {
  if (!name) return;
  const firstLetter = name[0];
  const nameArr = name.split(" ");
  if (nameArr.length > 1) {
    return (firstLetter + nameArr[1][0]).toUpperCase();
  }
  return (firstLetter + name[name.length - 1]).toUpperCase();
}

function NavBar({ className }) {
  return (
    <nav
      className={`sticky top-0 z-10  bg-white flex justify-between items-center gap-2 ${className}`}
    >
      <SearchBar className={`flex-[0.5] sm:flex-2`} />
      <UserBar />
    </nav>
  );
}

export function SearchBar({ className}) {
  return (
    <div className={`flex rounded-xl px-2 items-center bg-accent ${className}`}>
      <button className="py-2 shrink-0 flex place-items-center">
        <img
          src="/assets/img/search.svg"
          alt="search"
          style={{ height: "20.5px" }}
        />
      </button>
      <input
        type="text"
        className=" w-0 p-0 ls:px-4 ls:w-full h-full border-0 bg-inherit focus:border-0 focus:outline-0 text-sm"
      />
    </div>
  );
}

export function UserBar({ className}) {
  const { user: { name, picture } } = useUser();
  console.log(picture, name)

  return (
    <div
      className={`ls:flex-1 shrink-0 flex items-center justify-end gap-4 ${className}`}
    >
      <button className="relative shrink-0">
        <img
          src="/assets/img/bell.svg"
          alt="bell"
          className="block h-5 ls:h-6"
        />
        <div className="absolute -top-[25%] right-0 flex justify-center items-center rounded-full w-2.5 h-2.5  aspect-square bg-red-400 text-[0.4rem] text-white">
          1
        </div>
      </button>
      <div className="shrink-0 flex items-center gap-2">
        <button className={`w-7 aspect-square ${!picture && "bg-black"} rounded-lg `}>
          {picture ? (
            <img src={picture} alt="profile" className="rounded-lg h-full w-full object-cover " />
          ) : (
            <p className="text-white text-sm sm:text-base">
              {formatName(name)}
            </p>
          )}
        </button>
        <button>
          <img src="/assets/img/arrow-down.svg" alt="arrow down" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
