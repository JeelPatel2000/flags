import { MantineProvider, useMantineTheme } from '@mantine/core';

import Router from './Router';

export function App() {
  const theme = useMantineTheme();

  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter',
        colors: {
          primaryColor: [...theme.colors.indigo],
        },
        headings: {
          fontFamily: 'Inter',
        },
      }}
    >
      <Router />
    </MantineProvider>
  );
}

export default App;
