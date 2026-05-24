import { useEffect, useRef, useState } from 'react';

export default function PaperHeart() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOpen(entry.isIntersecting);
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`section paper-heart ${isOpen ? 'paper-heart--open' : ''}`}
      ref={sectionRef}
      aria-labelledby="paper-heart-title"
    >
      <div className="container paper-heart__grid">
        <div className="paper-heart__copy">
          <h2 id="paper-heart-title">Важный день уже близко</h2>
          <p>
            Пусть это приглашение раскроется как маленькое бумажное сердце и
            напомнит о самом теплом: мы очень ждем вас рядом.
          </p>
        </div>

        <div className="paper-heart__stage" aria-hidden="true">
          <div className="paper-heart__shadow" />
          <svg
            className="paper-heart__svg"
            viewBox="0 0 260 240"
            role="presentation"
          >
            <defs>
              <clipPath id="heart-left">
                <rect width="130" height="240" x="0" y="0" />
              </clipPath>
              <clipPath id="heart-right">
                <rect width="130" height="240" x="130" y="0" />
              </clipPath>
              <linearGradient id="heart-paper-left" x1="30" x2="142" y1="30" y2="210">
                <stop offset="0" stopColor="#efd0d2" />
                <stop offset="1" stopColor="#c98f96" />
              </linearGradient>
              <linearGradient id="heart-paper-right" x1="220" x2="105" y1="34" y2="210">
                <stop offset="0" stopColor="#e7bdc1" />
                <stop offset="1" stopColor="#bd7f88" />
              </linearGradient>
            </defs>
            <g className="paper-heart__wing paper-heart__wing--left" clipPath="url(#heart-left)">
              <path
                className="paper-heart__path"
                d="M130 218C61 170 22 126 28 82c5-36 32-61 66-58 20 2 35 13 46 34 11-21 26-32 46-34 34-3 61 22 66 58 6 44-33 88-122 136Z"
                fill="url(#heart-paper-left)"
              />
            </g>
            <g className="paper-heart__wing paper-heart__wing--right" clipPath="url(#heart-right)">
              <path
                className="paper-heart__path"
                d="M130 218C61 170 22 126 28 82c5-36 32-61 66-58 20 2 35 13 46 34 11-21 26-32 46-34 34-3 61 22 66 58 6 44-33 88-122 136Z"
                fill="url(#heart-paper-right)"
              />
            </g>
            <path
              className="paper-heart__highlight"
              d="M73 58c20-19 48-14 62 23"
              fill="none"
            />
            <path
              className="paper-heart__fold-line"
              d="M130 58v160M74 78l56 140M186 78l-56 140"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
