import { useState } from "react";
import { IoPersonOutline, IoEllipseSharp } from "react-icons/io5";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile({ profile }: { profile: Profile }) {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((open) => !open);
	};

	return (
		<>
			<div className={`profile-container`} onClick={handleClick}>
				<IoPersonOutline />
			</div>
			<div className={`mini-profile ${!open && "hidden"}`}>
				<div className="mini-profile-item mini-profile-top">
					<h2 className="mini-profile-name">
						¡Hi, {profile.name}!
					</h2>
					<h2 className="mini-profile-mail">{profile.email}</h2>
				</div>
				<div className="mini-profile-item mini-profile-middle-bottom">
					<h2 className="middle-item mini-profile-age">
						{profile.age} years
					</h2>
					<IoEllipseSharp />
					<h2 className="middle-item mini-profile-gender">
						{profile.gender}
					</h2>
				</div>
				<div className="mini-profile-item mini-profile-bottom">
					<Link
						to={`/edit-profile/${profile.id}`}
						className="mini-profile-button edit"
					>
						Edit Profile
					</Link>
					<Link
						to={`/logout`}
						className="mini-profile-button log-out"
					>
						Log Out
					</Link>
				</div>
			</div>
		</>
	);
}
