import { Link } from "react-router-dom";
import "./Guest.css";

export default function Guest() {
	return <div className="guest-container">
		<Link to="/signup" className="guest-link guest-signup">Sign Up</Link>
		<Link to="/login" className="guest-link guest-login">Log In</Link>
	</div>;
}
