export interface ShareCard {
  title: string
  rows: { label: string; value: string }[]
  /** Big number with its caption, e.g. what the budget could grow to. */
  highlight: { value: string; caption: string }
  progress: string
  cta: string
  url: string
  disclaimer: string
}

export function shareText(card: ShareCard): string {
  return [
    `🌱 ${card.title}`,
    ...card.rows.map((r) => `• ${r.label}: ${r.value}`),
    `• ${card.highlight.caption}`,
    `• ${card.progress}`,
    '',
    `${card.cta} ${card.url}`,
    `(${card.disclaimer})`,
  ].join('\n')
}

/** Wraps text to at most `max` lines, ending with "…" if anything was cut. */
function clampLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, max: number): string[] {
  const lines = wrap(ctx, text, maxWidth)
  if (lines.length <= max) return lines
  const kept = lines.slice(0, max)
  let last = kept[max - 1]
  while (last && ctx.measureText(`${last}…`).width > maxWidth) last = last.split(' ').slice(0, -1).join(' ')
  kept[max - 1] = `${last.replace(/[\s,·(]+$/, '')}…`
  return kept
}

/** Splits text into lines that fit `maxWidth` on the canvas. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

const W = 1080
const H = 1350
const PAD = 80
const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'

/** Draws the card as a portrait image (good for phone sharing). Always light theme for readability. */
export function drawShareCard(canvas: HTMLCanvasElement, card: ShareCard) {
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#f7f6f2'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#1f7a5a'
  ctx.fillRect(0, 0, W, 24)

  let y = PAD + 40
  ctx.fillStyle = '#1f7a5a'
  ctx.font = `700 40px ${FONT}`
  ctx.fillText('Invest-Assist', PAD, y)
  y += 70
  ctx.fillStyle = '#1d2321'
  ctx.font = `800 60px ${FONT}`
  for (const l of wrap(ctx, card.title, W - 2 * PAD)) {
    ctx.fillText(l, PAD, y)
    y += 70
  }

  y += 20
  for (const r of card.rows) {
    ctx.fillStyle = '#5d6763'
    ctx.font = `500 30px ${FONT}`
    ctx.fillText(r.label, PAD, y)
    y += 44
    ctx.fillStyle = '#1d2321'
    ctx.font = `600 38px ${FONT}`
    for (const l of clampLines(ctx, r.value, W - 2 * PAD, 2)) {
      ctx.fillText(l, PAD, y)
      y += 48
    }
    y += 22
  }

  // Highlight box
  const boxTop = y
  ctx.fillStyle = '#e3f2ec'
  ctx.fillRect(PAD - 20, boxTop, W - 2 * PAD + 40, 230)
  y = boxTop + 95
  ctx.fillStyle = '#1f7a5a'
  ctx.font = `800 76px ${FONT}`
  ctx.fillText(card.highlight.value, PAD, y)
  y += 56
  ctx.fillStyle = '#1d2321'
  ctx.font = `500 30px ${FONT}`
  for (const l of clampLines(ctx, card.highlight.caption, W - 2 * PAD, 2)) {
    ctx.fillText(l, PAD, y)
    y += 40
  }

  // Footer, pinned to the bottom and below the highlight box.
  y = Math.max(y + 60, H - PAD - 170)
  ctx.fillStyle = '#1d2321'
  ctx.font = `600 32px ${FONT}`
  ctx.fillText(card.progress, PAD, y)
  ctx.fillStyle = '#1f7a5a'
  ctx.font = `600 30px ${FONT}`
  ctx.fillText(card.cta, PAD, y + 52)
  ctx.fillText(card.url.replace(/^https?:\/\//, ''), PAD, y + 94)
  ctx.fillStyle = '#5d6763'
  ctx.font = `400 24px ${FONT}`
  ctx.fillText(card.disclaimer, PAD, y + 140)
}

export function cardBlob(card: ShareCard): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  drawShareCard(canvas, card)
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}
