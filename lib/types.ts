export type RequiredKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

export type StripOptional<T> = {
    [K in RequiredKeys<T>]: T[K];
};

export type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T];

export type KeepOptional<T> = {
    [K in OptionalKeys<T>]?: T[K];
};