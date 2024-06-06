import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './ArticleCardImage.module.scss';

export function ArticleCardImage({height, image, link, title, subtitle}) {
    return (
        <Paper h={height} shadow="md" p="xl" radius="md" className={classes.card}>
            <div>
                <Text className={classes.category} size="xs">
                    nature
                </Text>
                <Title order={3} className={classes.title}>
                    Best forests to visit in North America
                </Title>
            </div>
            <Button variant="white" color="dark">
                Read article
            </Button>
        </Paper>
    )
}