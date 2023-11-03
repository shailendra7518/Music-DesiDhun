import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import SingleSong from "../Components/SingleSong";
interface SingleList{
    creater: any;
    playlist: any;
}
const initialState: SingleList = {
    creater: null,
    playlist: null
}

function SinglePlayList() {
    const params = useParams();
    const { id } = params
    const [SingleList,setSingleList]=useState(initialState)
  const { playList } = useSelector((state: any) => state.song);

    useEffect(() => {
        if (playList && playList.length > 0) {
               setSingleList(
                 playList.filter((list: any) => list.playlist._id == id)[0]
               );
        }
     
    },[])
    
  return SingleList && (

      <div className=" flex flex-col text-center  w-full sm:w-auto">
        <div className="p-4">
          <h2 className="text-2xl mb-4 text-white font-semibold">
            {  SingleList?.playlist?.name}
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
                  {SingleList && SingleList?.playlist?.songs?.map((id: any) => (
               
                      <SingleSong songId={id}/>
           ))}
          </div>
        </div>
      </div>
    
  );
}

export default SinglePlayList;
