import { Link } from "react-router-dom";
import "./Login.css";
import {
	IoPersonCircleOutline,
	IoEyeOffOutline,
	IoEyeOutline,
	IoMailOutline,
} from "react-icons/io5";
import Button from "../components/Button/Button";
import { ChangeEvent, FormEvent, useState } from "react";

const defaultMessage = {
	message: "",
	color: "",
};

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [{ message, color }, setMessage] = useState(defaultMessage);
	const [users, setUsers] = useState<Users>([]);

	const usersNotVerified = localStorage.getItem("users");

	if (usersNotVerified) {
		setUsers(JSON.parse(usersNotVerified));
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email && password) {
			setMessage(defaultMessage);
			if (users.length !== 0) {
				setMessage(defaultMessage);
				users.forEach((user) => {
					console.log("Log In Success");
					if (user.mail === email && user.password === password) {
						console.log("Log In Success");
						setMessage({
							message: "Log In Success",
							color: "success",
						});
					} else {
						console.log("Log In Fail");
						setMessage({
							message: "The email or password are incorrect",
							color: "red",
						});
					}
				});
			} else {
				setMessage({
					message: "The email or password are incorrect",
					color: "red",
				});
			}
		} else {
			setMessage({
				message: "Please complete all fields",
				color: "error",
			});
		}
	};

	const handleVisivilityChange = () => {
		setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
	};

	const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<div className="login-container">
			<img
				src="https://i.blogs.es/4b7486/4k/1366_2000.jpg"
				className="title-background-login"
				draggable="false"
			/>
			<div className="login">
				<div className="login-icon">
					<div className="sub-icon-container">
						<IoPersonCircleOutline />
					</div>
				</div>
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="input-div mail-input-div">
						<input
							type="email"
							name="mail"
							className="login-input"
							id="login-input-mail"
							placeholder="me@example.com"
							autoComplete="off"
							onChange={handleMailChange}
						/>
						<div className="mail-icon">
							<IoMailOutline />
						</div>
					</div>
					<div className="input-div password-div">
						<input
							type={isPasswordVisible ? "text" : "password"}
							name="password"
							className="login-input"
							id="login-input-password"
							placeholder="Put your password"
							autoComplete="off"
							onChange={handlePasswordChange}
						/>
						<div
							className="show-password"
							onClick={handleVisivilityChange}
						>
							{isPasswordVisible ? (
								<IoEyeOutline />
							) : (
								<IoEyeOffOutline />
							)}
						</div>
					</div>
					<div className={`message ${color}`}>{message}</div>
					<Button text="Log In" type="submit" />
					<div className="register-link-container">
						Don't have and account yet?
						<Link to="/register" className="register-link">
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
