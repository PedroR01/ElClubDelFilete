import Button from "./Button";
import logoIntro from "../img/logoIntro.png";
import Modal from "./Modal";

export default function Section({ name, description }) {
  const openContactModal = () => {
    console.log("Contact modal open");
  };
  return (
    <div className="min-h-screen bg-[#8B2A1F] text-white relative">
      <div className="container mx-auto mt-8 px-4 flex">
        <div className="flex flex-col items-start w-1/3">
          <img
            src={logoIntro}
            alt="Logo club del filete"
            className="h-80 w-80 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem] object-cover mb-4"
          />
          <div className="flex justify-center w-full">
            <Button
              text="Contacto"
              bgColor={"#DDAA58"}
              textColor={"#8B2A1F"}
              onClick={openContactModal}
            />
          </div>
        </div>

        {/* Sección para Video a la derecha */}
        <div className="flex-grow flex flex-col items-center w-2/3">
          <div className="mb-4">
            <iframe
              className="w-full h-64 md:h-96"
              src="https://www.youtube.com/embed/PN4xt9RuV-Y"
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
