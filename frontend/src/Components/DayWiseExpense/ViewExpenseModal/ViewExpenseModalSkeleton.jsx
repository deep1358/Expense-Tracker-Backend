import React from 'react';
import { Skeleton, Group } from '@mantine/core';

const ViewExpenseModalSkeleton = () => {
  return (
    <>
      <Skeleton height={35} width="100%" radius="xs" />
      <Skeleton height={35} width="100%" radius="xs" />
      <Skeleton height={35} width="100%" radius="xs" />
      <Skeleton height={35} width="100%" radius="xs" />
      <Skeleton height={35} width="100%" radius="xs" />
      <Group position="right" style={{ width: '100%' }}>
        <Skeleton height={35} width="20%" radius="xs" />
        <Skeleton height={35} width="20%" radius="xs" />
      </Group>
    </>
  );
};

export default ViewExpenseModalSkeleton;
