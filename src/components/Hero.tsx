import { weddingConfig } from '../config/wedding';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content container">
        <p className="eyebrow">Свадебное приглашение</p>
        <h1 id="hero-title">{weddingConfig.coupleNames}</h1>
        <p className="hero__date">
          {weddingConfig.displayDate} в {weddingConfig.displayTime}
        </p>
        <p className="hero__text">
          Мы будем счастливы разделить этот день с вами
        </p>
        <a className="button button--primary" href="#rsvp">
          Подтвердить присутствие
        </a>
      </div>
    </section>
  );
}
