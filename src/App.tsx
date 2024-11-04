import Router from "~/router";
import { Header } from "@components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "@context/index";

function App() {
  return (
    <LoadingProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
        pauseOnFocusLoss={false}
      />
      <Router />
    </LoadingProvider>
  );
}

export default App;
