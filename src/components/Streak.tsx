import { CheckCheck, Flame, FlameKindlingIcon } from "lucide-react";

interface StreakProps {
  sidebarOpen: boolean;
}

const Streak = ({ sidebarOpen }: StreakProps) => {
  return (
    <div
      className={`flex text-xs flex-col gap-4 md:gap-8.75 py-6.25  md:p-0 mx-6 md:py-6 md:pt-10 font-semibold`}
    >
      <div className="flex items-center gap-2 opacity-50 f">
        <CheckCheck size={20} />
        <p>
          <span className={`${!sidebarOpen ? "hidden" : ""} md:inline`}>
            Logged Today
          </span>
          <span className="hidden md:inline"></span>
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Flame size={20} />
        <p>
          <span className={`${!sidebarOpen ? "hidden" : ""} md:inline`}>
            0-day streak
          </span>
        </p>
      </div>
    </div>
  );
};

export default Streak;
