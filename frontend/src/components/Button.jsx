export default function Button({ text, bgColor, textColor, event }) {
  return (
    <button
      className="border-2 border-[#CDA053] text-[#CDA053] font-bold rye-regular py-3 px-6 text-lg rounded-full shadow-md hover:bg-[#CC8F41] hover:text-white md:text-2xl md:rounded-xl md:py-1 md:px-24"

      onClick={event}
    >
      {text}
    </button>
  );
}
