import "./SearchBar.css";
import { ChangeEvent, FormEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({
	searchValue,
	setSearchValue,
}: {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
	const search = document.getElementById("search")

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

	function handleClick() {
		if (search?.classList.contains("lifted")) {
			search.classList.remove("lifted")
		} else {
			search?.classList.add("lifted")
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchValue(event.target.value);
	}

	return (
		<div className="search-bar" id="search-bar">
			<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="search"
					autoFocus
					placeholder="Search some movie..."
					className="search"
					id="search"
					autoCorrect="off"
					autoComplete="off"
					value={searchValue}
					onChange={handleChange}
				/>
			</form>
			<button className="search-button" onClick={handleClick}>
				<IoSearchOutline />
			</button>
		</div>
	);
}
