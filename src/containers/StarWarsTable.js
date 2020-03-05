import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

function StarWarsTable({planets}) {
  const tableControlStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }

  // amount of rows to display in table
  const [pagination, setPagination] = useState(10);
  // amount of items in pagination to display
  const [paginationItems, setPaginationItems] = 
    useState(Math.ceil(planets.length / pagination));
  // current page to display
  const [page, setPage] = useState(0);

  // changes how many rows to display in table
  function changePagination(value) {
    const inputValue = Number(value);
    setPagination(inputValue);
    setPaginationItems(Math.ceil(planets.length / inputValue));
    if (Math.ceil(planets.length / inputValue) < page + 1) {
      setPage(0);
    }
  }

  function renderRow(planet) {
    return (
      <tr key={planet.name}>
        <td>{planet.name}</td>
        <td>{planet.population}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.surface_water}</td>
      </tr>
    )
  }

  function renderPagination() {

    function onPageClick(num) {
      setPage(num);
    }

    function onIncrementPageClick() {
      setPage(page + 1 < paginationItems ? page + 1 : paginationItems - 1);
    }

    function onDecrementPageClick() {
      setPage(page - 1 >= 0 ? page - 1 : 0);
    }

    function onFirstPageClick() {
      setPage(0);
    }

    function onLastPageClick() {
      setPage(paginationItems - 1);
    }

    function renderIndividualPage() {
      let pages = [];
      for (let i = 0; i < paginationItems; i++) {
        pages.push(
          <Pagination.Item
            key={i}
            active={page === i} 
            onClick={() => onPageClick(i)}>
            {i}
          </Pagination.Item>
          )
      }
      return pages;
    }

    return (
      <Pagination>
        <Pagination.First onClick={onFirstPageClick}/>
        <Pagination.Prev onClick={onDecrementPageClick}/>
        {renderIndividualPage()}
        <Pagination.Next onClick={onIncrementPageClick}/>
        <Pagination.Last onClick={onLastPageClick}/>
      </Pagination>
    )
  }  

  return (
    <div>
      <div style={tableControlStyles}>
        <select value={pagination} onChange={(e) => changePagination(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={planets.length}>{planets.length}</option>
        </select>
        {renderPagination()}
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Rotation</th>
            <th>Orbital</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Surface Water</th>
          </tr>
        </thead>
        <tbody>
          {planets
            .slice(page*pagination, page*pagination + pagination)
            .map(planet => renderRow(planet))}
        </tbody>
      </Table>
    </div>
  )
}

export default StarWarsTable;