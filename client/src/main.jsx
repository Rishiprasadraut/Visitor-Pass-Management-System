import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";
import AuthLoader from "./components/AuthLoader.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <AuthLoader>
     <App/>
   </AuthLoader>
  </Provider>
);
