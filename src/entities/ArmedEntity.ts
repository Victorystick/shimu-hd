import {Entity} from './Entity';
import {Gun} from '../drawable/Gun';

export interface ArmedEntity {
  gun : Gun;

  equip(gun: Gun);
  draw(ctx);
}
