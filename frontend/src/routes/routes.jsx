import MainLayout from "../components/Layout/Client/MainLayout";
import HomePage from "../pages/HomePage/HomePage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
];

export default routes;