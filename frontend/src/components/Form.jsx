import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const name = method === "login" ? "Login" : "Register" 
    const HandleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try {
            const res =  await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error){
            alert(error)
            
        } finally {
            setLoading(false)
        }
    }



    return <form onSubmit={HandleSubmit} className="form-container">
        <h2>{name}</h2>

        <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        <button className="form-button" type="submit">{name}</button>

    </form>
}

export default Form