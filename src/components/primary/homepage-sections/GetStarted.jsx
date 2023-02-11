const GetStarted = ({
    Link,
    illustration,
}) => {
    return (
        <div className="get-started-container">
            <div className="get-started-text-container">
                <div className="get-started-heading">
                    Ready to get started?
                    Join thousands of others today!
                </div>
                <div className="get-started-btn">
                    <Link
                        to="/sign-up"
                        className="create-acc-btn started-btn"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/how-it-works"
                        className="how-it-works-btn started-btn"
                    >
                        How it works
                    </Link>
                </div>
            </div>
            <div className="get-started-icon-container">
                <img
                    src={illustration}
                    alt="illustration"
                    className="illustration-icon"
                />
            </div>
        </div>
    );
}

export default GetStarted;