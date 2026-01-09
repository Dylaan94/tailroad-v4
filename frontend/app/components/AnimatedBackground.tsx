'use client'

export default function AnimatedBackground() {
  return (
    <>
      <style jsx>{`
        @keyframes animate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
            border-radius: 0;
          }
          100% {
            transform: translateY(-2000px) rotate(720deg);
            opacity: 0;
            border-radius: 50%;
          }
        }

        .animated-bg {
          position: absolute;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          margin: 0;
          padding: 0;
          background: white;
          overflow: hidden;
          z-index: 0;
        }

        .animated-bg::before,
        .animated-bg::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: 200px;
          z-index: 2;
          pointer-events: none;
        }

        .animated-bg::before {
          top: 0;
          background: linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .animated-bg::after {
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          background: linear-gradient(to top, white 0%, rgba(255, 255, 255, 0.95) 20%, rgba(255, 255, 255, 0.7) 50%, transparent 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .animated-bg li {
          position: absolute;
          display: block;
          list-style: none;
          width: 20px;
          height: 20px;
          background: rgba(156, 163, 175, 0.1);
          border: 1px solid rgba(156, 163, 175, 0.3);
          animation: animate 19s linear infinite;
        }

        .animated-bg li:nth-child(0) {
          left: 60%;
          width: 169px;
          height: 169px;
          bottom: -169px;
          animation-delay: 1s;
        }

        .animated-bg li:nth-child(1) {
          left: 74%;
          width: 186px;
          height: 186px;
          bottom: -186px;
          animation-delay: 4s;
        }

        .animated-bg li:nth-child(2) {
          left: 58%;
          width: 133px;
          height: 133px;
          bottom: -133px;
          animation-delay: 3s;
        }

        .animated-bg li:nth-child(3) {
          left: 53%;
          width: 102px;
          height: 102px;
          bottom: -102px;
          animation-delay: 5s;
        }

        .animated-bg li:nth-child(4) {
          left: 80%;
          width: 116px;
          height: 116px;
          bottom: -116px;
          animation-delay: 9s;
        }

        .animated-bg li:nth-child(5) {
          left: 54%;
          width: 193px;
          height: 193px;
          bottom: -193px;
          animation-delay: 16s;
        }

        .animated-bg li:nth-child(6) {
          left: 24%;
          width: 120px;
          height: 120px;
          bottom: -120px;
          animation-delay: 12s;
        }

        .animated-bg li:nth-child(7) {
          left: 2%;
          width: 129px;
          height: 129px;
          bottom: -129px;
          animation-delay: 21s;
        }

        .animated-bg li:nth-child(8) {
          left: 1%;
          width: 127px;
          height: 127px;
          bottom: -127px;
          animation-delay: 19s;
        }

        .animated-bg li:nth-child(9) {
          left: 60%;
          width: 172px;
          height: 172px;
          bottom: -172px;
          animation-delay: 41s;
        }
      `}</style>
      <ul className="animated-bg">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  )
}
