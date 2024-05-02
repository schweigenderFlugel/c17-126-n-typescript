import { useState } from 'react';
import { Logo } from './Logo';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { Modal } from './Modal';
import { TransferForm } from './TransferForm';
import { DepositForm } from './DepositForm';
import { useAuth } from '../Hooks/useAuth';
import { LoadingDots } from './LoadingDots';

export const WalletCard = ({
  balance,
  isLoadingBalance,
}: {
  balance: string | number | undefined;
  isLoadingBalance: boolean;
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const closeDepositModal = () => {
    setIsDepositModalOpen(false);
  };
  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  const { userData } = useAuth();

  return (
    <section className="col-span-4 max-[850px]:col-span-12 max-[850px]:mt-6">
      <main className="flex flex-col h-full">
        <h3 className="font-semibold text-2xl max-lg:text-xl dark:text-white">Billetera</h3>
        <div className="flex max-[850px]:flex-row flex-col max-[600px]:flex-col max-[850px]:justify-between max-[600px]:items-center max-[600px]:gap-8 h-full">
          <div className="bg-indigo-700 mx-auto max-[850px]:mx-0 mt-3 p-6 rounded-xl w-[340px] max-lg:w-[300px] max-lg:h-[185px]">
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
                  fillOpacity="0.3"
                />
                <rect
                  x="29"
                  width="40"
                  height="40"
                  rx="20"
                  fill="white"
                  fillOpacity="0.3"
                />
              </svg>
              <Logo extraSmall className="ml-auto text-white" />
            </div>

            <div className="mt-12 max-lg:mt-8 mb-3 text-lg text-white max-lg:text-base uppercase tracking-[4px]">
              {userData ? (
                `${userData?.name} ${userData?.lastname}`
              ) : (
                <LoadingDots />
              )}
            </div>
            <div className="flex text-white">
              <span className="min-w-44 font-semibold text-3xl max-lg:text-2xl tracking-wider">
                {isLoadingBalance ? (
                  <LoadingDots />
                ) : (
                  `$ ${showBalance ? `${balance ? balance : 'error'}` : `●●●●.●●`}`
                )}
              </span>
              <button onClick={() => setShowBalance(show => !show)}>
                {showBalance ? (
                  <HiOutlineEye className="w-6 max-lg:w-5 h-6 max-lg:h-5" />
                ) : (
                  <HiOutlineEyeSlash className="w-6 max-lg:w-5 h-6 max-lg:h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-4 max-[850px]:mx-auto max-[850px]:my-auto mt-auto">
            <button
              className="flex flex-col justify-center items-center gap-2 dark:text-white"
              onClick={() => setIsDepositModalOpen(true)}
            >
              <div className="flex justify-center items-center border-2 border-indigo-400 hover:bg-indigo-200/50 dark:hover:bg-indigo-900 p-1 rounded-lg w-14 h-14">
                <svg width="35" height="38" viewBox="0 0 35 38" fill="none">
                  <g clipPath="url(#clip0_227_8671)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.7928 31.7068C15.6053 31.5193 15.5 31.265 15.5 30.9998C15.5 30.7346 15.6053 30.4803 15.7928 30.2928L19.7928 26.2928C19.9803 26.1053 20.2346 26 20.4998 26C20.765 26 21.0193 26.1053 21.2068 26.2928L25.2068 30.2928C25.3889 30.4814 25.4897 30.734 25.4875 30.9962C25.4852 31.2584 25.38 31.5092 25.1946 31.6946C25.0092 31.88 24.7584 31.9852 24.4962 31.9875C24.234 31.9897 23.9814 31.8889 23.7928 31.7068L21.4998 29.4138V40.9998C21.4998 41.265 21.3944 41.5194 21.2069 41.7069C21.0194 41.8944 20.765 41.9998 20.4998 41.9998C20.2346 41.9998 19.9802 41.8944 19.7927 41.7069C19.6051 41.5194 19.4998 41.265 19.4998 40.9998V29.4138L17.2068 31.7068C17.0193 31.8943 16.765 31.9996 16.4998 31.9996C16.2346 31.9996 15.9803 31.8943 15.7928 31.7068Z"
                      fill="currentColor"
                    />
                    <path
                      d="M24.7917 13.5V10.5C24.7917 9.70435 24.4844 8.94129 23.9374 8.37868C23.3904 7.81607 22.6485 7.5 21.875 7.5H7.29167C6.51812 7.5 5.77625 7.81607 5.22927 8.37868C4.68229 8.94129 4.375 9.70435 4.375 10.5V19.5C4.375 20.2956 4.68229 21.0587 5.22927 21.6213C5.77625 22.1839 6.51812 22.5 7.29167 22.5H10.2083M13.125 28.5C12.3515 28.5 11.6096 28.1839 11.0626 27.6213C10.5156 27.0587 10.2083 26.2956 10.2083 25.5V16.5C10.2083 15.7044 10.5156 14.9413 11.0626 14.3787C11.6096 13.8161 12.3515 13.5 13.125 13.5H27.7083C28.4819 13.5 29.2237 13.8161 29.7707 14.3787C30.3177 14.9413 30.625 15.7044 30.625 16.5V25.5C30.625 26.2956 30.3177 27.0587 29.7707 27.6213C29.2237 28.1839 28.4819 28.5 27.7083 28.5M23.3333 21C23.3333 21.7956 23.026 22.5587 22.4791 23.1213C21.9321 23.6839 21.1902 24 20.4167 24C19.6431 24 18.9013 23.6839 18.3543 23.1213C17.8073 22.5587 17.5 21.7956 17.5 21C17.5 20.2044 17.8073 19.4413 18.3543 18.8787C18.9013 18.3161 19.6431 18 20.4167 18C21.1902 18 21.9321 18.3161 22.4791 18.8787C23.026 19.4413 23.3333 20.2044 23.3333 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_227_8671">
                      <rect width="35" height="38" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="mb-1 text-xs">Ingresar</span>
            </button>
            <button
              className="flex flex-col justify-center items-center gap-2 dark:text-white"
              onClick={() => setIsTransferModalOpen(true)}
            >
              <div className="flex justify-center items-center border-2 border-indigo-400 hover:bg-indigo-200/50 dark:hover:bg-indigo-900 p-1 rounded-lg w-14 h-14">
                <svg width="35" height="38" viewBox="0 0 35 38" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.5864 2.80524C28.7739 2.61777 29.0282 2.51246 29.2934 2.51246C29.5585 2.51246 29.8128 2.61777 30.0003 2.80524L34.0004 6.80524C34.1878 6.99277 34.2931 7.24708 34.2931 7.51224C34.2931 7.77741 34.1878 8.03171 34.0004 8.21924L30.0003 12.2192C29.8117 12.4014 29.5591 12.5022 29.2969 12.4999C29.0348 12.4976 28.7839 12.3925 28.5985 12.2071C28.4131 12.0217 28.308 11.7708 28.3057 11.5086C28.3034 11.2464 28.4042 10.9938 28.5864 10.8052L30.8794 8.51224H19.2934C19.0281 8.51224 18.7738 8.40689 18.5862 8.21935C18.3987 8.03181 18.2934 7.77746 18.2934 7.51224C18.2934 7.24703 18.3987 6.99267 18.5862 6.80514C18.7738 6.6176 19.0281 6.51224 19.2934 6.51224H30.8794L28.5864 4.21924C28.3989 4.03171 28.2936 3.77741 28.2936 3.51224C28.2936 3.24708 28.3989 2.99277 28.5864 2.80524Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10.2083 22.5H7.29167C6.51812 22.5 5.77625 22.1839 5.22927 21.6213C4.68229 21.0587 4.375 20.2956 4.375 19.5V10.5C4.375 9.70435 4.68229 8.94129 5.22927 8.37868C5.77625 7.81607 6.51812 7.5 7.29167 7.5H13H16M13.125 28.5C12.3515 28.5 11.6096 28.1839 11.0626 27.6213C10.5156 27.0587 10.2083 26.2956 10.2083 25.5V16.5C10.2083 15.7044 10.5156 14.9413 11.0626 14.3787C11.6096 13.8161 12.3515 13.5 13.125 13.5H27.7083C28.4819 13.5 29.2237 13.8161 29.7707 14.3787C30.3177 14.9413 30.625 15.7044 30.625 16.5V25.5C30.625 26.2956 30.3177 27.0587 29.7707 27.6213C29.2237 28.1839 28.4819 28.5 27.7083 28.5H24.5H20.5C22.9028 28.5 24.7917 28.5 13.125 28.5ZM23.3333 21C23.3333 21.7956 23.026 22.5587 22.4791 23.1213C21.9321 23.6839 21.1902 24 20.4167 24C19.6431 24 18.9013 23.6839 18.3543 23.1213C17.8073 22.5587 17.5 21.7956 17.5 21C17.5 20.2044 17.8073 19.4413 18.3543 18.8787C18.9013 18.3161 19.6431 18 20.4167 18C21.1902 18 21.9321 18.3161 22.4791 18.8787C23.026 19.4413 23.3333 20.2044 23.3333 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xs">Transferir</span>
            </button>
            <button className="flex flex-col justify-center items-center gap-2 dark:text-white">
              <div className="flex justify-center items-center border-2 border-indigo-400 hover:bg-indigo-200/50 dark:hover:bg-indigo-900 p-1 rounded-lg w-14 h-14">
                <svg width="35" height="38" viewBox="0 0 35 38" fill="none">
                  <g clipPath="url(#clip0_227_8683)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.2072 30.293C25.3947 30.4805 25.5 30.7348 25.5 31C25.5 31.2651 25.3947 31.5194 25.2072 31.707L21.2072 35.707C21.0197 35.8944 20.7654 35.9998 20.5002 35.9998C20.235 35.9998 19.9807 35.8944 19.7932 35.707L15.7932 31.707C15.6111 31.5184 15.5103 31.2658 15.5125 31.0036C15.5148 30.7414 15.62 30.4906 15.8054 30.3052C15.9908 30.1197 16.2416 30.0146 16.5038 30.0123C16.766 30.01 17.0186 30.1108 17.2072 30.293L19.5002 32.586V21C19.5002 20.7348 19.6056 20.4804 19.7931 20.2929C19.9806 20.1053 20.235 20 20.5002 20C20.7654 20 21.0198 20.1053 21.2073 20.2929C21.3949 20.4804 21.5002 20.7348 21.5002 21V32.586L23.7932 30.293C23.9807 30.1055 24.235 30.0002 24.5002 30.0002C24.7654 30.0002 25.0197 30.1055 25.2072 30.293Z"
                      fill="currentColor"
                    />
                  </g>
                  <path
                    d="M24.7917 13.5V10.5C24.7917 9.70435 24.4844 8.94129 23.9374 8.37868C23.3904 7.81607 22.6485 7.5 21.875 7.5H7.29167C6.51812 7.5 5.77625 7.81607 5.22927 8.37868C4.68229 8.94129 4.375 9.70435 4.375 10.5V19.5C4.375 20.2956 4.68229 21.0587 5.22927 21.6213C5.77625 22.1839 6.51812 22.5 7.29167 22.5H10.2083M13.125 28.5C12.3515 28.5 11.6096 28.1839 11.0626 27.6213C10.5156 27.0587 10.2083 26.2956 10.2083 25.5V16.5C10.2083 15.7044 10.5156 14.9413 11.0626 14.3787C11.6096 13.8161 12.3515 13.5 13.125 13.5H27.7083C28.4819 13.5 29.2237 13.8161 29.7707 14.3787C30.3177 14.9413 30.625 15.7044 30.625 16.5V25.5C30.625 26.2956 30.3177 27.0587 29.7707 27.6213C29.2237 28.1839 28.4819 28.5 27.7083 28.5M23.3333 21C23.3333 21.7956 23.026 22.5587 22.4791 23.1213C21.9321 23.6839 21.1902 24 20.4167 24C19.6431 24 18.9013 23.6839 18.3543 23.1213C17.8073 22.5587 17.5 21.7956 17.5 21C17.5 20.2044 17.8073 19.4413 18.3543 18.8787C18.9013 18.3161 19.6431 18 20.4167 18C21.1902 18 21.9321 18.3161 22.4791 18.8787C23.026 19.4413 23.3333 20.2044 23.3333 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <clipPath id="clip0_227_8683">
                      <rect
                        width="11"
                        height="10"
                        fill="white"
                        transform="translate(15 26)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="text-xs">Extracción</span>
            </button>
          </div>
        </div>
      </main>
      <Modal
        onCloseModal={() => setIsTransferModalOpen(false)}
        isOpen={isTransferModalOpen}
      >
        <TransferForm onClose={closeTransferModal} />
      </Modal>
      <Modal
        onCloseModal={() => setIsDepositModalOpen(false)}
        isOpen={isDepositModalOpen}
      >
        <DepositForm onClose={closeDepositModal} />
      </Modal>
    </section>
  );
};
