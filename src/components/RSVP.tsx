import { FormEvent, useState } from 'react';
import { weddingConfig } from '../config/wedding';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

type FormErrors = {
  fullName?: string;
  celebrationAttendance?: string;
  registryAttendance?: string;
};

const initialForm = {
  fullName: '',
  celebrationAttendance: '',
  registryAttendance: '',
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
      nextErrors.fullName = 'Напишите Ваше ФИО';
    }

    if (!form.celebrationAttendance) {
      nextErrors.celebrationAttendance =
        'Выберите, сможете ли Вы присутствовать на торжестве';
    }

    if (!form.registryAttendance) {
      nextErrors.registryAttendance =
        'Выберите, планируете ли Вы присутствовать в ЗАГСе';
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
          <h2 id="rsvp-title">Подтвердите присутствие</h2>
          <p>
            Пожалуйста, ответьте на несколько вопросов, чтобы мы смогли
            подготовиться к встрече с вами.
          </p>
        </div>

        <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Напишите Ваше ФИО</span>
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
            <legend>Сможете ли Вы присутствовать на нашем торжестве?</legend>
            <div className="radio-grid">
              <label>
                <input
                  type="radio"
                  name="celebrationAttendance"
                  value="Да"
                  checked={form.celebrationAttendance === 'Да'}
                  onChange={(event) =>
                    updateField('celebrationAttendance', event.target.value)
                  }
                />
                <span>Да, буду</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="celebrationAttendance"
                  value="Нет"
                  checked={form.celebrationAttendance === 'Нет'}
                  onChange={(event) =>
                    updateField('celebrationAttendance', event.target.value)
                  }
                />
                <span>Нет, не смогу</span>
              </label>
            </div>
            {errors.celebrationAttendance && (
              <small className="field-error">
                {errors.celebrationAttendance}
              </small>
            )}
          </fieldset>

          <fieldset>
            <legend>Планируете ли Вы присутствовать в ЗАГСе?</legend>
            <div className="radio-grid">
              <label>
                <input
                  type="radio"
                  name="registryAttendance"
                  value="Да"
                  checked={form.registryAttendance === 'Да'}
                  onChange={(event) =>
                    updateField('registryAttendance', event.target.value)
                  }
                />
                <span>Да</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="registryAttendance"
                  value="Нет"
                  checked={form.registryAttendance === 'Нет'}
                  onChange={(event) =>
                    updateField('registryAttendance', event.target.value)
                  }
                />
                <span>Нет</span>
              </label>
            </div>
            {errors.registryAttendance && (
              <small className="field-error">{errors.registryAttendance}</small>
            )}
          </fieldset>

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
