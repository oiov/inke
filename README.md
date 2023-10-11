<p align="center">
  <img width="108" src="https://inke.app/logo.png">
</p>

<p align="center"><strong> Inke - Small is beautiful</strong></p>

<p align="center">
  <a href="https://inke.app">
    <img src="https://badgen.net/https/inke.app/api/status" alt="status"/>
  </a>
  <a href="https://github.com/yesmore/inke/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/yesmore/inke?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/yesmore/inke"><img src="https://img.shields.io/github/stars/yesmore/inke?style=social" alt="inke.app's GitHub repo"></a>
</p>



# About Inke

[Inke](https://inke.app/) is a Notion-style WYSIWYG editor with AI-powered autocompletions.

<img alt="Inke is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://inke.app/opengraph-image.png">

## Self Hosting

You can deploy your own version of Inke to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-link=https%3A%2F%2Fgithub.com%2Fyesmore%2Finke&env=OPENAI_API_KEY&envDescription=Find%20your%20OpenAI%20API%20Key%20by%20click%20the%20right%20Learn%20More%20button.%20%20&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys&project-name=inke&repository-name=inke)

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

##  Environment Variable

| Prop                    | Type     | Description                                                                                                                                              | Example                                                                                                             |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`        | `string` | The API Key to use for the OpenAI completion API.                                                                                                        | `sk-xxx`                                                                                                            |
| `BLOB_READ_WRITE_TOKEN` | `string` | OPTIONAL: Vercel Blob (for uploading images). Get your Vercel Blob credentials [here](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart) | `vercel_blob_xxxx`                                                                                                  |
| `KV_REST_API_URL`       | `string` | OPTIONAL: Vercel KV (for ratelimiting). Get your Vercel KV credentials [here](https://vercel.com/docs/storage/vercel-kv/quickstart#quickstart)           | [`"https//xxx.com"`](https://github.com/steven-tey/novel/blob/main/packages/core/src/ui/editor/default-content.tsx) |
| `KV_REST_API_TOKEN`     | `string` | OPTIONAL: Vercel KV (for ratelimiting). Get your Vercel KV credentials [here](https://vercel.com/docs/storage/vercel-kv/quickstart#quickstart).          | `abcdefg`                                                                                                           |
| `NEXTAUTH_SECRET`       | `string` | Only for production – generate one here: [generate-secret](https://generate-secret.vercel.app/32).                                                       | `fasgagahhjerherg`                                                                                                  |
| `DATABASE_URL`          | `string` | DATABASE url                                                                                                                                             | `mongodb://xxxx`                                                                                                    |
| `EMAIL_FROM`            | `string` | Next Auth Provider: [Email](https://next-auth.js.org/providers/email)                                                                                    | `Inke <regist@inke.app>`                                                                                            |
| `EMAIL_SERVER`          | `string` | Next Auth Provider: [Email](https://next-auth.js.org/providers/email)                                                                                    | `smtps://xxxx`                                                                                                      |
| `GITHUB_ID`             | `string` | Next Auth Provider: [Github](https://next-auth.js.org/providers/github)                                                                                  | `xadsafsa`                                                                                                          |
| `GITHUB_SECRET`         | `string` | Next Auth Provider: [Github](https://next-auth.js.org/providers/github)                                                                                  | `xadsafsa`                                                                                                          |

## Sync repo

```bash
# Sync
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

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yesmore/inke&type=Date)](https://star-history.com/#yesmore/inke&Date)

[![product hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=419235&theme=light)](https://www.producthunt.com/posts/inke?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-inke)

<a href="https://www.buymeacoffee.com/yesmore/gallery" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## License

[GPL](./LICENSE) © [yesmore](https://github.com/yesmore)