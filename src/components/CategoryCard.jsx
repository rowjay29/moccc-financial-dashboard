import React from 'react';

function CategoryCard({ data, type }) {
  const actualTotal = data
    .filter((row) => row.Type === type && row.IsActual)
    .reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);

  const budgetTotal = data
    .filter((row) => row.Type === type && row.IsBudget)
    .reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);

  const variance = actualTotal - budgetTotal;
  const variancePercent = budgetTotal === 0 ? '–' : ((variance / budgetTotal) * 100).toFixed(1);

  const formatCurrency = (value) =>
    value.toLocaleString('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-1">{type}</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Actual 2024/25</span>
        <span>Budget 2024/25</span>
        <span>Variance</span>
      </div>
      <div className="flex justify-between items-center text-xl font-bold text-blue-900">
        <span>{formatCurrency(actualTotal)}</span>
        <span>{formatCurrency(budgetTotal)}</span>
        <span className={variance < 0 ? 'text-red-600' : 'text-green-600'}>
          {formatCurrency(variance)}
          <span className="text-sm font-normal ml-1">({variancePercent}%)</span>
        </span>
      </div>
    </div>
  );
}

export default CategoryCard;
