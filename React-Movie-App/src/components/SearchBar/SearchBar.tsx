import { ChangeEvent, FormEvent } from "react";
import "./SearchBar.css";

export default function SearchBar({
	searchValue,
	setSearchValue,
}: {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		fetch(`http://www.omdbapi.com/?apikey=28435cd&s=${searchValue}`)
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Error al buscar");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error al buscar:", error);
			});
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchValue(event.target.value);
	}

	return (
		<div className="search-bar">
			<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="search"
					autoFocus
					placeholder="Search some movie..."
					className="search"
					autoCorrect="off"
					autoComplete="off"
					value={searchValue}
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}
