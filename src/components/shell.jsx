import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Button,
  Text,
  MediaQuery,
  Kbd,
  Burger,
  Badge,
  useMantineTheme,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { SideBar } from './sidebar';

export default function Shell({ children }) {

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const app = useSelector((state) => state.app);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 330, lg: 300 }}>
          <SideBar />
        </Navbar>
      }
      header={
        <Header height={70} p='md'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>
            <Kbd>{app.version}</Kbd>
            <Badge ml={5} variant='dot' color={app.appConnected ? 'green' : 'red'}>{app.appConnected ? 'CONNECTED' : 'PLEASE CONNECT THE APP TO UNLOCK ALL FEATURES'}</Badge>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Text variant='link' component='a' target={'_blank'} href='https://github.com/ffuNnyto/stake-stats'>
            SOURCE: https://github.com/ffuNnyto/stake-stats
          </Text>
        </Footer>

      }
    >
      {children}
    </AppShell>
  );
}
