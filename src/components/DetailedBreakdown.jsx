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

  const getVarianceClass = (value, type) => {
    if (type === 'Expense') {
      return value > 0 ? 'text-red-600' : 'text-green-600';
    }
    return value < 0 ? 'text-red-600' : 'text-green-600';
  };

  const getVarianceIcon = (value, type) => {
    if (type === 'Expense') {
      return value > 0 ? <ArrowDownRight className="inline w-4 h-4 text-red-600" title="Unfavourable" /> : 
                         <ArrowUpRight className="inline w-4 h-4 text-green-600" title="Favourable" />;
    }
    return value > 0 ? <ArrowUpRight className="inline w-4 h-4 text-green-600" title="Favourable" /> :
                       value < 0 ? <ArrowDownRight className="inline w-4 h-4 text-red-600" title="Unfavourable" /> : null;
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
            <td colSpan="6" className={`pt-${i !== 0 ? 6 : 2} pb-2 text-xl font-bold text-black`}>
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
                  <span className={getVarianceClass(varBudget, type)}>
                    {formatCurrency(varBudget)} {getVarianceIcon(varBudget, type)}
                  </span>
                </td>
                <td className="text-right pr-4">{formatCurrency(prior)}</td>
                <td className="text-right pr-4">
                  <span className={getVarianceClass(varPY, type)}>
                    {formatCurrency(varPY)} {getVarianceIcon(varPY, type)}
                  </span>
                </td>
              </tr>
            );
          })}

          <tr className="bg-gray-100 font-semibold text-base">
            <td className="py-2 pl-4">Total {category}</td>
            <td className="text-right pr-4">{formatCurrency(actualTotal)}</td>
            <td className="text-right pr-4">{formatCurrency(budgetTotal)}</td>
            <td className="text-right pr-4">
              <span className={getVarianceClass(varToBudget, type)}>
                {formatCurrency(varToBudget)} {getVarianceIcon(varToBudget, type)}
              </span>
            </td>
            <td className="text-right pr-4">{formatCurrency(priorTotal)}</td>
            <td className="text-right pr-4">
              <span className={getVarianceClass(varToPY, type)}>
                {formatCurrency(varToPY)} {getVarianceIcon(varToPY, type)}
              </span>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Detailed Financial Breakdown</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="w-full text-xs sm:text-sm min-w-[900px]">
          <thead className="sticky top-0 bg-white z-20 shadow border-b">
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
            <tr>
              <td colSpan="6" className="pt-4 pb-2 text-2xl font-bold text-black tracking-wide">REVENUE</td>
            </tr>
            {renderCategoryRows('Revenue')}
            <tr>
              <td colSpan="6" className="pt-8 pb-2 text-2xl font-bold text-black tracking-wide">EXPENSE</td>
            </tr>
            {renderCategoryRows('Expense')}

            <tr className="border-t border-black">
              <td className="pt-6 font-bold text-lg">Net Profit</td>
              <td className={`text-right pt-6 font-bold text-lg ${actualProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit)}
              </td>
              <td className={`text-right pt-6 font-bold text-lg ${budgetProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(budgetProfit)}
              </td>
              <td className={`text-right pt-6 font-bold text-lg ${(actualProfit - budgetProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit - budgetProfit)}
              </td>
              <td className={`text-right pt-6 font-bold text-lg ${priorProfit < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(priorProfit)}
              </td>
              <td className={`text-right pt-6 font-bold text-lg ${(actualProfit - priorProfit) < 0 ? 'text-red-700' : 'text-green-700'}`}>
                {formatCurrency(actualProfit - priorProfit)}
              </td>
            </tr>

            <tr className="border-b-2 border-black">
              <td className="pt-1 pr-4 text-left font-bold text-black-600">Net Profit Margin:</td>
              <td className="text-right text-gray-700 font-semibold">{profitMargin(actualProfit, actualRevenue)}</td>
              <td className="text-right text-gray-700 font-semibold">{profitMargin(budgetProfit, budgetRevenue)}</td>
              <td className="text-right text-gray-700 font-semibold">
                {profitMargin(actualProfit, actualRevenue) !== '-' &&
                profitMargin(budgetProfit, budgetRevenue) !== '-'
                  ? `${(
                      parseFloat(profitMargin(actualProfit, actualRevenue)) -
                      parseFloat(profitMargin(budgetProfit, budgetRevenue))
                    ).toFixed(1)}%`
                  : '-'}
              </td>
              <td className="text-right text-gray-700 font-semibold">{profitMargin(priorProfit, priorRevenue)}</td>
              <td className="text-right text-gray-700 font-semibold">
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
