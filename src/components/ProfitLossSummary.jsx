import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function ProfitLossSummary({ data }) {
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

  const getVarianceStyle = (value, type) => {
    if (type === 'Expense') {
      return value > 0 ? 'text-red-600' : value < 0 ? 'text-green-600' : '';
    } else {
      return value < 0 ? 'text-red-600' : value > 0 ? 'text-green-600' : '';
    }
  };

  const getVarianceIcon = (value, type) => {
    if (type === 'Expense') {
      if (value > 0) return <ArrowUpRight className="inline w-4 h-4 text-red-600" title="Unfavourable" />;
      if (value < 0) return <ArrowDownRight className="inline w-4 h-4 text-green-600" title="Favourable" />;
    } else {
      if (value > 0) return <ArrowUpRight className="inline w-4 h-4 text-green-600" title="Favourable" />;
      if (value < 0) return <ArrowDownRight className="inline w-4 h-4 text-red-600" title="Unfavourable" />;
    }
    return null;
  };

  const getRowsByType = (type) => {
    const categories = [...new Set(data.filter(r => r.Type === type).map(r => r.Category))];
    return categories.map((category) => {
      const actual = data.filter(r => r.Category === category && r.Type === type && r.IsActual)
        .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);
      const budget = data.filter(r => r.Category === category && r.Type === type && r.IsBudget)
        .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);
      const prior = data.filter(r => r.Category === category && r.Type === type && r.IsPriorYear)
        .reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);

      return {
        category,
        type,
        actual,
        budget,
        prior,
        varToBudget: actual - budget,
        varToPrior: actual - prior,
      };
    });
  };

  const revenueRows = getRowsByType('Revenue');
  const expenseRows = getRowsByType('Expense');

  const sum = (arr, key) => arr.reduce((total, item) => total + (item[key] || 0), 0);

  const actualRevenue = sum(revenueRows, 'actual');
  const budgetRevenue = sum(revenueRows, 'budget');
  const priorRevenue = sum(revenueRows, 'prior');
  const actualExpense = sum(expenseRows, 'actual');
  const budgetExpense = sum(expenseRows, 'budget');
  const priorExpense = sum(expenseRows, 'prior');

  const actualProfit = actualRevenue - actualExpense;
  const budgetProfit = budgetRevenue - budgetExpense;
  const priorProfit = priorRevenue - priorExpense;

  const profitMargin = (profit, revenue) =>
    revenue !== 0 ? `${((profit / revenue) * 100).toFixed(1)}%` : '-';

  return (
    <div className="bg-stone-50 p-4 sm:p-6 rounded-xl shadow-xl">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">P&amp;L Summary by Category</h2>
      <div className="overflow-x-auto max-h-[600px]">
        <table className="w-full text-xs sm:text-sm min-w-[700px]">
          <thead className="sticky top-0 z-20 bg-white shadow-lg border-b text-gray-600 text-left">
            <tr>
              <th className="py-2 pl-2 sm:pl-4">Category</th>
              <th className="text-right pr-2 sm:pr-4">Actual</th>
              <th className="text-right pr-2 sm:pr-4">Budget</th>
              <th className="text-right pr-2 sm:pr-4">Var (to Budget)</th>
              <th className="text-right pr-2 sm:pr-4">Prior Year</th>
              <th className="text-right pr-2 sm:pr-4">Var (to PY)</th>
            </tr>
          </thead>
          <tbody>
            {/* Revenue Section */}
            <tr><td colSpan="6" className="pt-4 pb-2 text-xl font-bold">REVENUE</td></tr>
            {revenueRows.map((row) => (
              <tr key={`rev-${row.category}`} className="border-t">
                <td className="py-1 pl-2 sm:pl-4">{row.category}</td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.actual)}</td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.budget)}</td>
                <td className="text-right pr-2 sm:pr-4">
                  <span className={getVarianceStyle(row.varToBudget, 'Revenue')}>
                    {formatCurrency(row.varToBudget)} {getVarianceIcon(row.varToBudget, 'Revenue')}
                  </span>
                </td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.prior)}</td>
                <td className="text-right pr-2 sm:pr-4">
                  <span className={getVarianceStyle(row.varToPrior, 'Revenue')}>
                    {formatCurrency(row.varToPrior)} {getVarianceIcon(row.varToPrior, 'Revenue')}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="font-bold text-base border-t border-black">
              <td className="pt-2 pl-2 sm:pl-4 text-xl">► Total Revenue</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(actualRevenue)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(budgetRevenue)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">
                <span className={getVarianceStyle(actualRevenue - budgetRevenue, 'Revenue')}>
                  {formatCurrency(actualRevenue - budgetRevenue)} {getVarianceIcon(actualRevenue - budgetRevenue, 'Revenue')}
                </span>
              </td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(priorRevenue)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">
                <span className={getVarianceStyle(actualRevenue - priorRevenue, 'Revenue')}>
                  {formatCurrency(actualRevenue - priorRevenue)} {getVarianceIcon(actualRevenue - priorRevenue, 'Revenue')}
                </span>
              </td>
            </tr>

            <tr><td colSpan="6" className="py-4" /></tr>

            {/* Expense Section */}
            <tr><td colSpan="6" className="pt-4 pb-2 text-xl font-bold">EXPENSE</td></tr>
            {expenseRows.map((row) => (
              <tr key={`exp-${row.category}`} className="border-t">
                <td className="py-1 pl-2 sm:pl-4">{row.category}</td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.actual)}</td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.budget)}</td>
                <td className="text-right pr-2 sm:pr-4">
                  <span className={getVarianceStyle(row.varToBudget, 'Expense')}>
                    {formatCurrency(row.varToBudget)} {getVarianceIcon(row.varToBudget, 'Expense')}
                  </span>
                </td>
                <td className="text-right pr-2 sm:pr-4">{formatCurrency(row.prior)}</td>
                <td className="text-right pr-2 sm:pr-4">
                  <span className={getVarianceStyle(row.varToPrior, 'Expense')}>
                    {formatCurrency(row.varToPrior)} {getVarianceIcon(row.varToPrior, 'Expense')}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="font-bold text-base border-t border-black">
              <td className="pt-2 pl-2 sm:pl-4 text-xl">► Total Expenses</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(actualExpense)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(budgetExpense)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">
                <span className={getVarianceStyle(actualExpense - budgetExpense, 'Expense')}>
                  {formatCurrency(actualExpense - budgetExpense)} {getVarianceIcon(actualExpense - budgetExpense, 'Expense')}
                </span>
              </td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">{formatCurrency(priorExpense)}</td>
              <td className="text-right pr-2 sm:pr-4 pt-2 text-xl">
                <span className={getVarianceStyle(actualExpense - priorExpense, 'Expense')}>
                  {formatCurrency(actualExpense - priorExpense)} {getVarianceIcon(actualExpense - priorExpense, 'Expense')}
                </span>
              </td>
            </tr>

            <tr><td colSpan="6" className="py-6" /></tr>

            {/* Net Profit */}
            <tr className="border-t border-black">
              <td className="pt-1 font-bold text-xl">Net Profit</td>
              <td className={`text-right pt-1 font-bold text-xl ${actualProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatCurrency(actualProfit)}</td>
              <td className={`text-right pt-1 font-bold text-xl ${budgetProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatCurrency(budgetProfit)}</td>
              <td className={`text-right pt-1 font-bold text-xl ${(actualProfit - budgetProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatCurrency(actualProfit - budgetProfit)}</td>
              <td className={`text-right pt-1 font-bold text-xl ${priorProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatCurrency(priorProfit)}</td>
              <td className={`text-right pt-1 font-bold text-xl ${(actualProfit - priorProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatCurrency(actualProfit - priorProfit)}</td>
            </tr>
            <tr className="border-b-2 border-black">
              <td className="pt-1 pr-4 text-left font-bold text-black-600">Net Profit Margin:</td>
              <td className="text-right font-semibold text-gray-900">{profitMargin(actualProfit, actualRevenue)}</td>
              <td className="text-right font-semibold text-gray-900">{profitMargin(budgetProfit, budgetRevenue)}</td>
              <td className="text-right font-semibold text-gray-900">
                {profitMargin(actualProfit, actualRevenue) !== '-' &&
                profitMargin(budgetProfit, budgetRevenue) !== '-'
                  ? `${(
                      parseFloat(profitMargin(actualProfit, actualRevenue)) -
                      parseFloat(profitMargin(budgetProfit, budgetRevenue))
                    ).toFixed(1)}%`
                  : '-'}
              </td>
              <td className="text-right font-semibold text-gray-900">{profitMargin(priorProfit, priorRevenue)}</td>
              <td className="text-right font-semibold text-gray-900">
                {profitMargin(actualProfit, actualRevenue) !== '-' &&
                profitMargin(priorProfit, priorRevenue) !== '-'
                  ? `${(
                      parseFloat(profitMargin(actualProfit, actualRevenue)) -
                      parseFloat(profitMargin(priorProfit, priorRevenue))
                    ).toFixed(1)}%`
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfitLossSummary;
