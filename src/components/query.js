import React from "react";

const Query = () => {
  const fakeQuery = `
1. SELECT
2. service,
3. SUM(cost) AS total_cost
4. FROM
5. cloud_costs
6. WHERE
7. account_type = 'production (#24542)
8. GROUP BY
9. service
10. ORDER BY
11. total_cost DESC;
  `;

  return (
    <div
      className=" text-white p-4 mt-4 rounded-md"
      style={{ backgroundColor: "#141e2f" }}
    >
      <pre>{fakeQuery}</pre>
    </div>
  );
};

export default Query;
