import dynamic from "next/dynamic"

export default function OutputPage() {
    const Output = dynamic(
        async () => (await import("editorjs-react-renderer")).default, {
        ssr: false,
    }
    )
    return (
        <Output
            data={
                {
                    time: 1739251619745,
                    blocks: [
                        {
                            id: "mhTl6ghSkV",
                            type: "paragraph",
                            data: {
                                text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
                            },
                        },
                        {
                            id: "mhTl6ghSkV",
                            type: "header",
                            data: {
                                text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
                              level:1
                            },
                        },
                        {
                            id: "l98dyx3yjb",
                            type: "header",
                            data: {
                                text: "Key features",
                                level: 2,
                            },
                        },
                        {
                            id: "os_YI4eub4",
                            type: "list",
                            data: {
                                type: "unordered",
                                items: [
                                    "It is a block-style editor",
                                    "It returns clean data output in JSON",
                                ],
                            },
                        },
                        {
                            id: "1yKeXKxN7-",
                            type: "header",
                            data: {
                                text: "What does it mean «block-styled editor»",
                                level: 3,
                            },
                        },
                        {
                            id: "TcUNySG15P",
                            type: "paragraph",
                            data: {
                                text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent ",
                            },
                            tunes: {
                                footnotes: [
                                    "It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",
                                ],
                            },
                        },
                        {
                            id: "M3UXyblhAo",
                            type: "header",
                            data: {
                                text: "What does it mean clean data output?",
                                level: 3,
                            },
                        },
                        {
                            id: "KOcIofZ3Z1",
                            type: "paragraph",
                            data: {
                                text: "There are dozens of ready-to-use Blocks and a simple API ",
                            },
                            tunes: {
                                footnotes: [
                                    "Just take a look at our Creating Block Tool guide. You'll be surprised.",
                                ],
                            },
                        },
                        {
                            id: "XKNT99-qqS",
                            type: "attaches",
                            data: {
                            file: {
                            url: "https://drive.google.com/user/catalog/my-file.pdf",
                            size: 12902,
                            name: "file.pdf",
                            extension: "pdf",
                            } ,
                            title: "My file",
                            } ,
                            } ,

                    ]
                }
            }
        />
    )
}