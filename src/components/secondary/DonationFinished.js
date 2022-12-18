import { Link } from 'react-router-dom';
import '../../styles/donation-finished.css';
import check1 from '../../images/icons/tick.png';
import check2 from '../../images/icons/checkmark.png';
import check3 from '../../images/icons/verified.png';


const DonationFinished = () => {
    return (
        <div className="donation-finished-container">
            <div className="donation-finished-icon-container">
                <img
                    src={check2}
                    alt="checkmark icon"
                    className="checkmark-icon"
                />
            </div>
            <div className="donation-finished-heading">
                <div className="donation-finished-title">
                    Thank you for your support!
                </div>
                <div className="donation-finished-subtitle">
                    Your donation will go towards bringing this project to life.
                    You will recieve your rewards on the estimated delivery date.
                </div>
            </div>
            <div className="donation-finished-btn-container">
                <Link
                    type="button"
                    className="donation-finished-btn"
                >
                    Continue
                </Link>
            </div>
        </div>
    );
}

export default DonationFinished;