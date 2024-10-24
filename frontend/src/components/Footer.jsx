export default function Footer() {
  return (
    <footer className="bg-orange-950 text-yellow-400 py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center text-center md:text-left">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h5 className="font-bold">Realizado por</h5>
          <p>Administrador</p>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h5 className="font-bold">Proyecto</h5>
          <p>Realizado por Proyecto Código</p>
        </div>

        <div className="w-full md:w-1/3">
          <h5 className="font-bold">Contact us</h5>
          <p>x@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
