import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SearchRoute from "./pages/SearchPage.jsx";
import store from "./utils/store.js";
import { Provider } from "react-redux";
import WatchPage from "./pages/WatchPage.jsx";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/results", element: <SearchRoute /> },
      { path: "/watch", element: <WatchPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerConfig} />
    </Provider>
  </StrictMode>,
);
