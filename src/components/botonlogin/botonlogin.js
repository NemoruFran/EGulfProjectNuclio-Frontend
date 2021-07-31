import "./botonlogin.css";
import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const history = useHistory();

  return (
    <div className="_loginbuttonContainer">
      {localStorage.getItem("token") === "" && (
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          <span>LOGIN</span>
        </button>
      )}
      {localStorage.getItem("token") !== "" && (
        <button
          onClick={() => {
            localStorage.setItem("token", "");
            history.push("/");
          }}
        >
          <span>LOGOUT</span>
        </button>
      )}
    </div>
  );
};

//necesario arreglar el boton para que cuando le des a logout se cambie a login y que cuando cambie de pagina se quede en logout
export default LoginButton;
