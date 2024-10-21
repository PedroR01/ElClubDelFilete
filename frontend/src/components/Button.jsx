export default function Button({ text, bgColor, textColor, onClick }) {
  return (
    <button
      className={
        "bg-[" +
        bgColor +
        "] text-[" +
        textColor +
        "] font-bold py-3 px-6 text-lg rounded-lg border-2 border-[#8B2A1F] shadow-md hover:bg-[#CC8F41] hover:text-white"
      }
      onClick={() => onClick}
    >
      {text}
    </button>
  );
}
