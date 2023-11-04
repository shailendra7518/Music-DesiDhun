import { MdSearch } from "react-icons/md";
function SearchBar() {
  return (
    <div className="flex bg-white items-center mt-3 p-2  rounded-lg">
      <input type="text" placeholder="Search" className="outline-none " />
      <MdSearch />
    </div>
  );
}

export default SearchBar;
