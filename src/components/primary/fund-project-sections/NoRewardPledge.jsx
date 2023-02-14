const NoRewardPledge = () => {
    return (
        <div className="pledge-no-reward-container">
            <div className="pledge-no-reward-title">
                Pledge without a reward
            </div>
            <div className="pledge-input-full-container">
                <label htmlFor="pledge-no-reward" className="pledge-no-reward">
                    Pledge Amount
                </label>
                <div className="pledge-input-no-reward-container">
                    <input
                        type="text"
                        placeholder="10"
                        className={inputClass}
                        value={fundNoReward}
                        maxLength={4}
                        onKeyPress={(e) => preventLetters(e)}
                        onChange={(e) => {
                            setErrorClass("error");
                            setInputClass("pledge-no-reward-input")
                            setFundNoReward(e.currentTarget.value);
                        }}
                        onKeyPress={(e) => preventLetters(e)}
                    />
                    <div className={errorClass}>
                        Please enter pledge amount
                    </div>
                    <input
                        type="button"
                        value="Pledge"
                        className="btn-pledge-no-reward"
                        onClick={() => handleFundNoReward()}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoRewardPledge;