import React from 'react';
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const {
    t,
  } = useTranslation();

  return (
    <div>
      <h1>Faq</h1>
      <p>
        {t('faqBody')}
      </p>
    </div>
  );
};


export default Faq;
