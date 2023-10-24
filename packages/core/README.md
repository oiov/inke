# Inke

<a href="https://www.npmjs.org/package/inkejs" target='_blank'>
  <img src="https://img.shields.io/npm/v/inkejs">
</a>
<a href="https://npmcharts.com/compare/inkejs?minimal=true" target='_blank'>
  <img src="https://img.shields.io/npm/dt/inkejs.svg">
</a>
<a href="https://github.com/yesmore/inke/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/yesmore/inke?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
</a>
<a href="https://inke.app">
  <img src="https://badgen.net/https/inke.app/api/status" alt="status"/>
</a>

Inke is a Notion-style WYSIWYG editor with AI-powered autocompletions.

See live demo: [inke-web](https://inke.app)  

<img alt="Inke is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://inke.app/desktop.png">

# Install Inke

```bash
npm install inkejs
```

## Setting Up Locally

To set up Inke locally, you'll need to clone the repository and set up the following environment variables:

- `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))
- `BLOB_READ_WRITE_TOKEN` – your Vercel Blob read/write token (currently [still in beta](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart), but feel free to [sign up on this form](https://vercel.fyi/blob-beta) for access)

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

To run the app locally, you can run the following commands:

```bash
pnpm i
pnpm build
pnpm dev
```

Then, you can use it in your code like this:

```jsx
import { Editor } from "inkejs";

export default function App() {
  return <Editor />;
}
```

The `Editor` is a React component that takes in the following props:

| Prop                  | Type                        | Description                                                                                                                                                                            | Default                                                                                                                             |
| --------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `completionApi`       | `string`                    | The API route to use for the OpenAI completion API.                                                                                                                                    | `/api/generate`                                                                                                                     |
| `className`           | `string`                    | Editor container classname.                                                                                                                                                            | `"relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"` |
| `defaultValue`        | `JSONContent` or `string`   | The default value to use for the editor.                                                                                                                                               | [`defaultEditorContent`](https://github.com/yesmore/inke/blob/main/packages/core/src/ui/editor/default-content.tsx)                 |
| `extensions`          | `Extension[]`               | A list of extensions to use for the editor, in addition to the [default Novel extensions](https://github.com/yesmore/inke/blob/main/packages/core/src/ui/editor/extensions/index.tsx). | `[]`                                                                                                                                |
| `editorProps`         | `EditorProps`               | Props to pass to the underlying Tiptap editor, in addition to the [default Novel editor props](https://github.com/yesmore/inke/blob/main/packages/core/src/ui/editor/props.ts).        | `{}`                                                                                                                                |
| `onUpdate`            | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated.                                                                                                                     | `() => {}`                                                                                                                          |
| `onDebouncedUpdate`   | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.                                                                       | `() => {}`                                                                                                                          |
| `debounceDuration`    | `number`                    | The duration (in milliseconds) to debounce the `onDebouncedUpdate` callback.                                                                                                           | `750`                                                                                                                               |
| `storageKey`          | `string`                    | The key to use for storing the editor's value in local storage.                                                                                                                        | `novel__content`                                                                                                                    |
| `disableLocalStorage` | `boolean`                   | Enabling this option will prevent read/write content from/to local storage.                                                                                                            | `false`                                                                                                                             |

> **Note**: Make sure to define an API endpoint that matches the `completionApi` prop (default is `/api/generate`). This is needed for the AI autocompletions to work. Here's an example: https://github.com/yesmore/inke/blob/main/apps/web/app/api/generate/route.ts

## Deploy Your Own

You can deploy your own version of Novel to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)]()

## Tech Stack

Inke is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [Tiptap](https://tiptap.dev/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yesmore/inke&type=Date)](https://star-history.com/#yesmore/inke&Date)

## License

[Apache-2.0](./LICENSE) © [yesmore](https://github.com/yesmore)
