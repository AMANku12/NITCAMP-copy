import "./AdminLogin.css";
import NITCAA from "../../components/NITCAA";
import InputField from "./Components/InputField";
import RandomShapes1 from "../../components/RandomShapes1";
import RandomShapes2 from "../../components/RandomShapes2";

function AdminLogin() {
  return (
    <div className="App">
      <NITCAA />
      <RandomShapes1 />
      <RandomShapes2 />
      <InputField />
    </div>
  );
}

export default AdminLogin;
