

function Playlist() {

  const handleChange = () => {
   
  }
  
  const handleSubmit = async() => {
    
  }


  return (
    <div className=' flex flex-col text-center w-full p-10  '>
       
      <div className=" w-full bg-white p-2 rounded-lg">
        <form onSubmit={handleSubmit} className="flex  gap-2" >
          <input
            onClick={handleChange}
            type="text" placeholder="Playlist Name" className=" p-3 rounded-lg outline-none" />
          <button
            type="submit"
            className="bg-slate-700 p-3 rounded-lg uppercase font-semibold text-white">Create playlist</button>
        </form>

      </div>
       



    </div>
  )
}

export default Playlist