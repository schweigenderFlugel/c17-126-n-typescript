import { useState } from 'react';
import { Logo } from './Logo';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export const WalletCard = () => {
  const [showBalance, setShowBalance] = useState(true);

  //👇 Obtenerlo del hook useAuth
  const currentUser = {
    firstName: 'Juan Alberto',
    lastName: 'Perez',
    balance: '3500.00',
  };

  return (
    <section className="col-span-4">
      <main>
        <h3 className="font-semibold text-2xl dark:text-white">Billetera</h3>
        <div className="bg-indigo-700 p-6 rounded-xl w-[340px] h-[216px]">
          <div className="flex items-center">
            <svg
              width="69"
              height="40"
              viewBox="0 0 69 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="40"
                height="40"
                rx="20"
                fill="white"
                fill-opacity="0.3"
              />
              <rect
                x="29"
                width="40"
                height="40"
                rx="20"
                fill="white"
                fill-opacity="0.3"
              />
            </svg>
            <Logo extraSmall className="ml-auto text-white" />
          </div>

          <p className="mt-12 mb-3 text-lg text-white uppercase tracking-[4px]">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          <div className="flex text-white">
            <p className="min-w-44 font-semibold text-3xl tracking-wider">
              $ {showBalance ? currentUser.balance : `●●●●.●●`}
            </p>
            <button onClick={() => setShowBalance(show => !show)}>
              {showBalance ? (
                <HiOutlineEye className="w-6 h-6" />
              ) : (
                <HiOutlineEyeSlash className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};
