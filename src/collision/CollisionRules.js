export class CollisionRules {
  constructor() {
    this.collisions = new Array();
  }

  add(type1, type2, collision_fn) {
    this.collisions.push((e1, e2) => {
      if (e1 instanceof type1 && e2 instanceof type2) {
        return collision_fn(e1, e2);
      }
      return true;
    });
  }

  onCollide(entity1, entity2) {
    for (var fn of this.collisions) {
      if (fn(entity1, entity2)) continue;
      return;
    }
  }
 }
