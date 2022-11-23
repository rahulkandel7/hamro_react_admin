function ServerError() {
  return (
    <>
      <div className="w-full h-screen bg-gray-100">
        <div className="flex items-center justify-center h-screen">
          <div>
            <h1 class="text-9xl  text-gray-400 font-bold text-center">500</h1>
            <h3 className="pt-5 text-xl max-w-sm text-center text-gray-700">
              Sorry, we are having some technical issues.
            </h3>
            <h4 className="py-1 pb-3 max-w-sm text-center text-gray-400">
              But don't worry, we are working on it.
            </h4>
            <div className="flex items-center justify-center">
              <p className="px-10 py-2 bg-indigo-500 text-white hover:bg-indigo-700 rounded-md shadow-md capitalize">
                Retry after Some times
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServerError;
