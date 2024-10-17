import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../../env';
import Sidebar from '../UserDashbord/Sidebar';
import { useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';


const AdminSidePaymentsTable = () => {
    const {connector_id} = useParams();

    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5;

    useEffect(() => {
        fetchPayments();
    }, [currentPage]);

    const fetchPayments = async () => {
        try {
            const response = await axios.get(`${backendUrl}/payments/${connector_id}?page=${currentPage}&limit=${limit}`);
            setPayments(response?.data?.payments);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };



    const getMonthlyIncomeData = () => {
        const monthlyIncome = {};
        payments.forEach(payment => {
            const month = new Date(payment?.paymentDate).toLocaleString('default', { month: 'long' });
            if (!monthlyIncome[month]) {
                monthlyIncome[month] = 0;
            }
            monthlyIncome[month] += payment.paymentAmount;
        });
        return monthlyIncome;
    };

    const deletePayments=async(id)=>{
        try {
            const deletePayments=await axios.delete(`${backendUrl}/payments/${id}`);
            if(deletePayments?.status===200){
                toast.success(deletePayments?.data?.message);
                fetchPayments();
            }
        } catch (error) {
            toast.error(error?.message);
            console.log("Error while deleting payments",error);
        }
    }
    const monthlyIncomeData = getMonthlyIncomeData();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function convertTo12Hour(time) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    }

    return (
        <div className=" mt-5">
            <Sidebar>
                <div className="mt-5">
                    <h3>Connector Payments</h3>
                    <table striped bordered hover className='table table-striped mt-5'>
                        <thead >
                            <tr>
                                <th>S.NO</th>
                                <th>Application No.</th>
                                <th>Loan Product</th>
                                <th>Incentives</th>
                                <th>Payment Date</th>
                                <th>Months</th>
                                <th>Payment Amount</th>
                                <th>Paid ot Unpaid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment?._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment?.applicationNumber}</td>
                                    <td>{payment?.loan_product}</td>
                                    <td>{payment?.incentives}</td>
                                    <td>{new Date(payment?.paymentDate).toLocaleDateString()}</td>
                                    <td>{payment?.month}</td>
                                    <td>&#8377; {payment?.paymentAmount}</td>
                                    <td>{payment?.payment}</td>
                                    <td>
                                        <button className='btn btn-danger py-1 px-1' title='Delete'>
                                            <MdDelete className='' style={{fontSize:"1.3rem"}} onClick={()=>deletePayments(payment?._id)}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div aria-label="..." className=' d-flex justify-content-center'>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : null}`}>
                                <a className="page-link" href="#" tabindex="-1" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li className={`page-item ${currentPage === index + 1 ? "active" : null}`} onClick={() => handlePageChange(index + 1)} key={index}>
                                    <a class="page-link" href="#">{index + 1}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : null}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h3>Monthly Income</h3>
                    <div>
                        {monthlyIncomeData?.January && <p>January : &#8377; {monthlyIncomeData?.January}</p>}
                        {monthlyIncomeData?.February && <p>February :&#8377; {monthlyIncomeData?.January}</p>}
                        {monthlyIncomeData?.March && <p>March :&#8377; {monthlyIncomeData?.March}</p>}
                        {monthlyIncomeData?.April && <p>April :&#8377; {monthlyIncomeData?.April}</p>}
                        {monthlyIncomeData?.May && <p>May : &#8377; {monthlyIncomeData?.May}</p>}
                        {monthlyIncomeData?.June && <p>June : &#8377; {monthlyIncomeData?.June}</p>}
                        {monthlyIncomeData?.July && <p>July : &#8377; {monthlyIncomeData?.July}</p>}
                        {monthlyIncomeData?.August && <p>August : &#8377; {monthlyIncomeData?.August}</p>}
                        {monthlyIncomeData?.September && <p>September : &#8377;  {monthlyIncomeData?.September}</p>}
                        {monthlyIncomeData?.October && <p>October : &#8377; {monthlyIncomeData?.October}</p>}
                        {monthlyIncomeData?.November && <p>November : &#8377; {monthlyIncomeData?.November}</p>}
                        {monthlyIncomeData?.December && <p>December : &#8377; {monthlyIncomeData?.December}</p>}

                    </div>
                </div>

            </Sidebar>


        </div>
    );
};

export default AdminSidePaymentsTable;
