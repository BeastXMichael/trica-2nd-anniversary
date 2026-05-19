# Build Brief: Anniversary Site for Trisha

## Read this first. Everything else is downstream.

The previous build failed in a specific way I need you to understand before you touch code. It treated my personal context as data to display. Two real examples from the last attempt:

**Failure 1: "Our Children" section.** Four cards in a row. Each doll got an emoji, a name, an ALL-CAPS category label (BEAR, PINK PIG, TEDDY BEAR, CAPYBARA), and a one-line description. It looked like a Pokemon roster.

**Failure 2: "Our Language" section.** Two subheadings. Under "WHAT WE CALL EACH OTHER" you put `babe`, `sayang`, and `Minchan` as little bubble cards with attribution underneath ("MICHAEL TO TRISHA"). Under "OUR SLANG" you put `Tae`, `Brot`, and `mbencekno` as three pink cards with definitions, like a phrasebook.

Nobody on earth writes a love letter that contains a glossary of pet names. Nobody introduces their stuffed animals to their partner with category tags. The information was right. The form was a knife to the throat of the entire piece.

**The rule:** my personal context never appears as labeled cards, glossary entries, comparison grids, feature tiles, lists, or anything that would look at home on a SaaS landing page. If you're about to build one of those, stop and rewrite the section as prose with the same information woven in.

## What "woven in" actually looks like

**Wrong (the slang section):**
> Our Slang
> [Card: Tae] Slang for poop. We say it constantly.
> [Card: Brot] Friend, bro. We throw it at each other.

**Right (slang appearing inside actual writing somewhere in a daily-life section):**
> The way we talk is its own little country with a population of two. You still call me Minchan when I'm being bencek no, refusing to stop annoying you, throwing the guling on the floor again. I keep going until you cry. Then I'm sorry sorry sorry sorry. Then we move on. Tae.

**Wrong (the dolls section):**
> Our Children
> [Card: Cino] BEAR. Our shared child.
> [Card: La Zi Zhu] PINK PIG. Michael's favourite.
> [Card: Xiao Bao Bei] Teddy Bear

**Right (one warm paragraph, maybe with a single photo of the dolls together):**
> Somewhere in the past two years we ended up with kids. Cino, the bear, technically belongs to both of us. La Zi Zhu has a permanent spot on my side of the bed. Xiao Bao Bei is yours, you hold him every night. Boris the capybara doesn't really belong to anyone, but somehow he always makes it into the photo.

Same information. Opposite feeling. The second one is a person talking. The first one is a database.

## What the site IS

A one-page scrolling love letter. Not a portfolio. Not a relationship dashboard. Not an "about us" infographic. A LETTER with photos, motion, music, and one closing message at the bottom. Treat the whole site as one continuous piece of writing, with the page design serving the writing, not the other way around.

## Section structure (and why each one exists)

There are NO catalog sections. There are no "Our Slang," "Our Language," "Our Children," "Music We Like," or "Places We've Been" pages. Those concepts get woven into the narrative sections below.

**1. Hero**
One hero photo of Trisha or both of us, full bleed. Headline "Happy 2nd Anniversary, Sayang." A live days counter (730 days since 16 May 2024, calculated live so it stays current). A small audio play button for the song, muted on load. That's all. No nav. No scroll arrow unless minimal and tasteful.

**2. How we got here**
2 to 3 short paragraphs in my voice. How we met at GL performance in October 2023. How I confessed first. How you said yes on 16 May 2024. Written like I'm telling a friend, not writing a Wikipedia entry. One or two early photos pinned or parallaxed in.

**3. The texture of us**
This is where the small daily moments live. The annoying-you ritual until you cry. The way you tell stories about your papa and mama. The way you cooked me a burger for my birthday. The studying side by side, the scrolling Instagram together, going to church together. Written as connected paragraphs, NOT as bulleted memories. Mix the inside slang and pet names naturally (sayang, Minchan, bencek no, tae) without ever explaining them. 3 to 5 photos scattered, scroll-triggered reveals.

**4. Our kids**
ONE paragraph about the dolls (see the "Right" example above). One photo of the dolls together if available. NO cards. NO grid. NO category labels.

