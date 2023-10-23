import "./Ratings.css";

export default function Ratings({ ratings }: { ratings: Ratings }) {
	return ratings.map((element, index) => {
		return (
			<div className="rating" key={index}>
				<h2>{element.Source}</h2>
				<i>{element.Value}</i>
			</div>
		);
	});
}
