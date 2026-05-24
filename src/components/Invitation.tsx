import { weddingConfig } from '../config/wedding';

export default function Invitation() {
  return (
    <section className="section invitation" aria-labelledby="invitation">
      <div className="container container--narrow">
        <h2 id="invitation">Мы ждем вас</h2>
        <p className="invitation__text">{weddingConfig.invitationText}</p>
        <p className="invitation__date">{weddingConfig.displayDate}</p>
      </div>
    </section>
  );
}
