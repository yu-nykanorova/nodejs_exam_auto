export const ErrorComponent = ({message}: {message: string}) => {
    return (
        <div className="error">{message}</div>
    );
};