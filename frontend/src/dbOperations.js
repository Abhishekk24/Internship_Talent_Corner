const sql = require('msnodesqlv8');
const config = require('./dbConfig');

function parseBooleanSearch(searchTerm) {
  const terms = searchTerm.match(/(?:[^\s"]+|"[^"]*")+/g);
  const conditions = terms.map(term => {
    if (term.includes('AND')) {
      const [field, value] = term.split('AND').map(s => s.trim());
      return `(${field} LIKE '%${value}%')`;
    } else if (term.includes('OR')) {
      const [field, value] = term.split('OR').map(s => s.trim());
      return `(${field} LIKE '%${value}%')`;
    } else if (term.includes('NOT')) {
      const [field, value] = term.split('NOT').map(s => s.trim());
      return `(${field} NOT LIKE '%${value}%')`;
    } else {
      return `(Name LIKE '%${term}%' OR Role LIKE '%${term}%' OR current_location LIKE '%${term}%' OR email_id LIKE '%${term}%' OR contact_no LIKE '%${term}%')`;
    }
  });
  return conditions.join(' AND ');
}

async function getDetails(offset = 0, limit = 50, searchTerm = '', booleanSearch = false) {
  return new Promise((resolve, reject) => {
    let query = `SELECT Name, Role, years_of_experience, current_location, contact_no, email_id FROM naukri_data`;

    if (searchTerm) {
      if (booleanSearch) {
        const booleanCondition = parseBooleanSearch(searchTerm);
        query += ` WHERE ${booleanCondition}`;
      } else {
        query += ` WHERE 
          LOWER(Name) LIKE '%${searchTerm}%' OR 
          LOWER(Role) LIKE '%${searchTerm}%' OR
          LOWER(current_location) LIKE '%${searchTerm}%' OR
          LOWER(email_id) LIKE '%${searchTerm}%' OR
          LOWER(contact_no) LIKE '%${searchTerm}%'`;
      }
    }

    query += ` ORDER BY Name OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;

    sql.query(config, query, (err, rows) => {
      if (err) {
        console.log('Query Error:', err);
        return reject(err);
      }
      console.log('Query Result:', rows);
      resolve(rows);
    });
  });
}

async function getUserDetails(contactNo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT Name, email_id, contact_no, current_location, State, Department, Role, Industry, 
                   years_of_experience, ann_salary, curr_company_name, curr_company_duration_from, 
                   curr_company_designation, prev_employer_name, ug_degree, ug_specialization, ug_year, 
                   pg_degree, pg_specialization, pg_college, pg_yeat, Gender, marital_status, Age 
                   FROM naukri_data 
                   WHERE contact_no = ?`;

    sql.query(config, query, [contactNo], (err, rows) => {
      if (err) {
        console.log('Query Error:', err);
        return reject(err);
      }
      resolve(rows[0]); // Assuming contact_no is unique and we get a single record
    });
  });
}

async function updateUserDetails(contactNo, userDetails) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE naukri_data SET 
                   Name = ?, email_id = ?, contact_no = ?, current_location = ?, State = ?, Department = ?, 
                   Role = ?, Industry = ?, years_of_experience = ?, ann_salary = ?, curr_company_name = ?, 
                   curr_company_duration_from = ?, curr_company_designation = ?, prev_employer_name = ?, 
                   ug_degree = ?, ug_specialization = ?, ug_year = ?, pg_degree = ?, pg_specialization = ?, 
                   pg_college = ?, pg_yeat = ?, Gender = ?, marital_status = ?, Age = ?
                   WHERE contact_no = ?`;

    const values = [
      userDetails.Name, userDetails.email_id, userDetails.contact_no, userDetails.current_location, userDetails.State, 
      userDetails.Department, userDetails.Role, userDetails.Industry, userDetails.years_of_experience, userDetails.ann_salary, 
      userDetails.curr_company_name, userDetails.curr_company_duration_from, userDetails.curr_company_designation, 
      userDetails.prev_employer_name, userDetails.ug_degree, userDetails.ug_specialization, userDetails.ug_year, 
      userDetails.pg_degree, userDetails.pg_specialization, userDetails.pg_college, userDetails.pg_yeat, 
      userDetails.Gender, userDetails.marital_status, userDetails.Age, contactNo
    ];

    sql.query(config, query, values, (err, result) => {
      if (err) {
        console.log('Update Query Error:', err);
        return reject(err);
      }
      resolve(result);
    });
  });
}


module.exports = {
  getDetails,
  getUserDetails,
  updateUserDetails
};
