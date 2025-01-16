import { Document, Paragraph, TextRun } from "docx";

const SIZE = {
    h1: 28,
    h2: 26,
    h3: 24,
    h4: 22,
    h5: 20,
    h6: 18,
};

export function convertLexicalToDocx(lexicalJSON) {
    const doc = new Document({
        creator: "VOSINT",
        description: "",
        sections: [],
    });
    const section = {
        properties: {},
        children: [],
    };

    // iterate over blocks in lexicalJSON
    for (const block of lexicalJSON.root.children) {
        // create a new Paragraph for each block
        const paragraph = new Paragraph({
            alignment: block.format,
            children: [],
            indent: block.indent,
        });

        if (block.type === "heading") {
            const text = block.children[0].text;
            const size = SIZE?.[block.tag] ?? 14;
            const heading = new TextRun({
                text,
                bold: true,
                size,
            });
            paragraph.addChildElement(heading);
        } else if (block.type === "paragraph") {
            // iterae over inline elements in block
            for (const inline of block.children) {
                // create a new TextRun for each inline element
                const textRun = new TextRun({
                    text: inline.text,
                    bold: inline.format === 2,
                    italics: inline.format === 3,
                    underline: inline.format === 4,
                    break: inline.type === "break" ? 1 : undefined,
                });

                paragraph.addChildElement(textRun);
            }
        }
        section.children.push(paragraph);
    }
    doc.addSection(section);
    return doc;
}
