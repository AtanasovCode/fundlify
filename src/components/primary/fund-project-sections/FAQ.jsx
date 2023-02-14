import noRewardIcon from '../../../images/icons/no-reward-icon.png';
import Arrow from '../../../images/icons/faq-arrow.png';

const FAQ = ({faqClassName}) => {
    return (
        <div className="rewards-info-full-container">
            <div className="rewards-info-heading">
                <div className="rewards-info-img-container">
                    <img
                        src={noRewardIcon}
                        alt="cart icon"
                        className="rewards-info-img"
                    />
                </div>
                <div className="rewards-info-title">
                    Rewards aren't guaranteed.
                </div>
            </div>
            <div className="rewards-info-container">
                <div className="rewards-info">
                    Your pledge will support an ambitious creative
                    project that has yet to be developed. There’s
                    a risk that, despite a creator’s best efforts,
                    your reward will not be fulfilled, and we urge
                    you to consider this risk prior to pledging.
                    Fundlify is not responsible for project claims
                    or reward fulfillment.
                </div>
            </div>
            <div className="faq-container">
                <div className="faq-title">
                    Frequantly Asked Questions
                </div>
                <div className="faq" onClick={(e) => {
                    if (e.currentTarget.childNodes[1].className === "faq-a") {
                        e.currentTarget.childNodes[1].className = "faq-a show"
                        e.currentTarget.children[0].children[0].className = "faq-arrow show"
                    } else {
                        e.currentTarget.childNodes[1].className = "faq-a"
                        e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                    }
                }}>
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        How do I pledge?
                    </div>
                    <div className={faqClassName}>
                        Enter your pledge amount and
                        select a reward. Do not enter
                        any type of payment information.
                        This is not a real funding website.
                    </div>
                </div>
                <div
                    className="faq"
                    onClick={(e) => {
                        if (e.currentTarget.childNodes[1].className === "faq-a") {
                            e.currentTarget.childNodes[1].className = "faq-a show"
                            e.currentTarget.children[0].children[0].className = "faq-arrow show"
                        } else {
                            e.currentTarget.childNodes[1].className = "faq-a"
                            e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                        }
                    }}
                >
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        Whan is my card charged?
                    </div>
                    <div className={faqClassName}>
                        This is not a real funding website,
                        you do not have to upload card details
                        and your card will never be charged.
                    </div>
                </div>
                <div
                    className="faq"
                    onClick={(e) => {
                        if (e.currentTarget.childNodes[1].className === "faq-a") {
                            e.currentTarget.childNodes[1].className = "faq-a show"
                            e.currentTarget.children[0].children[0].className = "faq-arrow show"
                        } else {
                            e.currentTarget.childNodes[1].className = "faq-a"
                            e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                        }
                    }}
                >
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        So I am only charged when funding is complete?
                    </div>
                    <div className={faqClassName}>
                        You will never get charged, this is not
                        a real funding website.
                    </div>
                </div>
                <div
                    className="faq"
                    onClick={(e) => {
                        if (e.currentTarget.childNodes[1].className === "faq-a") {
                            e.currentTarget.childNodes[1].className = "faq-a show"
                            e.currentTarget.children[0].children[0].className = "faq-arrow show"
                        } else {
                            e.currentTarget.childNodes[1].className = "faq-a"
                            e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                        }
                    }}
                >
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        What can others see about my pledge?
                    </div>
                    <div className={faqClassName}>
                        Every project you pledge to
                        will be visible on your profile page.
                        However, other users cannot access
                        your profile page.
                    </div>
                </div>
                <div
                    className="faq"
                    onClick={(e) => {
                        if (e.currentTarget.childNodes[1].className === "faq-a") {
                            e.currentTarget.childNodes[1].className = "faq-a show"
                            e.currentTarget.children[0].children[0].className = "faq-arrow show"
                        } else {
                            e.currentTarget.childNodes[1].className = "faq-a"
                            e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                        }
                    }}
                >
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        What if I want to change my pledge?
                    </div>
                    <div className={faqClassName}>
                        You cannot change your pledge once you make it.
                        You are only allowed one pledge per account.
                    </div>
                </div>
                <div
                    className="faq"
                    onClick={(e) => {
                        if (e.currentTarget.childNodes[1].className === "faq-a") {
                            e.currentTarget.childNodes[1].className = "faq-a show"
                            e.currentTarget.children[0].children[0].className = "faq-arrow show"
                        } else {
                            e.currentTarget.childNodes[1].className = "faq-a"
                            e.currentTarget.childNodes[0].children[0].className = "faq-arrow"
                        }
                    }}
                >
                    <div className="faq-q">
                        <img
                            src={Arrow}
                            className="faq-arrow"
                        />
                        If this project is funded, how do I get my reward?
                    </div>
                    <div className={faqClassName}>
                        Rewards are all made up and not real.
                        You will not be getting any rewards.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;