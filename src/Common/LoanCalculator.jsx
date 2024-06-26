import React, { useState } from 'react';

const LoanCalculator = () => {
  // State variables for form inputs
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  // State variables for calculated results
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  // Function to calculate the loan details
  const calculateLoan = (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Convert input values to numeric
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const terms = parseInt(loanTerm, 10) * 12; // Total number of payments

    if (isNaN(principal) || isNaN(rate) || isNaN(terms) || terms <= 0) {
      setMonthlyPayment(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    // Loan amortization formula to calculate the monthly payment
    const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -terms));

    // Calculate total payment and total interest
    const totalPayment = monthlyPayment * terms;
    const totalInterest = totalPayment - principal;

    setMonthlyPayment(monthlyPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
  };

  return (
    <div className="container my-10" style={{marginTop:"5rem"}}>
      <div className="card">
        <div className="card-header">
          <h2>Loan Calculator</h2>
        </div>
        <div className="card-body">
          <form onSubmit={calculateLoan}>
            <div className="form-group">
              <label>Loan Amount:</label>
              <input
                type="number"
                className="form-control"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Interest Rate (%):</label>
              <input
                type="number"
                className="form-control"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Loan Term (years):</label>
              <input
                type="number"
                className="form-control"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
        </div>
      </div>

      {monthlyPayment && (
        <div className="card mt-3">
          <div className="card-header">Loan Details</div>
          <div className="card-body">
            <p>Monthly Payment: &#8377;{monthlyPayment}</p>
            <p>Total Interest Paid: &#8377;{totalInterest}</p>
            <p>Total Payment:&#8377; {totalPayment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
