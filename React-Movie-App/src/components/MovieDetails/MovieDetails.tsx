import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router";
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
	}, [movie]);

	return (
		movie && (
			<div className="movie-details">
				<div className="title-details">
					<h1 className="name-details">My Movie App</h1>
				</div>
				<img
					src={movie.Poster}
					alt={
						movie.Title +
						movie.Actors +
						movie.Country +
						movie.Genre +
						movie.Writer
					}
					className="details-image"
				/>
				<div className="details-gradient"></div>
				<div className="top">
					<div className="right">
						<h1 className="movie-title">{movie.Title}</h1>
						<div className="details">
							<div className="detail">{movie.Runtime}</div>
							<div className="detail">{movie.Rated}</div>
							<div className="detail">{movie.Year}</div>
						</div>
						<p className="plot">{movie.Plot}</p>
					</div>
				</div>
				<div className="bottom">
					<div className="ratings-container">
						<h2>Ratings</h2>
						<div className="ratings">
							<Ratings ratings={movie.Ratings} />
						</div>
					</div>
				</div>
			</div>
		)
	);
}
