// Inserts for
/*
  Process: literally just curl the file and add it as a script tag
*/
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

const insertOpts = {
  'pre_css': ['bootstrap', 'vue', 'jquery'],
  'pre_js': ['jquery'],
  'post_js': ['vue'],
}