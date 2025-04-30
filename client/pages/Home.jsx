import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;
