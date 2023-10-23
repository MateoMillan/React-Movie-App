import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router";
import Details from "./Details/Details";
import Ratings from "./Ratings/Ratings";

export default function MovieDetails() {
	const { imdbID } = useParams();
	const [movie, setMovie] = useState<MovieInfo>();

	function getMovieData() {
		fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=28435cd`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}
				throw new Error("Error al cargar la pelicula");
			})
			.then((data) => {
				setMovie(data);
			})
			.catch((error) =>
				console.error("Error al cargar la pelicula: ", error)
			);
	}

	useEffect(() => {
		getMovieData();
	}, []);

	return (
		movie && (
			<div className="movie-details">
				<div className="top">
					<div className="left">
						<img
							src={movie.Poster}
							alt={
								movie.Title +
								movie.Actors +
								movie.Country +
								movie.Genre +
								movie.Writer
							}
						/>
					</div>
					<div className="right">
						<Details details={movie} />
					</div>
				</div>
				<div className="bottom">
					<div className="ratings">
						<Ratings ratings={movie.Ratings}/>
					</div>
				</div>
				<div className="rated">{movie.Rated}</div>
			</div>
		)
	);
}
