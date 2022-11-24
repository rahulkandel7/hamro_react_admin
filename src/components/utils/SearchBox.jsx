import { FiSearch } from "react-icons/fi";

function SearchBox({ change, name }) {
  return (
    <>
      <div className="flex justify-end items-center my-3">
        <div className="relative">
          <input
            type="text"
            name="search"
            id="search"
            className="border border-gray-200 pl-5 outline-none focus-visible:border-indigo-400 hover:border-indigo-300 pr-10 text-gray-500 rounded-full shadow-md shadow-gray-100 focus-visible:shadow-gray-300 py-2"
            placeholder={`Search ${name}...`}
            onChange={change}
          />
          <div className="absolute top-[50%] -translate-y-[50%] right-3 text-xl text-gray-500">
            <FiSearch />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
