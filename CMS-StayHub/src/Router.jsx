import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import HomeDashboard from "./Pages/HomeDashboard";
import ListMembers from "./Pages/Dashboard/ListLodgings/ListMembers";
import ListLodgings from "./Pages/Dashboard/ListLodgings/ListLodgings";
import Upload from "./Components/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/dashboard");
      }

      return null;
    },
  },
  {
    path: "/dashboard",
    element: <HomeDashboard />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "list-types",
        element: <ListMembers />,
      },
      {
        path: "list-lodgings",
        element: <ListLodgings />,
      },
      {
        path: "upload-file/:productId",
        element: <Upload />,
      },
    ],
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);
export default router;
