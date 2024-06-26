import React, { useState } from "react";
import moment from "moment"; // Don't forget to import moment

const Buttone = () => {
  const [dividendArr, setDividendArr] = useState([
    {
      dividend_date: moment().format("YYYY-MM-DD"),
      dividend_stock_amount: "",
    },
  ]);
  const [textDisabld, setTextDisabld] = useState(false); // Assuming textDisabld is a state variable
  const [buyPrice, setBuyPrice] = useState(0); // Assuming buyPrice is a state variable
  const [error, setError] = useState(false); // Assuming error is a state variable
  const [errorMessage, setErrorMessage] = useState({}); // Assuming errorMessage is a state variable

  const handleAdd = () => {
    setDividendArr([
      ...dividendArr,
      {
        dividend_date: moment().format("YYYY-MM-DD"),
        dividend_stock_amount: "",
      },
    ]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...dividendArr];
    list[index][name] = value;
    setDividendArr(list);
  };

  const handleRemove = (index) => {
    if (dividendArr.length > 1) {
      const listArr = [...dividendArr];
      listArr.splice(index, 1);
      setDividendArr(listArr);
    }
  };

  return (
    <>
        <div     className="pt-18 pb-10 ">
      <div className="form-group dividend-fund">
        {dividendArr.map((item, index) => (
          <div className="row mt-3 align-items-center dividend-box" key={index}>
            <div className="col-md-5">
              <div className="mb-3">
                <div className="form-group mb-3">
                  <label className="">Calendar</label>
                  <input
                    type="date"
                    placeholder="Some Text..."
                    className="form-control"
                    required
                    min={moment().format("YYYY-MM-DD")}
                    disabled={textDisabld}
                    name="dividend_date"
                    value={item.dividend_date}
                    id="dividend_date"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                {error && errorMessage["stockDate"] && (
                  <div className="d-block my-1 ms-1 text-danger text-start">
                    {errorMessage["stockDate"]}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <div className="form-group mb-3">
                  <label className="">Price</label>
                  <input
                    type="number"
                    placeholder="Enter Price..."
                    className="form-control"
                    required
                    max={buyPrice}
                    min={0}
                    disabled={textDisabld}
                    name="dividend_stock_amount"
                    value={item.dividend_stock_amount}
                    id={`dividend_stock_amount${index}`}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
              </div>
            </div>
            <div className="text-end col-1 dividend-fund-delete pt-3">
              <button
                type="button"
                className={`add-button ${(index === 0 && "d-none") || ""}`}
                onClick={() => handleRemove(index)}
              >
                <img src="/images/trash.svg" alt="delete" />
              </button>
              {index === 0 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdd}
                >
                  +
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default Buttone;
