import { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import { XCircle } from "lucide-react"; // Ícono de cruz para eliminar la imagen

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB

export default function ImageUploader({ onChange, multiple = false }) {
    const [images, setImages] = useState([]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            const newImages = acceptedFiles.filter(
                (file) => file.size <= MAX_IMAGE_SIZE && file.type.startsWith("image/")
            );

            if (newImages.length === 0) {
                alert("Las imágenes deben ser JPG/PNG y no superar los 500KB.");
                return;
            }

            const previewImages = newImages.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            setImages(multiple ? [...images, ...previewImages] : previewImages);
            onChange(multiple ? [...images.map((img) => img.file), ...newImages] : newImages[0]);
        },
        [images, onChange, multiple]
    );

    const removeImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onChange(multiple ? updatedImages.map((img) => img.file) : null);
    };

    return (
        <div>
            <Dropzone onDrop={onDrop} multiple={multiple} accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 h-24 p-4 text-center cursor-pointer bg-transparent text-[#FEFFFB] rounded border-[#cda05377]"
                    >
                        <input {...getInputProps()} />
                        <p>{images.length ? "Cambiar imagen" : "Arrastra y suelta una imagen aquí o haz clic para seleccionar"}</p>
                    </div>
                )}
            </Dropzone>

            {images.length > 0 && (
                <div className="flex flex-wrap mt-2">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 m-2">
                            <img src={img.preview} alt="Preview" className="w-full h-full object-cover rounded" />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            >
                                <XCircle size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
