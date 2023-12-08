const defOut = "You're all set!";
export const options = [
  {
    value: 'ts-bun',
    label: 'Typescript (Bun+Hono)',
    outro: defOut
  },
  {
    value: 'go-templ',
    label: 'Go (Echo+Templ)',
    outro: defOut
  },
  {
    value: 'rust-leptos',
    label: 'Rust (Actix+Leptos)',
    outro: "rust btw"
  },
  {
    value: 'python-jinja',
    label: 'Python (Flask+Jinja2)',
    outro: defOut
  },
  {
    value: "ocaml-dream",
    label: "OCaml (Dream)",
    outro: "OCaml My Caml"
  },
  {
    value: "swift-vapor",
    label: "Swift (Vapor)",
    outro: "Let Tim Cook"
  }
];

export type TNames = typeof options[number]['value'];
interface Deps {
  [key: TNames]: string[];
}

// keys can only be option-values
export const depCheck: Deps = {
  'ts-bun': ['bun'],
  'go-templ': ['go', 'templ'],
  'rust-leptos': ['rust'],
  'python-jinja': ['python'],
};