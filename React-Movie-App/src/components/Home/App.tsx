import { useEffect, useState } from "react";
import "./App.css";
import Row from "../Row/Row";
import TitleContainer from "./TitleContainer/TitleContainer";
import SearchBar from "../SearchBar/SearchBar";


function App() {
	const [movies, setMovies] = useState<Movies>([]);
	useEffect(() => {
		fetch(
			"http://www.omdbapi.com/?apikey=28435cd&s=star%20wars"
		)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error(
						"No se pudo obtener la respuesta de la API"
					);
				}
				return response.json();
			})
			.then((data) => {
				setMovies(data.Search);
			})
			.catch((error) => {
				console.error("Error al obtener datos de la API:", error);
			});
	}, []);
	return (
		<>
			<TitleContainer />
			<SearchBar />
			<Row movies={movies}/>
		</>
	);
}

export default App;
