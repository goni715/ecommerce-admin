
const Error = ({message}) => {
    return (
        <>
            <div className="text-center px-1 py-2 mt-1 text-[#a94442] bg-[#f2dede] rounded border border-[#f2dede]">
                {message}
            </div>
        </>
    );
};

export default Error;