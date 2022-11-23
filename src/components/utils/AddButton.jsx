function AddButton(props) {
  return (
    <>
      <button className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-full shadow-md hover:shadow-lg">
        {props.name}
      </button>
    </>
  );
}

export default AddButton;
