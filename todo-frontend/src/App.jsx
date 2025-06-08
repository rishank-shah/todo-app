import AppRoutes from "./app/pages/AppRoutes";
import { AuthProvider } from "./app/providers/Auth";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
