

const ErrorText = ({children}) => {
    return (
        <>
            <span className="error-text text-red-500 text-xs ml-0.5 font-medium">{children}</span>
        </>
    );
};

export default ErrorText;