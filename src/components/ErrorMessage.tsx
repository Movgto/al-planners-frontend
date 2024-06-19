type ErrorMessageProps = {
    message: string
}

const ErrorMessage = ({message} : ErrorMessageProps) => {
    return (
        <div
            className="border-2 border-red-600 text-red-600 font-semibold uppercase p-2"
        >
            <p
                className="text-center"
            >{message}</p>
        </div>
    )
}

export default ErrorMessage