#!/bin/sh
# Regenerates AWS_Course/notes/chatgpt-prompt-with-notes.md: the ChatGPT prompt template followed by
# every block note (S03-B01.md, S04-B01.md, ...). Run it after each block's notes are written.
# The generated file is git-ignored. Usage: sh scripts/build_chatgpt_prompt.sh
set -e
cd "$(dirname "$0")/.."
out=AWS_Course/notes/chatgpt-prompt-with-notes.md
{
  cat AWS_Course/notes/_chatgpt-prompt-template.md
  echo
  for f in AWS_Course/notes/[A-Z][0-9][0-9]-B[0-9][0-9].md; do
    echo "-----"
    echo "(file: $(basename "$f"))"
    echo
    cat "$f"
    echo
  done
} > "$out"
echo "Wrote $out with $(grep -c '^(file:' "$out") block(s)"
