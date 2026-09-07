export const Categories = [
    'women',
    'baby',
] as const;
export type Category = (typeof Categories)[number];

export const Patterns = {
    newborn: '新生児服・乳児服(0歳～2歳)',
    toddler: '乳幼児服(6ヶ月～5歳)',
} as const;
export type Pattern = typeof Patterns [keyof typeof Patterns];

export const Links = {
    link1: '20260805test.txt'
} as const;
export type Link = typeof Links [keyof typeof Links];