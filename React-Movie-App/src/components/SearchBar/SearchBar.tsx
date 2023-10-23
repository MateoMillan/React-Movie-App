import { ChangeEvent, FormEvent, useState } from "react";
import "./SearchBar.css";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
	const [searchValue, setSearchValue] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		fetch(`http://www.omdbapi.com/?apikey=28435cd&s=${searchValue}`)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Error al buscar");
				}
				return response.json();
			})
			.then(data => {console.log(data)})
			.catch((error) => {
				console.error("Error al buscar:", error);
			});
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchValue(event.target.value);
	}

	return (
		<div className="search-bar">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="search"
					value={searchValue}
					onChange={handleChange}
				/>
				<button type="submit">
					<IoSearchOutline />
				</button>
			</form>
		</div>
	);
}
