import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import "../styles/Navigation.css";

const Navigation = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading..</div>;
	}

	return (
		<nav>
			<div className="nav-links">
				<Link to="/">Home</Link>
				<Link to="/favorites">Favorites</Link>
			</div>
			{isAuthenticated && user && (
				<div className="user-info">
					{user.picture ? (
						<img
							src={user.picture}
							alt="Profile picture"
							className="profile-picture"
						/>
					) : null}
					<span className="userName">{user.name}</span>
					<LogoutButton />
				</div>
			)}
		</nav>
	);
};

export default Navigation;
