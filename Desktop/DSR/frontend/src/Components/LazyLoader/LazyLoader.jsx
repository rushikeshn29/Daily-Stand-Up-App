import { CircleLoader } from "react-spinners";
function LazyLoader() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircleLoader color="#ef0101" size={80} speedMultiplier={1} />
    </div>
  );
}

export default LazyLoader;
