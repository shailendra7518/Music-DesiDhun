import React from "react";
import { useSelector} from "react-redux";

    // HomePage.tsx

const Home: React.FC = () => {
  const { currentSong } = useSelector((state: any) => state.song);
  

  
  return (
    <div className="p-6">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Music</h2>
        <div className="flex  md:flex-wrap gap-4">
          <div className="bg-white w-auto p-4 shadow-lg rounded-lg mb-4">
            <img
              src={"http://via.placeholder.com/640x360"}
              alt={"title"}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-xl font-semibold mb-1">title</p>
            <p className="text-gray-500">artist</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Playlists</h2>
        <div className="flex  md:flex-wrap gap-4">
          <div className="bg-white w-auto p-4 shadow-lg rounded-lg mb-4">
            <img
              src={"http://via.placeholder.com/640x360"}
              alt={"title"}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-xl font-semibold mb-1">title</p>
            <p className="text-gray-500">artist</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommended Albums</h2>
        <div className="flex  md:flex-wrap gap-4">
          <div className="bg-white w-auto p-4 shadow-lg rounded-lg mb-4">
            <img
              src={"http://via.placeholder.com/640x360"}
              alt={"title"}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-xl font-semibold mb-1">title</p>
            <p className="text-gray-500">artist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


