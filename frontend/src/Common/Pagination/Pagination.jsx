import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

const BootstrapPagination = ({ pagination, links, getData, current_page = 1, path }) => {

  const dispatch = useDispatch();
  let location = useLocation()
  let searchParams = useSearchParams()[0];
  const searchValue = searchParams.get('search');

  let items = [];
  for (let i = 1; i < pagination.links.length - 1; i++) {
    const activePage = current_page === i ? 'active' : ''
    if (pagination.links[i].label === '...') {
      items.push(
        <li key={i} className="page-item">
          <span className='page-link'>{pagination.links[i].label}</span>
        </li>
      );
    } else {items.push(
      <li key={i} className="page-item">
        <NavLink
          className={'page-link ' + activePage }
          to={path + pagination.links[i].label + location.search}
          onClick={() => changePageHandler(pagination.links[i].label)}
          disabled={pagination.links[i].label === '...'}
        >
          {pagination.links[i].label}
        </NavLink>
      </li>
    );}
  }

  const changePageHandler = (currentPage) => {
    // if (Number.isInteger(currentPage)) {
      const payload = { current_page: currentPage, search: searchValue || '' }
      dispatch(getData(payload))
    // }
  }

  return <>
    <Pagination size="sm">{items}</Pagination>
  </>
}

export default BootstrapPagination