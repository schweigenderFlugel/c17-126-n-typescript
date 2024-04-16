export const Logo = ({
  className = '',
  classNameIcon = '',
  small = false,
}: {
  className?: string
  classNameIcon?: string
  small?: boolean
}) => {
  return (
    <h2
      className={`flex items-center max-sm:gap-2 ${small ? 'gap-2' : 'gap-4'}`}
    >
      <div>
        <svg
          width="41"
          height="47"
          viewBox="0 0 41 47"
          fill="none"
          className={`max-sm:h-9 max-sm:w-9 ${small ? 'h-9 w-9' : ''} ${classNameIcon}`}
        >
          <path
            d="M20.45 4.57L28.26 9.08L32.22 6.8L20.45 0L0.790039 11.36L4.73004 13.64L20.45 4.57Z"
            fill="#6366F1"
          />
          <path
            d="M36.1601 9.08008L20.4501 18.1501L12.6401 13.6401L8.69006 15.9201L20.4501 22.7101L40.1201 11.3601L36.1601 9.08008Z"
            fill="#6366F1"
          />
          <path
            d="M3.95 24.3401L0 22.0601V35.6401L19.66 47.0001V42.4401L3.95 33.3601V24.3401Z"
            fill="#6366F1"
          />
          <path
            d="M0 17.4999L15.71 26.5699V35.5899L19.66 37.8799V24.2899L0 12.9399V17.4999Z"
            fill="#6366F1"
          />
          <path
            d="M33.0101 22.06V17.5L21.2401 24.29V47L25.1901 44.72V26.57L33.0101 22.06Z"
            fill="#6366F1"
          />
          <path
            d="M36.9501 15.2199V33.3599L29.1401 37.8799V42.4399L40.9101 35.6399V12.9399L36.9501 15.2199Z"
            fill="#6366F1"
          />
        </svg>
      </div>
      <span
        className={`font-extrabold align-middle text-gray-900 max-sm:text-4xl ${small ? 'text-4xl' : 'text-5xl'} ${className}`}
      >
        Bank<span className="text-indigo-500">me.</span>
      </span>
    </h2>
  )
}
