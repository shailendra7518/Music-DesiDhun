import { MdSearch } from "react-icons/md";
import React,{ useState ,useEffect} from 'react';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { searchSongs } from "../Redux/features/songSlice";
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('working')
    setSearchTerm(e.target.value)
  }
  const handleSearch = () => {

    if (urlParams.get("query")==null) {
      toast.error("Please write some query")
      return;
    }
    dispatch(searchSongs(searchTerm))
     Navigate(`/search?query=${searchTerm}`)

  }
  
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("query");
    if (searchTermFromUrl == null) {
      setSearchTerm("");
    } else {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex bg-white items-center mt-3 p-2  rounded-lg">
      <input
        onChange={handleChange}
        value={searchTerm}
        type="text" placeholder="Search" className="outline-none " />
      <p onClick={handleSearch}>
        <MdSearch />
      </p>
    </div>
  );
}

export default SearchBar;
