import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';

export const FooterLandingPage = () => {
  return (
    <section className="gap-y-6 grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] max-lg:grid-cols-2 p-16 max-sm:p-6 max-lg:p-8">
      <div className="flex flex-col gap-5 max-lg:col-span-2 max-lg:col-start-1 max-lg:row-span-3 max-lg:row-start-3">
        <Logo className="text-4xl" classNameIcon="h-10 w-10" />
        <p className="text-gray-500/70 text-xl max-lg:text-lg">
          Abriendo caminos hacia nuevas oportunidades
        </p>
        <div className="flex gap-8 [&_svg]:w-10 [&_svg]:h-10 [&_svg]:text-gray-500/70">
          <a href="https://twitter.com/" target="_blank">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </a>
        </div>
      </div>
      <nav>
        <h5 className="mb-5 font-medium text-gray-600 text-lg max-[470px]:text-base">
          Funcionalidades
        </h5>
        <ul className="flex flex-col gap-4 [&_li_a]:max-[470px]:text-sm [&_li_a]:text-gray-500">
          <li>
            <Link to="#">Transferencias</Link>
          </li>
          <li>
            <Link to="#">Inversiones</Link>
          </li>
          <li>
            <Link to="#">Seguridad</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <h5 className="mb-5 font-medium text-gray-600 text-lg max-[470px]:text-base">
          Ayuda
        </h5>
        <ul className="flex flex-col gap-4 [&_li_a]:max-[470px]:text-sm [&_li_a]:text-gray-500">
          <li>
            <Link to="#">Soporte</Link>
          </li>
          <li>
            <Link to="#">Información</Link>
          </li>
          <li>
            <Link to="#">Tutoriales</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <h5 className="mb-5 font-medium text-gray-600 text-lg max-[470px]:text-base">
          Compañia
        </h5>
        <ul className="flex flex-col gap-4 [&_li_a]:max-[470px]:text-sm [&_li_a]:text-gray-500">
          <li>
            <Link to="#">Quienes Somos</Link>
          </li>
          <li>
            <Link to="#">Trabaja con Nosotros</Link>
          </li>
          <li>
            <Link to="#">Contactanos</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <h5 className="mb-5 font-medium text-gray-600 text-lg max-[470px]:text-base">
          Contacto
        </h5>
        <ul className="flex flex-col gap-4 [&_li_a]:max-[470px]:text-sm [&_li_a]:text-gray-500">
          <li>
            <a href="mailto:info@bankme.com">info@bankme.com</a>
          </li>
          <li>
            <a href="tel:0-800-200-300">0-800-200-300</a>
          </li>
          <li>
            <a href="https://www.google.com/maps" target="_blank">
              5603 - Rama Caida, AR
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
