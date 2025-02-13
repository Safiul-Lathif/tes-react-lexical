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
                    "time": 161803398874,
                    "blocks": [
                      {
                        "type": "header",
                        "data": {
                          "text": "Welcome to Editor.js",
                          "level": 2
                        }
                      },
                      {
                        "type": "paragraph",
                        "data": {
                          "text": "Editor.js is a block-styled editor that allows you to create rich content with ease. Below are examples of different blocks you can use."
                        }
                      },
                      {
                        "type": "image",
                        "data": {
                          "file": {
                            "url": "https://th.bing.com/th/id/R.b46ab657e8d8ac19a6febd2a800f75d1?rik=OHMRkhqyJqBFlg&riu=http%3a%2f%2fwww.ricoh-imaging.co.jp%2fenglish%2fproducts%2fxg-1%2fex%2fimg%2fex-pic07.jpg&ehk=j38QJyEs1kWfA%2bnQbxutVjeIh5dxS%2bxPVCJ%2brc2M3Zw%3d&risl=1&pid=ImgRaw&r=0"
                          },
                          "caption": "An example image",
                          "withBorder": true,
                          "stretched": false,
                          "withBackground": false
                        }
                      },
                      {
                        "type": "list",
                        "data": {
                          "style": "unordered",
                          "items": [
                            "First item",
                            "Second item",
                            "Third item"
                          ],
                        }
                      },
                      {
                        "type": "list",
                        "data": {
                          "style": "ordered",
                          "items": [
                            "First item",
                            "Second item",
                            "Third item"
                          ]
                        }
                      },
                      {
                        "type": "quote",
                        "data": {
                          "text": "The only limit to our realization of tomorrow is our doubts of today.",
                          "caption": "Franklin D. Roosevelt",
                          "alignment": "left"
                        }
                      },
                      {
                        "type": "code",
                        "data": {
                          "code": "const greet = () => {\n  console.log('Hello, World!');\n};"
                        }
                      },
                      {
                        "type": "embed",
                        "data": {
                          "service": "youtube",
                          "source": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                          "embed": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                          "width": 580,
                          "height": 320,
                          "caption": "An example YouTube video"
                        }
                      },
                      {
                        "type": "table",
                        "data": {
                          "content": [
                            ["Name", "Age", "Occupation"],
                            ["Alice", "24", "Engineer"],
                            ["Bob", "27", "Designer"]
                          ]
                        }
                      },
                      {
                        "type": "delimiter",
                        "data": {}
                      },
                      {
                        "type": "raw",
                        "data": {
                          "html": "<p>This is a raw HTML block.</p>"
                        }
                      }
                    ],
                    "version": "2.22.2"
                  }
                  
            }
        />
    )
}