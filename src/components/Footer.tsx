import { weddingConfig } from '../config/wedding';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__names">{weddingConfig.coupleNames}</p>
        <p>
          {weddingConfig.displayDate} в {weddingConfig.displayTime}
        </p>
        <p>До встречи на нашем празднике любви.</p>
      </div>
    </footer>
  );
}
