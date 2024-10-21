import { Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Forbidden = () => {
    let navigate = useNavigate()
    let goBack = () => {
        navigate(-1)
    }
    return (
        <Result
            status="403"
            title="Not Authorized."
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <button onClick={goBack} className="button-primary">
                    Go Back
                </button>
            }
        />
    )
}
