
export class Keyboard {
  constructor(element) {
    this.element = element;

    this.keyMap = {};

    this.element.addEventListener('keydown', this);
    this.element.addEventListener('keyup', this);
  }

  handleEvent(event) {
    this.keyMap[ event.key ] = event.type === 'keydown';
  }
}
