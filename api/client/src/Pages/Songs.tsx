import { useSelector } from "react-redux";

const Songs =() => {
const {songList}=useSelector((state:any)=>state.song)
  return (
    <div>
       
    </div>
  );
};

export default Songs;
