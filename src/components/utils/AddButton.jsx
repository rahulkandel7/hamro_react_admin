function AddButton(props) {
  return (
    <>
      <button className="px-6 text-lg py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-full shadow-md hover:shadow-lg">
        {props.name}
      </button>
    </>
  );
}

export default AddButton;
