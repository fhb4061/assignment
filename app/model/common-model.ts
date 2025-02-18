export type SharedInputProps<V> = {
    id?: string;
    value: V | undefined;
    label: string;
    onChange: (value: V | undefined) => void;
    min?: number;
    max?: number;
    error?: string;
}