import './styles/index.less';
import { createRef, useLayoutEffect, useMemo, useState } from 'react';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import classNames from 'classnames';
import { PlusOutlined } from '@ant-design/icons';
import { Tasks } from './components';

moment.locale('zh-cn');

const LOCALES = {
  'zh-cn': {
    task_number: '编号',
    task_name: '工程项目',
    years: '年月',
    days: '天数',
    week: '星期',
    date: '日期',
    format: 'YYYY年MM月',
  },
  'zh-hk': {
    task_number: '編號',
    task_name: '工程項目',
    years: '年月',
    days: '天數',
    week: '星期',
    date: '日期',
    format: 'YYYY年MM月',
  },
  'zh-tw': {
    task_number: '編號',
    task_name: '工程項目',
    years: '年月',
    days: '天數',
    week: '星期',
    date: '日期',
    format: 'YYYY年MM月',
  },
  en: {
    task_number: 'Number',
    task_name: 'Project',
    years: 'years',
    days: 'Days',
    week: 'Week',
    date: 'Date',
    format: 'MM/YYYY',
  },
};
let language: 'en' = 'en';
if (Object.keys(LOCALES).includes(moment.locale())) {
  language = moment.locale() as any;
}
const LOCALE = LOCALES[language];
const IS_FIREFOX = /Firefox/i.test(navigator.userAgent);
const EVENT_NAME = IS_FIREFOX ? 'DOMMouseScroll' : 'mousewheel';

