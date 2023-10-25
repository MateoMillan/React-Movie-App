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
	addMovieToFavourites: (movie: Movie) => void;
	removeFavourites: (movie: Movie) => void;
	isSaved?: boolean;
}) {
	const handleAdd = () => {
		if (!localStorage.getItem(movie.Title)) {
			addMovieToFavourites(movie);
			localStorage.setItem(movie.Title, JSON.stringify(movie));
		}
	};

	const handleRemove = () => {
		removeFavourites(movie);
		localStorage.removeItem(movie.Title);
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
