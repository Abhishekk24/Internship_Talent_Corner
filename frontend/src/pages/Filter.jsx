import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import 'bootstrap-icons/font/bootstrap-icons.css';


function Filter() {
    const [data, setData] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [data1, setData1] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [ugDegrees, setUgDegrees] = useState([]);
    const [selectedUgDegrees, setSelectedUgDegrees] = useState([]);
    const [pgDegrees, setPgDegrees] = useState([]);
    const [selectedPgDegrees, setSelectedPgDegrees] = useState([]);
    const [annSalaries, setAnnSalaries] = useState([]);
    const [selectedAnnSalaries, setSelectedAnnSalaries] = useState([]);
    const [yearsOfExperience, setYearsOfExperience] = useState([]);
    const [selectedYearsOfExperience, setSelectedYearsOfExperience] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/data');
            setData(response.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            const response1 = await axios.get('http://localhost:3001/api/data1');
            setData1(response1.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            const response2 = await axios.get('http://localhost:3001/api/ug-degrees');
            setUgDegrees(response2.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            const response3 = await axios.get('http://localhost:3001/api/pg-degrees');
            setPgDegrees(response3.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            const response4 = await axios.get('http://localhost:3001/api/ann-salaries');
            setAnnSalaries(response4.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            const response5 = await axios.get('http://localhost:3001/api/years-of-experience');
            setYearsOfExperience(response5.data.map((item, index) => ({ ...item, uniqueId: index + 1 })));
            fetchFilteredData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFilteredData = async () => {
        try {
            const selectedRolesArray = selectedRoles.map(item => item.label);
            const selectedLocationsArray = selectedLocations.map(item => item.label);
            const selectedUgDegreesArray = selectedUgDegrees.map(item => item.label);
            const selectedPgDegreesArray = selectedPgDegrees.map(item => item.label);
            const selectedAnnSalariesArray = selectedAnnSalaries.map(item => item.label);
            const selectedYearsOfExperienceArray = selectedYearsOfExperience.map(item => item.label);
            const response = await axios.get('http://localhost:3001/api/filter', {
                params: {
                    roles: selectedRolesArray,
                    locations: selectedLocationsArray,
                    ug_degrees: selectedUgDegreesArray,
                    pg_degrees: selectedPgDegreesArray,
                    ann_salaries: selectedAnnSalariesArray,
                    years_of_experience: selectedYearsOfExperienceArray,
                    Gender: selectedGender,
                    Age: selectedAge,
                    page: currentPage,
                    limit: 10
                }
            });
            setFilteredData(response.data);
            setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };

    useEffect(() => {
        fetchFilteredData();
    }, [selectedRoles, selectedLocations, selectedUgDegrees, selectedPgDegrees, selectedAnnSalaries, selectedYearsOfExperience, selectedGender, selectedAge, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleWhatsAppClick = (contactNo) => {
        const message = "Please send your updated CV";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${contactNo}?text=${encodedMessage}`, '_blank');
    };

    const handleEmailClick = (emailId) => {
        const url = `mailto:${emailId}`;
        window.open(url, '_blank');
    };
      

    const handleCallClick = (contactNo) => {
        window.location.href = `tel:${contactNo}`;
    };
    
    const handleProfileClick = (contactNo) => {
        navigate(`/profiles/${contactNo}`);
      };

    const styles = {
        app: {
            fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif',
            
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent:'center',
            overflowY: 'auto',
            backgroundColor: '#f4f9f4',
            marginTop:'15px',
            maxHeight: 'calc(100vh - 20px)', /* Limit the height of the page to the viewport height minus top margin */
        },
        tableContainer: {
            margin: '30px auto',
            marginLeft:'135px',
            width: 'auto',
            maxHeight: '430px',
            fontSize: '16px',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
            overflowY: 'auto',
            color: 'purple',
            fontWeight: '200',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            padding: '20px', /* Add padding to avoid table touching the container borders */
            borderRadius: '10px', /* Round the corners of the table container */
        },
        table: {
            width: 'auto',
            borderCollapse: 'separate', /* Use separate to apply spacing between rows */
            backgroundColor: '#fff',
            borderSpacing: '0 12px', /* Space between rows */
        },
        thTd: {
            padding: '8px',
            marginTop: '0px',
            textAlign: 'left',
        },
        th: {
            borderBottom: '2px solid #ddd',
            textAlign: 'left',
            border:'none',
            paddingLeft: '10px',
            paddingTop: '0px',
            paddingBottom: '0px',
            backgroundColor: '#fff',
        },
        tr: {
            borderRadius: '10px', /* Round the corners of the rows */
            backgroundColor: '#fff',
            boxShadow: '0 5px 5px rgba(0, 0, 0, 0.1)', /* Add a slight shadow for better visibility */
            border: 'none',
            padding:'10px',

        },
        td: {
            border: 'none',
            padding:'10px',

        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
        },
        button: {
            margin: '0 5px',
            padding: '10px 20px',
            border: 'none',
            backgroundColor: '#674F7F',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
        },
        actionCell: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '18px', /* Add gap between icons */
        },
        i:{
            cursor: 'pointer',

        },
        iconPurpleDark: {
            color: '#6a0dad',

        },
     
        searchBox: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 0',
        },
        filterItem: {
            border: 'none',
            outline: '0px',
            alignItems: 'center',
            width:'200px',
            justifyContent:'space-around',

        },
        MultiSelect: {
            borderColor: 'white',
        },
        input: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '70px',
            margin: '0',
        },
        
        filterHeading: {
            fontSize: '18px',
            marginBottom: '5px',
            color: '#333',
            textAlign: 'center',
        },
        radioContainer: {
            display: 'flex',
            alignItems: 'center',
            alignContent:'center',
        },
        radioLabel: {
            paddingTop:'6px',
            marginRight: '10px',
        },
        filterBar: {
            marginLeft:'170px',
            marginRight:'50px',
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '20px',
            marginTop:'45px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            gap: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            
            alignContent: 'space-between',
        },
        searchBox: { // To change search box element look
            border: 'none',
            fontSize: '10px',
            minHeight: '50px',
          },

    };

    return (
        <div style={{backgroundColor:'#f4f9f4', marginLeft:'120px'}}>
        <div >
            <div style={styles.filterBar}>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={data.map(item => ({ label: item.Role, value: item.uniqueId }))}
                        value={selectedRoles}
                        onChange={setSelectedRoles}
                        labelledBy={"Select Role"}
                        overrideStrings={{ selectSomeItems: "Role" }}
                    />
                </div>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={ugDegrees.map(item => ({ label: item.ug_degree, value: item.uniqueId }))}
                        value={selectedUgDegrees}
                        onChange={setSelectedUgDegrees}
                        labelledBy={"Select UG Degree"}
                        overrideStrings={{ selectSomeItems: "UG Degree" }}
                    />
                </div>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={annSalaries.map(item => ({ label: item.ann_salary, value: item.uniqueId }))}
                        value={selectedAnnSalaries}
                        onChange={setSelectedAnnSalaries}
                        labelledBy={"Select Annual Salary"}
                        overrideStrings={{ selectSomeItems: "Annual Salary" }}
                    />
                </div>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={data1.map(item => ({ label: item.current_location, value: item.uniqueId }))}
                        value={selectedLocations}
                        onChange={setSelectedLocations}
                        labelledBy={"Select Location"}
                        overrideStrings={{ selectSomeItems: "Location" }}
                    />
                </div>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={pgDegrees.map(item => ({ label: item.pg_degree, value: item.uniqueId }))}
                        value={selectedPgDegrees}
                        onChange={setSelectedPgDegrees}
                        labelledBy="Select PG Degree"
                        overrideStrings={{ selectSomeItems: "PG Degree" }}
                    />
                </div>
                <div style={styles.filterItem}>
                    <MultiSelect
                        className="multi-select-container" // Apply the class
                        options={yearsOfExperience.map(item => ({ label: item.years_of_experience, value: item.uniqueId }))}
                        value={selectedYearsOfExperience}
                        onChange={setSelectedYearsOfExperience}
                        labelledBy={"Select Years of Experience"}
                        overrideStrings={{ selectSomeItems: "Experience" }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={selectedAge || ''}
                        onChange={(e) => setSelectedAge(e.target.value)}
                        style={styles.input}
                        placeholder='Age'
                    />
                </div>
                <div style={styles.filterItem}>
                    <div style={styles.radioContainer}>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                value="Male"
                                checked={selectedGender === "Male"}
                                onChange={() => setSelectedGender("Male")}
                            />
                            Male
                        </label>
                        <label style={styles.radioLabel}>
                            <input
                                type="radio"
                                value="Female"
                                checked={selectedGender === "Female"}
                                onChange={() => setSelectedGender("Female")}
                            />
                            Female
                        </label>
                    </div>
                </div>
            </div>

         
            <div style={styles.app}>
                <div style={styles.tableContainer}>
                    <table className="table table-hover" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Role</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Experience</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Location</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Department</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr style={styles.tr} key={index}>
                                    <td>
                                        <i 
                                            className="bi bi-person-circle" 
                                            style={{ marginRight: '8px', cursor: 'pointer' }} 
                                            onClick={() => handleProfileClick(row.contact_no)}
                                        ></i>
                                        {row.Name}
                                    </td>
                                    <td style={styles.thTd}>{row.Role}</td>
                                    <td style={styles.thTd}>{row.years_of_experience}</td>
                                    <td style={styles.thTd}>{row.current_location}</td>
                                    <td style={styles.thTd}>{row.Department}</td>
                                    <td style={{ ...styles.thTd, ...styles.actionCell }}>
                                        <i
                                            className="bi bi-whatsapp iconPurpleDark"
                                            style={{ marginRight: '8px', cursor: 'pointer' }}
                                            onClick={() => handleWhatsAppClick(row.contact_no)}
                                        ></i>
                                        <i
                                            className="bi bi-envelope iconPurpleDark"
                                            style={{ marginRight: '8px', cursor: 'pointer' }}
                                            onClick={() => handleEmailClick(row.email_id)}
                                        ></i>
                                        <i
                                            className="bi bi-telephone iconPurpleDark"
                                            style={{ marginRight: '8px', cursor: 'pointer' }}
                                            onClick={() => handleCallClick(row.contact_no)}
                                        ></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={styles.pagination}>
                <button
                    style={styles.button}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        style={{ ...styles.button, fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    style={styles.button}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
        </div>
    );
}

export default Filter;
