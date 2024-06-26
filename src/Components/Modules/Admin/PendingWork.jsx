

import React from 'react';
import './admin.css'; 

const PendingWork = () => {
  const todayRegistrations = [
    { id: 1, name: 'New User 1', email: 'user1@example.com', loanType: 'Personal' },
    { id: 2, name: 'New User 2', email: 'user2@example.com', loanType: 'Home' },
  
  ];

  return (
    <section className='py-lg-16 py-10'>

    <div className="container">
      <h2 className='heading'>Pending Work</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Applicant No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type of Loan</th>
          </tr>
        </thead>
        <tbody>
          {todayRegistrations.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.loanType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </section>
  );
};

export default PendingWork;
