import { MainButton } from './MainButton';

export const CTALandingPage = () => {
  return (
    <section className="relative flex bg-indigo-600 mx-48 max-sm:mx-4 max-lg:mx-24 my-12 mb-36 p-12 max-sm:p-8 rounded-3xl max-lg:h-[800px] max-xl:h-[700px] text-white overflow-hidden">
      <div className="h-[400px]">
        <img
          className="top-0 max-2xl:top-[10%] max-xl:top-auto max-[520px]:scale-[200%] -right-[10%] max-xl:right-0 max-[850px]:bottom-[60%] max-xl:bottom-[65%] absolute max-xl:p-5 w-[50%] max-xl:w-full h-auto scale-150"
          src="./img/dashboard-isometric.webp"
          alt="NC Bank's dashboard in isometric perspective"
        />
      </div>
      <div className="flex flex-col gap-4 max-xl:m-auto my-auto max-xl:my-0 max-xl:mt-auto w-[45%] max-xl:w-full max-w-[600px] max-xl:max-w-max">
        <h4 className="font-semibold text-5xl max-[520px]:text-4xl">
          Crea tu cuenta ahora y empieza a operar.
        </h4>
        <p>
          En simples passo puedes registrarte, asignar un tarjeta de debida y ya
          puedes empezar a hacer transferencais a fondos e inversiones
        </p>
        <div className="flex justify-between bg-white p-1 rounded-lg">
          <input
            className="mr-2 px-2 max-sm:px-1 py-1 rounded-md focus:outline-none w-full max-sm:w-32 text-gray-800 max-sm:text-sm"
            type="text"
            placeholder="Ingresa tu email"
          />
          <MainButton className="w-fit">Empezar</MainButton>
        </div>
      </div>
    </section>
  );
};
