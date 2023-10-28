export const Note_Storage_Key = "note_storage_data";
export const Content_Storage_Key = "inke__content";
export const Content_Guide_Storage_Key = "inke__guide__content";
export const Content_Public_Storage_Key = "inke__public__content";
export const Default_Debounce_Duration = 750;

interface Plans {
  ai_generate_day: number;
  ai_generate_chars: number;
  note_upload_count: number;
  image_upload_size: number;
  ai_bot_history_length: number;
  pay: number;
}

export const Account_Plans: Plans[] = [
  {
    // sign for free
    ai_generate_day: 100,
    ai_generate_chars: 300,
    ai_bot_history_length: 10,
    note_upload_count: 20,
    image_upload_size: 1, // mb
    pay: 0,
  },
  {
    // basic
    ai_generate_day: 500,
    ai_generate_chars: 500,
    ai_bot_history_length: 32,
    note_upload_count: 10000,
    image_upload_size: 1,
    pay: 8,
  },
  {
    // pro
    ai_generate_day: 2000,
    ai_generate_chars: 2000,
    ai_bot_history_length: 100,
    note_upload_count: 10000,
    image_upload_size: 10,
    pay: 16,
  },
  {
    ai_generate_day: 10,
    ai_generate_chars: 10,
    ai_bot_history_length: 10,
    note_upload_count: 0,
    image_upload_size: 1,
    pay: 0,
  },
  {
    ai_generate_day: 10,
    ai_generate_chars: 10,
    ai_bot_history_length: 10,
    note_upload_count: 0,
    image_upload_size: 1,
    pay: 0,
  },
  {
    ai_generate_day: 50,
    ai_generate_chars: 200,
    ai_bot_history_length: 10,
    note_upload_count: 0,
    image_upload_size: 1,
    pay: 0,
  },
];

export const defaultEditorContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export const defaultEditorGuideContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", marks: [{ type: "bold" }], text: "🎉" },
        { type: "text", text: " " },
        {
          type: "text",
          marks: [{ type: "bold" }],
          text: "Introducing Inke",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/yesmore/inke",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class:
                  "novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer text-stone-400 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer",
              },
            },
          ],
          text: "Inke",
        },
        {
          type: "text",
          text: " is a simple-style editor with AI-powered autocompletion. With a clean and minimalist design, Inke offers a wide range of features to enhance your writing process.",
        },
      ],
    },
    { type: "paragraph", content: [{ type: "text", text: "Key Features:" }] },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "😗 " },
                {
                  type: "text",
                  marks: [{ type: "bold" }, { type: "italic" }],
                  text: "WYSIWYG Editing ",
                },
                {
                  type: "text",
                  text: "like markdown: Inke ensures that what you see is exactly what you get. Say goodbye to complicated formatting issues and enjoy a hassle-free editing experience. Inke offers full support for Markdown syntax with markdown shortcuts.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "😄 " },
                {
                  type: "text",
                  marks: [{ type: "bold" }, { type: "italic" }],
                  text: "Efficient Shortcut Inputs",
                },
                {
                  type: "text",
                  text: ": Inke understands the importance of speed and efficiency, so it support slash menu & bubble menu.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "😍 " },
                {
                  type: "text",
                  marks: [{ type: "bold" }, { type: "italic" }],
                  text: "AI-powered Text Autocomplete",
                },
                {
                  type: "text",
                  text: ": Boost your productivity with Inke's AI-powered autocomplete feature. Inke intelligently suggests completions for your text, making writing even faster and more efficient. (type ",
                },
                { type: "text", marks: [{ type: "code" }], text: "??" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "🥰 " },
                {
                  type: "text",
                  marks: [{ type: "bold" }, { type: "italic" }],
                  text: "Local Data Storage",
                },
                {
                  type: "text",
                  text: ": Rest easy knowing that your data is safe and secure. Inke saves all your notes and documents locally, ensuring your sensitive information remains private.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "🥳 " },
                {
                  type: "text",
                  marks: [{ type: "bold" }, { type: "italic" }],
                  text: "Image uploads",
                },
                {
                  type: "text",
                  text: ": drag & drop / copy & paste, or select from slash menu.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "Upcoming features：" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Cloud storage notes" }],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Export notes as images",
                },
              ],
            },
          ],
        },
        {
          type: "taskItem",
          attrs: { checked: true },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Export notes to a local file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 2 },
      content: [
        { type: "text", text: "🎊 " },
        { type: "text", marks: [{ type: "bold" }], text: "Try Inke here" },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Now start a new line and type " },
        { type: "text", marks: [{ type: "code" }], text: "/" },
        { type: "text", text: ",  then you will see a " },
        {
          type: "text",
          marks: [
            { type: "underline" },
            { type: "textStyle", attrs: { color: "#2563EB" } },
          ],
          text: "menu",
        },
        { type: "text", text: " pop up, press the " },
        { type: "text", marks: [{ type: "code" }], text: "↑" },
        { type: "text", text: " or " },
        { type: "text", marks: [{ type: "code" }], text: "↓" },
        { type: "text", text: " to move the cursor and press " },
        { type: "text", marks: [{ type: "code" }], text: "Enter" },
        { type: "text", text: " to select it." },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [{ type: "underline" }],
          text: "Markdown shortcuts",
        },
        {
          type: "text",
          text: " make it easy to format the text while typing.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "To test that, start a new line and type " },
        { type: "text", marks: [{ type: "code" }], text: "#" },
        { type: "text", text: " followed by a space to get a heading. Try " },
        { type: "text", marks: [{ type: "code" }], text: "#" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "##" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "###" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "####" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "#####" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "######" },
        { type: "text", text: " for different levels." },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Try " },
        { type: "text", marks: [{ type: "code" }], text: ">" },
        { type: "text", text: " for blockquotes, " },
        { type: "text", marks: [{ type: "code" }], text: "*" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "-" },
        { type: "text", text: " or " },
        { type: "text", marks: [{ type: "code" }], text: "+" },
        { type: "text", text: " for bullet lists, or " },
        { type: "text", marks: [{ type: "code" }], text: "`foobar`" },
        { type: "text", text: " to highlight code, " },
        { type: "text", marks: [{ type: "code" }], text: "~~tildes~~" },
        { type: "text", text: " to strike text, or " },
        { type: "text", marks: [{ type: "code" }], text: "==equal signs==" },
        { type: "text", text: " to highlight text." },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can overwrite existing input rules or add your own to nodes, marks and extensions.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "For example, we added the " },
        { type: "text", marks: [{ type: "code" }], text: "Typography" },
        { type: "text", text: " extension here. Try typing " },
        { type: "text", marks: [{ type: "code" }], text: "(c)" },
        {
          type: "text",
          text: " to see how it’s converted to a proper © character. You can also try ",
        },
        { type: "text", marks: [{ type: "code" }], text: "->" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: ">>" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "1/2" },
        { type: "text", text: ", " },
        { type: "text", marks: [{ type: "code" }], text: "!=" },
        { type: "text", text: ", or " },
        { type: "text", marks: [{ type: "code" }], text: "--" },
        { type: "text", text: "." },
      ],
    },
  ],
};
