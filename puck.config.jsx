import Hero from "@/app/components/Hero";
import { HeroImageBackground } from "@/app/components/HeroImageBackground";
import { Divider, Flex } from "@mantine/core"
import { DropZone } from "@measured/puck";
import { Interweave } from "interweave"

export const puckConfig = {
    components: {
        Flex: {
            fields: {
                align: {
                    type: "select",
                    options: [
                        { label: "Flex-start", value: "flex-start" },
                        { label: "Center", value: "center" },
                        { label: "Flex-end", value: "flex-end" },
                    ],
                },
                gap: {
                    type: "number"
                },
                padding: {
                    type: "number"
                },
                direction: {
                    type: "select",
                    options: [
                        { label: "Row", value: "row" },
                        { label: "Column", value: "column" },
                    ],
                },
                justify: {
                    type: "select",
                    options: [
                        { label: "Flex-start", value: "flex-start" },
                        { label: "Center", value: "center" },
                        { label: "Flex-end", value: "flex-end" },
                    ],
                }
            },
            render: ({ align, gap, direction, justify, padding}) => (
                <Flex mih={180} p={padding} align={align} gap={gap} direction={direction} justify={justify}>
                    <DropZone zone="flex-content"/>
                </Flex>
            ),
        },
        HeroImageBackground: {
            fields: {
                img: { type: "text" },
                description: { type: "text" }
            },
            defaultProps: {
                img: "",
                description: ""
            },
            render: ({ img, description }) => (
                <HeroImageBackground img={img} description={description} />
            )
        },
        Hero: {
            fields: {
                img: { type: "text" },
                title: { type: "text" }
            },
            defaultProps: {
                img: "",
                title: ""
            },
            render: ({ img, title }) => (
                <Hero img={img} title={title} />
            )
        },
        Interweave: {
            fields: {
                content: { type: "text" },
            },
            defaultProps: {
                content: "",
            },
            render: ({ content }) => (
                <Interweave content={content} />
            ),
        },
        HeadingBlock: {
            fields: {
                title: { type: "text" },
            },
            defaultProps: {
                title: "Heading",
            },
            render: ({ title }) => (
                <div style={{ padding: 64 }}>
                    <h1>{title}</h1>
                </div>
            ),
        },
        Divider: {
            label: 'Разделитель',
            fields: {
                size: {
                    label: 'Размер',
                    type: "select",
                    options: [
                        { label: "xs", value: "xs" },
                        { label: "sm", value: "sm" },
                        { label: "md", value: "md" },
                        { label: "lg", value: "lg" },
                        { label: "xl", value: "xl" },
                    ]
                },
                orientation: {
                    label: 'Ориентация',
                    type: "select",
                    options: [
                        { label: "Горизонтальный", value: "horizontal" },
                        { label: "Вертикальный", value: "vertical" },
                    ]
                },
            },
            defaultProps: {
                size: "xs",
                orientation: "horizontal",
            },
            render: ({ size, orientation }) => (
                <Divider size={size} orientation={orientation} />
            )
        },
    },
    root: {
        render: ({ children }) => {
            return <div>{children}</div>;
        },
    }
}

export default puckConfig
