import './styles/nav.css';

const Nav = () => {
    return (
        <nav className="nav-container">
            <div className="nav-logo">
                Fundlify
            </div>
            <div className="nav-info">
                <div className="nav-links">
                    Discover
                </div>
                <div className="nav-links">
                    How It Works
                </div>
                <div className="nav-links">
                    Sign Up
                </div>
            </div>
        </nav>
    );
}

export default Nav;