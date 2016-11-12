import angular from 'angular';

import './workspace.less';
import Resizers from './resizer.model';

const getDirection = function (elem) {
  let ret = {};
  ['left', 'right', 'top', 'bottom'].forEach(direction => {
    if (elem.hasAttribute(direction)) {
      ret[direction] = true;
    }
  });

  return ret;
};

export default function workspace ($document, $timeout) {
  return {
    restrict: 'EA',
    templateUrl: './directives/workspace.html',
    scope: {
      imgSrc: '='
    },
    link: (scope, elem) => {
      const canvas = elem.find('canvas')[0];
      const image = elem.find('img')[0];
      let ctx, resizers;

      angular.element(image).on('load', () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx = canvas.getContext('2d');
      });

      scope.startWork = function () {
        if (!ctx) {
          return;
        }

        // init canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        scope.working = true;

        resizers = new Resizers({
          width: canvas.width,
          height: canvas.height
        });
        scope.resizers = resizers.list;

        // ***************************
        // crop handler starts here
        // ***************************
        $document.on('mouseup', resizers.dragEnd.bind(resizers));

        $document.on('mousedown', e => {
          const target = e.target;

          if (target.tagName === 'TD') {
            const match = /^resizer-.+-(\d+)$/.exec(target.getAttribute('id'));
            if (match) {
              scope.$apply(
                () => resizers.dragStart(e, +match[1], getDirection(target))
              );
              e.preventDefault();
            }
          } else if (target.tagName === 'CANVAS') {
            scope.$apply(() => resizers.createResizer(e));
            e.preventDefault();
          }
        });

        $document.on('mousemove', e => {
          try {
            scope.$apply(() => resizers.handleDrag(e));
            e.preventDefault();
          } catch(err) {
          }
        });
      };

      scope.$on('destroy', () => {
        // remove event handler
        angular.element(image).off('load');
        $document.off('mousemove');
        $document.off('mousedown');
        $document.off('mouseup');
      });
    }
  }
};
