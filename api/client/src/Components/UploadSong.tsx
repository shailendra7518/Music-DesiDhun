import React, { useRef, useState} from "react";
const apiUrl :string =import.meta.env.VITE_API_BASE_URL
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase/firebase";
 import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
interface FormData{
    title: string;
    artist: string;
    album: string;
  fileUrl: any;
  cover: any;
}



const UploadSong: React.FC = () => {
  const initialState: FormData ={
     title: "",
    artist: "",
    album: "",
    fileUrl: '',
    cover:''
  }
  const [formData, setFormData] = useState(initialState);
    const {currentUser}=useSelector((state:any)=>state.user)
  const [file, setFile] = useState<File | null>(null);
    const [cover, setCover] = useState<File | null>(null);
     const fileRef = useRef<HTMLInputElement>(null);
     const [filePerc, setFilePerc] = useState(0);
     const [fileUploadError, setFileUploadError] = useState(false);
  const Navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value ,id} = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
console.log(cover)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    if (e.target.id === 'cover') {
       const coverimage = e.target.files && e.target.files[0];
       setCover(coverimage);
    } 
    if (e.target.id === "file") {
       const file = e.target.files && e.target.files[0];
       setFile(file);
    }
     
    };
    
  console.log(`upload prgress ${filePerc}% done`);
  const handleFileUpload = (file:any ,type:string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() +file.name ;
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
        toast.error("Uploading Failed")
        console.log(error)
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type == 'file') {
            toast.success("Music File uploaded")
            return setFormData({ ...formData, fileUrl: downloadURL });
          } else if (type == 'cover') {
            toast.success("Cover Image uploaded")
            return setFormData({ ...formData, cover: downloadURL });
           }
            
        }
        
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
          toast.success("Song Uploaded Successfully")
        setFormData(initialState)
      Navigate("/")
          
      } catch (error) {
          toast.error("Song Uploading Failed")
          console.log(error)
      }
       
    
       };

  return (
    <div className=" flex flex-col items-center  content-center min-w-full  mt-10 p-4 bg-transparent rounded-lg">
      <h2 className=" text-white text-2xl font-semibold mb-4">Upload a Song</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4   bg-white flex gap-1 rounded-lg p-2">
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4   bg-white flex gap-1 rounded-lg p-2">
          <input
            type="text"
            id="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleInputChange}
            className="w-full p-2 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4  bg-white flex gap-1 rounded-lg p-2">
          <input
            type="text"
            id="album"
            placeholder="Album"
            value={formData.album}
            onChange={handleInputChange}
            className="w-full p-2 border rounded outline-none"
            required
          />
        </div>
        <div className="mb-4 bg-white flex gap-1 rounded-lg p-2">
          <input
            type="file"
            onChange={handleFileChange}
          
            id="cover"
            className="w-full p-2 border rounded"
            accept="image/*"
            required
          />
          <button
            type="button"
          onClick={()=>handleFileUpload(cover,'cover')}
            className="bg-slate-700 uppercase hover:opacity-70 text-white font-semibold rounded-lg p-2">
            cover
          </button>
        </div>
        <div className="mb-4 flex bg-white rounded-lg gap-1 p-2">
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
          <button
          onClick={()=>handleFileUpload(file,'file')}
            type="button"
            className="bg-slate-700 uppercase hover:opacity-70 text-white font-semibold rounded-lg p-2">
            music
          </button>
        </div>
        <button
          type="submit"
          className="bg-slate-700   font-semibold text-white uppercase px-4 py-2 rounded hover:opacity-70"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
};

export default UploadSong;
