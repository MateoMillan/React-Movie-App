import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router";
import Details from "./Details/Details";
import Ratings from "./Ratings/Ratings";
import "../../assets/G-rating.svg";

export default function MovieDetails() {
	const { imdbID } = useParams();
	const [movie, setMovie] = useState<MovieInfo>();
	const [rated, setRated] = useState<string>();
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
		switch (movie?.Rated) {
			case "G":
				setRated(
					"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/MPA_G_RATING_%28block%29.svg/1920px-MPA_G_RATING_%28block%29.svg.png"
				);
				break;
			case "PG":
				setRated(
					"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/MPA_PG_RATING_%28block%29.svg/1920px-MPA_PG_RATING_%28block%29.svg.png"
				);
				break;
			case "PG-13":
				setRated(
					"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/MPA_PG-13_RATING_%28block%29.svg/1920px-MPA_PG-13_RATING_%28block%29.svg.png"
				);
				break;
			case "R":
				setRated(
					"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/MPA_R_RATING_%28block%29.svg/1920px-MPA_R_RATING_%28block%29.svg.png"
				);
				break;
			case "NC-17":
				setRated(
					"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/MPA_NC-17_RATING_%28block%29.svg/1920px-MPA_NC-17_RATING_%28block%29.svg.png"
				);
				break;
		}
	}, [movie]);

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
							className="details-image"
						/>
					</div>
					<div className="right">
						<Details details={movie} />
					</div>
				</div>
				<div className="bottom">
					<h2>Ratings</h2>
					<div className="ratings">
						<Ratings ratings={movie.Ratings} />
					</div>
				</div>
				<div className="rated">
					<img src={rated} alt="" className="rated-image" />
				</div>
			</div>
		)
	);
}
