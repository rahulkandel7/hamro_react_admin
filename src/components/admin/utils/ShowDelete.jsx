function ShowDelete(props) {
  return (
    <>
      <div className="bg-black bg-opacity-50 bg-backdrop-blur    overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-20 z-50 justify-center items-center md:h-full md:inset-0  align-middle">
        <div className="flex justify-between items-center h-full">
          <div className="relative px-4 w-full max-w-md h-full md:h-auto mx-auto  ">
            <div className="relative bg-gray-50 rounded-lg  dark:bg-gray-700 shadow-md shadow-gray-500 py-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white pt-6 mb-0 text-center">
                Are You Sure to Delete ?
              </h3>
              <p className="text-center mt-0 text-red-500">
                The action is irreversible
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    props.delete(props.id);
                  }}
                  className="py-2 px-4 mx-2 rounded-md text-white bg-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-800 hover:shadow-sm"
                >
                  Yes ! Delete
                </button>
                <button
                  onClick={props.hideDelete}
                  className="py-2 px-4 mx-2 rounded-md cursor-pointer text-white bg-red-500  hover:bg-red-600"
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

export default ShowDelete;
