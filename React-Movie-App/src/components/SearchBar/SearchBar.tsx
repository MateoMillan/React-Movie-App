import "./SearchBar.css";
import { ChangeEvent, FormEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "../Select/Select";
import years from "../../data/years.json";
import types from "../../data/mediaTypes.json";

export default function SearchBar({
	searchValue,
	setSearchValue,
	filters,
	setFilters,
}: {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
	const search = document.getElementById("search");
	const filterContainer = document.getElementById("filter-container")

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
			search.classList.remove("lifted");
			filterContainer?.classList.remove("lifted")
		} else {
			search?.classList.add("lifted");
			filterContainer?.classList.add("lifted")
		}
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setSearchValue(event.target.value);
	}

	function handleYearSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		setFilters({ year: event.target.value, type: filters.type });
	}

	function handleTypeSelectChange(event: ChangeEvent<HTMLSelectElement>) {

		setFilters({ year: filters.year, type: event.target.value });
	}

	return (
		<div className="search-bar" id="search-bar">
			<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="search"
					autoFocus
					placeholder="Search some movie..."
					className="search lifted"
					id="search"
					autoCorrect="off"
					autoComplete="off"
					value={searchValue}
					onChange={handleChange}
				/>
				<div className="filter-container lifted" id="filter-container">
					<Select
						name="year"
						id="year-select"
						options={["All", ...years]}
						className="select"
						onChange={handleYearSelectChange}
					/>
					<Select
						name="type"
						id="type-select"
						options={["All", ...types]}
						className="select"
						onChange={handleTypeSelectChange}
					/>
				</div>
			</form>
			<button className="search-button" onClick={handleClick}>
				<IoSearchOutline />
			</button>
		</div>
	);
}
