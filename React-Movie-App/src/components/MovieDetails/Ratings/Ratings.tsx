import "./Ratings.css";

export default function Ratings({ ratings }: { ratings: Ratings }) {
	return ratings.map((element, index) => {
		let source;
		switch (element.Source) {
			case "Internet Movie Database":
				source =
					"https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg";
				break;
			case "Rotten Tomatoes":
				source =
					"https://yt3.googleusercontent.com/ytc/APkrFKaObq-jLY4jCKOaHgztI8uF6scEjbf0eyVsNJRxDMI=s900-c-k-c0x00ffffff-no-rj";
				break;
			case "Metacritic":
				source =
					"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/768px-Metacritic.svg.png";
				break;
		}
		return (
			<div className="rating" key={index}>
				<img src={source} alt={element.Source} className="rater-image"/>
				<i>{element.Value}</i>
			</div>
		);
	});
}
