export const styles = (theme) => ({
  '*, *::before, *::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Poppins, serif !important'
  },
  '.apexcharts-zoomin-icon,.apexcharts-zoomout-icon,.apexcharts-zoom-icon,.apexcharts-pan-icon,.apexcharts-reset-icon':
    {
      display: 'none'
    },
  '.apexcharts-toolbar': {
    zIndex: '1 !important'
  },
  body: {
    ...theme.fn.fontStyles(),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: theme.lineHeight
  },
  '.apexcharts-theme-dark > svg': {
    background: 'transparent !important'
  },
  '.mantine-Paper-root a': {
    textAlign: 'center',
    textDecoration: 'none'
  },
  a: {
    textDecoration: 'none',
    color: 'inherit'
  },
  '.noSelect': {
    WebkitTouchCallout: 'none' /* iOS Safari */,
    WebkitUserSelect: 'none' /* Safari */,
    KhtmlUserSelect: 'none' /* Konqueror HTML */,
    MozUserSelect: 'none' /* Old versions of Firefox */,
    MsUserSelect: 'none' /* Internet Explorer/Edge */,
    UserSelect: 'none' /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
});
