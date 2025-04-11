const DisplayField = ({ label, value }) => {
    return (
        <div className="w-full">
            <label className="text-gray-500 mb-1 block">{label}</label>
            <input
                type="text"
                value={value}
                readOnly
                className="w-full px-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-gray-800
                     focus:outline-none focus:ring-0 caret-transparent select-none"
            />
        </div>
    );
};


export default DisplayField;