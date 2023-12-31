import "./Row.css";
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
	const row = document.getElementById("row");
	const handleBack = () => {
		if (row && row?.scrollLeft !== 0) {
			row.scrollLeft -= row.clientWidth - 300;
		}
	};

	const handleForward = () => {
		if (row && row?.scrollLeft !== row.scrollWidth) {
			row.scrollLeft += row.clientWidth - 300;
		}
	};

	return (
		<div className="row" id="row">
			<button
				className="row-button"
				id="back-button"
				onClick={handleBack}
			>
				<IoChevronBackOutline />
			</button>
			<div className="left-gradient"></div>
			{movies.length === 0 ? (
				<NoMovie text="Try search something" />
			) : (
				movies.map((element, index) => {
					return (
						<Movie
							movie={element}
							key={index}
							addMovieToFavourites={addMovieToFavourites}
							removeFavourites={removeFavourites}
						/>
					);
				})
			)}
			<div className="right-gradient"></div>
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
