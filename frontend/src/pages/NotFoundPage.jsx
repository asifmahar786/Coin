import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="notfound">
    <p className="notfound__code">404</p>
    <p className="notfound__text">This page doesn't exist.</p>
    <Link to="/dashboard" className="btn-primary">Back to dashboard</Link>
  </div>
);

export default NotFoundPage;
