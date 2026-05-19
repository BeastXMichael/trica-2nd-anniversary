# Iteration Brief V2: Add Life and Celebration to the Site

## Premise
The current site at https://beastxmichael.github.io/trica-2nd-anniversary/ has great writing and a clean skeleton. The visual feel is too quiet for an anniversary celebration. This brief adds warmth and life on top, without rewriting copy.

## Mobile-first, always
Trisha will read this on her phone in Thailand. Build mobile first, desktop adapts up. Every feature in this brief must work on mobile or it does not ship.

## Aesthetic direction (concrete, not vibes)

**Palette** (use exactly these values, named):
- Cream base: `#FBF5EC`
- Warm gold accent: `#C9A86A`
- Dusty rose accent: `#B57B82`
- Deep wine for emphasis: `#6B2B2F`
- Soft blush wash: `#F2DCDB`

Cream is 60% of the page. Dusty rose and blush wash carry the warmth. Gold is for accents, dividers, signatures. Deep wine only for emphasis (dates, names, the signature).

**Type pairing:**
- Headings: a refined serif (current site uses one, keep it). Italic for personal moments.
- Body: a clean humanist sans
- The closing letter: a handwritten or italic serif, slightly imperfect, warmer than the body

**Visual reference for the hybrid we want:**
- https://www.hematogenix.com
- https://www.graphichunters.com
- Spotify Wrapped recap screens for the color-block treatment and bold pacing

NOT references: wisr.com.au, capsul-in-pro. They are corporate minimalism, opposite direction. Ignore them for this iteration.

## Four priorities, in this order

### 1. Color and decoration layer (the big visual unlock)

**Color work:**
- Add a slow gradient breathing background, oscillating between cream and soft blush wash, 10-second cycle, almost imperceptible
- Section dividers in warm gold, hand-drawn looking, not straight lines
- Add a soft blush color block behind the "what i love about you" section
- Add a deep wine color block behind the "right now" section (to emphasize the distance moment)
- Highlight key phrases ("sayang," "Minchan," dates, "I love you") with a soft underline or subtle background tint in gold

**Decoration:**
- Hand-drawn SVG doodles drifting in the background of select sections only: hero, dolls section, end of letter
- Doodle style: ink-and-pen, loose, imperfect. Tiny hearts, sparkles, abstract loops, small flowers. NOT corporate icons, NOT clip art, NOT emoji-style.
- For SVG sources: search LottieFiles community animations for "hand drawn hearts," "ink sparkles," "doodle loops." Use 3 to 5 distinct doodles total, looping subtly.
- Doodles must NEVER overlap text. They live in margins and negative space.
- On mobile, fewer doodles, smaller scale.

**Failure mode to avoid:** if the doodles start looking like a kid's app or a generic confetti animation, stop. Go back to single-line ink-style only.

### 2. Photo treatment (turn photos into objects)

Every photo on the site, treat consistently:
- Polaroid frame with a small caption space below (white border thicker on bottom)
- Subtle rotation, between 1 and 4 degrees, alternating direction
- A small piece of masking tape or paper-clip detail at one corner, hand-drawn SVG style, gold or rose tint
- Scroll-triggered entrance: photo enters from below with slight lift and tilt-into-place
- On mobile: gentle scale on scroll, no hover effects
- The hero photo can be a fan of 2 to 3 polaroids slightly stacked

This single treatment, applied consistently, will transform the feel more than anything else.

### 3. The letter finale (the emotional peak)

When the user reaches the end of the closing letter, just before or at the signature "Yours, Michael":
- A slow shower of small hearts and gold sparkles drifting upward across the screen, 8 to 12 seconds, then fade
- The signature "Yours, Michael" handwrites itself in (use a handwriting SVG path animation)
- Then the final photo of both of you appears with a soft mask reveal

This is the moment Trisha will remember. Spend craft here.

### 4. One 3D moment (optional, only if 1, 2, 3 are solid)

Skip the "model the actual dolls in Three.js" plan from V1, that will fail.

Instead, build a 3D parallax photo arrangement in the "our kids" section. Take actual photos of each of the four dolls (Michael will supply) and arrange them floating in 3D space at different depths. As the user scrolls or tilts their phone, the photos parallax in 3D. Subtle, warm, achievable.

Alternative if photos of the dolls aren't available: a single floating 3D heart in the hero section, slowly rotating, with the warm gold finish. Simple geometry, achievable with vanilla Three.js or even pure CSS 3D transforms.

If even this proves too risky, cut the 3D moment entirely. The decoration layer and photo treatment will carry the visual lift on their own.

## What to NOT touch

- The copy in any section. The writing works. Do not rewrite anything.
- The page structure (10 sections in current order)
- The closing letter content
- The current font choices

If you find yourself "improving" the copy, stop. That is out of scope.

## What to cut from V1 (decided)

- Audio reactivity to music: too fragile on mobile, low payoff. Skip.
- Custom cursor with heart trail: desktop only, primary user is mobile. Skip.
- Confetti on "tap to begin" intro: weak moment. Replaced by the hearts-at-letter-end moment which is stronger.
- Three.js generated doll geometry: too likely to fail. Replaced by 3D parallax of real doll photos.

## Process (strict)

1. Fix the counter bug. Show me the result.
2. Implement color and decoration layer across the whole site. Send me the live URL. STOP. I'll review.
3. Implement photo treatment across all sections. Send me the live URL. STOP. I'll review.
4. Implement the letter finale (hearts shower, signature handwriting, final photo reveal). Send me the live URL. STOP. I'll review.
5. Only if 1 through 4 are good and time remains: attempt the 3D parallax moment.

Do not bundle multiple steps into one push. I need to see each layer land before adding the next.

## Success criteria (so we know when we're done)

A round of "the site is done" means I can answer yes to all of these:

- Within 2 seconds of landing on the hero, the page feels warm and celebratory, not quiet.
- The days counter is correct and animated.
- Every photo feels like an object I could pick up.
- The decoration layer is present in margins of the right sections, never blocking text, never feeling like clip art.
- The closing letter feels handwritten and slow, and the ending lands emotionally.
- The site loads in under 4 seconds on mid-range mobile, holds 30fps in animation.
- Reading the whole thing on a phone is comfortable and beautiful.

## Hard rules (unchanged)

- No catalog sections, no glossary blocks, no comparison cards for personal content.
- No em-dashes or en-dashes in any copy.
- Do not auto-translate Indonesian, Japanese, or Chinese phrases.
- Mobile-first, mobile-tested per step, not at the end.
- Do not include Bible verses.
- The letter content is sacred.

## Skills to use

- gsap-skills: scroll-triggered photo entrances, SplitText reveals, signature handwriting, hearts shower
- lottie-animator: any custom SVG-to-Lottie conversion for the doodle layer (only after sourcing SVG doodles)
- frontend-design: re-check the color palette implementation matches the hex values exactly
- LottieFiles community animations (web search): pre-made hand-drawn doodle Lotties to use directly

## Read first

1. CLAUDE.md for full relationship context
2. The current live site at https://beastxmichael.github.io/trica-2nd-anniversary/
3. The three reference URLs in the Aesthetic direction section

Now propose your plan in plan mode before any code. Specifically: which gradient values you'll use, which SVG doodles you've sourced (with URLs), and how you'll handle the photo polaroid treatment across mobile and desktop. Wait for my approval before writing any code.
