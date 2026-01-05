import { useNavigate } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

function Breadcrumb({ items }) {
  const navigate = useNavigate();

  return (
    <div className='text-blue-900'>
        <span>Home</span>
    </div>
  );
}

export default Breadcrumb;