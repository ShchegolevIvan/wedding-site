import { weddingConfig } from '../config/wedding';

const getAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function ChildhoodPhoto() {
  return (
    <section className="section childhood" aria-label="Детская фотография">
      <div className="container childhood__photo-wrap">
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
