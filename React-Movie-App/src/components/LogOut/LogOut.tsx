export default function LogOut() {
	localStorage.setItem("loggedIn", JSON.stringify("guest"));
	window.location.href = "/";
	return <></>;
}
