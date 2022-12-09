import { Link } from 'react-router-dom';
import '../../styles/congratulations.css';

const Congratulations = () => {
    return (
        <div className="congratulations-container">
            <div className="congratulations-box">
                <div className="congratulations-info-container">
                    <div className="congratulations-title">
                        Congratulations! Your project has
                        successfully been created.
                    </div>
                    <div className="congratulations-subtitle">
                        You can now view your project or,
                        you can browser other projects created
                        by our creators.
                    </div>
                </div>
                <div className="congratulations-btn-container">
                    <Link
                        to="/current-project"
                        className="congratulations-btn-my-project congrats-btn"
                    >
                        View my project
                    </Link>
                    <Link
                        to="/discover"
                        className="congratulations-btn-explore congrats-btn"
                    >
                        Explore other projects
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Congratulations;