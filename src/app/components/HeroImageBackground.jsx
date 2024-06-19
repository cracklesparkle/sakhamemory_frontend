import { Title, Text, Container, Button, Overlay, Flex } from '@mantine/core';
import classes from './HeroImageBackground.module.scss';
import Image from 'next/image';

export function HeroImageBackground({
    img = "",
    description = ""
}) {
    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>

                <Flex justify={'center'}>
                    <Image className={classes.logo} src={`/${img}`}></Image>
                </Flex>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        {description}
                    </Text>
                </Container>
            </div>
        </div>
    );
}
