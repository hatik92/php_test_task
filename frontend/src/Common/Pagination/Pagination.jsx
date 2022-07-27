import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

const BootstrapPagination = ({ pagination, links, getData, current_page }) => {

  const dispatch = useDispatch();
  let location = useLocation()
  let searchParams = useSearchParams()[0];
  const searchValue = searchParams.get('search');

  let items = [];
  for (let number = 1; number <= pagination.last_page; number++) {
    items.push(
      <li key={number} className="page-item">
        <NavLink
          className="page-link"
          to={'/books/' + number + location.search}
          onClick={() => changePageHandler(number)}
        >
          {number}
        </NavLink>
      </li>
    );
  }

  const changePageHandler = (currentPage) => {
    const payload = { current_page: currentPage, search: searchValue || '' }
    dispatch(getData(payload))
  }

  return <>
    <Pagination size="sm">{items}</Pagination>
  </>
}

export default BootstrapPagination