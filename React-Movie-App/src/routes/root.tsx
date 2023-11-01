import { createBrowserRouter } from "react-router-dom";
import App from "../components/Home/App";
import ErrorPage from "./ErrorPage";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import Login from "../Login/Login";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />
	},
	{
		path: "/movie/:imdbID",
		element: <MovieDetails />
	},
	{
		path: "/login",
		element: <Login />
	},
]);
