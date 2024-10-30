export default function Button({ text, bgColor, textColor, event }) {
  return (
    <button
      className={
        bgColor + textColor + "font-bold py-3 px-6 text-lg rounded-full shadow-md hover:bg-[#CC8F41] hover:text-white md:rounded-lg"
      }
      onClick={event}
    >
      {text}
    </button>
  );
}
