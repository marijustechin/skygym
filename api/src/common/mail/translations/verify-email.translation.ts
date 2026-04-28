export const verifyEmailMessages = {
  lt: {
    subject: 'Patvirtinkite el. pašto adresą',
    subjectTitle: 'El. pašto patvirtinimas',
    greeting: 'Sveiki',
    intro:
      'Ačiū, kad užsiregistravote. Norėdami tęsti, patvirtinkite savo el. pašto adresą paspausdami mygtuką žemiau:',
    buttonText: 'Patvirtinti el. paštą',
    fallbackText:
      'Jei mygtukas neveikia, nukopijuokite šią nuorodą į naršyklę:',
    expiresText: 'Saugumo sumetimais ši nuoroda galioja 24 valandas.',
    ignoreText: 'Jei paskyros nekūrėte, šį laišką galite ignoruoti.',
    regards: 'Pagarbiai,',
    teamName: 'SkyGym komanda',
    footerText: 'Visos teisės saugomos.',
  },

  en: {
    subject: 'Verify your email address',
    subjectTitle: 'Email Verification',
    greeting: 'Hello',
    intro:
      'Thank you for registering. To continue, please verify your email address by clicking the button below:',
    buttonText: 'Verify Email',
    fallbackText:
      'If the button does not work, copy and paste this link into your browser:',
    expiresText: 'For security reasons, this link will expire in 24 hours.',
    ignoreText:
      'If you did not create an account, you can safely ignore this email.',
    regards: 'Best regards,',
    teamName: 'SkyGym Team',
    footerText: 'All rights reserved.',
  },

  ru: {
    subject: 'Подтвердите адрес электронной почты',
    subjectTitle: 'Подтверждение электронной почты',
    greeting: 'Здравствуйте',
    intro:
      'Спасибо за регистрацию. Чтобы продолжить, пожалуйста, подтвердите ваш адрес электронной почты, нажав кнопку ниже:',
    buttonText: 'Подтвердить email',
    fallbackText:
      'Если кнопка не работает, скопируйте и вставьте эту ссылку в браузер:',
    expiresText:
      'В целях безопасности эта ссылка действительна в течение 24 часов.',
    ignoreText:
      'Если вы не создавали аккаунт, вы можете просто проигнорировать это письмо.',
    regards: 'С уважением,',
    teamName: 'Команда SkyGym',
    footerText: 'Все права защищены.',
  },
} as const;

export type VerifyEmailLang = keyof typeof verifyEmailMessages;
