import { useEffect, useState } from "react";
import "./App.css";
import Row from "../Row/Row";
import TitleContainer from "./TitleContainer/TitleContainer";
import SearchBar from "../SearchBar/SearchBar";
import FavouritesRow from "../FavouritesRow/FavouritesRow";
import Footer from "../Footer/Footer";
import footerItems from "../../data/footer-items.json";

function App() {
	const [loggedUserID, setLoggedUserID] = useState("");
	const [loggedInUser, setLoggedInUser] = useState<Profile>();
	const [movies, setMovies] = useState<Movies>([]);
	const [savedMovies, setSavedMovies] = useState<Movies>([]);
	const [searchValue, setSearchValue] = useState("star wars");
	const [filters, setFilters] = useState<Filters>({
		year: "All",
		type: "All",
	});
	const users = localStorage.getItem("users");

	const initializeLoggedInUser = (id: number) => {
		if (users) {
			const usersJSON: Users = JSON.parse(users);
			const user = usersJSON.find((user) => user.id === id);
			if (user) {
				setLoggedInUser(() => user);
				setSavedMovies(() => user.favourites);
			}
		}
	};

	const getLoggedInUserID = () => {
		const loggedInUserNotVerified = localStorage.getItem("loggedIn");
		if (loggedInUserNotVerified) {
			setLoggedUserID(() => loggedInUserNotVerified);
			initializeLoggedInUser(parseInt(loggedInUserNotVerified));
		}
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
		if (users) {
			const usersJSON: Users = JSON.parse(users);
			const user = usersJSON.find(
				(user) => user.id === parseInt(loggedUserID)
			);

			if (user && !savedMovies.includes(movie)) {
				let favourites = [...user.favourites, movie];

				setSavedMovies(favourites);
				user.favourites = favourites;

				let newUsersJSON = usersJSON.map((element) => {
					return element === user ? user : element;
				});
				localStorage.setItem("users", JSON.stringify(newUsersJSON));
			}
		}
	};

	const removeFavourites = (movie: Movie) => {
		if (users) {
			const usersJSON: Users = JSON.parse(users);
			const user = usersJSON.find(
				(user) => user.id === parseInt(loggedUserID)
			);

			let newUsersJSON;
			if (user) {
				let newSavedMovies = savedMovies.filter((element) => {
					return element !== movie;
				});
				setSavedMovies(newSavedMovies);
				user.favourites = newSavedMovies;
				newUsersJSON = usersJSON.map((element) => {
					return element === user ? user : element;
				});

				localStorage.setItem("users", JSON.stringify(newUsersJSON));
			}
		}
	};

	useEffect(() => {
		requestMovies();
	}, [searchValue, filters]);

	useEffect(() => {
		getLoggedInUserID();
	}, []);

	return (
		<>
			<TitleContainer />
			{loggedUserID && (
				<SearchBar
					loggedUserID={loggedUserID}
					loggedInUser={loggedInUser}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					filters={filters}
					setFilters={setFilters}
				/>
			)}
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
