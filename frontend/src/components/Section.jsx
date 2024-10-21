import Button from "./Button";
import logoIntro from "../img/logoIntro.png";
import Modal from "./Modal";

export default function Section({ name, description }) {
  const openContactModal = () => {
    console.log("Contact modal open");
  };
  return (
    <div className="flex min-h-screen bg-[#8B2A1F] text-white justify-self-center">
      <ul className="columns-1 md:columns-2">
        <li>
          <img
            src={logoIntro}
            alt="Logo club del filete"
            className="h-80 w-80 md:h-96 md:w-96 lg:h-[30rem] lg:w-[30rem] object-cover mb-4"
          />
          <Button
            text="Contacto"
            bgColor={"#DDAA58"}
            textColor={"#8B2A1F"}
            onClick={openContactModal}
          />
        </li>
        <li className="mt-14">
          <iframe
            className="w-full h-64 md:h-96"
            src="https://www.youtube.com/embed/PN4xt9RuV-Y"
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </li>
      </ul>
    </div>
  );
}
