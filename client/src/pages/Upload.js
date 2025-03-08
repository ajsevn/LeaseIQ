import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      setMessage(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-2">Upload Data</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleUpload}>Upload</button>
      <pre className="mt-4 bg-gray-200 p-2">{message}</pre>
    </div>
  );
};

export default Upload;
