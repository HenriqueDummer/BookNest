import { TailSpin } from "react-loader-spinner"

const Loading = ({style}) => {
  return (
<div className={`w-full h-full flex justify-center items-center bg-dark_bg ${style}`}>
        <div>
            <h1 className="text-zinc-300 text-2xl mb-4">Loading...</h1>
            <TailSpin 
                color="#662BC7"
            />
        </div>
    </div>
  )
}

export default Loading