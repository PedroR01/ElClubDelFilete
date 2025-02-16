import { useState } from "react";
export default function Admin() {
  const [imgName, setImgName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [position, setPosition] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const convertTextToJson = (inputText) => {
    const result = {};  // Objeto para almacenar las claves y valores
  
    inputText.split("\n").forEach(line => {
      const [key, ...valueParts] = line.split(":"); // Divide solo en la primera aparición de ":"
      if (!key || valueParts.length === 0) return; // Ignorar líneas vacías o incorrectas
  
      let value = valueParts.join(":").trim(); // Reunir el valor y eliminar espacios
  
      // Intentar convertir números a tipo Number
      if (!isNaN(value)) {
        value = Number(value);
      }
  
      result[key.trim()] = value;
    });
  
  
    return result;  // Retorna el objeto JSON resultante
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
        const parsedContent = convertTextToJson(content);
        const jsonArray = [parsedContent];
        const data = {
          title: folderName,
          tag: tag,
          description: description,
          content_sections: jsonArray,
          introduction: introduction,
          featured_pos: position,
          bucket_folder_url: result
        };
        // Aquí podrías hacer un fetch para enviar los datos al backend
        const response2 =  await fetch('http://localhost:3001/api/blogs', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
         });
         const result2 = await response2.json();
         if (response2.ok) {
          console.log("Blog uploaded successfully:", result2);}
        else {
            console.error("Error uploading blog:", result2);
            const imagenEliminar = {
              folderName: folderName
            }
            const response3 =  await fetch('http://localhost:3001/api/storage', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(imagenEliminar)
            });
            if(response3.ok)
              console.log("Imagen eliminada con exito")
          }
      } else {
        console.error("Error uploading image:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-[#8F272A] min-h-screen font-sans pt-28">
    <div className="max-w-sm bg-gradient-to-t from-black to-[#f4f7fb] rounded-3xl p-8 pt-20 border-4 border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,.87)] m-5 mx-auto">
      <div className="text-center font-extrabold text-3xl text-[#1089D3]">Subir un blog</div>
      <form onSubmit={handleSubmit}>
        <input required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="text" name="imgName" id="imgName" onChange={(e) => setImgName(e.target.value)} placeholder="Image Name" />
        <input required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="text" name="folderName" id="folderName" onChange={(e) => setFolderName(e.target.value)} placeholder="Folder Name" />
        <input required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="text" name="tag" id="tag" onChange={(e) => setTag(e.target.value)} placeholder="Tag" />
        <input required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <textarea required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" name="content" id="content" onChange={(e) => setContent(e.target.value)} placeholder="Content" />
        <textarea required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" name="introduction" id="introduction" onChange={(e) => setIntroduction(e.target.value)} placeholder="Introduction" />
        <input className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="text" name="position" id="position" onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
        <input required className="w-full bg-white border-none p-4 rounded-2xl mt-4 shadow-md focus:outline-none" type="file" name="image" id="image" onChange={handleImageChange} />
        <button type="submit" className="w-full bg-[#12B1D1] text-white p-4 rounded-2xl mt-4 shadow-md">Upload Image</button>
      </form>
    </div>
  </div>
  );
};

