
import React, { useState } from "react";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState();
  const [interestRate, setInterestRate] = useState();
  const [loanTerm, setLoanTerm] = useState();
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const annualInterest = interestRate / 100;
    const monthlyInterest = annualInterest / 12;
    // const totalMonths = loanTerm * 12;
    const totalMonths = loanTerm;

    const emi =
      (principal * monthlyInterest * Math.pow(1 + monthlyInterest, totalMonths)) /
      (Math.pow(1 + monthlyInterest, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    setEmi(emi.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
  };

  return (
    <>
      <div className="container p-4 mt-10 ">
        <h2 className="mb-1 text-center">EMI Calculator</h2>
        <p className="text-center w-sm-75 mx-auto">Use this calculator to easily compute your Equated Monthly Installment (EMI) for a loan. This calculator supports reducing balance method, giving you accurate results based on the outstanding loan amount.</p>
      </div>

      <div style={{ padding: "20px" }} className="container d-sm-flex ">
        <div className="px-4 py-4 w-sm-50 card shadow-lg mx-4">
          <div className="my-2">
            <label className="fs-3 text text-primary" style={{ lineHeight: "1px" }}>Loan Amount: </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              placeholder="Your Loan Amount"
            />
          </div>
          <div className="my-2">
            <label className="fs-3 text text-primary" style={{ lineHeight: "1px" }}>Interest Rate (%): </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="Interest Rate"
            />
          </div>
          <div className="my-2">
            <label className="fs-3 text text-primary" style={{ lineHeight: "1px" }}>Loan Term (Months): </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              placeholder="Loan Term in Months"
            />
          </div>
          <button onClick={calculateEMI} className="btn btn-primary">Calculate EMI</button>
        </div>


        <div style={{ marginTop: "20px" }} className="w-sm-50 card shadow px-4 py-4 h-100">
        <div className="w-100 mb-4 mx-2">
              {/* <tr className="border border-secondary px-4  table-primary text-danger"> */}
                <p className="fs-3 font-bold border-bottom border-danger w-100  bd-highlight">Repayment Details</p>
              {/* </tr> */}
            </div>
          <table class="table  table-primary">
           
            <tbody>
              <tr>
                <td>EMI: </td>
                <td>₹{emi} </td>
              </tr>
              <tr>
                <td>Total Interest: </td>
                <td>₹{totalInterest} </td>
              </tr>
              <tr>
                <td>Total Payment: </td>
                <td>₹{totalPayment} </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <DetailedContent/>
    </>
  );
}

export default LoanCalculator;


// import React from 'react';

function DetailedContent() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className=" p-4">
            <h3 className="text-center mb-4 fs-3">Understanding EMI & Loan Repayments</h3>
            
            <h5 className="fs-3">What is EMI?</h5>
            <p>
              EMI (Equated Monthly Installment) is a fixed amount of money paid by a borrower to a lender at a specified date each month. It consists of both the principal loan amount and the interest. Over the loan tenure, a portion of the EMI goes toward paying down the principal, and the rest covers interest.
            </p>

            <h5 className="fs-3">How is EMI Calculated?</h5>
            <p>
              EMI is calculated using the following formula:
            </p>
            <p className="text-center">
              <strong>EMI = [P x R x (1+R)^N] / [(1+R)^N – 1]</strong>
            </p>
            <p>
              Where:
            </p>
            <ul>
              <li><strong>P</strong> = Loan principal amount</li>
              <li><strong>R</strong> = Monthly interest rate (annual interest rate / 12 / 100)</li>
              <li><strong>N</strong> = Loan tenure in months</li>
            </ul>

            <h5 className="fs-3">What is the Reducing Balance Method?</h5>
            <p>
              In the reducing balance method, interest is calculated on the remaining loan balance, which reduces over time as you make each EMI payment. This is different from the flat rate method, where interest is calculated on the entire loan amount, regardless of how much you have already repaid.
            </p>

            <h5 className="fs-3">Factors Affecting EMI</h5>
            <p>
              Several factors influence the EMI amount you will pay:
            </p>
            <ul>
              <li><strong>Loan Amount:</strong> The total amount borrowed. Larger loans result in higher EMIs.</li>
              <li><strong>Interest Rate:</strong> A higher interest rate increases the EMI. Loan rates can vary between lenders.</li>
              <li><strong>Loan Tenure:</strong> The length of time over which the loan is to be repaid. A longer tenure results in lower EMIs, but you may pay more interest overall.</li>
            </ul>

            <h5 className="fs-3">Types of Interest Rates</h5>
            <p>
              Loans can have different types of interest rates:
            </p>
            <ul>
              <li><strong>Fixed Interest Rate:</strong> The interest rate remains constant throughout the loan tenure. The EMI amount is the same for every month.</li>
              <li><strong>Floating Interest Rate:</strong> The interest rate may fluctuate based on market conditions. Your EMI may change over time, depending on the rate adjustments.</li>
            </ul>

            <h5 className="fs-3">How to Choose the Right Loan Tenure?</h5>
            <p>
              Choosing the right loan tenure depends on your financial situation:
            </p>
            <ul>
              <li><strong>Short-Term Loan:</strong> Higher EMIs but lower total interest paid. Suitable for those who can afford higher monthly payments.</li>
              <li><strong>Long-Term Loan:</strong> Lower EMIs but higher total interest paid. Ideal for those who want smaller monthly payments.</li>
            </ul>

            <h5 className="fs-3">Why Use This EMI Calculator?</h5>
            <p>
              This EMI calculator helps you quickly estimate your monthly loan payments based on the principal, interest rate, and loan tenure. By understanding your EMI obligations in advance, you can better manage your finances and choose a loan that fits your budget.
            </p>

            <h5 className="fs-3">Conclusion</h5>
            <p>
              Loans are a major financial commitment, and it’s essential to understand how the EMI works before you take on debt. Use this calculator to plan your loan repayments effectively and avoid surprises. Always compare interest rates and loan terms from multiple lenders to find the best deal for your situation.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

// export default DetailedContent;


