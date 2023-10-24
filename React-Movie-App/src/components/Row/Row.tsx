import "./Row.css";
import Movie from "../Movie/Movie";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function Row({ movies }: { movies: Movies }) {
	const row = document.getElementById("row");
	const handleBack = () => {
		if (row && row?.scrollLeft !== 0) {
			row.scrollLeft = 0;
		}
	};

	const handleForward = () => {
		if (row && row?.scrollLeft !== row.scrollWidth) {
			row.scrollLeft = row.scrollWidth;
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
			{movies.map((element, index) => {
				return <Movie movie={element} key={index} />;
			})}
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
