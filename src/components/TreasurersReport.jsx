import React from 'react';

function TreasurersReport() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl text-gray-800 text-sm sm:text-base leading-relaxed">
      <h2 className="text-2xl font-bold mb-4">Opening Remarks:</h2>
      <ol className="list-decimal ml-6 space-y-3">
        <li>
          The club underwent a period of transition, appointing a new President, Treasurer & Head Coach.
        </li>
        <li>
          Coming off a strong financial performance last year (profit of $5,098.92), the club experienced a loss of <span className="text-red-600 font-semibold">$10,295</span> in the 2024/25 season.
        </li>
        <li>
          The club started the season with an opening bank balance of $52,067, and after a net movement of -$10,295, is finishing the season with a balance of $41,772.
        </li>
        <li>
          Although poor in many respects, it should be noted that we had budgeted for a loss of <span className="text-red-600 font-semibold">$7,750</span>. The original planned loss was primarily due to the following reasons:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              The club agreed to take on the financial burden of Uniforms, costing upwards of $11,000, as a one-off expense this year. Rather than having players purchase it themselves.
            </li>
            <li>
              Increased financial obligation on player payments – most notably the head coach, including all flights and cost of accommodation for our international players.
            </li>
          </ul>
        </li>
        <li>
          There were several contributing factors resulting in the club under-performing on budget and last year:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              Lack of Council Support / Grants; a reduction of $2.5k on budget and last year.
            </li>
            <li>
              A <strong>delay</strong> of $2.5k in key sponsor payments.
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>
                  This is not a drop in sponsor revenue, it’s simply delayed and still planned for.
                </li>
                <li>
                  However, there is also a further reduction of $2.5k in sponsor payments above and beyond this. This is truly lost revenue – and likely won’t come in future periods
                </li>
              </ul>
            </li>
            <li>
              Reduction in Profit (on budget and last year) from the Bar. (Reduction of $2.2k on budget and $3.1k on last year)
            </li>
            <li>
              Player Payments exceeding budget by $3.5k
            </li>
            <li>
              Renovations to clubrooms exceeding budget by $1.3k
            </li>
            <li>
              Reduction in Player Subs due to the sheer number of fill-ins and juniors playing seniors this year to help make up the numbers.
            </li>
          </ul>
        </li>
        <li>
          Key areas of financial success include:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              our Reverse Raffle, which pulled in a profit of <span className="text-green-600 font-semibold">$6.7k</span> and continues to be our biggest revenue driving item outside of player subscriptions.
            </li>
            <li>
              Substantial reduction in ground hire fees ($4.6k reduction on last year) as a result of dropping Wilsons Road Reserve as our secondary home ground, switching our 3<sup>rd</sup> XI to B Synthetic grade from F-Turf.
            </li>
          </ul>
        </li>
        <li>
          Areas for improvement:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              Increasing our revenue base through sponsorships – <span className="font-bold text-blue-800">#1 key priority</span>
            </li>
            <li>
              Clear strategy around paid international players and coaches, ensuring player payments aligns to the club’s revenue base and overall grade of competition.
            </li>
            <li>
              A greater push to tighten expenditure on the bar / food and aim to make greater profit from our bar-takings.
            </li>
          </ul>
        </li>
        <li>
          The club remains in a strong financial position, noting that the inclusion of uniforms in its entirety (as a one-off expense this year) along with the substantial increase in player payments is essentially why we are so far in the red. However, should we look to grow and invest, the club will need a strong push to increase its sponsorships and revenue base.
        </li>
      </ol>
    </div>
  );
}

export default TreasurersReport;
