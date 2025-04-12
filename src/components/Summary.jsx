import React from 'react';

function Summary({ data }) {
  const formatCurrency = (value) => {
    const num = Number(value);
    if (isNaN(num)) return '$0';
    return num.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const calcTotal = (type, flag) =>
    data.filter(row => row.Type === type && row[flag])
      .reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);

  const actualRevenue = calcTotal('Revenue', 'IsActual');
  const budgetRevenue = calcTotal('Revenue', 'IsBudget');
  const actualExpense = calcTotal('Expense', 'IsActual');
  const budgetExpense = calcTotal('Expense', 'IsBudget');
  const actualProfit = actualRevenue - actualExpense;
  const budgetProfit = budgetRevenue - budgetExpense;

  const openingBalance = 52067;
  const netMovement = actualProfit;
  const closingBalance = openingBalance + netMovement;

  const StatRow = ({ title, actual, budget }) => {
    const variance = actual - budget;
    const budgetColor =
      title === 'Profit' && budget < 0 ? 'text-red-600' : 'text-blue-800';

    return (
      <div className="mb-6">
        <h3 className="text-md font-bold mb-1">{title}</h3>
        <div className="grid grid-cols-3 text-sm sm:text-base">
          <div className="text-left">
            <div className="text-gray-500">Actual</div>
            <div className={actual < 0 ? 'text-red-600 font-semibold' : 'text-blue-800 font-semibold'}>
              {formatCurrency(actual)}
            </div>
          </div>
          <div className="text-left">
            <div className="text-gray-500">Budget</div>
            <div className={`${budgetColor} font-semibold`}>
              {formatCurrency(budget)}
            </div>
          </div>
          <div className="text-left">
            <div className="text-gray-500">Variance</div>
            <div className={variance < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
              {formatCurrency(variance)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Summary Card */}
      <div className="flex-1 p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Summary Position</h2>
        <StatRow title="Revenue" actual={actualRevenue} budget={budgetRevenue} />
        <StatRow title="Expense" actual={actualExpense} budget={budgetExpense} />
        <StatRow title="Profit" actual={actualProfit} budget={budgetProfit} />
      </div>

      {/* Right Column with Two Stacked Cards */}
      <div className="flex-1 flex flex-col justify-between gap-6">
        {/* Cash Balance Summary Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl flex-1">
          <h2 className="text-2xl font-bold mb-4">Cash Balance Summary</h2>
          <div className="flex justify-between text-sm sm:text-base mb-2">
            <span className="text-gray-600">Opening Balance</span>
            <span>{formatCurrency(openingBalance)}</span>
          </div>
          <div className="flex justify-between text-sm sm:text-base mb-2">
            <span className="text-gray-600">Net Movement</span>
            <span className={netMovement < 0 ? 'text-red-600' : 'text-green-600'}>
              {formatCurrency(netMovement)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-black mt-4">
            <span>Closing Balance</span>
            <span>{formatCurrency(closingBalance)}</span>
          </div>
        </div>

        {/* Club Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-xl flex-1">
          <h2 className="text-md font-bold mb-4">Club Details</h2>
          <p className="text-sm sm:text-base mb-2">Mazenod Cricket Club</p>
          <p className="text-sm sm:text-base mb-2">Affiliations: ECA, FTGDCA, ISEC</p>
          <p className="text-sm sm:text-base mb-2">ABN: 54 530 186 804</p>
          <p className="text-sm sm:text-base">Created By: Rowan Jayaweera</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
