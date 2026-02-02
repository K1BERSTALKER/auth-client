import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { FormResetProvider } from "./contexts/FormResetContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <FormResetProvider>
      <RouterProvider router={router} />
    </FormResetProvider>
  </AuthProvider>,
);
