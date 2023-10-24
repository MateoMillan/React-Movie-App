import { Link } from "react-router-dom";
import "./Movie.css";

export default function Movie({ movie }: { movie: Movie }) {
	return (
		<div className="movie">
			<Link to={`/movie/${movie.imdbID}`}>
				<img
					src={movie.Poster}
					alt={movie.Title}
					className="movie-image"
					draggable="false"
				/>
			</Link>
		</div>
	);
}
