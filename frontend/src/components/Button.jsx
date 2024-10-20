export function Button({ text }) {
    return (
        <button className="bg-[#DDAA58] text-[#8B2A1F] font-bold py-3 px-6 text-lg rounded-lg border-2 border-[#8B2A1F] shadow-md hover:bg-[#CC8F41] hover:text-white">
            {text}
        </button>
    );
}