<a href="https://inke.app">
  <img alt="Inke is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://inke.app/opengraph-image.png">
  <h1 align="center">Inke</h1>
</a>

<p align="center">
  An open-source Notion-style WYSIWYG editor with AI-powered autocompletions. 
</p>

<p align="center">
  <a href="https://github.com/yesmore/inke/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/yesmore/inke?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/yesmore/inke"><img src="https://img.shields.io/github/stars/yesmore/inke?style=social" alt="inke.app's GitHub repo"></a>
</p>
<br/>

## Introduction

[Inke](https://inke.app/) is a Notion-style WYSIWYG editor with AI-powered autocompletions.

<br />

## Deploy Your Own

You can deploy your own version of Inke to Vercel with one click:

<!-- [![Deploy with Vercel]()]() -->

## Setting Up Locally

To set up Inke locally, you'll need to clone the repository and set up the following environment variables:

- `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))
- `BLOB_READ_WRITE_TOKEN` – your Vercel Blob read/write token (currently [still in beta](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart), but feel free to [sign up on this form](https://vercel.fyi/blob-beta) for access)

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev

git fetch upstream
git merge upstream/main
git push origin main
```

## Tech Stack

Inke is built on the following stack:

- [Next.js](https://nextjs.org/) – framework
- [Tiptap](https://tiptap.dev/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Cal Sans](https://github.com/calcom/font) – font

## License

Licensed under the [Apache-2.0 license](LICENSE.md).
