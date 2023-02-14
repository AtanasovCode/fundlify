


const PledgeComponent = () => {
    return (
        <div className="pledge-container">
            <div className="pledge-amount">
                Pledge ${project.pledge1}
            </div>
            <div className="tier-pledge-name">
                {project.tierOne}
            </div>
            <div className="tier-description">
                {project.reward1}
            </div>
            <div className="tier-backers-amount">
                {project.backersTierOne} backers
            </div>
            <div className="pledge-input-container">
                <div className="pledge-input-label">
                    Bonus support <span className="optional">(Optional)</span>
                </div>
                <div className="pledge-input">
                    <input
                        type="input"
                        className="pledge-input-amount"
                        placeholder="10"
                        maxLength={4}
                        onKeyPress={(e) => preventLetters(e)}
                        onChange={(e) => {
                            setPledgeAmount(e.currentTarget.value);
                        }}
                    />
                    <input
                        type="button"
                        className="pledge-btn"
                        value={
                            pledgeAmount !== "" ?
                                `Pledge $${formatNumber(parseInt(project.pledge1) + parseInt(pledgeAmount))}`
                                :
                                `Pledge $${formatNumber(parseInt(project.pledge1))}`
                        }
                        onClick={() => {
                            let backersTier = "backersTierOne";
                            handleFundProject(project.pledge1, backersTier)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PledgeComponent;