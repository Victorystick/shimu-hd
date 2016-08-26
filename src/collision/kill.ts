export function theFormer(game, former, latter) {
	former.kill();
}

export function theLatter(game, former, latter) {
	latter.kill();
}

export function both(game, former, latter) {
	former.kill();
	latter.kill();
}
