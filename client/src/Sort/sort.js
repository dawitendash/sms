import { useState } from "react";

const useSortByAge = (data) => {
  const [sortedItems, setSortedItems] = useState([]);

  const sort = () => {
    const sorted = [...data].sort((a, b) => a.gpa - b.gpa);
    setSortedItems(sorted);
  };

  return [sortedItems, sort];
};

export default useSortByAge;
