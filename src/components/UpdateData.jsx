import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateData = () => {
  const myInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [qoute, setQoute] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await myInstance.get(`/quote/${id}`);
      setName(data.name);
      setQoute(data.qoute);
    };
    fetchData();
  }, [id]);

  const EditData = async (e) => {
    e.preventDefault();

    try {
      if (name === "" || qoute === "") {
        alert("Inputan tidak boleh kosong");
      } else {
        await myInstance.patch(`/quote/${id}`, { name: name, qoute: qoute });
        return navigate(`/`);
      }
    } catch (error) {}
  };

  return (
    <div className="max-w-[1240px] mx-auto ">
      <div className="h-[350px]  flex justify-center items-center ">
        <div className="text-center">
          <p className="text-xl font-bold mb-4">NekoQuote</p>
          <p className="md:text-8xl text-4xl font-bold  tracking-tight">
            update?
          </p>
        </div>
      </div>
      <div className="w-full px-5 mb-10">
        <div className="block md:flex">
          <input
            type="text"
            className="w-full mb-2 md:mb-0 h-[50px] px-5 md:mx-3  rounded-md"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            cols="30"
            rows="10"
            className="w-full mb-2 md:mb-0 h-auto px-5 md:mx-3 p-5  rounded-md"
            value={qoute}
            onChange={(e) => setQoute(e.target.value)}
          ></textarea>
          <button
            onClick={EditData}
            className="px-10 w-full md:w-[500px] bg-zinc-900 h-[50px] rounded-md text-white md:mx-3"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateData;
