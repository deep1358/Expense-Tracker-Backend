import React from 'react';
import { Loader, Stack, Center, Text } from '@mantine/core';

const FullScreenLoader = () => {
  return (
    <Center style={{ height: '100vh', width: '100vw' }}>
      <Stack align="center">
        <Loader size="lg" color="blue" variant="bars" />
        <Text
          size="xl"
          weight={600}
          variant="gradient"
          component="span"
          gradient={{ from: 'indigo', to: 'cyan', deg: 55 }}
        >
          Letting You In
        </Text>
      </Stack>
    </Center>
  );
};

export default FullScreenLoader;
