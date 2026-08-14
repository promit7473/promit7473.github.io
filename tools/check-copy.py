#!/usr/bin/env python3
"""Flag copy that will open a river in the justified card text.

Card descriptions are justified in a column about 40 characters wide. When a
token is too long to fit on the current line it moves to the next one whole,
and justification stretches the words left behind across the full width. The
result is a visible gap, e.g. "and the RL Zoo on" followed by a hole, caused
by "SpaceInvadersNoFrameskip".

CSS cannot cap how far justification stretches, and `hyphens: auto` only
breaks dictionary words. Identifiers like SpaceInvadersNoFrameskip-v4,
PPO/SAC/TD3 or IsaacLabEnvironment have no syllables to break at, so the only
reliable fix is to keep them out of justified copy: write the readable form in
the sentence and put the exact identifier in a tag, a link, or parentheses
where it can break.

    python tools/check-copy.py          # report
    python tools/check-copy.py --strict # exit 1 if anything is flagged

Ordinary long words are not flagged: "asymptotically" hyphenates fine. Only
identifier-shaped tokens are, since those are the ones that cannot break.
"""

import argparse
import glob
import os
import re
import sys

# Roughly 40% of the ~40-character card column. Past this a token that cannot
# hyphenate will strand the rest of its line.
MAX_TOKEN = 16


def looks_like_identifier(tok):
    """True when a token has no syllable structure to hyphenate at."""
    core = tok.strip(".,;:()[]\"'")
    if any(ch.isdigit() for ch in core):
        return True
    # internal capital, i.e. CamelCase
    return any(ch.isupper() for ch in core[1:])


def card_paragraphs(html):
    """Card descriptions only: other prose sits in a much wider column."""
    for block in re.findall(r'<div class="card-body">(.*?)</div>\s*</article>',
                            html, re.S):
        for para in re.findall(r"<p>(.*?)</p>", block, re.S):
            title = re.search(r"<h3>([^<]+)</h3>", block)
            yield (title.group(1) if title else "?"), re.sub(r"<[^>]+>", "", para)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true")
    ap.add_argument("--max", type=int, default=MAX_TOKEN)
    args = ap.parse_args()

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    findings = []
    for path in sorted(glob.glob(os.path.join(root, "*.html"))):
        html = open(path, encoding="utf-8").read()
        for title, text in card_paragraphs(html):
            # Browsers may break at a hyphen or slash, so those end a token.
            for tok in re.split(r"[\s\-/–—]+", text):
                bare = tok.strip(".,;:()[]\"'")
                if len(bare) > args.max and looks_like_identifier(bare):
                    findings.append((os.path.basename(path), title, bare))

    if not findings:
        print("no river-causing tokens (limit %d chars)" % args.max)
        return 0

    print("tokens too long to break in a justified card column "
          "(limit %d):\n" % args.max)
    for f, title, tok in findings:
        print("  %-16s %-40s %2d  %s" % (f, title[:40], len(tok), tok))
    print("\nRewrite so the identifier can break, e.g."
          "\n  SpaceInvadersNoFrameskip-v4  ->  Space Invaders (NoFrameskip-v4)")
    return 1 if args.strict else 0


if __name__ == "__main__":
    sys.exit(main())
