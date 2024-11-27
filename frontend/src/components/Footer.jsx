export default function Footer() {
  return (
    <footer className="bg-[#FEFFEB] text-[#2B1F12] py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center md:text-left">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <p>Realizado por <span className="font-bold">Voltio⚡</span></p>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <p className="font-bold">Administrador</p>
        </div>
        <div className="w-full md:w-1/3">
          <p>Contáctanos <span className="font-bold">gpVoltio@gmail.com</span></p>
        </div>
      </div>
    </footer>
  );
}
