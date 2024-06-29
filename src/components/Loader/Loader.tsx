import Spinner from 'react-bootstrap/Spinner';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-wrapper">
            <Spinner animation="border" variant="primary" />
        </div>

    );
}

export default Loader;
