import "./Button.scss";

interface IButtonIcon {
	icon: string;
	type?: "submit" | "reset" | "button";
	onClick?: () => void;
}

const ButtonIcon = ({ icon, type = "button", onClick }: IButtonIcon) => {
	return (
		<button type={type} onClick={onClick} className="button-icon">
			<img src={icon} className="icon-button" />
		</button>
	);
};

export default ButtonIcon;
