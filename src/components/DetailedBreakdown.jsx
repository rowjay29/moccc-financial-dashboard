import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

function DetailedBreakdown({ data }) {
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

  const getVarianceIcon = (value) => {
    if (value > 0) return <ArrowUpRight className="inline w-4 h-4 text-green-600" title="Favourable" />;
    if (value < 0) return <ArrowDownRight className="inline w-4 h-4 text-red-600" title="Unfavourable" />;
    return null;
  };

  const calcTotal = (type, flag) =>
    data.filter(row => row.Type === type && row[flag])
      .reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);

  const actualRevenue = calcTotal('Revenue', 'IsActual');
  const budgetRevenue = calcTotal('Revenue', 'IsBudget');
  const priorRevenue = calcTotal('Revenue', 'IsPriorYear');
  const actualExpense = calcTotal('Expense', 'IsActual');
  const budgetExpense = calcTotal('Expense', 'IsBudget');
  const priorExpense = calcTotal('Expense', 'IsPriorYear');

  const actualProfit = actualRevenue - actualExpense;
  const budgetProfit = budgetRevenue - budgetExpense;
  const priorProfit = priorRevenue - priorExpense;

  const profitMargin = (profit, revenue) =>
    revenue !== 0 ? `${((profit / revenue) * 100).toFixed(1)}%` : '-';

  const renderCategoryRows = (type) => {
    const categories = [...new Set(data.filter(row => row.Type === type).map(row => row.Category))];

    return categories.map((category, i) => {
      const rows = data.filter(row => row.Category === category && row.Type === type);
      const items = [...new Set(rows.map(row => row.Item))];

      const actualTotal = rows.filter(r => r.IsActual).reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);
      const budgetTotal = rows.filter(r => r.IsBudget).reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);
      const priorTotal = rows.filter(r => r.IsPriorYear).reduce((sum, r) => sum + (parseFloat(r.Amount) || 0), 0);
      const varToBudget = actualTotal - budgetTotal;
      const varToPY = actualTotal - priorTotal;

      return (
        <React.Fragment key={category}>
          <tr>
            <td colSpan="6" className={`pt-${i !== 0 ? 6 : 2} pb-2 text-lg font-bold text-black`}>
              {category}
            </td>
          </tr>

          {items.map((item) => {
            const actual = rows.find(r => r.Item === item && r.IsActual)?.Amount || 0;
            const budget = rows.find(r => r.Item === item && r.IsBudget)?.Amount || 0;
            const prior = rows.find(r => r.Item === item && r.IsPriorYear)?.Amount || 0;
            const varBudget = actual - budget;
            const varPY = actual - prior;

            return (
              <tr key={item} className="border-b">
                <td className="py-1 pl-4">{item}</td>
                <td className="text-right pr-4">{formatCurrency(actual)}</td>
                <td className="text-right pr-4">{formatCurrency(budget)}</td>
                <td className="text-right pr-4">
                  <span className={varBudget < 0 ? 'text-red-600' : 'text-green-600'}>
                    {formatCurrency(varBudget)} {getVarianceIcon(varBudget)}
                  </span>
                </td>
                <td className="text-right pr-4">{formatCurrency(prior)}</td>
                <td className="text-right pr-4">
                  <span className={varPY < 0 ? 'text-red-600' : 'text-green-600'}>
                    {formatCurrency(varPY)} {getVarianceIcon(varPY)}
                  </span>
                </td>
              </tr>
            );
          })}

          {/* Category Subtotal */}
          <tr className="bg-gray-100 font-semibold text-base">
            <td className="py-2 pl-4">Total {category}</td>
            <td className="text-right pr-4">{formatCurrency(actualTotal)}</td>
            <td className="text-right pr-4">{formatCurrency(budgetTotal)}</td>
            <td className="text-right pr-4">
              <span className={varToBudget < 0 ? 'text-red-600' : 'text-green-600'}>
                {formatCurrency(varToBudget)} {getVarianceIcon(varToBudget)}
              </span>
            </td>
            <td className="text-right pr-4">{formatCurrency(priorTotal)}</td>
            <td className="text-right pr-4">
              <span className={varToPY < 0 ? 'text-red-600' : 'text-green-600'}>
                {formatCurrency(varToPY)} {getVarianceIcon(varToPY)}
              </span>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-stone-50 p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">Detailed Financial Breakdown</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="w-full text-xs sm:text-sm min-w-[900px]">
          <thead className="sticky top-0 bg-white z-20 shadow-xl border-b">
            <tr className="text-gray-600 text-left">
              <th className="py-2 pl-4">Item</th>
              <th className="text-right pr-4">Actual</th>
              <th className="text-right pr-4">Budget</th>
              <th className="text-right pr-4">Var (to Budget)</th>
              <th className="text-right pr-4">Prior Year</th>
              <th className="text-right pr-4">Var (to PY)</th>
            </tr>
          </thead>
          <tbody>
            {/* Revenue Section */}
            <tr>
              <td colSpan="6" className="pt-4 pb-2 text-xl font-bold text-black tracking-wide">REVENUE</td>
            </tr>
            {renderCategoryRows('Revenue')}

            <tr><td colSpan="6" className="py-2"></td></tr>

            {/* Total Revenue */}
            <tr className="border-t border-black font-bold text-base">
              <td className="pt-2 pl-4 text-xl text-black">► Total Revenue</td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(actualRevenue)}</td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(budgetRevenue)}</td>
              <td className="text-right pr-4 pt-2 text-xl">
                <span className={actualRevenue - budgetRevenue < 0 ? 'text-red-700' : 'text-green-700'}>
                  {formatCurrency(actualRevenue - budgetRevenue)} {getVarianceIcon(actualRevenue - budgetRevenue)}
                </span>
              </td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(priorRevenue)}</td>
              <td className="text-right pr-4 pt-2 text-xl">
                <span className={actualRevenue - priorRevenue < 0 ? 'text-red-700' : 'text-green-700'}>
                  {formatCurrency(actualRevenue - priorRevenue)} {getVarianceIcon(actualRevenue - priorRevenue)}
                </span>
              </td>
            </tr>

            {/* Expense Section */}
            <tr>
              <td colSpan="6" className="pt-20 pb-2 text-xl font-bold text-black tracking-wide">EXPENSE</td>
            </tr>
            {renderCategoryRows('Expense')}

            <tr><td colSpan="6" className="py-2"></td></tr>

            {/* Total Expense */}
            <tr className="border-t border-black font-bold text-base">
              <td className="pt-2 pl-4 text-xl text-black">► Total Expense</td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(actualExpense)}</td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(budgetExpense)}</td>
              <td className="text-right pr-4 pt-2 text-xl">
                <span className={actualExpense - budgetExpense < 0 ? 'text-red-700' : 'text-green-700'}>
                  {formatCurrency(actualExpense - budgetExpense)} {getVarianceIcon(actualExpense - budgetExpense)}
                </span>
              </td>
              <td className="text-right pr-4 pt-2 text-xl text-black">{formatCurrency(priorExpense)}</td>
              <td className="text-right pr-4 pt-2 text-xl">
                <span className={actualExpense - priorExpense < 0 ? 'text-red-700' : 'text-green-700'}>
                  {formatCurrency(actualExpense - priorExpense)} {getVarianceIcon(actualExpense - priorExpense)}
                </span>
              </td>
            </tr>

            <tr><td colSpan="6" className="py-6"></td></tr>

            {/* Net Profit + Margin */}
            <tr className="border-t border-black">
              <td className="pt-1 font-bold text-xl">Net Profit</td>
              <td className={`text-right pt-1 font-bold text-xl ${actualProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit)}
              </td>
              <td className={`text-right pt-1 font-bold text-xl ${budgetProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(budgetProfit)}
              </td>
              <td className={`text-right pt-1 font-bold text-xl ${(actualProfit - budgetProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit - budgetProfit)}
              </td>
              <td className={`text-right pt-1 font-bold text-xl ${priorProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(priorProfit)}
              </td>
              <td className={`text-right pt-1 font-bold text-xl ${(actualProfit - priorProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit - priorProfit)}
              </td>
            </tr>

            <tr className="border-b-2 border-black">
              <td className="pt-1 pr-4 text-left font-bold text-black-600">Net Profit Margin:</td>
              <td className="text-right font-semibold text-gray-800">{profitMargin(actualProfit, actualRevenue)}</td>
              <td className="text-right font-semibold text-gray-800">{profitMargin(budgetProfit, budgetRevenue)}</td>
              <td className="text-right font-semibold text-gray-8600">
                {profitMargin(actualProfit, actualRevenue) !== '-' &&
                profitMargin(budgetProfit, budgetRevenue) !== '-'
                  ? `${(
                      parseFloat(profitMargin(actualProfit, actualRevenue)) -
                      parseFloat(profitMargin(budgetProfit, budgetRevenue))
                    ).toFixed(1)}%`
                  : '-'}
              </td>
              <td className="text-right font-semibold text-gray-800">{profitMargin(priorProfit, priorRevenue)}</td>
              <td className="text-right font-semibold text-gray-800">
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

export default DetailedBreakdown;
