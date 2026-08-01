import { Link } from 'react-router-dom';
import './Button.css';

function Button({ variant = 'primary', children, href, ...props }) {
  const className = `btn btn-${variant}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
