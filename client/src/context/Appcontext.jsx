import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, settoken] = useState(null);
  const [bloG, setblog] = useState([]);
  const [input, setInputs] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setblog(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      settoken(token);
    }
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }, []);

  const value = {
    axios,
    navigate,
    token,
    settoken,
    bloG,
    setblog,
    input,
    setInputs, // ✅ included this
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAPPContext = () => {
  return useContext(AppContext);
};
