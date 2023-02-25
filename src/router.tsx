import { createBrowserRouter } from "react-router-dom";
import RoomDetail from "./components/routers/RoomDetail";
import Root from "./components/Root";
import Home from "./components/routers/Home";
import NotFound from "./components/routers/NotFound";
import GitgubConfirm from "./components/routers/GithubConfirm";
import KakaoConfirm from "./components/routers/KakaoConfirm";
import UploadRoom from "./components/routers/UploadRoom";
import UploadPhotos from "./components/routers/UploadPhotos";
import SignUpSuceess from "./components/routers/SignUpSuccess";
import { RoomUpdate } from "./components/routers/RoomUpdate";

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
        path: "/signup",
        element: <SignUpSuceess />,
      },
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "rooms/:roomPk/update",
        element: <RoomUpdate />,
      },
      {
        path: "rooms/:roomPk/photos",
        element: <UploadPhotos />,
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
