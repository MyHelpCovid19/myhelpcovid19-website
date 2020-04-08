import React, { useState, useEffect } from 'react';

import {
  Collapse,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
} from 'reactstrap';

import './FaqLayout.scss';

function FaqLayout(props) {
  const [collapse, setCollapse] = useState(-1);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    let channelDetails = [];

    Object.entries(props.faqdata).forEach(([key, value]) =>
      channelDetails.push({ name: key, data: value })
    );

    setFaqs(channelDetails);
  }, [props.faqdata]);

  return (
    <Container className="faq-layout">
      {faqs.map(function (item, index) {
        return (
          <Card key={index} className="fadeInUp">
            <CardBody>
              <CardTitle
                onClick={() => {
                  setCollapse(index);
                }}
              >
                <span
                  style={{
                    color: collapse === index ? 'blue' : 'black',
                  }}
                >
                  Q. {item.data.name}
                  <span className="float-right">
                    {collapse === index ? '-' : '+'}
                  </span>
                </span>
              </CardTitle>
              <Collapse isOpen={collapse === index}>
                <CardText>
                  Ans. <span>{item.data.data}</span>
                </CardText>
              </Collapse>
            </CardBody>
          </Card>
        );
      })}
    </Container>

    // <div>
    //   {faq.map((faq, index) => {
    //     return (
    //       <Card key={index} className="fadeInUp">
    //         <CardBody>
    //           <CardTitle id={'toggler' + index}>
    //             <span>
    //               <h6>
    //                 Q. {faq.question}
    //                 <span className="float-right">
    //                   {('#toggler' + index).isOpen() ? '+' : '-'}
    //                 </span>
    //               </h6>
    //             </span>
    //           </CardTitle>
    //           <UncontrolledCollapse toggler={'#toggler' + index}>
    //             <CardText>
    //               Ans. <span>{faq.answer}</span>
    //             </CardText>
    //             <CardText>
    //               <small className="text-muted">{faq.source}</small>
    //             </CardText>
    //           </UncontrolledCollapse>
    //         </CardBody>
    //       </Card>
    //     );
    //   })}
    // </div>
  );
}

export default FaqLayout;
