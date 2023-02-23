import { Link } from 'react-router-dom';
import * as Styled from '../../styles/DonationFinished.Styled';
import '../../styles/donation-finished.css';
import check from '../../images/icons/checkmark.png';

const DonationFinished = () => {
    return (
        <Styled.Container>
            <Styled.Finished>
                <Styled.Icon
                    src={check}
                    alt="checkmark icon"
                />
                <Styled.Heading>
                    <Styled.Title>
                        Thank you for your support!
                    </Styled.Title>
                    <Styled.Subtitle>
                        Your donation will go towards bringing this project to life.
                        You will recieve your rewards on the estimated delivery date.
                    </Styled.Subtitle>
                </Styled.Heading>
                <Styled.Button
                    type="button"
                    to={`/projects/${sessionStorage.getItem("currentDocumentId")}`}
                    replace={true}
                >
                    Continue
                </Styled.Button>
            </Styled.Finished>
        </Styled.Container>
    );
}

export default DonationFinished;