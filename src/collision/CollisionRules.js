export class CollisionRules {
  constructor() {
    this.collisions = new Array();
  }

  add(type1, type2, collision_fn) {
    this.collisions.push((game, e1, e2) => {
      if (e1 instanceof type1 && e2 instanceof type2) {
        return collision_fn(game, e1, e2);
      }
      return true;
    });
  }

  onCollide(game, entity1, entity2) {
    for (const fn of this.collisions) {
      if (fn(game, entity1, entity2)) continue;
      return;
    }
  }
 }