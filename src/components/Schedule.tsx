import { weddingConfig } from '../config/wedding';

export default function Schedule() {
  return (
    <section className="section section--tinted" aria-labelledby="schedule">
      <div className="container">
        <h2 id="schedule">Расписание</h2>
        <div className="timeline">
          {weddingConfig.schedule.map((item) => (
            <article className="timeline__item" key={`${item.time}-${item.title}`}>
              <time>{item.time}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <small>{item.address}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
