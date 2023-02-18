import { createBrowserRouter } from "react-router-dom";
import RoomDetail from "./components/routers/RoomDetail";
import Root from "./components/Root";
import Home from "./components/routers/Home";
import NotFound from "./components/routers/NotFound";
import GitgubConfirm from "./components/routers/GithubConfirm";
import KakaoConfirm from "./components/routers/KakaoConfirm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GitgubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
