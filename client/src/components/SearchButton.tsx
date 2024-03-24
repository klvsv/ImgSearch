interface SearchButtonProps {
	onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
	return <button onClick={onClick}>Search</button>;
};
export default SearchButton;
