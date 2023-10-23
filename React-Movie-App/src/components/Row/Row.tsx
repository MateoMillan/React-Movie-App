import "./Row.css";
import Movie from "../Movie/Movie";

export default function Row({movies}: {movies: Movies}) {
	return (
		<div className="row">
			{movies.map((element, index) => {
				return (
					<Movie movie={element} key={index}/>
				);
			})}
		</div>
	);
}
