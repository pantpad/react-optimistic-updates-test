import HomeMade from "./components/OptimisticHomeMade";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  console.log("renderAPP");
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1 className="mx-auto w-full">Optimistic</h1>
        <HomeMade />
      </QueryClientProvider>
    </>
  );
}

export default App;
