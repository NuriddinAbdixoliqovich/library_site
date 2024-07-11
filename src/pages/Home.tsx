import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import BookList from "../components/BookList";
import { useEffect, useState } from "react";
import axios from "axios";

interface DataType {
  id: number;
  cover_image: string;
  author: string;
  isbn: number;
}

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  // console.log(search);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Muvafaqqiyati chiqildi");
    navigate("/auth");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://freetestapi.com/api/v1/books")
      .then((res) => {
        setData(res.data);
        console.log("Lazizni datasi", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between py-6 bg-[#ffe4c4] m-auto px-8">
        <div>
          <Link to="/home" className="text-2xl text-slate-700 font-bold">
            Kutubxona
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/mylibrary">
            <Button variant="outlined" color="success">
              Mening kutubxonam
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleLogout()}
          >
            Chiqish
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <p className="mb-4">Kitob qidirish</p>
        <TextField
          placeholder="Kitob qidirish"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3 gap-12 ">
          {data
            .filter((d) => {
              return search.toLowerCase() === ""
                ? d
                : d.title.toLowerCase().includes(search);
            })
            .map((d) => (
              <div
                key={d.id}
                className="bg-[#b6e4b6] rounded-[15px] text-center h-[300px] flex flex-col justify-between px-4 py-6 items-center"
              >
                <img
                  src={d.cover_image}
                  className="w-[150px]  h-[150px] rounded-lg"
                />
                <p className="font-bold">{d.author}</p>
                <p>{d.title}</p>
                <p className="mb-2">{d.publication_year}</p>
                <Button variant="contained" size="small" fullWidth>
                  +
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
