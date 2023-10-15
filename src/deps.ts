export const options = [
  { value: 'ts-bun', label: 'Typescript (Bun+Hono)' },
  { value: 'go-templ', label: 'Go (Templ)' },
];

export type TNames = typeof options[number]['value'];
interface Deps {
  [key: TNames]: string[];
}

// keys can only be option-values
export const depCheck: Deps = {
  'ts-bun': ['bun'],
  'go-templ': ['go', 'templ'],
};