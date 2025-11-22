

export interface Component {
    this?: {
        parent?: string,
        block?: string,
        class?: string | string[],
        tag?: string,
        style?: string | string[],
        dataAttribute?: string | string[]
    },
    componentName: string
} 