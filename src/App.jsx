import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';
import Summary from './components/Summary';
import ProfitLossSummary from './components/ProfitLossSummary';
import DetailedBreakdown from './components/DetailedBreakdown';
import Graphs from './components/Graphs';
import TreasurersReport from './components/TreasurersReport';

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [activeTab, setActiveTab] = useState('treasurer');
  const [selectedYear, setSelectedYear] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const storedCSV = localStorage.getItem('moccc-financial-data');
    const storedName = localStorage.getItem('moccc-financial-file-name');
    if (storedCSV) {
      parseCSV(storedCSV);
    }
    if (storedName) {
      setFileName(storedName);
    }
  }, []);

  const parseCSV = (csvText) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: function (results) {
        setFinancialData(results.data);
        const years = [...new Set(results.data.map((row) => row.Year))];
        if (years.length > 0 && !selectedYear) {
          setSelectedYear(years[0]);
        }
      },
    });
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        localStorage.setItem('moccc-financial-data', csvText);
        localStorage.setItem('moccc-financial-file-name', file.name);
        parseCSV(csvText);
      };
      reader.readAsText(file);
    }
  };

  const years = [...new Set(financialData.map((row) => row.Year))];
  const filteredData = financialData.filter((row) => row.Year === selectedYear);

  const tabs = [
    { label: "Treasurer's Report", key: 'treasurer' },
    { label: 'Summary Position', key: 'overview' },
    { label: 'P&L', key: 'pl-summary' },
    { label: 'Detailed Breakdown', key: 'detailed-breakdown' },
    { label: 'Key Revenue Items', key: 'key-revenue' },
    { label: 'Key Expense Items', key: 'key-expense' },
    { label: 'Graphs & Visuals', key: 'graphs' },
  ];

  return (
    <div className="p-4 md:p-6 bg-slate-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-800">
        Mazenod Old Collegians Cricket Club Inc.
      </h1>
      <div className="text-2xl md:text-2xl font-semibold text-center mb-6 text-blue-800">
        Financial Report – Season 2024/25
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-2">
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="font-medium text-blue-800">
            Select Year:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border rounded-md text-black shadow-xl"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="text-sm text-gray-500"
          />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap justify-center max-w-full rounded-xl bg-blue-800/30 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg m-1 ${
                activeTab === tab.key
                  ? 'bg-white shadow-md text-blue-800'
                  : 'text-white hover:bg-blue-50/50 hover:shadow-md hover:-translate-y-[1px]'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p className="text-center text-gray-600">
          Please upload a CSV file to begin.
        </p>
      ) : (
        <>
          {activeTab === 'treasurer' && <TreasurersReport />}
          {activeTab === 'overview' && <Summary data={filteredData} />}
          {activeTab === 'pl-summary' && <ProfitLossSummary data={filteredData} />}
          {activeTab === 'detailed-breakdown' && <DetailedBreakdown data={filteredData} />}
          {activeTab === 'graphs' && (
            <Graphs data={financialData} selectedYear={selectedYear} />
          )}
          {activeTab === 'key-revenue' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Key Revenue Items</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
          {activeTab === 'key-expense' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Key Expense Items</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;