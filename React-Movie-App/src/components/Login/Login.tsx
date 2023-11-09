import { Link } from "react-router-dom";
import "./Login.css";
import {
	IoPersonCircleOutline,
	IoEyeOffOutline,
	IoEyeOutline,
	IoMailOutline,
} from "react-icons/io5";
import Button from "../Button/Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const defaultMessage: Message = {
	message: "",
	color: "",
};

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [{ message, color }, setMessage] = useState<Message>(defaultMessage);
	const [users, setUsers] = useState<Users>([]);
	const [loggedInUser, setLoggedInUser] = useState<number>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const usersNotVerified = localStorage.getItem("users");
		const loggedInUserNotVerified = localStorage.getItem("loggedIn");

		console.log(loggedInUserNotVerified);

		if (usersNotVerified && loggedInUserNotVerified) {
			setUsers(JSON.parse(usersNotVerified));
			setLoggedInUser(JSON.parse(loggedInUserNotVerified));
		}
	}, [localStorage]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(() => true);

		let validToLogIn = true;
		let userID;

		if (!(email && password)) {
			validToLogIn = false;
			setMessage({
				message: "Please complete all fields",
				color: "error",
			});
			setIsLoading(() => false);

			return;
		}

		for (let i = 0; i < users.length; i++) {
			if (users[i].email === email && users[i].password === password) {
				if (users[i].id !== loggedInUser) {
					userID = users[i].id;
					console.log(userID);
					validToLogIn = true;
					setMessage({
						message: "Log In Success",
						color: "nice",
					});
					break;
				} else {
					setMessage({
						message: "You are already logged in!",
						color: "error",
					});
				}
				break;
			} else {
				validToLogIn = false;
				setMessage({
					message: "The email or password are incorrect",
					color: "error",
				});
				setIsLoading(() => false);
			}
		}

		if (validToLogIn && userID) {
			console.log(userID);
			localStorage.setItem("loggedIn", JSON.stringify(userID));
			setIsLoading(() => false);
			window.location.href = "/";
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
					<Button text="Log In" type="submit" loading={isLoading} />
					<div className="register-link-container">
						Don't have and account yet?
						<Link to="/signup" className="register-link">
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
