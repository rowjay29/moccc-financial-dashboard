import React from 'react';

function TreasurersReport() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md text-sm sm:text-base leading-relaxed">
      <h2 className="text-xl font-bold mb-4">Opening Remarks:</h2>
      <ol className="list-decimal list-inside space-y-3">
        <li>
          The club underwent a period of transition with a new President, Treasurer & head coach.
        </li>
        <li>
          Coming off a strong financial performance last year (profit of $5,098.92), the club experienced a loss of <span className="text-red-600 font-semibold">($8,129)</span> in the 2024/25 season.
        </li>
        <li>
          Although poor in many respects, it should be noted that we had budgeted for a loss of <span className="text-red-600 font-semibold">($7,750)</span>. This was due to:
          <ol className="list-[lower-alpha] list-inside pl-4 space-y-2">
            <li>
              The club agreeing to take on the financial expense of Uniforms, costing upwards of $11,000. Rather than having players purchase it themselves.
            </li>
            <li>
              Increased financial obligation on player payments – most notably the head coach, including all flights and cost of accommodation for our international players.
            </li>
          </ol>
        </li>
        <li>
          Key areas of financial success include:
          <ol className="list-[lower-alpha] list-inside pl-4 space-y-2">
            <li>
              Our Reverse Raffle, which continues to be our biggest revenue driving item outside of player subscriptions.
            </li>
            <li>
              Substantial reduction in ground hire fees <span className="italic">as a result of</span> dropping Wilsons Road Reserve as our secondary home ground, switching our 3<sup>rd</sup> XI to B Synthetic grade from F-Turf.
            </li>
          </ol>
        </li>
        <li>
          Areas for improvement:
          <ol className="list-[lower-alpha] list-inside pl-4 space-y-2">
            <li>Increasing our sponsorships</li>
            <li>
              Clear strategy around paid international players and coaches, ensuring player payments aligns to the club’s revenue base and overall grade of competition.
            </li>
            <li>
              A greater push to tighten expenditure on the bar / food and aim to make greater profit from our bar-takings.
            </li>
          </ol>
        </li>
        <li>
          The club remains in a strong financial position, noting that the exclusion of uniforms (as a one-off expense this year) would have kept the club in profit for the year. Simply breaking-even is not viable long term-goal, and the club will need a strong push to increase its revenue base if we plan to continue our investment in international players.
        </li>
      </ol>
    </div>
  );
}

export default TreasurersReport;
