import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="breadcrumbs">
    {items.map((item, i) => (
      <span key={item.label}>
        {item.to ? (
          <Link to={item.to}>
            {item.label}
          </Link>
        ) : (
          <span className="breadcrumbs__current">{item.label}</span>
        )}
        {i < items.length - 1 && <span className="breadcrumbs__sep">/</span>}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
