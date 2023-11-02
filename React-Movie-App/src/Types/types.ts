// Movies

interface Movie {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
}

type Movies = Movie[];

interface Rating {
	Source: string;
	Value: string;
}

type Ratings = Rating[];

interface MovieInfo {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: Ratings;
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

// routing error

interface RoutingError {
	statusText: string;
	message: string;
}

// Filters

interface Filters {
	year: string;
	type: string;
}

// Footer

interface Items {
	items: {
		icon: string;
		text: string[];
	}[];
}

// Profile

interface Profile {
	id: number;
	name: string;
	age: number;
	gender: "Male" | "Female";
	email: string;
	password: string;
	favourites: Movies;
}

type Users = Profile[]


// Message 

interface Message{
	message: string,
	color: string
}