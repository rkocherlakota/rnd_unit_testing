import Header from "../../components/Header/Header";
import "./HomePage.css";
// import Username from "./Username";
// import Dropdown from "./Dropdown";
import InputBox from "./InputBox";
import Information from "./Information";
import History from "./History";
import Footer from "../Footer/Footer";
import { useUser } from "../UserContext";
import Username from "./Username"

export default function HomePage() {
  const { allFileNames } = useUser();
  return (
    <>
      <Header />
      <section className="home-page">
        <Username />
        <InputBox />

        {allFileNames.length === 0 ? <Information /> : <History />}
      </section>
      <Footer />
    </>
  );
}
