import "./Movie.css"

export default function Movie({movie}: {movie: Movie}) {
	return <div className="movie">
		<img src={movie.Poster} alt={movie.Title} />
	</div>
} 