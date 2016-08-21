/**
 * Strokes the outline of a rectangle centered at `pos` with `size` and `color`.
 * @param {!Context2D} ctx
 * @param {!Vec2} pos
 * @param {!Size} size
 * @param {string} color
 */
export function strokeRect(ctx, pos, size, color) {
  ctx.strokeStyle = String(color);
  ctx.strokeRect(pos.x - size.width/2, pos.y - size.height/2, size.width, size.height);
}
