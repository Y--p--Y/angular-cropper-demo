const MIN_SIZE = 10;

export default class Resizers {
  constructor(containerSize) {
    //TODO: check if container size is null
    this.container = containerSize;
    this.list = [];
    this.activeIndex = -1;
    this.prevEventOffset = null;
  }
  createResizer ({offsetX, offsetY}) {
    this.list.push({
      x: offsetX,
      y: offsetY,
      width: MIN_SIZE,
      height: MIN_SIZE,
      id: +new Date()
    });

    this.prevEventOffset = {
      x: offsetX,
      y: offsetY
    };
  }
  dragStart ({clientX, clientY}, id, direction) {
    this.activeIndex = this.list.findIndex(
      item => item.id === id
    );

    this.direction = direction;
    this.prevEventOffset = {
      x: clientX,
      y: clientY
    };
  }
  dragEnd () {
    this.activeIndex = -1;
    this.prevEventOffset = this.direction = null;
  }
  handleDrag ({clientX, clientY}) {
    if (this.activeIndex < 0) {
      throw new Error('Nothing to drag');
    }

    this.list[this.activeIndex] = this.drag(clientX, clientY,
      this.list[this.activeIndex]);
    this.prevEventOffset = {
      x: clientX,
      y: clientY
    };
  }
  drag(clientX, clientY, model) {
    const newModel = Object.assign({}, model);

    if (this.direction.left || this.direction.right) {
      let dx = clientX - this.prevEventOffset.x;
      if (this.direction.left) { // move to left
        let newX = model.x + dx;
        let newWidth = model.width - dx;
        // ignore if this event make width or x position out of bound
        if (newX >= 0 && newWidth >= MIN_SIZE) {
          newModel.width = newWidth;
          newModel.x = newX;
        }
      } else { // move to right
        let newWidth = model.width + dx;
        if (newWidth >= MIN_SIZE && newWidth + model.x <= this.container.width) {
          newModel.width = newWidth;
        }
      }
    }

    if (this.direction.top || this.direction.bottom) {
      let dy = clientY - this.prevEventOffset.y;
      if (this.direction.top) {
        let newY = model.y + dy;
        let newHeight = model.height - dy;
        // ignore if this event make width or x position out of bound
        if (newY >= 0 && newHeight >= MIN_SIZE) {
          newModel.height = newHeight;
          newModel.y = newY;
        }
      } else { // bottom
        let newHeight = model.height + dy;
        if (newHeight >= MIN_SIZE && newHeight + model.y <= this.container.height) {
          newModel.height = newHeight;
        }
      }
    }
    return newModel;
  }
}
