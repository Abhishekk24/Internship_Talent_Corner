import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;
  const [searchTerm, setSearchTerm] = useState('');
  const [isBooleanSearch, setIsBooleanSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (page, search = '', booleanSearch = false) => {
      const offset = (page - 1) * recordsPerPage;
      try {
        const response = await axios.get(`http://localhost:3001/api/details`, {
          params: {
            offset,
            limit: recordsPerPage,
            search,
            booleanSearch
          }
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(currentPage, searchTerm, isBooleanSearch);
  }, [currentPage, searchTerm, isBooleanSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const toggleBooleanSearch = () => {
    setIsBooleanSearch(!isBooleanSearch);
  };

  const handleProfileClick = (contactNo) => {
    navigate(`/profiles/${contactNo}`);
  };

  return (
    <div className="app">
      <div className="search-box">
        <i className="bi bi-search search-icon"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, number, role, experience, location..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="toggle-button" onClick={toggleBooleanSearch}>
          {isBooleanSearch ? 'Boolean Search: ON' : 'Boolean Search: OFF'}
        </button>
      </div>

      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Experience</th>
              <th scope="col">Location</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>
                  <i
                    className="bi bi-person-circle"
                    style={{ marginRight: '8px', cursor: 'pointer' }}
                    onClick={() => handleProfileClick(row.contact_no)}
                  ></i>
                  {row.Name}
                </td>
                <td>{row.Role}</td>
                <td>{row.years_of_experience}</td>
                <td>{row.current_location}</td>
                <td className="action-cell">
                  <a href={`https://wa.me/${row.contact_no}?text=${encodeURIComponent("Please send your updated CV")}`} target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-whatsapp icon-purple-dark"></i>
                  </a>
                  <a href={`mailto:${row.email_id}`} target="_blank">
                    <i className="bi bi-envelope icon-purple-dark"></i>
                  </a>
                  <a href={`tel:${row.contact_no}`}>
                    <i className="bi bi-telephone icon-purple-dark"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="button" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
