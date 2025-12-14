const Note = ({ note }) => {
  return (
    <li className="flex flex-col gap-2 p-4 border border-grey rounded-[0.625rem]">
      <p className="text-[0.8125rem] opacity-50 font-bold">{note.date}</p>
      <h4 className="font-bold">{note.course}</h4>
      <p className="text-[0.9375rem] font-bold opacity-50">
        {note.description}
      </p>
      <button className="w-fit text-[0.8125rem] font-bold">View</button>
    </li>
  );
};

export default Note;