import moment from 'moment';
import { createRef, Key, useLayoutEffect, useMemo, useRef } from 'react';
import './styles/index.less';

export function Task(props: TaskProps) {
  const { step = 100, height = 26, start, taskStart, taskEnd } = props;

  const length = useMemo(
    () => moment(taskEnd).diff(moment(taskStart), 'days'),
    [taskEnd, taskStart]
  );

  const left = useMemo(() => {
    return moment(taskStart).diff(start, 'days') * step;
  }, [start, step, taskStart]);

  const taskRef = createRef<HTMLDivElement>();
  const leftBarRef = createRef<HTMLDivElement>();
  const rightBarRef = createRef<HTMLDivElement>();

  const isDragMove = useRef(false);
  const isLeftDragMove = useRef(false);
  const isRightDragMove = useRef(false);

  useLayoutEffect(() => {
    const { current } = taskRef;
    if (current) {
      let offsetLeft = 0;
      let startX: number = 0;
      const onMousemove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        current.style.left = offsetLeft + diff + 'px';
      };
      const onMousedown = (e: MouseEvent) => {
        if (e.button !== 0) {
          return;
        }
        startX = e.clientX;
        offsetLeft = current.offsetLeft;
        isDragMove.current = true;
        document.addEventListener('mousemove', onMousemove);
        document.body.style.cursor = 'move';
      };
      const onMouseup = (e: MouseEvent) => {
        document.removeEventListener('mousemove', onMousemove);
        if (e.button !== 0) {
          return;
        }
        if (isDragMove.current) {
          isDragMove.current = false;
          const diff = e.clientX - startX;
          const remainder = diff % step;
          let days = 0;
          if (Math.round(remainder / 100)) {
            days = Math.ceil(diff / step);
          } else {
            days = Math.floor(diff / step);
          }
          current.style.left = offsetLeft + days * step + 'px';
          document.body.style.cursor = '';
        }
      };
      current.addEventListener('mousedown', onMousedown);
      document.addEventListener('mouseup', onMouseup);

      return () => {
        current.removeEventListener('mousedown', onMousedown);
        document.removeEventListener('mouseup', onMouseup);
      };
    }
  }, [step, taskRef]);

  useLayoutEffect(() => {
    const leftBar = leftBarRef.current;
    const taskBar = taskRef.current;
    if (leftBar && taskBar) {
      let offsetLeft = 0;
      let clientWidth = 0;
      let startX: number = 0;
      const onMousemove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        let currWidth = clientWidth - diff;
        if (currWidth < step) {
          currWidth = step;
          taskBar.style.left = offsetLeft + clientWidth - currWidth + 'px';
          document.body.style.cursor = 'not-allowed';
        } else {
          taskBar.style.left = offsetLeft + diff + 'px';
        }
        taskBar.style.width = currWidth + 'px';
      };
      const onMousedown = (e: MouseEvent) => {
        if (e.button !== 0) {
          return;
        }
        e.stopPropagation();
        startX = e.clientX;
        offsetLeft = taskBar.offsetLeft;
        clientWidth = taskBar.clientWidth;
        isLeftDragMove.current = true;
        document.body.style.cursor = 'pointer';
        document.addEventListener('mousemove', onMousemove);
      };
      const onMouseup = (e: MouseEvent) => {
        document.removeEventListener('mousemove', onMousemove);
        if (e.button !== 0 || !isLeftDragMove.current) {
          return;
        }
        isLeftDragMove.current = false;

        let diff = e.clientX - startX;
        const remainder = diff % step;

        if (Math.round(remainder / 100)) {
          diff = Math.ceil(diff / step) * step;
        } else {
          diff = Math.floor(diff / step) * step;
        }

        let currWidth = clientWidth - diff;

        if (currWidth < step) {
          currWidth = step;
          taskBar.style.left = offsetLeft + clientWidth - currWidth + 'px';
          document.body.style.cursor = 'not-allowed';
        } else {
          taskBar.style.left = offsetLeft + diff + 'px';
        }
        taskBar.style.width = currWidth + 'px';

        document.body.style.cursor = '';
      };
      leftBar.addEventListener('mousedown', onMousedown);
      document.addEventListener('mouseup', onMouseup);

      return () => {
        leftBar.removeEventListener('mousedown', onMousedown);
        document.removeEventListener('mouseup', onMouseup);
      };
    }
  }, [leftBarRef, step, taskRef]);

  useLayoutEffect(() => {
    const rightBar = rightBarRef.current;
    const taskBar = taskRef.current;
    if (rightBar && taskBar) {
      let clientWidth = 0;
      let startX: number = 0;
      const onMousemove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        let currWidth = clientWidth + diff;
        taskBar.style.width = currWidth + 'px';
      };
      const onMousedown = (e: MouseEvent) => {
        if (e.button !== 0) {
          return;
        }
        e.stopPropagation();
        startX = e.clientX;
        clientWidth = taskBar.clientWidth;
        isRightDragMove.current = true;
        document.body.style.cursor = 'pointer';
        document.addEventListener('mousemove', onMousemove);
      };
      const onMouseup = (e: MouseEvent) => {
        document.removeEventListener('mousemove', onMousemove);
        if (e.button !== 0 || !isRightDragMove.current) {
          return;
        }

        isRightDragMove.current = false;
        const diff = e.clientX - startX;
        let currWidth = clientWidth + diff;
        const percent = (currWidth % step) / 100;
        if (Math.round(percent)) {
          currWidth = Math.ceil(currWidth / step) * step;
        } else {
          currWidth = Math.floor(currWidth / step) * step;
        }
        taskBar.style.width = currWidth + 'px';
        document.body.style.cursor = '';
      };
      rightBar.addEventListener('mousedown', onMousedown);
      document.addEventListener('mouseup', onMouseup);

      return () => {
        rightBar.removeEventListener('mousedown', onMousedown);
        document.removeEventListener('mouseup', onMouseup);
      };
    }
  }, [rightBarRef, step, taskRef]);

  return (
    <div
      className="gantt-chart-task"
      ref={taskRef}
      style={{
        left,
        height,
        borderRadius: height / 2,
        width: length * step,
      }}
    >
      <div
        ref={leftBarRef}
        style={{
          width: height - 2,
          height: height - 2,
          border: '1px solid #ddd',
          left: -(height * 0.3),
          top: 1,
        }}
        className="gantt-chart-task-drop"
      />
      <div
        style={{
          top: 1,
          width: height - 2,
          height: height - 2,
          right: -(height * 0.3),
          border: '1px solid #ddd',
        }}
        ref={rightBarRef}
        className="gantt-chart-task-drop"
      />
    </div>
  );
}

export interface TaskProps {
  taskStart?: string;
  taskEnd?: string;
  start?: moment.Moment;
  min?: string;
  max?: string;
  id?: Key;
  name?: string;
  step?: number;
  height?: number;
}
