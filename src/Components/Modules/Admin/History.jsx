

import React from 'react';
import './admin.css';

const History = () => {
  const loanHistory = [
    { id: 1, name: 'Loan User 1' },
    { id: 2, name: 'Loan User 2' },
    { id: 3, name: 'Loan User 3' },
    { id: 1, name: 'Loan User 1' },
    { id: 2, name: 'Loan User 2' },
    { id: 3, name: 'Loan User 3' },
    
  ];

  return (
    <section className='py-lg-16 py-10'>
      <div className="container-fluid">
    <div className='histoy'>
      <h2 className='heading'>Loan History</h2>
      <div className="card-container">
        {loanHistory.map((user) => (
          <div key={user.id} className="card">
          
            <p>Joining Date: ...</p>
            <p>Loan Amount: ...</p>
            <p>Pending Repayment: ...</p>
            <p>Rate of Interest: ...</p>
            <p>Duration: ...</p>
            <p>Name: {user.name}</p>
            <p>Applicant Name: ...</p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </section>
  );
};

export default History;
