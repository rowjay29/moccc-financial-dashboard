import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#e91e63'];

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

function Graphs({ data }) {
  const [selectedMetric, setSelectedMetric] = useState('Expense');
  const [selectedYear, setSelectedYear] = useState(
    [...new Set(data.map((row) => row.Year))].slice(-1)[0]
  );

  const years = [...new Set(data.map((row) => row.Year))];
  const filteredData = data.filter((row) => row.Year === selectedYear);

  const getCategoryTotals = (type) => {
    const totals = {};
    filteredData
      .filter((row) => row.Type === type && row.IsActual)
      .forEach((row) => {
        const amount = parseFloat(row.Amount) || 0;
        if (totals[row.Category]) {
          totals[row.Category] += amount;
        } else {
          totals[row.Category] = amount;
        }
      });

    const sorted = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));

    const top5 = sorted.slice(0, 5);
    const otherTotal = sorted.slice(5).reduce((sum, item) => sum + item.value, 0);
    if (otherTotal > 0) {
      top5.push({ name: 'Other', value: otherTotal });
    }

    return top5;
  };

  const getYoYData = () => {
    const result = [];
    years.forEach((year) => {
      const yearData = data.filter((row) => row.Year === year && row.IsActual);
      const total = yearData
        .filter((row) => row.Type === selectedMetric)
        .reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);
      result.push({ year, value: total });
    });
    return result;
  };

  return (
    <div className="p-4 bg-stone-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Graphs & Visuals</h2>

      <div className="mb-6">
        <label htmlFor="yearSelect" className="mr-2 font-medium text-blue-700">
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded-md text-blue-700 shadow"
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center mb-10">
        {/* Revenue Pie */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-center mb-2">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryTotals('Revenue')}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name }) => name}
              >
                {getCategoryTotals('Revenue').map((entry, index) => (
                  <Cell key={`cell-rev-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value, name, props) => {
                  const total = props.payload.payload.total || getCategoryTotals('Revenue').reduce((sum, e) => sum + e.value, 0);
                  const percentage = ((value / total) * 100).toFixed(1) + '%';
                  return [`${formatCurrency(value)} (${percentage})`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Pie */}
        <div className="bg-white shadow-lg p-4 rounded-lg w-full lg:w-1/2">
          <h3 className="text-lg font-semibold text-center mb-2">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryTotals('Expense')}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name }) => name}
              >
                {getCategoryTotals('Expense').map((entry, index) => (
                  <Cell key={`cell-exp-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip
                formatter={(value, name, props) => {
                  const total = props.payload.payload.total || getCategoryTotals('Expense').reduce((sum, e) => sum + e.value, 0);
                  const percentage = ((value / total) * 100).toFixed(1) + '%';
                  return [`${formatCurrency(value)} (${percentage})`, name];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year on Year */}
      <div className="bg-white shadow-lg p-4 rounded-lg mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Year-on-Year Financials</h3>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="p-2 border rounded-md text-blue-700 shadow"
          >
            <option value="Revenue">Revenue</option>
            <option value="Expense">Expense</option>
            <option value="Profit">Net Profit</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getYoYData()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <RechartsTooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphs;
