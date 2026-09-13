import { useEffect } from 'react';

interface LogoLoaderProps {
  onComplete: () => void;
}

export function LogoLoader({ onComplete }: LogoLoaderProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, 1900);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="volt-loader" role="status" aria-label="Loading I.VOLT">
      <style>{`
        @keyframes volt-loader-enter-left {
          from { opacity: 0; transform: translateX(-34px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes volt-loader-enter-right {
          from { opacity: 0; transform: translateX(34px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes volt-loader-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 0 rgba(245, 197, 24, 0); }
          18% { opacity: .45; text-shadow: 0 0 14px rgba(245, 197, 24, .95); }
          36% { opacity: 1; text-shadow: 0 0 5px rgba(245, 197, 24, .65); }
          52% { opacity: .7; text-shadow: 0 0 12px rgba(245, 197, 24, .9); }
          68% { opacity: 1; text-shadow: 0 0 0 rgba(245, 197, 24, 0); }
        }

        @keyframes volt-loader-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes volt-loader-fade-out {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }

        .volt-loader {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f1115;
          animation: volt-loader-fade-out .4s ease-out 1.5s forwards;
        }

        .volt-loader__content {
          width: min(78vw, 360px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .volt-loader__brand {
          display: flex;
          align-items: baseline;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.8rem, 12vw, 5.25rem);
          line-height: 1;
          font-weight: 900;
          letter-spacing: .015em;
        }

        .volt-loader__prefix {
          color: #ffffff;
          animation: volt-loader-enter-left .5s ease-out both;
        }

        .volt-loader__name {
          color: #f5c518;
          animation: volt-loader-enter-right .5s ease-out .08s both, volt-loader-flicker .32s ease-in-out .62s both;
        }

        .volt-loader__track {
          width: min(62vw, 220px);
          height: 2px;
          margin-top: 1.65rem;
          overflow: hidden;
          background: #343942;
        }

        .volt-loader__progress {
          width: 100%;
          height: 100%;
          transform: scaleX(0);
          transform-origin: left center;
          background: #f5c518;
          animation: volt-loader-progress 1.35s cubic-bezier(.22, .61, .36, 1) .08s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .volt-loader,
          .volt-loader__prefix,
          .volt-loader__name,
          .volt-loader__progress {
            animation-duration: .01ms;
            animation-delay: 0ms;
            animation-iteration-count: 1;
          }
        }
      `}</style>
      <div className="volt-loader__content">
        <div className="volt-loader__brand" aria-hidden="true">
          <span className="volt-loader__prefix">I.</span>
          <span className="volt-loader__name">VOLT</span>
        </div>
        <div className="volt-loader__track" aria-hidden="true">
          <div className="volt-loader__progress" />
        </div>
      </div>
    </div>
  );
}
