import React, { useRef, useState ,useEffect} from "react";
const apiUrl :string =import.meta.env.VITE_API_BASE_URL
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase";
import { useSelector } from "react-redux";
interface FormData{
    title: string;
    artist: string;
    album: string;
    fileUrl: any
}



const UploadSong: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    artist: "",
    album: "",
    fileUrl: '',
  });
    const {currentUser}=useSelector((state:any)=>state.user)
     const [file, setFile] = useState<File| null >(null);
     const fileRef = useRef<HTMLInputElement>(null);
     const [filePerc, setFilePerc] = useState(0);
     const [fileUploadError, setFileUploadError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value ,id} = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFile(file);
    };
    
    
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  console.log(`upload prgress ${filePerc}% done`);
  const handleFileUpload = (file:any) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, fileUrl: downloadURL })
        );
      }
    );
    };
    console.log("formdata",formData,fileUploadError)

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const res = await fetch(`${apiUrl}/api/songs/upload`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'token': currentUser.token
              },
              body: JSON.stringify({...formData ,uploadedBy:currentUser.user._id})

          });

          const data = await res.json();
          console.log(data)
          

          
      } catch (error) {
          
          console.log(error)
      }
       
    
       };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white border rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Upload a Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-800 font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="artist"
            className="block text-gray-800 font-bold mb-1"
          >
            Artist
          </label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="album" className="block text-gray-800 font-bold mb-1">
            Album
          </label>
          <input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-800 font-bold mb-1">
            File
          </label>
          <input
            type="file"
            onChange={handleFileChange}          
            ref={fileRef}
            id="file"
            name="file"
            className="w-full p-2 border rounded"
            accept=".mp3"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
};

export default UploadSong;
