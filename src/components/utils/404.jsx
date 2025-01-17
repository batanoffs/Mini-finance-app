import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();

    const redirectHandler = () => {
        navigate(-1);
    };

    return (
        <Result
            style={{ alignSelf: 'center', margin: '0 auto' }}
            status="404"
            title="Error 404, Page Not Found."
            subTitle="The page you are looking for does not exist."
            extra={
                <button onClick={redirectHandler} className="button-primary">
                    Go Back
                </button>
            }
        />
    );
};
