import { CiTrash } from "react-icons/ci";

function DeleteButton({ click }) {
  return (
    <>
      <button
        className="px-6 flex items-center py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
        onClick={click}
      >
        <CiTrash className="mr-2" /> Delete
      </button>
    </>
  );
}

export default DeleteButton;
