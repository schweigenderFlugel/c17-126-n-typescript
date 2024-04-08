import { MainButton } from './MainButton';
import { NavBarLadingPage } from './NavBarLandingPage';

export const HeroLandingPage = () => {
  return (
    <section className="flex flex-col bg-[url('/img/woman-background-landingpage.webp')] bg-indigo-700 max-lg:bg-[65%] bg-cover bg-center px-16 max-md:px-4 max-lg:px-8 h-svh">
      <NavBarLadingPage />
      <div className="my-auto w-[50%] max-[520px]:w-full max-lg:w-[65%]">
        <h1 className="py-4 max-w-[70%] font-semibold text-7xl text-gray-50 max-sm:text-6xl max-[520px]:text-5xl tracking-tighter">
          Operaciones bancarias rápidas, fáciles y seguras.
        </h1>
        <p className="py-4 max-w-[80%] text-gray-50 text-xl">
          En simples pasos puedes registrarte y empezar a operar ahora mismo,
          con la seguridad respaldada por nuestros ingenieros.
        </p>
        <div>
          <input
            className="mr-2 p-3 rounded-md max-[600px]:w-52"
            type="text"
            placeholder="Ingresa tu email"
          />
          <MainButton className="w-fit">Empezar</MainButton>
        </div>
      </div>
    </section>
  );
};
