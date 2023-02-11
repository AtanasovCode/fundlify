const ProjectStats = ({
    backers,
    totalFundsRaised,
    formatNumber,
    totalProjects,
}) => {
    return (
        <div className="funds-raised-full-container">
            <div className="fundlify-funds-desc">
                <div className="title">
                    Bring A
                    <span className="creative">
                        creative
                    </span>
                    Project To Life!
                </div>
                <div className="subtitle">
                    On Fundlify:
                </div>
            </div>
            <div className="funds-raised-container">
                <div className="fund-stats-container">
                    <div className="fund-number">
                        {formatNumber(totalProjects)}
                    </div>
                    <div className="fund-text">Projects Funded</div>
                </div>
                <div className="fund-stats-container">
                    <div className="fund-number">
                        ${formatNumber(totalFundsRaised)}
                    </div>
                    <div className="fund-text">Funds Raised</div>
                </div>
                <div className="fund-stats-container">
                    <div className="fund-number">
                        {formatNumber(backers)}
                    </div>
                    <div className="fund-text">Pledges Made</div>
                </div>
            </div>
        </div>
    );
}

export default ProjectStats;