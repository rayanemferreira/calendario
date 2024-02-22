import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Lay from './Layout.jsx'
import Evento from "./Evento.jsx";

import { ConfigProvider } from 'antd';
import Formulario from "./Formulario.jsx";
import { DataProvider } from "./components/contexts/Context.jsx";

const router = createBrowserRouter([
  {
    path: "/task",
    element: <Formulario />,
  },

  {
    path: "/layout",
    element: <Lay />,
  },
  {
    path: "/event",
    element: <Evento />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider >
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ConfigProvider>
  </React.StrictMode>
);