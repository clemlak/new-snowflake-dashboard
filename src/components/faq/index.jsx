import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
} from 'reactstrap';

import QA from './qa';

import faqJson from '../../common/config/faq.json';

const Faq = () => {
  const {
    t,
  } = useTranslation();

  return (
    <div>
      <Row>
        <Col>
          <h1>Faq</h1>
          <p>
            {t('faqBody')}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="accordion">
            {faqJson.map(qa => (
              <QA
                key={qa.question}
                question={qa.question}
                answer={qa.answer}
              />
            ))}

          </div>

        </Col>
      </Row>

    </div>
  );
};


export default Faq;
