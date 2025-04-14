import React from 'react';

function KeyExpenseItems() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl text-gray-800 text-sm sm:text-base leading-relaxed">
      <h2 className="text-2xl font-bold mb-6">Key Expense Lines:</h2>

      <h3 className="text-lg font-bold mb-2 underline">Player Payments:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-2" start={16}>
        <li>
          Payments were made:
          <ul className="list-disc ml-6 mt-1 space-y-1">
            <li>To the Coach in the sum of <span className="font-semibold">$9,000</span></li>
            <li>To the Captain in the sum of <span className="font-semibold">$2,000</span></li>
            <li>Other Players Payments in the sum of <span className="font-semibold">$4,532</span></li>
            <li>Overseas Player Payment on-costs of <span className="font-semibold">$12,418</span></li>
          </ul>
        </li>
        <li>
          Budget was exceeded in relation to flights and accommodation costs being <span className="font-semibold">$2.7k</span> more than planned.
        </li>
        <li>
          Securing & guaranteeing employment for our overseas players continues to be a challenge and resulted in the club supporting one of the overseas players with a further <span className="font-semibold">$2k</span> payment.
        </li>
        <li>
          The club will look to review its expenditure on player payments, so it better aligns with its revenue base, playing list and grade of competition.
        </li>
      </ol>

      <h3 className="text-lg font-bold mb-2 underline">Equipment, & Uniforms & Training:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-2" start={20}>
        <li>
          Our cricket <span className="underline">equipment, training expenses and uniforms</span> remained in line with budget, noting the planned increase in uniforms expenditure this year, which the club will benefit from in future seasons.
        </li>
        <li>
          <span className="underline">Cricket balls</span>, a considerable expense to the club costing <span className="font-semibold">$8.3k</span>, remained in-line with budget and consistent with last year.
        </li>
      </ol>

      <h3 className="text-lg font-bold mb-2 underline">Game day expenses and Affiliation Fees:</h3>
      <ol className="list-decimal ml-6 mb-4 space-y-2" start={22}>
        <li>
          The club saved substantial cost on <span className="underline">ground hire</span> (<span className="font-semibold">$4.6k</span>) <span className="underline">as a result of</span> dropping Wilsons Road Reserve as our secondary home ground, switching our 3<sup>rd</sup> XI to B Synthetic grade from F-Turf.
        </li>
        <li><span className="underline">Umpires Fees</span> ran slightly under budget, with only one senior team making finals.</li>
        <li><span className="underline">Affiliation Fees</span> remained consistent with last year.</li>
        <li>
          <span className="underline">Afternoon teas</span> were a success for the club. However, financially, it did run at a loss and some further thought needs to be placed on the collection of afternoon tea money – either on game day, or at the start of the season as part of our subscription fees.
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>The club would like to thank Trena Riley for her tremendous efforts putting on an excellent spread every home game.</li>
          </ul>
        </li>
      </ol>

      <h3 className="text-lg font-bold mb-2 underline">Other:</h3>
      <ol className="list-decimal ml-6 mb-2 space-y-2" start={26}>
        <li>
          <span className="underline">Trophies & Recognition:</span> The club saved money on trophies, re-purposing un-used stock from last year.
        </li>
        <li>
          The renovation to the clubrooms consisted of Bunnings flatpacks, with additional cabinets and associated labour to put together, costing just over <span className="font-semibold">$3k</span>. This came in slightly over budget.
        </li>
      </ol>
    </div>
  );
}

export default KeyExpenseItems;
