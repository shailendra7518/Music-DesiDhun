import React, { useState } from "react";
const apiUrl :string =import.meta.env.VITE_API_BASE_URL

interface FormData{
    title: string;
    artist: string;
    album: string;
    file: any
}

const UploadSong: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    artist: "",
    album: "",
    file: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // try {
    //   const { title, artist, album, file } = formData;

    //   if (!title || !artist || !album || !file) {
    //     alert("All fields are required");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("title", title);
    //   formData.append("artist", artist);
    //   formData.append("album", album);
    //   formData.append("file", file);

    //   const response = await fetch(`${apiUrl}/api/songs`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     alert("Song uploaded successfully!");
    //     setFormData({
    //       title: "",
    //       artist: "",
    //       album: "",
    //       file: null,
    //     });
    //   } else {
    //     alert("Error uploading song");
    //   }
    // } catch (error) {
    //   console.error("Error uploading song:", error);
    //   alert("Error uploading song");
    // }
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
            id="file"
            name="file"
            onChange={handleFileChange}
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
