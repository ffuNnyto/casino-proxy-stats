import { Code, Loader, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Pragmatic() {
    const { tab } = useParams();
    const app = useSelector((state) => state.app);
    if (tab === 'bwins') return <></>
    if (tab === 'stats') return <></>

    if (app.pragmaticdb[tab] === undefined) return <Loader />;

    return (
        <>
            <Text
                component='span'
                align='center'
                variant='gradient'
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                size='xl'
                weight={700}
                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
                CURRENCY - USD
            </Text>
            <Code block>
                {JSON.stringify(app.pragmaticdb[tab], undefined, 4)}
            </Code>
        </>
    );
}