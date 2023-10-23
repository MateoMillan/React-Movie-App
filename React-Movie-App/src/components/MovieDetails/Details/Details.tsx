import "./Details.css";

export default function ({ details }: { details: MovieInfo }) {
	return (
		<>
			<h1 className="title">{details.Title}</h1>
			<ul>
				<li className={`list-item ${details.Year}`}>{details.Year}</li>
				<li className={`list-item ${details.Runtime}`}>{details.Runtime}</li>
				<li className={`list-item ${details.Genre}`}>{details.Genre}</li>
				<li className={`list-item ${details.Director}`}>{details.Director}</li>
				<li className={`list-item ${details.Actors}`}>{details.Actors}</li>
				<li className={`list-item ${details.Writer}`}>{details.Writer}</li>
				<li className={`list-item ${details.Plot}`}><p>{details.Plot}</p></li>
				<li className={`list-item ${details.Language}`}>{details.Language}</li>
			</ul>
		</>
	);
}
