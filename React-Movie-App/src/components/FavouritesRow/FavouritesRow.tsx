import "./FavouritesRow.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Movie from "../Movie/Movie";
import NoMovie from "../NoMovie/NoMovie";

export default function Row({
	movies,
	addMovieToFavourites,
	removeFavourites,
}: {
	movies: Movies;
	addMovieToFavourites: (movie: Movie) => void;
	removeFavourites: (movie: Movie) => void;
}) {
	const row = document.getElementById("favourites-row");
	const handleBack = () => {
		if (row && row?.scrollLeft !== 0) {
			row.scrollLeft -= row.clientWidth;
		}
	};

	const handleForward = () => {
		if (row && row?.scrollLeft !== row.scrollWidth) {
			row.scrollLeft += row.clientWidth;
		}
	};

	return (
		<div className="favourites-row" id="favourites-row">
			<button
				className="row-button"
				id="back-button"
				onClick={handleBack}
			>
				<IoChevronBackOutline />
			</button>
			{movies.length === 0 ? (
				<NoMovie text="No movie saved yet" />
			) : (
				movies.map((element, index) => {
					return (
						<Movie
							movie={element}
							key={index}
							addMovieToFavourites={addMovieToFavourites}
							removeFavourites={removeFavourites}
							isSaved
						/>
					);
				})
			)}
			<button
				className="row-button"
				id="forward-button"
				onClick={handleForward}
			>
				<IoChevronForwardOutline />
			</button>
		</div>
	);
}
