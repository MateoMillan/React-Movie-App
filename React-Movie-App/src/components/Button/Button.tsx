import "./Button.scss";

type Cuasi = {
	onSubmit?: () => void;
	text: string;
	loading?: boolean;
	disabled?: boolean;
	type?: "submit" | "button" | "reset";
	variant?:
		| "primary"
		| "danger"
		| "success"
		| "outline-primary"
		| "outline-danger"
		| "outline-success";
	size?: "small" | "large";
	horizontalResize?: "full" | "fixed";
};

const Button = ({
	onSubmit,
	text,
	loading,
	disabled,
	type,
	variant = "primary",
	size = "large",
	horizontalResize = "full",
}: Cuasi) => {
	const button = `customButton ${variant} ${size} ${horizontalResize}`;
	const spinner = `loading-spinner spinner-${variant} spinner-${size}`;

	return (
		<button
			className={button}
			onClick={onSubmit}
			disabled={disabled}
			type={type}
		>
			{!loading ? text : <div className={spinner}> </div>}
		</button>
	);
};

export default Button;