export function GanttChart(props: GanttChartProps) {
  const { columnSize = 100, lineSize = 30, overflow = 10, value = [] } = props;
  const params = useMemo(() => {
    return {
      line: lineSize * overflow,
      column: columnSize * overflow,
      monthColumn: 31 * 2 * columnSize,
    };
  }, [columnSize, lineSize, overflow]);
  const { start, end } = useMemo(() => {
    return value.reduce(
      (a, b) => {
        let { start, end } = a;
        if (b.start) {
          const _moment = moment(b.start);
          if (_moment.isBefore(start)) {
            start = _moment;
          }
        }
        if (b.end) {
          const _moment = moment(b.end);
          if (_moment.isAfter(end)) {
            end = _moment;
          }
        }
        return { start, end };
      },
      { start: moment(), end: moment().add(1, 'month') }
    );
  }, [value]);
  const days = useMemo(() => {
    const diff = end.diff(start, 'days');
    const list: number[] = [];
    const l = end.diff(start, 'month') > 1 ? diff : 30;
    for (let i = 0; i < l; i++) {
      list.push(i);
    }
    return list;
  }, [start, end]);
  const bodySider = createRef<HTMLDivElement>();
  const bodyMain = createRef<HTMLDivElement>();
  const headMain = createRef<HTMLDivElement>();
  const [pos, setPos] = useState<
    undefined | { x: number; y: number; h: number; w: number }
  >(undefined);

  useLayoutEffect(() => {
    const sider = bodySider.current;
    const main = bodyMain.current;
    const _headMain = headMain.current;
    if (sider && main && _headMain) {
      const onMouseWheel = (e: Event) => {
        if (e instanceof WheelEvent) {
          let v = main.scrollTop + e.deltaY;
          if (v < 0) {
            v = 0;
          }
          main.scrollTop = v;
        } else if (e) {
          //@ts-ignore
          if (e.axis === 2) {
            //@ts-ignore
            let v = main.scrollTop + (e.detail / 3) * 12;
            if (v < 0) {
              v = 0;
            }
            main.scrollTop = v;
          }
        }
      };
      const onScroll = (e: Event) => {
        if (e.target instanceof HTMLDivElement) {
          sider.style.transform = `translateY(${-main.scrollTop}px)`;
          _headMain.style.transform = `translateX(${-main.scrollLeft}px)`;
          setPos({
            x: -main.scrollLeft,
            y: -main.scrollTop,
            h: main.clientHeight,
            w: main.clientWidth,
          });
        }
      };
      const onResize = () => {
        setPos({
          x: -main.scrollLeft,
          y: -main.scrollTop,
          w: main.clientWidth,
          h: main.clientHeight,
        });
      };
      main.addEventListener('scroll', onScroll);
      sider.addEventListener(EVENT_NAME, onMouseWheel, false);
      window.addEventListener('resize', onResize);
      return () => {
        sider.removeEventListener(EVENT_NAME, onMouseWheel);
        main.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }
  }, [bodyMain, bodySider, headMain]);
  useLayoutEffect(() => {
    const sider = bodySider.current;
    const main = bodyMain.current;
    const _headMain = headMain.current;
    if (!pos && main && sider && _headMain) {
      _headMain.style.transform = `translateX(${-main.scrollLeft}px)`;
      sider.style.transform = `translateY(${-main.scrollTop}px)`;
      setPos({
        x: -main.scrollLeft,
        y: -main.scrollTop,
        h: main.clientHeight,
        w: main.clientWidth,
      });
    }
  }, [bodyMain, bodySider, headMain, pos]);

  return (
    <div className="gantt-chart">
      <div className="gantt-chart-head">
        <div className="gantt-chart-head-sider">
          <div className="gantt-chart-head-row">
            <b>{LOCALE.years}</b>
          </div>
          <Row>
            <Col span={4}>
              <div className="gantt-chart-head-row" />
              <div className="gantt-chart-head-row" />
              <div className="gantt-chart-head-row">
                <b>{LOCALE.task_number}</b>
              </div>
            </Col>
            <Col span={16}>
              <div className="gantt-chart-head-row" />
              <div className="gantt-chart-head-row" />
              <div className="gantt-chart-head-row">
                <b>{LOCALE.task_name}</b>
              </div>
            </Col>
            <Col span={4}>
              <div className="gantt-chart-head-row">
                <b>{LOCALE.days}</b>
              </div>
              <div className="gantt-chart-head-row">
                <b>{LOCALE.date}</b>
              </div>
              <div className="gantt-chart-head-row">
                <b>{LOCALE.week}</b>
              </div>
            </Col>
          </Row>
        </div>
        <div className="gantt-chart-head-main" ref={headMain}>
          <div className="gantt-chart-head-main-row">
            {days
              .map((x) => start.clone().add(x, 'days').format(LOCALE.format))
              .reduce(
                (
                  a: Array<{ value: string; count: number; index: number }>,
                  b,
                  index
                ) => {
                  const find = a.find((o) => o.value === b);
                  if (!find) {
                    a.push({
                      value: b,
                      count: 1,
                      index,
                    });
                  } else {
                    find.count = find.count + 1;
                  }
                  return a;
                },
                []
              )
              .map(({ count, index, value }) => {
                const left = index * columnSize;
                if (pos) {
                  const x = Math.abs(pos.x);
                  // 渲染前后2个月
                  if (
                    left > x - params.monthColumn &&
                    left < x + pos.w + params.monthColumn
                  ) {
                    return (
                      <div
                        key={value}
                        className={classNames('col', 'gantt-chart-head-row')}
                        style={{ width: count * columnSize, left }}
                      >
                        <b>{value}</b>
                      </div>
                    );
                  }
                }
                return null;
              })}
          </div>
          <div className="gantt-chart-head-main-row">
            {days.map((value) => {
              const curr = start.clone().add(value, 'days');
              const day = curr.get('day');
              const isWeekend = day === 0 || day === 6;
              if (pos) {
                const left = value * columnSize;
                const x = Math.abs(pos.x);
                // 渲染前后10天
                if (
                  left > x - params.column &&
                  left < x + pos.w + params.column
                ) {
                  return (
                    <div
                      className={classNames('col', isWeekend && 'background')}
                      style={{
                        width: columnSize,
                        top: lineSize,
                        left,
                      }}
                      key={value}
                    >
                      <div className="gantt-chart-head-row">{value + 1}</div>
                      <div className="gantt-chart-head-row">
                        {curr.format('DD')}
                      </div>
                      <div className="gantt-chart-head-row">
                        {curr.format('dd')}
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>
      </div>
      <div className="gantt-chart-body">
        <div className="gantt-chart-body-sider" ref={bodySider}>
          {value.map((x, i) => {
            const top = i * lineSize;
            const number = x.number || i + 1;
            const key = x.id || number;
            if (pos) {
              const y = Math.abs(pos.y);
              if (top > y - params.line && top < y + pos.h + params.line) {
                return (
                  <Row
                    key={key}
                    className="gantt-chart-body-row"
                    style={{
                      top,
                    }}
                  >
                    <Col span={4}>{number}</Col>
                    <Col
                      span={16}
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={x.name}
                    >
                      {x.name}
                    </Col>
                    <Col span={4}>
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                      />
                    </Col>
                  </Row>
                );
              }
            }
            return null;
          })}
        </div>
        <div className="gantt-chart-body-main" ref={bodyMain}>
          <div
            className="gantt-chart-body-main-layout"
            style={{
              height: value.length * lineSize,
              width: days.length * columnSize,
            }}
          >
            {value.map((x, i) => {
              const top = i * lineSize;
              const number = x.number || i + 1;
              const key = x.id || number;
              if (pos) {
                const y = Math.abs(pos.y);
                if (top > y - params.line && top < y + pos.h + params.line) {
                  return (
                    <div
                      key={key}
                      className="gantt-chart-body-row"
                      style={{
                        width: columnSize * days.length,
                        top,
                      }}
                    >
                      <Tasks
                        {...x}
                        taskStart={x.start}
                        taskEnd={x.end}
                        step={columnSize}
                        start={start}
                        height={Math.ceil(lineSize * 0.7)}
                        subTasks={
                          Array.isArray(x.subTasks)
                            ? x.subTasks.map((o) => ({
                                ...o,
                                taskStart: o.start,
                                taskEnd: o.end,
                                start,
                              }))
                            : undefined
                        }
                      />
                    </div>
                  );
                }
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface GanttChartData {
  id?: number;
  number?: number;
  name?: string;
  start?: string;
  end?: string;
  subTasks?: GanttChartData[];
}

export interface GanttChartProps {
  /**
   * 列宽
   */
  columnSize?: number;
  /**
   * 行高
   */
  lineSize?: number;
  /**
   * 虚拟滚动的预渲染数量
   * 滚动容器看不见的前面和后面预渲染数量。避免出现白屏，但是也不能渲染过多引起性能问题
   */
  overflow?: number;

  value?: GanttChartData[];

  onChange?: (value: GanttChartData[]) => void;
}
