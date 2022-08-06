import React from "react";
import { Skeleton } from "@mantine/core";

const DayWiseExpenseTableSkeleton = () => {
  return [...Array(10)].map((_, i) => (
    <tr key={i}>
      {[...Array(4)].map((_, j) => (
        <td key={j}>
          <Skeleton height={30} width="100%" radius="xs" />
        </td>
      ))}
    </tr>
  ));
};

export default DayWiseExpenseTableSkeleton;
