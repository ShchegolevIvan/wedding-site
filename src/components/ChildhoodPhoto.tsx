import { weddingConfig } from '../config/wedding';

const getAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function ChildhoodPhoto() {
  return (
    <section className="section childhood" aria-labelledby="childhood-photo">
      <div className="container childhood__grid">
        <div className="childhood__copy">
          <p className="section__kicker">Наша история</p>
          <h2 id="childhood-photo">С самого детства</h2>
        </div>
        <figure className="childhood__figure">
          <img
            src={getAssetUrl(weddingConfig.childhoodPhoto)}
            alt="Детская фотография Владимира и Екатерины"
          />
        </figure>
      </div>
    </section>
  );
}
