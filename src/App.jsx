import HomeMade from "./components/OptimisticHomeMade";

function App() {
  console.log("renderAPP");
  return (
    <>
      <h1 className="mx-auto w-full">Optimistic</h1>
      <HomeMade />
    </>
  );
}

export default App;
