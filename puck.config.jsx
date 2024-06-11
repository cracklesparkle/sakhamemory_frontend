import { Divider } from "@mantine/core"
import { Interweave } from "interweave"

export const puckConfig = {
    components: {
        Interweave: {
            fields: {
                content: { type: "text" },
            },
            defaultProps: {
                content: "",
            },
            render: ({ content }) => (
                <Interweave content={content}/>
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
