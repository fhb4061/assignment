export type SharedInputProps<V> = {
    value: V | undefined;
    label: string;
    onChange: (value: V | undefined) => void;
    min?: number;
    max?: number;
}