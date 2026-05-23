import { FormEvent, useState } from 'react';
import { weddingConfig } from '../config/wedding';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

type FormErrors = {
  fullName?: string;
  attendance?: string;
};

const initialForm = {
  fullName: '',
  attendance: '',
  guestsCount: '1',
  transfer: 'no',
  foodPreference: 'none',
  comment: '',
};

const isGoogleAppsScriptEndpoint = (endpoint: string) =>
  endpoint.includes('script.google.com/macros/');

const isGoogleAppsScriptEditorUrl = (endpoint: string) =>
  endpoint.includes('script.google.com/') && endpoint.includes('/home/projects/');

export default function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [message, setMessage] = useState('');

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Укажите имя и фамилию';
    }

    if (!form.attendance) {
      nextErrors.attendance = 'Выберите вариант ответа';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitState('loading');
    setMessage('');

    const payload = {
      ...form,
      guestsCount: Number(form.guestsCount),
      submittedAt: new Date().toISOString(),
    };

    if (!weddingConfig.rsvpEndpoint) {
      console.info('VITE_RSVP_ENDPOINT is not set. RSVP works in demo mode.', payload);
      setSubmitState('success');
      setMessage(
        'Спасибо! Форма сейчас работает в демо-режиме, ваш ответ не был отправлен в таблицу.',
      );
      setForm(initialForm);
      return;
    }

    if (isGoogleAppsScriptEditorUrl(weddingConfig.rsvpEndpoint)) {
      console.error(
        'VITE_RSVP_ENDPOINT points to the Apps Script editor, not to a deployed Web App URL.',
        weddingConfig.rsvpEndpoint,
      );
      setSubmitState('error');
      setMessage(
        'Форма подключена к ссылке редактора Apps Script. Вставьте Web App URL, который заканчивается на /exec.',
      );
      return;
    }

    try {
      if (isGoogleAppsScriptEndpoint(weddingConfig.rsvpEndpoint)) {
        await fetch(weddingConfig.rsvpEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } else {
        const response = await fetch(weddingConfig.rsvpEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`RSVP request failed with status ${response.status}`);
        }
      }

      setSubmitState('success');
      setMessage('Спасибо! Мы получили ваш ответ.');
      setForm(initialForm);
    } catch (error) {
      console.error('Failed to submit RSVP form', error);
      setSubmitState('error');
      setMessage(
        'Не удалось отправить форму. Попробуйте позже или свяжитесь с нами напрямую.',
      );
    }
  };

  return (
    <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="container">
        <div className="rsvp__intro">
          <p className="section__kicker">RSVP</p>
          <h2 id="rsvp-title">Подтвердите присутствие</h2>
          <p>
            Пожалуйста, заполните форму, чтобы мы смогли подготовить праздник с
            заботой о каждом госте.
          </p>
        </div>

        <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Имя и фамилия</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <small className="field-error" id="fullName-error">
                {errors.fullName}
              </small>
            )}
          </label>

          <fieldset>
            <legend>Ваш ответ</legend>
            <div className="radio-grid">
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={form.attendance === 'yes'}
                  onChange={(event) => updateField('attendance', event.target.value)}
                />
                <span>Приду</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={form.attendance === 'no'}
                  onChange={(event) => updateField('attendance', event.target.value)}
                />
                <span>Не приду</span>
              </label>
            </div>
            {errors.attendance && (
              <small className="field-error">{errors.attendance}</small>
            )}
          </fieldset>

          <div className="form-grid">
            <label>
              <span>Количество гостей</span>
              <input
                type="number"
                min="1"
                max="10"
                value={form.guestsCount}
                onChange={(event) => updateField('guestsCount', event.target.value)}
              />
            </label>

            <label>
              <span>Нужен ли трансфер</span>
              <select
                value={form.transfer}
                onChange={(event) => updateField('transfer', event.target.value)}
              >
                <option value="no">Нет</option>
                <option value="yes">Да</option>
              </select>
            </label>
          </div>

          <label>
            <span>Предпочтения по еде</span>
            <select
              value={form.foodPreference}
              onChange={(event) => updateField('foodPreference', event.target.value)}
            >
              <option value="none">Нет</option>
              <option value="meat">Мясо</option>
              <option value="fish">Рыба</option>
              <option value="vegetarian">Вегетарианское</option>
            </select>
          </label>

          <label>
            <span>Комментарий</span>
            <textarea
              rows={4}
              value={form.comment}
              onChange={(event) => updateField('comment', event.target.value)}
            />
          </label>

          <button
            className="button button--primary"
            type="submit"
            disabled={submitState === 'loading'}
          >
            {submitState === 'loading' ? 'Отправляем...' : 'Отправить ответ'}
          </button>

          {message && (
            <p className={`form-message form-message--${submitState}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
