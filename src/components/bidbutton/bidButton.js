import "./bidButton.css";
import { useHistory } from "react-router-dom";

const BidButton = ({ savePrice }) => {
  const history = useHistory();
  return (
    <button
      className="bidButtonProduct"
      onClick={() => {
        if (localStorage.getItem("token")) {
          savePrice();
        } else {
          history.push("/login");
        }
      }}
    >
      PUJAR
    </button>
  );
};
export default BidButton;
