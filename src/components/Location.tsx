import { weddingConfig } from '../config/wedding';

export default function Location() {
  return (
    <section className="section location" aria-labelledby="location">
      <div className="container location__grid">
        <div>
          <p className="section__kicker">Локация</p>
          <h2 id="location">Где встречаемся</h2>
          <div className="location__details">
            <h3>{weddingConfig.ceremonyVenue}</h3>
            <p>{weddingConfig.ceremonyAddress}</p>
            <a
              className="text-link"
              href={weddingConfig.ceremonyMapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Открыть церемонию на карте
            </a>
          </div>
        </div>
        <div className="location__panel">
          <h3>{weddingConfig.venue}</h3>
          <p className="location__address">{weddingConfig.address}</p>
          <p>Ждем вас на праздничном банкете в 17:00.</p>
          <a
            className="button button--secondary"
            href={weddingConfig.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            Открыть на карте
          </a>
        </div>
      </div>
    </section>
  );
}
