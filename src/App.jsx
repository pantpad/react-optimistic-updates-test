import HomeMade from "./components/OptimisticHomeMade";
import OptimisticReactQuery from "./components/OptimisticReactQuery";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQuery from "./components/OptimisticReactQuery";

const queryClient = new QueryClient();

function App() {
  console.log("renderAPP");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1 className="mx-auto w-full">Optimistic</h1>
        <OptimisticReactQuery />
      </QueryClientProvider>
    </>
  );
}

export default App;
