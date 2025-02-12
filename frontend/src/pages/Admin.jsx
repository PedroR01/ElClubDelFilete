import { useState } from "react";
export default function Admin() {
  const [imgName, setImgName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgName || !folderName || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    // Crear un objeto JSON para enviar los datos
    const formData = new FormData();
    formData.append("image", image);
    formData.append("imgName", imgName);
    formData.append("folderName", folderName);
    console.log('Form Data:', formData);

    try {
      const response = await fetch("http://localhost:3001/api/storage", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Error uploading image:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#8F272A] min-h-screen font-sans pt-28">
      <div className="max-w-sm bg-gradient-to-t from-white to-[#f4f7fb] rounded-3xl p-8 pt-20 border-4 border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,.87)] m-5  mx-auto">
        <div className="text-center font-extrabold text-3xl text-[#1089D3]">Form para subir img</div>
        <form onSubmit={handleSubmit} >
          <input
            required
            className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-transparent focus:outline-none focus:border-[#12B1D1]"
            type="text"
            name="imgName"
            id="imgName"
            onChange={(e) => setImgName(e.target.value)}
            placeholder="Image Name"
          />
          <input
            required
            className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-transparent focus:outline-none focus:border-[#12B1D1]"
            type="text"
            name="folderName"
            id="folderName"
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder Name"
          />
          <input
            required
            className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff] border-transparent focus:outline-none focus:border-[#12B1D1]"
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="w-full bg-[#12B1D1] text-white p-4 rounded-2xl mt-4 shadow-[0_10px_10px_-5px_#cff0ff]"
          >
            Upload Image
          </button>
        </form>
      </div>
    </div>
  );
};

