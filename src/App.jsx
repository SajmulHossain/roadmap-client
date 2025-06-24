import { Outlet } from "react-router";
import Footer from "./sharedComponents/Footer";
import Header from "./sharedComponents/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
