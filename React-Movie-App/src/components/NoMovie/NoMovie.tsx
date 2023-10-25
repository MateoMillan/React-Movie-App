import miImagen from "../../assets/no-results.png";
import "./NoMovie.css";

export default function NoMovie({text}: {text: string}) {
	return (
		<div className="no-movie">
			<img
				src={miImagen}
				alt="no-movie"
				className="no-movie-image"
				draggable="false"
			/>
			<h3 className="no-movie-header">{text}</h3>
		</div>
	);
}
