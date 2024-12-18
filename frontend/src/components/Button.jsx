export default function Button({ text, btnType, event, state, atrib='' }) {
  return (
    <button
      className={`relative border-2 backdrop-blur-sm border-[#CDA053] text-[#CDA053] font-bold rye-regular py-3 px-6 text-lg rounded-full shadow-xl
    md:text-2xl md:rounded-xl md:py-1 md:px-24 transition-all duration-300 ease-in-out brightness-100 enabled:hover:scale-105 enabled:hover:brightness-125 enabled:active:scale-95 disabled:brightness-50 disabled:hover:cursor-not-allowed ${atrib}`}
      type={btnType}
      onClick={event}
      disabled={state}
    >
      {text}

    </button>

  );
}
