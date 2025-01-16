export default function Footer() {
  return (
    <footer className="bg-[#FEFFEB] text-[#2B1F12] py-4 text-last z-20 mt-auto flex justify-center items-center ontainer mx-auto  flex-wrap  text-center md:text-left">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <p>Realizado por <span className="font-bold">Voltio⚡</span></p>
      </div>
      <div className="w-full md:w-1/3 mb-4 md:mb-0 disabled">
        <button className="font-bold opacity-65" disabled>Administrador</button>
      </div>
      <div className="w-full md:w-1/3">
        <p>Contáctanos <span className="font-bold">grupovoltio@gmail.com</span></p>
      </div>
      <p className="mt-6">&copy;2025 El Club del Filete. Todos los derechos reservados.</p>
    </footer>
  );
}
