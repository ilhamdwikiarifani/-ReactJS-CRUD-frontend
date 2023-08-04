import { useState } from "react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const myInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
  });

  const [name, setName] = useState("");
  const [qoute, setQoute] = useState("");

  const fetchData = async () => {
    const { data } = await myInstance.get(`/quote`);
    return data;
  };

  const { data, error } = useSWR(`/quote`, fetchData);
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const AddData = async (e) => {
    e.preventDefault();

    try {
      if (name === "" || qoute === "") {
        alert("Inputan tidak boleh kosong");
      } else {
        await myInstance.post(`/quote`, {
          name: name,
          qoute: qoute,
        });
        mutate(`/quote`);
        setName(" ");
        setQoute(" ");
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const DeleteData = async (id) => {
    await myInstance.delete(`/quote/${id}`);
    mutate(`/quote`);
  };

  const EditData = (id) => {
    return navigate(`/edit/${id}`);
  };

  return (
    <div className="max-w-[1240px] mx-auto ">
      <div>
        <Hero />
        <div className="w-full px-5 mb-10">
          <div className="block md:flex">
            <input
              type="text"
              className="w-full mb-2 md:mb-0 h-[50px] px-5 md:mx-3  rounded-md"
              placeholder="Your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="w-full mb-2 md:mb-0 h-[50px] px-5 md:mx-3  rounded-md"
              placeholder="Quotes..."
              value={qoute}
              onChange={(e) => setQoute(e.target.value)}
            />
            <button
              onClick={AddData}
              className="px-10 w-full md:w-[500px] bg-zinc-900 h-[50px] rounded-md text-white md:mx-3"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {" "}
          {data
            .sort((a, b) => b.id - a.id)
            .map((datas) => {
              return (
                <div key={datas.id}>
                  <div className=" block md:flex justify-between items-center w-full border-t  border-slate-400 md:py-10">
                    <div className=" md:w-[50%]">
                      <p className="px-5 pt-4 md:text-3xl font-bold leading-none ">
                        <span className="md:text-5xl">"</span> {datas.qoute} .
                      </p>
                    </div>
                    <div className=" md:w-[50%] md:pt-[100px] pt-3">
                      <p className=" px-5 md:text-1xl tracking-tight font-bold">
                        - {datas.name}
                      </p>
                      <p className="px-5  text-md">@creator</p>
                      <div className="mt-3">
                        <button
                          onClick={() => DeleteData(datas.id)}
                          className="text-red-400 ps-5"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>{" "}
                        <button
                          onClick={() => EditData(datas.id)}
                          className="mx-3"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
