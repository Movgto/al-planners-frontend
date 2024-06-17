type ErrorMessageProps = {
    message: string
}

const ErrorMessage = ({message} : ErrorMessageProps) => {
    return (
        <div
            className="bg-red-700 text-white font-semibold uppercase p-2"
        >
            <p
                className="text-center"
            >{message}</p>
        </div>
    )
}

export default ErrorMessage