import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Container } from 'reactstrap';

import * as FirestoreService from '../../services/firebase';

import './Faqs.scss';

const FaqLayout = lazy(() => import('../faqlayout/FaqLayout'));

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState();

  // useEffect(() => {
  //   getFAQs();
  // }, []);

  useEffect(() => {
    FirestoreService.getFaqList()
      .then((doc) => {
        if (doc.exists) {
          let faqs = [];

          Object.entries(doc.data().name).forEach(
            ([key, value]) => (faqs = [...faqs, { name: key, data: value }])
          );

          setFaqs(faqs);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <Container className="faqs-home">
      <Suspense fallback={<div>Loading...</div>}>
        {faqs.length > 0 ? (
          <div>
            <div className="mb-2">FAQs About Us:</div>

            <FaqLayout faqdata={faqs} />
          </div>
        ) : (
          ''
        )}
      </Suspense>
    </Container>
  );
};

export default Faqs;
