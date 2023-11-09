import "./SearchBar.css";
import { ChangeEvent, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select from "../Select/Select";
import years from "../../data/years.json";
import types from "../../data/mediaTypes.json";
import Profile from "../Profile/Profile";
import { GUEST_TEXT } from "../../constants/constants";
import Guest from "../Guest/Guest";

interface SearchBarProps {
	searchValue: string;
	filters: Filters;
	loggedInUser: Profile | undefined;
	loggedUserID: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function SearchBar({
	searchValue,
	filters,
	loggedInUser,
	loggedUserID,
	setSearchValue,
	setFilters,
}: SearchBarProps) {
	const search = document.getElementById("search");
	const filterContainer = document.getElementById("filter-container");

	function handleClick() {
		if (search?.classList.contains("lifted")) {
			search.classList.remove("lifted");
			filterContainer?.classList.remove("lifted");
		} else {
			search?.classList.add("lifted");
			filterContainer?.classList.add("lifted");
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

	useEffect(() => {
		console.log(loggedUserID, GUEST_TEXT);
	}, []);

	return (
		<div className="search-bar" id="search-bar">
			<div className="profile-container"></div>
			<form className="form">
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
					<div>
						<b className="filter-label">Year:</b>
						<Select
							name="year"
							id="year-select"
							options={["All", ...years]}
							className="select"
							onChange={handleYearSelectChange}
						/>
					</div>
					<div>
						<b className="filter-label">Type:</b>
						<Select
							name="type"
							id="type-select"
							options={["All", ...types]}
							className="select"
							onChange={handleTypeSelectChange}
						/>
					</div>
				</div>
			</form>
			{loggedUserID == GUEST_TEXT ? (
				<Guest />
			) : loggedInUser !== undefined ? (
				<Profile profile={loggedInUser} />
			) : null}
			<button className="search-button" onClick={handleClick}>
				<IoSearchOutline />
			</button>
		</div>
	);
}
