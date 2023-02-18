import { useEffect, useState } from 'react';
import { uuidv4 } from '@firebase/util';
import * as Styled from '../../../styles/FAQ.Styled';
import noRewardIcon from '../../../images/icons/no-reward-icon.png';
import Arrow from '../../../images/icons/faq-arrow.png';

const FAQ = ({ faqClassName }) => {


    const [questions, setQuestions] = useState([
        {
            q: "How do I pledge?",
            a: "Your pledge will not help support any real-life project. This is a demonstrational website and it does not deal with real projects and donations.",
            show: false,
            id: uuidv4(),
        },
        {
            q: "Can you pledge multiple times on the same project?",
            a: "You are limited to one pledge per project, you can freely explore and donate to other projects.",
            show: false,
            id: uuidv4(),
        },
        {
            q: "When can I expect my reward?",
            a: "Since this is not a real crowdfunding website, there will be no rewards.",
            show: false,
            id: uuidv4(),
        },
        {
            q: "Can I create my own project?",
            a: "Yes, you can create your own project, provided that you are registered.",
            show: false,
            id: uuidv4(),
        },
    ])
    const [update, setUpdate] = useState(0);

    const handleShow = (question) => {
        const index = questions.map((e) => e.id).indexOf(question); //Grabs the index of the object
    
        let temp = questions;
    
        temp.map((q, idx) => {
          if (idx === index) {
            if (q.show === false) {
              q.show = true;
            } else {
                q.show = false;
            }
          }
        })
        setUpdate(update + 1);
        setQuestions(temp);

      }

    return (
        <Styled.Container>
            <Styled.Heading>
                <Styled.ImageContainer>
                    <Styled.Image
                        src={noRewardIcon}
                        alt="cart icon"
                    />
                </Styled.ImageContainer>
                <Styled.Title>
                    Rewards aren't guaranteed.
                </Styled.Title>
            </Styled.Heading>
            <Styled.Desc>
                Your pledge will not help support any
                real-life project. This is a demonstrational website
                and it does not deal wiht real projects and donations.
                You can still pledge to projects and create your own.
            </Styled.Desc>
            <Styled.FAQContainer>
                <Styled.FAQTitle>
                    Frequantly Asked Questions
                </Styled.FAQTitle>
                {
                    questions.map((faq) => {
                        return (
                            <Styled.FAQ  key={faq.id}>
                                <Styled.Question onClick={() => handleShow(faq.id)}>
                                    <Styled.Arrow
                                        src={Arrow}
                                        show={faq.show}
                                    />
                                    {faq.q}
                                </Styled.Question>
                                <Styled.Answer show={faq.show}>
                                    {faq.a}
                                </Styled.Answer>
                            </Styled.FAQ>
                        );
                    })
                }
            </Styled.FAQContainer>
        </Styled.Container>
    );
}

export default FAQ;