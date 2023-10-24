import "./Details.css";

export default function ({ details }: { details: MovieInfo }) {
	return (
		<>
			<h1 className="details-title">{details.Title}</h1>
			<ul className="list">
				<li className={`list-item ${details.Year}`}>
					<b>Year: </b>
					{details.Year}
				</li>
				<li className={`list-item ${details.Runtime}`}>
					<b>Runtime: </b>
					{details.Runtime}
				</li>
				<li className={`list-item ${details.Genre}`}>
					<b>Genre: </b>
					{details.Genre}
				</li>
				<li className={`list-item ${details.Director}`}>
					<b>Director: </b>
					{details.Director}
				</li>
				<li className={`list-item ${details.Actors}`}>
					<b>Actors: </b>
					{details.Actors}
				</li>
				<li className={`list-item ${details.Writer}`}>
					<b>Writer: </b>
					{details.Writer}
				</li>
				<li className={`list-item ${details.Plot}`}>
					<b>Plot: </b>
					<p>{details.Plot}</p>
				</li>
				<li className={`list-item ${details.Language}`}>
					<b>Language: </b>
					{details.Language}
				</li>
			</ul>
		</>
	);
}
