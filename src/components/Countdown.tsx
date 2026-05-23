import { useEffect, useMemo, useState } from 'react';
import { weddingConfig } from '../config/wedding';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeLeft = (targetDate: Date): TimeLeft | null => {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export default function Countdown() {
  const targetDate = useMemo(() => new Date(weddingConfig.weddingDate), []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(targetDate),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="section section--compact" aria-labelledby="countdown">
      <div className="container">
        <p className="section__kicker">До свадьбы осталось</p>
        <h2 id="countdown">Обратный отсчет</h2>
        {timeLeft ? (
          <div className="countdown" aria-live="polite">
            <CountdownItem value={timeLeft.days} label="дней" />
            <CountdownItem value={timeLeft.hours} label="часов" />
            <CountdownItem value={timeLeft.minutes} label="минут" />
            <CountdownItem value={timeLeft.seconds} label="секунд" />
          </div>
        ) : (
          <p className="muted">
            Этот прекрасный день уже наступил. Спасибо, что были рядом с нами.
          </p>
        )}
      </div>
    </section>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown__item">
      <span>{String(value).padStart(2, '0')}</span>
      <small>{label}</small>
    </div>
  );
}
