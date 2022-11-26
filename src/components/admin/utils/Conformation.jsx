import { RiErrorWarningLine } from "react-icons/ri";

function Conformation(props) {
  return (
    <>
      <div className="bg-black bg-opacity-50 bg-backdrop-blur overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-20 z-50 justify-center items-center md:h-full md:inset-0  align-middle">
        <div className="flex justify-between items-center h-full">
          <div className="relative px-4 w-full max-w-md h-full md:h-auto mx-auto  ">
            <div className="relative bg-gray-50 rounded-lg   shadow-md shadow-gray-500 p-10">
              <div className="flex items-center justify-center">
                <RiErrorWarningLine className="text-5xl text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 pt-6 mb-0 text-center">
                Mark this order as{" "}
                <span className="capitalize">{props.name}</span> ?
              </h3>
              <p className="text-center text-gray-600">
                The user will be notified for each change.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    props.action();
                    props.hide();
                  }}
                  className="py-3 px-6 mx-2 rounded-md text-white bg-indigo-600 shadow-md  hover:bg-indigo-800 hover:shadow-sm"
                >
                  Yes ! Change It !
                </button>
                <button
                  onClick={() => props.hide()}
                  className="py-3 px-6 mx-2 rounded-md cursor-pointer text-white bg-red-500  hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Conformation;
