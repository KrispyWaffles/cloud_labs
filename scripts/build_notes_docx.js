// Builds AWS_Course/notes/SAA-C03-Study-Notes.docx from the block notes in AWS_Course/notes/*.md.
// The .md files are the source of truth. Rebuilding overwrites the .docx, so don't hand-edit it.
//
// Usage (needs the `docx` npm package, installed wherever you run this):
//   node scripts/build_notes_docx.js
//
// Note format it understands (the format Claude writes the notes in):
//   "# Title"            -> one block heading (Heading 1)
//   "## 1. Section"      -> section heading (Heading 2), leading number removed
//   "- text"             -> bullet;  "1. text" -> numbered item;  other lines -> paragraph
//   "**bold**"           -> bold run

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat,
  Footer, PageNumber, BorderStyle,
} = require("docx");

const root = path.resolve(__dirname, "..");
const notesDir = path.join(root, "AWS_Course", "notes");
const outFile = path.join(notesDir, "SAA-C03-Study-Notes.docx");

const FONT = "Arial";
const BODY = 24;      // 12 pt (half-points)
const H1 = 32;        // 16 pt
const H2 = 28;        // 14 pt
const TITLE = 40;     // 20 pt

const files = fs.readdirSync(notesDir)
  .filter((f) => /^[A-Z]\d+-B\d+\.md$/.test(f))   // block notes only, e.g. S03-B01.md
  .sort();

if (files.length === 0) { console.error("No block notes found in " + notesDir); process.exit(1); }

function runs(text, extra = {}) {
  const out = [];
  const parts = text.replace(/`/g, "").split(/(\*\*[^*]+\*\*)/);
  for (const part of parts) {
    if (!part) continue;
    const bold = part.startsWith("**") && part.endsWith("**");
    out.push(new TextRun({ text: bold ? part.slice(2, -2) : part, bold: bold || extra.bold, font: FONT, size: extra.size || BODY }));
  }
  return out;
}

const children = [];
children.push(new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 120 },
  children: [new TextRun({ text: "AWS Certified Solutions Architect Associate (SAA-C03): Study Notes", bold: true, font: FONT, size: TITLE })] }));
children.push(new Paragraph({ spacing: { after: 120 }, children: runs("Course: Udemy (Stéphane Maarek)  |  Exam: Nov 20, 2026  |  Updated: " + new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })) }));
children.push(new Paragraph({ spacing: { after: 240 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "999999", space: 4 } },
  children: runs("One section per study block, in course order. Each block ends with recall prompts.") }));

let numberedInstance = 0;
let inNumbered = false;
let first = true;

for (const f of files) {
  const lines = fs.readFileSync(path.join(notesDir, f), "utf8").split("\n");
  first = true;
  inNumbered = false;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line) { inNumbered = false; continue; }
    if (line.startsWith("# ")) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: !first || children.length > 3,
        spacing: { before: 240, after: 120 }, keepNext: true,
        children: [new TextRun({ text: line.slice(2), bold: true, font: FONT, size: H1 })] }));
      first = false;
    } else if (line.startsWith("## ")) {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 80 }, keepNext: true,
        children: [new TextRun({ text: line.slice(3).replace(/^\d+\.\s*/, ""), bold: true, font: FONT, size: H2 })] }));
    } else if (/^- /.test(line)) {
      inNumbered = false;
      children.push(new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: runs(line.slice(2)) }));
    } else if (/^\d+\.\s/.test(line)) {
      if (!inNumbered) { numberedInstance += 1; inNumbered = true; }
      children.push(new Paragraph({ numbering: { reference: "numbers", level: 0, instance: numberedInstance }, spacing: { after: 60 },
        children: runs(line.replace(/^\d+\.\s*/, "")) }));
    } else {
      inNumbered = false;
      children.push(new Paragraph({ spacing: { after: 120 }, children: runs(line) }));
    }
  }
}

const doc = new Document({
  creator: "Study notes",
  title: "AWS SAA-C03 Study Notes",
  styles: {
    default: { document: { run: { font: FONT, size: BODY } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: TITLE, bold: true }, paragraph: { spacing: { after: 120 } } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: H1, bold: true, color: "000000" }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: H2, bold: true, color: "000000" }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: ["Page ", PageNumber.CURRENT], font: FONT, size: 20 })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outFile, buf);
  console.log("Wrote " + path.relative(root, outFile) + " from " + files.length + " block note file(s): " + files.join(", "));
});
