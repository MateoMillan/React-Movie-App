import { useEffect, useState } from "react";
import "./App.css";
import Row from "../Row/Row";
import TitleContainer from "./TitleContainer/TitleContainer";
import SearchBar from "../SearchBar/SearchBar";
import FavouritesRow from "../FavouritesRow/FavouritesRow";
import Footer from "../Footer/Footer";
import footerItems from "../../data/footer-items.json";

function App() {
	const [movies, setMovies] = useState<Movies>([]);
	const [savedMovies, setSavedMovies] = useState<Movies>([]);
	const [searchValue, setSearchValue] = useState("star wars");
	const [filters, setFilters] = useState<Filters>({
		year: "All",
		type: "All",
	});

	const initializeSavedMovies = () => {
		let initialSavedMovies: Movies = [];
		for (let i = 0; i < localStorage.length; i++) {
			if (
				localStorage.key(i) &&
				localStorage.getItem(localStorage.key(i) as string)
			) {
				initialSavedMovies.push(
					JSON.parse(
						localStorage.getItem(
							localStorage.key(i) as string
						) as string
					)
				);
			}
		}
		setSavedMovies(initialSavedMovies);
	};

	const requestMovies = () => {
		fetch(
			`http://www.omdbapi.com/?apikey=28435cd&s=${searchValue}&${
				filters.year !== "All" && `y=${filters.year}`
			}&${filters.type !== "All" && `type=${filters.type}`}`
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
				if (data.Search) {
					setMovies(data.Search);
				}
			})
			.catch((error) => {
				console.error("Error al obtener datos de la API:", error);
			});
	};

	const addToFavourites = (movie: Movie) => {
		if (!savedMovies.includes(movie)) {
			setSavedMovies([...savedMovies, movie]);
			localStorage.setItem(movie.Title, JSON.stringify(movie));
		}
	};

	const removeFavourites = (movie: Movie) => {
		setSavedMovies(
			savedMovies.filter((element) => {
				return element !== movie;
			})
		);
		localStorage.removeItem(movie.Title);
	};

	useEffect(() => {
		requestMovies();
	}, [searchValue, filters]);

	useEffect(() => {
		initializeSavedMovies();
	}, []);

	return (
		<>
			<TitleContainer />
			<SearchBar
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				filters={filters}
				setFilters={setFilters}
			/>
			<h3 className="row-title">Search movies</h3>
			<Row
				movies={movies}
				addMovieToFavourites={addToFavourites}
				removeFavourites={removeFavourites}
			/>
			<h3 className="row-title">Favourites</h3>
			<FavouritesRow
				movies={savedMovies}
				addMovieToFavourites={addToFavourites}
				removeFavourites={removeFavourites}
			/>
			<Footer items={footerItems} />
		</>
	);
}

export default App;
