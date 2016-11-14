const MIN_SIZE = 10;

export default class Resizers {
  constructor(containerSize) {
    if (!containerSize) {
      throw Error('No container size info');
    }
    this.container = containerSize;
    this.list = [];
    this.activeIndex = -1;
    this.prevEventOffset = null;
  }
  createResizer({offsetX, offsetY}) {
    this.list.push({
      x: offsetX,
      y: offsetY,
      width: MIN_SIZE,
      height: MIN_SIZE
    });

    this.prevEventOffset = {
      x: offsetX,
      y: offsetY
    };
  }
  dragStart({clientX, clientY}, index, direction) {
    if (this.list[index].inactive) {
      return;
    }

    this.activeIndex = index;
    this.direction = direction;
    this.prevEventOffset = {
      x: clientX,
      y: clientY
    };
  }
  dragEnd() {
    this.activeIndex = -1;
    this.prevEventOffset = this.direction = null;
  }
  handleDrag({clientX, clientY}) {
    if (this.activeIndex < 0) {
      return false;
    }

    this.list[this.activeIndex] = this.drag(clientX, clientY,
      this.list[this.activeIndex]);
    this.prevEventOffset = {
      x: clientX,
      y: clientY
    };

    return true;
  }
  drag(clientX, clientY, model) {
    const newModel = Object.assign({}, model);

    if (this.direction.left || this.direction.right) {
      const dx = clientX - this.prevEventOffset.x;
      if (this.direction.left) { // move to left
        const newX = model.x + dx;
        const newWidth = model.width - dx;
        // ignore if this event make width or x position out of bound
        if (newX >= 0 && newWidth >= MIN_SIZE) {
          newModel.width = newWidth;
          newModel.x = newX;
        }
      } else { // move to right
        const newWidth = model.width + dx;
        if (newWidth >= MIN_SIZE && newWidth + model.x <= this.container.width) {
          newModel.width = newWidth;
        }
      }
    }

    if (this.direction.top || this.direction.bottom) {
      const dy = clientY - this.prevEventOffset.y;
      if (this.direction.top) {
        const newY = model.y + dy;
        const newHeight = model.height - dy;
        // ignore if this event make width or x position out of bound
        if (newY >= 0 && newHeight >= MIN_SIZE) {
          newModel.height = newHeight;
          newModel.y = newY;
        }
      } else { // bottom
        const newHeight = model.height + dy;
        if (newHeight >= MIN_SIZE && newHeight + model.y <= this.container.height) {
          newModel.height = newHeight;
        }
      }
    }
    return newModel;
  }
  markInactive() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      if (!this.list[i].inactive) {
        this.list[i].inactive = true;
      }
    }
  }
  getInactive() {
    return this.list.filter(item => item.inactive);
  }
}
