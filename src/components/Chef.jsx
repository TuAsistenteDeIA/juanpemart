// Juan, el pescadero-chef de JuanPemart: ilustración propia en SVG (gorro de chef, bigote y pañuelo azul)
export function ChefAvatar({ size = 48, className = '', ring = true }) {
  return (
    <svg className={`chefavatar ${className}`} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Juan, tu pescadero">
      <defs>
        <clipPath id={`cc${size}`}><circle cx="60" cy="60" r="58" /></clipPath>
        <linearGradient id={`bg${size}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1b4b7d" /><stop offset="1" stopColor="#102a43" /></linearGradient>
      </defs>
      <g clipPath={`url(#cc${size})`}>
        <rect width="120" height="120" fill={`url(#bg${size})`} />
        {/* olas de fondo */}
        <path d="M-5 104c14-8 28-8 42 0s28 8 42 0 28-8 42 0v20H-5z" fill="#1677ff" opacity=".35" />
        {/* chaquetilla */}
        <path d="M14 124c2-24 18-34 46-34s44 10 46 34z" fill="#fff" />
        <path d="M60 92l-10 14 10 18 10-18z" fill="#e8eef6" />
        {/* pañuelo */}
        <path d="M44 90l16 12 16-12-4-6H48z" fill="#1677ff" />
        {/* cuello y cara */}
        <rect x="52" y="78" width="16" height="14" rx="5" fill="#e9c9a0" />
        <ellipse cx="60" cy="64" rx="23" ry="25" fill="#f3d9b6" />
        <ellipse cx="38" cy="66" rx="3.5" ry="6" fill="#ecc89f" /><ellipse cx="82" cy="66" rx="3.5" ry="6" fill="#ecc89f" />
        {/* mejillas */}
        <circle cx="46" cy="70" r="4.2" fill="#ee9b86" opacity=".45" /><circle cx="74" cy="70" r="4.2" fill="#ee9b86" opacity=".45" />
        {/* cejas y ojos */}
        <path d="M45 54q5-4 10-1M65 53q5-3 10 1" stroke="#5b4a3a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="60" r="2.8" fill="#23303f" /><circle cx="70" cy="60" r="2.8" fill="#23303f" />
        <circle cx="51" cy="59" r=".9" fill="#fff" /><circle cx="71" cy="59" r=".9" fill="#fff" />
        {/* nariz, bigote y sonrisa */}
        <path d="M60 62c-2 4-3 6 0 7" stroke="#d9a982" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M60 71c-5-3-13-2-17 2 4 4 10 3 17-2 7 5 13 6 17 2-4-4-12-5-17-2z" fill="#6c5b4d" />
        <path d="M52 78q8 6 16 0" stroke="#a45a4a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* gorro de chef */}
        <g>
          <circle cx="38" cy="33" r="14" fill="#fff" /><circle cx="60" cy="25" r="17" fill="#fff" /><circle cx="82" cy="33" r="14" fill="#fff" />
          <path d="M33 38h54l-3 20c-8 4-40 4-48 0z" fill="#fff" />
          <path d="M36 52q24 6 48 0" stroke="#d6e0ec" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M47 30q-3 8 0 14M60 26q-2 9 0 17M73 30q3 8 0 14" stroke="#e6edf5" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>
      {ring && <circle cx="60" cy="60" r="58" fill="none" stroke="#e6d5b8" strokeWidth="3" />}
    </svg>
  )
}
