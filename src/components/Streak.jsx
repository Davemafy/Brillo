import { CheckCheck, Flame } from "lucide-react";

const Streak = () => {
  return (
    <div className="md:w-60 flex  md:flex-col gap-3 p-6.25 px-8.25 md:p-10  text-[0.95rem] border-r border-grey">
      <div className="flex items-center gap-4 opacity-40 font-bold">
        <p className="hidden md:block">Logged Today</p>
        <CheckCheck />
      </div>
      <div className="flex items-center gap-4 font-bold">
        <p className="hidden md:block">7-day streak</p>
        <Flame />
      </div>
    </div>
  );
};

export default Streak;
