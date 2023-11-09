import "./Movie.css";
import "animate.css";
import { Link } from "react-router-dom";
import { IoBookmarkOutline, IoTrashOutline } from "react-icons/io5";
import noImage from "../../assets/no-image.png";

export default function Movie({
	movie,
	addMovieToFavourites,
	removeFavourites,
	isSaved = false,
}: {
	movie: Movie;
	isSaved?: boolean;
	addMovieToFavourites: (movie: Movie) => void;
	removeFavourites: (movie: Movie) => void;
}) {
	const handleAdd = () => {
		addMovieToFavourites(movie);
	};

	const handleRemove = () => {
		removeFavourites(movie);
	};

	return (
		<div className="movie">
			<Link to={`/movie/${movie.imdbID}`}>
				{movie.Poster !== "N/A" ? (
					<img
						src={movie.Poster}
						alt={movie.Title}
						className="movie-image"
						draggable="false"
					/>
				) : (
					<img src={noImage} alt="no-image" className="no-image" />
				)}
			</Link>
			<div className="save">
				{isSaved ? (
					<button
						className="save-button remove"
						onClick={handleRemove}
					>
						<IoTrashOutline />
					</button>
				) : (
					<>
						<button className="save-button add" onClick={handleAdd}>
							<div className="save-icon">
								<IoBookmarkOutline />
							</div>
						</button>
						<button
							className="save-button remove"
							onClick={handleRemove}
						>
							<div className="save-icon">
								<IoTrashOutline />
							</div>
						</button>
					</>
				)}
			</div>
		</div>
	);
}
