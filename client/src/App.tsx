import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Todos from "./components/Todos";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Todos />
      </QueryClientProvider>
    </>
  );
}

export default App;
