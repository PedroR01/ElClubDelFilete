export default function Button({ text, btnType, event }) {
  return (
    <button
      className="relative border-2 border-[#CDA053] text-[#CDA053] font-bold rye-regular py-3 px-6 text-lg rounded-full shadow-md
    transition-all duration-300 ease-in-out brightness-100 hover:scale-105 hover:brightness-125 active:scale-95 md:text-2xl md:rounded-xl md:py-1 md:px-24 group"
      type={btnType}
      onClick={event}
    >
      {text}

    </button>

  );
}
