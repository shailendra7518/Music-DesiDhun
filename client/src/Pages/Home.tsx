import React from "react";
import { useSelector} from "react-redux";

function Home() {
  const { user } = useSelector((state:any ) => state.user);

  return <div className="text-center">Home</div>;
}

export default Home;
