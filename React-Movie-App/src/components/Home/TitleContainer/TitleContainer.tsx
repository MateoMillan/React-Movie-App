import "./TitleContainer.css";

export default function TitleContainer() {
	return <div className="title-container">
		<div className="title">
			<h1 className="name">My Movie App</h1>
		</div>
		<img src="https://i.blogs.es/4b7486/4k/1366_2000.jpg" className="title-background"/>
		<div className="gradient"></div>
	</div>;
}
