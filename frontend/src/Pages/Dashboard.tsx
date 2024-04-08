import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
import { VscSettingsGear } from "react-icons/vsc";

export const Dashboard = () => {
  return (
    <main className="w-full h-full grid grid-cols-8 gap-2">
      <div className= "col-span-2 row-span-3 grid justify-center items-stretch rounded-2xl p-6 bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25">
        <h2 className="font-extrabold text-3xl text-black dark:text-white">Banco nc.</h2>
        <div className="grid justify-start text-black dark:text-white">
          <div >
            <Link className="flex justify-start p-2 rounded-md text-black dark:text-white dark:hover:bg-indigo-500">
              <AiFillHome className="mr-2 mt-1" />
              <p>Inicio</p>
            </Link>
          </div>
          <div>
            <Link className="flex justify-start p-2 rounded-md text-black dark:text-white dark:hover:bg-indigo-500">
              <BsArrowLeftRight className="mr-2 mt-1" />
              <p>Transferencias</p>
            </Link>
          </div>
          <div>
            <Link className="flex justify-start p-2 rounded-md text-black dark:text-white dark:hover:bg-indigo-500">
              <VscSettingsGear className="mr-2 mt-1"/>
              <p>Configuración</p>
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-3 p-1 rounded-md dark:text-white dark:bg-indigo-500">
            <p>Transferir</p>
          </div>
          <div className="rounded-md p-1 dark:text-white dark:bg-indigo-500">
            <p>Reporte</p>
          </div>
        </div>
      </div>
      <div className= "col-span-6 row-span-3 grid justify-items-center rounded-2xl p-12 bg-white bg-opacity-25 dark:bg-black dark:bg-opacity-25 h-full">
        <div>Transferencia</div>
      </div>
    </main>
  )
}