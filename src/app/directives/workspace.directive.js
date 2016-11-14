import angular from 'angular';

import './workspace.less';
import Resizers from './resizers.model';

const getDirection = function (elem) {
  const ret = {};
  ['left', 'right', 'top', 'bottom'].forEach(direction => {
    ret[direction] = elem.hasAttribute(direction);
  });

  return ret;
};

export default ['$document', function workspace($document) {
  return {
    restrict: 'EA',
    template: require('./workspace.html'),
    scope: {
      imageSrc: '='
    },
    link: (scope, elem) => {
      const canvas = elem.find('canvas')[0];
      const image = elem.find('img')[0];
      let ctx;
      let resizers;
      let initialized;
      scope.resizers = {
        list: []
      };

      angular.element(image).on('load', () => {
        // init canvas
        canvas.width = image.width;
        canvas.height = image.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // init resizers
        scope.resizers = resizers = new Resizers({
          width: canvas.width,
          height: canvas.height
        });
        scope.canvasReady = true;
      });

      scope.startWork = () => {
        if (!scope.canvasReady) { // wait until canvas is ready
          return;
        }

        scope.working = true;

        if (initialized) {
          return;
        }

        // ***************************
        // crop handler starts here
        // ***************************
        $document.on('mouseup', scope.resizers.dragEnd.bind(scope.resizers));

        $document.on('mousedown', e => {
          const target = e.target;

          if (target.tagName === 'TD') {
            const match = /^resizer-.+-(\d+)$/.exec(target.getAttribute('id'));
            if (match) {
              scope.$apply(
                () => resizers.dragStart(e, Number(match[1]), getDirection(target))
              );
              e.preventDefault();
            }
          } else if (target.tagName === 'CANVAS') {
            scope.$apply(() => resizers.createResizer(e));
            e.preventDefault();
          }
        });

        $document.on('mousemove', e => {
          if (resizers.activeIndex >= 0) {
            scope.$apply(() => resizers.handleDrag(e));
            e.preventDefault();
          }
        });

        initialized = true;
      };

      scope.$on('destroy', () => {
        // remove event handler
        angular.element(image).off('load');
        $document.off('mousemove');
        $document.off('mousedown');
        $document.off('mouseup');
      });

      scope.finishWork = () => {
        // mark all resizers as 'inactive'
        scope.resizers.markInactive();

        scope.working = false;
        scope.done = true;
        scope.inactives = scope.resizers.getInactive();
      };

      // convert canvas to image
      scope.dataSrc = resizer => {
        const c = angular.element('<canvas></canvas>')[0];
        c.width = resizer.width;
        c.height = resizer.height;
        c.getContext('2d').drawImage(image, resizer.x, resizer.y, resizer.width,
          resizer.height, 0, 0, resizer.width, resizer.height);
        return c.toDataURL('image/png');
      };
    }
  };
}];
