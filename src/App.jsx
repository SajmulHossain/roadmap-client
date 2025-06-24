import { Outlet } from "react-router";
import Footer from "./sharedComponents/Footer";
import Header from "./sharedComponents/Header";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loader";

function App() {
  const {user, loading} = useAuth();
  console.log(loading);

  if(loading) {
    return <Loader />
  }
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
