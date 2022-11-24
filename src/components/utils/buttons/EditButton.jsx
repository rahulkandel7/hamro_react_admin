import { TbEditCircle } from "react-icons/tb";

function EditButton() {
  return (
    <>
      <button className="px-6 flex items-center py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
        <TbEditCircle className="mr-2" /> Update
      </button>
    </>
  );
}

export default EditButton;
