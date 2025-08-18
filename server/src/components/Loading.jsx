import { TailSpin } from "react-loader-spinner";

const Loading = ({ style, message }) => {
  return (
    <div
      className={`flex-1 h-full flex flex-col justify-center items-center text-center bg-dark_bg ${style}`}
    >
      <h1 className="text-zinc-300 text-2xl font-semibold mb-4">
        {message ?? "Loading..."}
      </h1>
      <TailSpin color="#662BC7" />
    </div>
  );
};

export default Loading;
