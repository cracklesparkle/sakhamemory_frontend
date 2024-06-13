import { Title, Text, Container, Button, Overlay, Flex } from '@mantine/core';
import classes from './HeroImageBackground.module.scss';

export function HeroImageBackground({
    img = "",
    description = ""
}) {
    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>

                <Flex justify={'center'}>
                    <img className={classes.logo} src={`/${img}`}></img>
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
