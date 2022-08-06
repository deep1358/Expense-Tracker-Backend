import React from 'react';
import { Skeleton } from '@mantine/core';

const UpdateExpenseSkeleton = () => {
  return (
    <>
      <Skeleton height={45} mt="md" width="100%" radius="xs" />
      <Skeleton height={45} mt="md" width="100%" radius="xs" />
      <Skeleton height={45} mt="md" width="100%" radius="xs" />
      <Skeleton height={45} mt="md" width="100%" radius="xs" />
      <Skeleton height={45} mt="md" width="100%" radius="xs" />
    </>
  );
};

export default UpdateExpenseSkeleton;
