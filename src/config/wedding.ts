export const weddingConfig = {
  coupleNames: 'Владимир & Екатерина',
  weddingDate: '2026-08-05T15:20:00+03:00',
  displayDate: '5 августа 2026',
  displayTime: '15:20',
  ceremonyVenue: 'Дворец бракосочетания 2',
  ceremonyAddress: 'Фурштатская улица, 52',
  venue: 'Лофт "Ниагара"',
  address: 'Улица Космосомола, 2',
  mapUrl: 'https://maps.app.goo.gl/EPMgnQSKD2aefhuU7',
  ceremonyMapUrl: 'https://maps.google.com/?q=Фурштатская+улица+52',
  childhoodPhoto: '/couple-childhood.jpg',
  invitationText:
    'Один день в году станет для нас особенно важным, и мы хотим провести его в кругу близких и друзей! С большим удовольствием приглашаем вас на нашу свадьбу, которая состоится:',
  schedule: [
    {
      time: '15:20',
      title: 'Церемония бракосочетания',
      place: 'Дворец бракосочетания 2',
      address: 'Фурштатская улица, 52',
    },
    {
      time: '17:00',
      title: 'Праздничный банкет',
      place: 'Ресторан "Лямур"',
      address: 'проспект Испытателей 4, корп. 1',
    },
  ],
  rsvpEndpoint: import.meta.env.VITE_RSVP_ENDPOINT?.trim() || undefined,
};

export type ScheduleItem = (typeof weddingConfig.schedule)[number];
