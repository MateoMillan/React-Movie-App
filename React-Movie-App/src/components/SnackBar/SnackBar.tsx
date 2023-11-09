import { useEffect } from "react";
import "./SnackBar.css";
import { IoClose } from "react-icons/io5";

interface SnackBarProps {
	active: boolean;
	title: string;
	message: string;
	color: string;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SnackBar({
	active,
	title,
	message,
	color,
	setActive,
}: SnackBarProps) {
	const hanldeOnClose = () => {
		setActive(() => false);
	};

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				hanldeOnClose();
			}, 4000);
		}
	}, [active]);

	return (
		<div
			className={`snack-bar ${active && "active"} ${color}`}
			id="snack-bar"
		>
			<div className="snack-left">
				<div className="snack-title">{title}</div>
				<div className="snack-message">{message}</div>
			</div>
			<div className="snack-right" onClick={hanldeOnClose}>
				<IoClose />
			</div>
		</div>
	);
}
