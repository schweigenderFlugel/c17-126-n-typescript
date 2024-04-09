import { Link } from 'react-router-dom';
import {
  HiArrowRight,
  HiOutlineArrowTrendingUp,
  HiOutlineChartPie,
  HiOutlineShieldCheck,
} from 'react-icons/hi2';

export const InformationLandingPage = () => {
  return (
    <section className="px-48 max-md:px-4 max-lg:px-8 max-xl:px-16 w-full">
      <article className="max-lg:block items-center grid grid-cols-2 py-24">
        <div className="flex flex-col gap-4 max-w-[600px]">
          <h2 className="font-bold text-6xl max-[520px]:text-5xl leading-tight">
            Simplifica la gestión de tus gastos e inversiones
          </h2>
          <p className="text-lg max-[520px]:text-base">
            Con nuestro sistema de gestión de gastos e inversiones obtén una
            visión detallada de tus flujos de efectivo, identifica oportunidades
            de ahorro y maximiza el rendimiento de tus inversiones.
          </p>
          <Link
            to="#"
            className="flex items-center gap-2 hover:gap-4 text-indigo-600 text-lg max-[520px]:text-base transition-all duration-300"
          >
            <span>Saber más</span>
            <HiArrowRight />
          </Link>
        </div>
        <div>
          <img
            src="./img/dashboard.webp"
            className="max-lg:hidden w-full h-full translate-x-48"
          />
        </div>
      </article>

      <article className="justify-center items-center gap-40 max-2xl:gap-20 grid grid-cols-2 max-lg:grid-cols-1">
        <div>
          <img
            src="./img/dashboard-mobile.webp"
            className="m-auto w-[75%] max-sm:w-full h-[50%] max-sm:h-full -translate-x-2"
          />
        </div>
        <div className="flex flex-col gap-4 max-w-[600px]">
          <h2 className="max-lg:mt-24 font-bold text-6xl text-balance max-[520px]:text-5xl leading-tight">
            Sugerencias para hacer crecer tu capital
          </h2>
          <p className="text-balance text-lg max-[520px]:text-base">
            Descubre nuevas oportunidades para hacer crecer tu capital con
            nuestra banca digital. Gestiona fácilmente tus inversiones y recibe
            recomendaciones personalizadas para maximizar tus ganancias. Accede
            a herramientas avanzadas y análisis detallados para tomar decisiones
            financieras informadas.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex justify-between gap-4">
              <span className="flex justify-center items-center border-2 border-indigo-500 bg-indigo-100 mt-2 border-solid rounded-md w-[40px] min-w-[40px] h-[40px]">
                <HiOutlineArrowTrendingUp className="w-[24px] h-[24px] text-indigo-500" />
              </span>
              <div>
                <h3 className="font-medium text-gray-700 text-lg max-[520px]:text-base">
                  Mayores oportunidades de inversión
                </h3>
                <p className="text-gray-500">
                  Puedes ver las inversiones recomendadas que pueden generar
                  mayores ganacias e invertir en simples pasos.
                </p>
              </div>
            </li>
            <li className="flex justify-between gap-4">
              <span className="flex justify-center items-center border-2 border-indigo-500 bg-indigo-100 mt-2 border-solid rounded-md w-[40px] min-w-[40px] h-[40px]">
                <HiOutlineChartPie className="w-[24px] h-[24px] text-indigo-500" />
              </span>
              <div>
                <h3 className="font-medium text-gray-700 text-lg max-[520px]:text-base">
                  Estadísticas detalladas
                </h3>
                <p className="text-gray-500">
                  En nuestro panel de control tendrás acceso a estadísticas y
                  datos claves para tener una mayor información a la hora de
                  invertir.
                </p>
              </div>
            </li>
            <li className="flex justify-between gap-4">
              <span className="flex justify-center items-center border-2 border-indigo-500 bg-indigo-100 mt-2 border-solid rounded-md w-[40px] min-w-[40px] h-[40px]">
                <HiOutlineShieldCheck className="w-[24px] h-[24px] text-indigo-500" />
              </span>
              <div>
                <h3 className="font-medium text-gray-700 text-lg max-[520px]:text-base">
                  Seguridad en las inversiones
                </h3>
                <p className="text-gray-500">
                  Seguridad garantizada en todos tus movimientos de invesiones,
                  con alertas de inversiones no seguras.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};
