import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";
import { useGoogleSearch } from "./hooks/useGoogleSearch";
import "./App.css";

const App = () => {
	const { user, isAuthenticated } = useAuth0();
	const userId = user?.sub;
	const { searchResults, isLoading, searchError, handleSearch } = useGoogleSearch();

	return (
		<div className="main">
			<Router>
				{isAuthenticated && <Navigation />}
				<Routes>
					{isAuthenticated ? (
						<>
							<Route
								path="/"
								element={
									<>
										<SearchInput onSearch={handleSearch} />
										{isLoading && <div>Loading search results..</div>}
										{searchError && <div>Error: {searchError.message}</div>}
										<SearchResults searchResults={searchResults} />
									</>
								}
							/>
							{userId && (
								<Route
									path="/favorites"
									element={<Favorites />}
								/>
							)}
						</>
					) : (
						<Route
							path="/"
							element={
								<div className="heading">
									<h1 className="imgsearch-title">ImgSearch</h1>
									<LoginButton />
								</div>
							}
						/>
					)}
				</Routes>
			</Router>
		</div>
	);
};

export default App;
