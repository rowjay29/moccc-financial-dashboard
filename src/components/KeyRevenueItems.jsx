import React from 'react';

function KeyRevenueItems() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl text-gray-800 text-sm sm:text-base leading-relaxed">
      <h2 className="text-2xl font-bold mb-6">Key Revenue Lines:</h2>

      <h3 className="text-lg font-bold mb-2 underline">Sponsorships:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-2">
        <li>
          The college continues to be the club’s major sponsor for the 2024/25 season.
        </li>
        <li>
          Sponsorships continue to be a challenge and remains a key focus area for the club moving forward.
        </li>
        <li>
          The club thanks the following for their ongoing support and commitment:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Mazenod College</li>
            <li>Mazenod Old Collegians Association</li>
            <li>Acrylico</li>
            <li>Bowery Capital</li>
            <li>Mulgrave Country Club</li>
            <li>Alby’s Lawnmowing Service</li>
            <li>Weatherware Protection</li>
          </ul>
        </li>
      </ol>

      <h3 className="text-lg font-bold mb-2 underline">Subscription Fees:</h3>
      <p className="mb-6">
        Subscriptions were down on last season, owing to a large number of fill-ins and ‘juniors playing as seniors’ for the 2024/25 season.
        The club remains committed to providing appropriate and affordable subscription fees and continues to benchmark fees across a number of other cricket clubs.
      </p>

      <h3 className="text-lg font-bold mb-2 underline">Social Functions:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-2" start={13}>
        <li>
          This season, the club hosted several functions intended to promote, include and celebrate the history and success of our club:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Reverse Raffle – which made a profit upwards of <span className="text-green-700 font-semibold">$6.7k</span> and proved to be very successful.</li>
            <li>Ladies Day</li>
            <li>KD Club function</li>
            <li>Australia Day T20 game</li>
            <li>Presentation Night (not intended to be a profit-making event)</li>
          </ul>
        </li>
        <li>
          A big thank you to all involved in organizing and running these functions.
        </li>
      </ol>

      <h3 className="text-lg font-bold mb-2 underline">Bar & Food:</h3>
      <p>
        The bar underperformed on budget and previous years. This is an area which needs to be reviewed moving forward. The club manages the purchases of drinks efficiently and cheaply.
        However, the markup for each item needs an overhaul to accommodate for cost increases experienced over the past few years.
      </p>
    </div>
  );
}

export default KeyRevenueItems;
