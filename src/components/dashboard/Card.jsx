function Card(props) {
    return <div className={`w-44 hover:shadow-sm h-auto py-6 ${props.color} shadow-md rounded-lg flex justify-center items-center text-white`}>
        <div>
            <div className="flex justify-center items-center">
                {props.icon}
            </div>
            <h1 className={`text-lg font-semibold text-center mt-1`}>{props.title}</h1>
            <h1 className="text-lg font-semibold text-center mt-3 text-gray-100">{props.value}</h1>
        </div>
    </div>
}

export default Card;
