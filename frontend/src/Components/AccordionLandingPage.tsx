import { useState } from 'react';
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from 'react-icons/hi2';

const faqs = [
  {
    title: '¿Qué es Banco nc. y cómo funciona?',
    text: 'Banco nc. es un servicio que permite a los usuarios realizar diversas transacciones financieras a través de cualquier navegador. Esto incluye actividades como consultar saldos, realizar transferencias de fondos, pagar facturas, solicitar préstamos y mucho más. Funciona mediante el uso de tecnología segura, como cifrado de datos y autenticación de múltiples factores, para garantizar la privacidad y seguridad de las transacciones en línea.',
  },
  {
    title: '¿Cuáles son los beneficios de utilizar Banco nc.?',
    text: 'Banco nc. es un servicio que permite a los usuarios realizar diversas transacciones financieras a través de cualquier navegador. Esto incluye actividades como consultar saldos, realizar transferencias de fondos, pagar facturas, solicitar préstamos y mucho más. Funciona mediante el uso de tecnología segura, como cifrado de datos y autenticación de múltiples factores, para garantizar la privacidad y seguridad de las transacciones en línea.',
  },
  {
    title: '¿Qué medidas de seguridad tenemos en Banco nc.?',
    text: 'Banco nc. es un servicio que permite a los usuarios realizar diversas transacciones financieras a través de cualquier navegador. Esto incluye actividades como consultar saldos, realizar transferencias de fondos, pagar facturas, solicitar préstamos y mucho más. Funciona mediante el uso de tecnología segura, como cifrado de datos y autenticación de múltiples factores, para garantizar la privacidad y seguridad de las transacciones en línea.',
  },
  {
    title: '¿Cómo realizo una transferencia de fondos?',
    text: 'Banco nc. es un servicio que permite a los usuarios realizar diversas transacciones financieras a través de cualquier navegador. Esto incluye actividades como consultar saldos, realizar transferencias de fondos, pagar facturas, solicitar préstamos y mucho más. Funciona mediante el uso de tecnología segura, como cifrado de datos y autenticación de múltiples factores, para garantizar la privacidad y seguridad de las transacciones en línea.',
  },
  {
    title: '¿Cómo acceder al servicio de atención al cliente?',
    text: 'Banco nc. es un servicio que permite a los usuarios realizar diversas transacciones financieras a través de cualquier navegador. Esto incluye actividades como consultar saldos, realizar transferencias de fondos, pagar facturas, solicitar préstamos y mucho más. Funciona mediante el uso de tecnología segura, como cifrado de datos y autenticación de múltiples factores, para garantizar la privacidad y seguridad de las transacciones en línea.',
  },
];

export const AccordionLandingPage = () => {
  const [curOpen, setCurOpen] = useState<number | null>(null);

  return (
    <>
      <section className="flex flex-col items-center px-24 max-md:px-4 max-lg:px-8 py-48 max-sm:py-24 w-full">
        <h3 className="font-semibold text-7xl text-center max-sm:text-5xl max-[400px]:text-5xl">
          Preguntas Frequentes
        </h3>
        <h4 className="pt-4 pb-10 text-2xl text-center text-gray-500 max-sm:text-xl">
          Todo lo que necesitas saber de Banco nc.
        </h4>
        <ul className="w-[950px] max-xl:w-full">
          {faqs.map((el, i) => (
            <AccordionItem
              curOpen={curOpen}
              setCurOpen={setCurOpen}
              title={el.title}
              text={el.text}
              num={i + 1}
              key={el.title}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

type AccordionItemProps = {
  num: number;
  title: string;
  text: string;
  curOpen: number | null;
  setCurOpen: React.Dispatch<React.SetStateAction<number | null>>;
};

const AccordionItem = ({
  num,
  title,
  text,
  curOpen,
  setCurOpen,
}: AccordionItemProps) => {
  const isOpen = num === curOpen;

  const handleToggle = (num) => {
    setCurOpen(isOpen ? null : num);
  };

  return (
    <li onClick={() => handleToggle(num)} className="pt-4 cursor-pointer">
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-2xl max-sm:text-xl">{title}</h5>
        <span className="border-gray-800 [&_svg]:w-8 [&_svg]:h-8">
          {isOpen ? <HiOutlineMinusCircle /> : <HiOutlinePlusCircle />}
        </span>
      </div>
      {isOpen && <p className="py-4 text-lg max-[520px]:text-base">{text}</p>}
      <div className="bg-gray-400 my-5 w-full h-[1px]"></div>
    </li>
  );
};
