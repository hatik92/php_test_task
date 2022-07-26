import Pagination from 'react-bootstrap/Pagination';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

const BootstrapPagination = ({ pagination, links, getData, current_page }) => {
  console.log(current_page);
  const dispatch = useDispatch()
  let active = current_page;
  let items = [];
  const changePageHandler = (currentPage) => {
    const payload = { current_page: currentPage }
    dispatch(getData(payload))
  }
  let activeStyle = {
    textDecoration: "underline",
  };
  for (let number = 1; number <= pagination.last_page; number++) {
    items.push(
      <li key={number} className="page-item">
        <NavLink
          className="page-link"
          to={'/books/' + number}
          onClick={() => changePageHandler(number)}
        // style={({ isActive }) =>
        //       isActive ? activeStyle : undefined
        //     }
        >
          {number}
        </NavLink>

      </li>
    );
  }
  return <>
    <Pagination size="sm">{items}</Pagination>
  </>
}

export default BootstrapPagination