**5. Two years on the map**
The places we've been, told as a journey. Could be a horizontally scrolling sequence pinned to scroll, where each viewport shows one photo and one sentence. Mention specific places by name but inside sentences ("the river cruise where you got tired before we even started," "Universal twice because you wanted to ride one more time," "Batam for real Indonesian food," "Lazarus and Sisters' Island by ferry, that wild one," "Hall 8 of NTU, where so much of us actually happened"). End on Hall 8 since it's our home base.

**6. What I love about you**
The emotional core, not a list. 2 to 3 paragraphs in my voice. Her being chillan, the no-second-face honesty. Her mommy energy, knowing what people need before they say it. DO NOT use bullets, cards, or labels. This is prose.

**7. The faith thread**
One short, sincere paragraph about how God shows up in our relationship. Worship music we share (NDC, GMS, JPCC, Hillsong, Elevation, especially Praise) appears INSIDE the sentence as part of how I describe our church habits. Do NOT make a "music we love" section. No Bible verses (we don't read together, as noted in CLAUDE.md).

**8. Right now**
One paragraph acknowledging she is in Thailand, that this anniversary is being celebrated apart, that I miss her, and that I'll see her in 2 months. Short. Emotional. Sets up the closing.

**9. The letter**
The closing letter from CLAUDE.md, displayed as a real letter. Slow reveal, warm typography (a handwritten or refined serif), paced so each paragraph lands. This is THE moment. Visually unhurried.

**10. Final image**
A single photo of both of us together. No caption. No text. The photo is the period at the end of the whole site.

## Skills to use

- `frontend-design`: lock the aesthetic direction FIRST, before any code. Propose it in plan mode.
- `gsap-skills`: smooth scroll via Lenis, text reveals via SplitText, section pins via ScrollTrigger, scroll-triggered fades and parallax
- `lottie-animator`: only if a small vector touch genuinely helps (a slow pulsing heart by the days counter, a hand-drawn underline that draws itself under "Sayang"). Use sparingly. Not in every section.

## Stack

- Single-page vanilla HTML/CSS/JS, all via CDN. No React. No bundler. Fastest path to ship.
- GSAP 3 + ScrollTrigger + SplitText + Lenis
- HTML5 audio for the song
- Mobile responsive is non-negotiable. Trisha will open this on her phone in Thailand. Test the mobile layout as you build, not at the end.

## Reference sites for feel (not for content)

- https://www.capsul-in-pro.com/home-compost-capsule/
- https://wisr.com.au

Match the craft: smooth scroll, slow paced reveals, generous whitespace, confident typography, photos that earn their entrance. DO NOT match their commercial vibe. Ours is warm and personal, not corporate.

## Process

1. Read the context first in the other markdown file. Everything about me, Trisha, the dolls, the places, the slang, the music, the letter, all of it is there.
2. Look at the photos folder. Listen to or check the audio file name. Notice the actual material before designing.
3. In plan mode, propose:
   - ONE aesthetic direction (palette, type pairing, motion vocabulary) with rationale tied to the warm, personal feel we want
   - The 3 strongest animation moments you'll commit to (NOT every section gets a wow animation, pick the 3 that earn it)
   - Which photos go where, by filename
   - The exact prose for the first section so I can check the VOICE before you scale
4. Wait for me to approve the plan and the voice sample.
5. Build section by section. After hero, stop and show me. After each section, stop. Never mega-build.
6. After each section, self-check: "If I removed the visual styling, would this read like a person wrote a love letter, or like an AI organized facts about a relationship?" If the latter, rewrite before showing me.

## Hard rules

- No em-dashes or en-dashes in any site copy. Hyphens in compound words only, minimized.
- Do not auto-translate Indonesian, Japanese, or Chinese phrases. They are intentional and Trisha will recognize them. Translating them erases the intimacy.
- Do not include Bible verses.
- No card grids, no glossary blocks, no comparison tables, no feature tiles, no labeled bubbles for personal content.
- Mobile responsive is mandatory and checked per section, not at the end.
- Preserve the closing letter exactly as written in CLAUDE.md.
- If you are about to build a section that would look at home on a SaaS landing page, you have misunderstood the brief. Rewrite as prose.

## One final test

Before you show me any section, read its text aloud in your head. If it sounds like a person who is in love wrote it, ship it. If it sounds like a content management system, rewrite it. The whole site lives or dies by this test.
