import { Link } from 'react-router-dom';
import './../styles/_Logo.scss';
export function Logo() {
  return (
    <div className='logo-Container'>
      <Link to={'/'} className='logo'>
        MyZOO
      </Link>
    </div>
  );
}
