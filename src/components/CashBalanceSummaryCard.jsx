import React from 'react';

function CashBalanceSummaryCard({ data }) {
  const formatCurrency = (value, useColor = false) => {
    const num = Number(value);
    const formatted = num.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (!useColor) return formatted;

    return (
      <span className={num < 0 ? 'text-red-600' : 'text-green-600'}>
        {formatted}
      </span>
    );
  };

  const openingBalance = 52067;

  const actualRevenue = data
    .filter((r) => r.Type === 'Revenue' && r.IsActual)
    .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);

  const actualExpense = data
    .filter((r) => r.Type === 'Expense' && r.IsActual)
    .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);

  const netMovement = actualRevenue - actualExpense;
  const closingBalance = openingBalance + netMovement;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Cash Balance Summary</h3>
      <div className="space-y-1 text-sm text-gray-800">
        <div className="flex justify-between">
          <span>Opening Balance</span>
          <span>{formatCurrency(openingBalance)}</span>
        </div>
        <div className="flex justify-between">
          <span>Net Movement</span>
          <span>{formatCurrency(netMovement, true)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>Closing Balance</span>
          <span>{formatCurrency(closingBalance)}</span>
        </div>
      </div>
    </div>
  );
}

export default CashBalanceSummaryCard;
