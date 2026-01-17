import "../styles/Home.css";
import LoginUser from "../components/LoginUser";
const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a tu App de Tareas</h1>
      <div>
        <LoginUser />
      </div>
    </div>
  );
};

export default Home;
