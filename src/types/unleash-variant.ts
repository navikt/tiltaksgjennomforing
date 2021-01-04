export type Variant = { enabled: boolean; payload?: { type: string; value: null | string } };

export type Variants = { [toggles: string]: Variant };
