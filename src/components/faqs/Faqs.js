import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import FaqLayout from '../faqlayout/FaqLayout';
import * as FirestoreService from '../../services/firebase';

import './Faqs.scss';

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState();

  // useEffect(() => {
  //   getFAQs();
  // }, []);

  useEffect(() => {
    FirestoreService.getFaqList()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          let faqs = [];

          Object.entries(doc.data().name).forEach(([key, value]) =>
            faqs.push({ name: key, data: value })
          );

          setFaqs(faqs);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setError(err);
      });
  }, []);

  return (
    <Container className="faqs-home">
      {faqs.length > 0 ? (
        <div>
          <div className="mb-2">FAQs About Us:</div>
          <FaqLayout faqdata={faqs} />
        </div>
      ) : (
        ''
      )}
    </Container>
  );
};

export default Faqs;
