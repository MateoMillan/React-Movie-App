import { Link } from "react-router-dom";
import "./signup.css";
import {
	IoPersonCircleOutline,
	IoEyeOffOutline,
	IoEyeOutline,
	IoMailOutline,
	IoPersonOutline,
	IoHourglassOutline,
	IoMaleOutline,
	IoFemaleOutline,
} from "react-icons/io5";
import Button from "../Button/Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Select from "../Select/Select";

const defaultMessage = {
	message: "",
	color: "",
};

export default function signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [name, setName] = useState("");
	const [age, setAge] = useState(1);
	const [gender, setGender] = useState("Male");
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [{ message, color }, setMessage] = useState(defaultMessage);
	const [users, setUsers] = useState<Users>([]);

	useEffect(() => {
		let usersNotVerified = localStorage.getItem("users");

		if (usersNotVerified) {
			setUsers(JSON.parse(usersNotVerified));
		}
	}, [localStorage]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		setIsLoading(() => true);
		event.preventDefault();
		let validToRegister = true;

		if (!(email && password && passwordConfirm && age && name && gender)) {
			setMessage({
				message: "Please complete all fields",
				color: "error",
			});
			setIsLoading(() => false);
			validToRegister = false;
			return;
		}

		users.forEach((user) => {
			if (user.email === email) {
				setMessage({
					message: "This email is already registered, Log In!",
					color: "error",
				});
				validToRegister = false;
				setIsLoading(() => false);
				return;
			}
		});

		if (password !== passwordConfirm) {
			setMessage({
				message: "The passwords don't match",
				color: "error",
			});
			validToRegister = false;
			setIsLoading(() => false);
			return;
		}

		if (validToRegister) {
			let newID = Math.floor(Math.random() * 10000);

			users.forEach((user) => {
				if (user.id === newID) {
					newID = Math.floor(Math.random() * 10000);
				}
			});

			const user = {
				id: newID,
				name: name,
				password: password,
				age: age,
				gender: gender,
				email: email,
				favourites: [],
			};

			console.log([...users, user]);
			localStorage.setItem("users", JSON.stringify([...users, user]));

			setMessage({
				message: "Sign up success!",
				color: "nice",
			});
		}
		setIsLoading(() => false);
	};

	const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setGender(event.target.value);
	};

	const handleVisivilityChange = () => {
		setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
	};

	const handleConfirmVisivilityChange = () => {
		setIsPasswordConfirmVisible(
			(isPasswordConfirmVisible) => !isPasswordConfirmVisible
		);
	};

	const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAge(parseInt(event.target.value));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handlePasswordConfirmChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setPasswordConfirm(event.target.value);
	};

	return (
		<div className="signup-container">
			<img
				src="https://i.blogs.es/4b7486/4k/1366_2000.jpg"
				className="title-background-signup"
				draggable="false"
			/>
			<div className="signup">
				<div className="signup-icon">
					<div className="sub-icon-container">
						<IoPersonCircleOutline />
					</div>
				</div>
				<form className="signup-form" onSubmit={handleSubmit}>
					<div className="input-div name-input-div">
						<input
							type="text"
							name="name"
							className="signup-input"
							id="signup-input-name"
							placeholder="John Doe"
							autoComplete="off"
							onChange={handleNameChange}
						/>
						<div className="input-icon">
							<IoPersonOutline />
						</div>
					</div>
					<div className="input-div mail-input-div">
						<input
							type="email"
							name="mail"
							className="signup-input"
							id="signup-input-mail"
							placeholder="me@example.com"
							autoComplete="off"
							onChange={handleMailChange}
						/>
						<div className="input-icon">
							<IoMailOutline />
						</div>
					</div>
					<div className="input-div age-input-div">
						<input
							type="number"
							name="age"
							min={1}
							max={120}
							className="signup-input"
							id="signup-input-age"
							placeholder="Age (Years)"
							autoComplete="off"
							onChange={handleAgeChange}
						/>
						<div className="input-icon">
							<IoHourglassOutline />
						</div>
					</div>
					<div className="input-div gender-input-div">
						<Select
							options={["Male", "Female"]}
							name={"gender"}
							id={"signup-input-gender"}
							className="signup-input select-gender"
							optionClassName="gender-option"
							value={gender}
							onChange={handleGenderChange}
						/>
						<div className="input-icon">
							{gender === "Male" ? (
								<IoMaleOutline />
							) : (
								<IoFemaleOutline />
							)}
						</div>
					</div>
					<div className="input-div password-div">
						<input
							type={isPasswordVisible ? "text" : "password"}
							name="password"
							className="signup-input"
							id="signup-input-password"
							placeholder="Password"
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
					<div className="input-div password-confirm-div">
						<input
							type={
								isPasswordConfirmVisible ? "text" : "password"
							}
							name="password-confirm"
							className="signup-input"
							id="signup-input-password-confirm"
							placeholder="Confirm password"
							autoComplete="off"
							onChange={handlePasswordConfirmChange}
						/>
						<div
							className="show-password"
							onClick={handleConfirmVisivilityChange}
						>
							{isPasswordConfirmVisible ? (
								<IoEyeOutline />
							) : (
								<IoEyeOffOutline />
							)}
						</div>
					</div>
					<div className={`message ${color}`}>{message}</div>
					<Button text="sign up" type="submit" loading={isLoading} />
					<div className="signup-link-container">
						You have an account?
						<Link to="/login" className="signup-link">
							Log In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
