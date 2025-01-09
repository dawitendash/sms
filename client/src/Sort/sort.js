import { useState } from "react";

const UseSortByAge = (data) => {
  const [sortedItems, setSortedItems] = useState([]);
  const sorted = data.sort((a, b) => a.gpa - b.gpa);
  setSortedItems(sorted);
  console.log(sortedItems)
};

export default UseSortByAge;
