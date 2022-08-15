import { GanttChart, GanttChartData } from 'src/components';
import { useState } from 'react';
import moment from 'moment';

export default () => {
  const [list, setList] = useState<GanttChartData[]>([
    {
      id: 1,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '外墙拆除',
    },
    {
      id: 2,
      start: moment().add(10, 'days').format(),
      end: moment().add(14, 'days').format(),
      name: '办理手续、放线',
    },
    {
      id: 3,
      start: moment().add(10, 'days').format(),
      end: moment().add(14, 'days').format(),
      name: '施工围挡、砌毛坯墙',
    },
    {
      id: 88,
      start: moment().add(10, 'days').format(),
      end: moment().add(14, 'days').format(),
      name: '施工围挡',
    },
    {
      id: 89,
      start: moment().add(10, 'days').format(),
      end: moment().add(14, 'days').format(),
      name: '砌毛坯墙',
    },
    {
      id: 4,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '餐厅整体防水',
    },
    {
      id: 5,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '厨房地砖施工含脚线收口',
    },
    {
      id: 6,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '外立面施工',
    },
    {
      id: 7,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '室外空调安装机組',
    },
    {
      id: 8,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '室内空调机、送风管道安装',
    },
    {
      id: 9,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '线槽安装、布线',
    },
    {
      id: 10,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '大厅墙体毛坯施工',
    },
    {
      id: 11,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '大厅地砖铺设',
    },
    {
      id: 12,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '给排水管道接驳',
    },
    {
      id: 13,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '矿棉板天花龙骨',
    },
    {
      id: 14,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '消防喷淋改造',
    },
    {
      id: 15,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '电柜安装',
    },
    {
      id: 16,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '灯具安装',
    },
    {
      id: 17,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '冻库进场时间',
    },
    {
      id: 18,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '设备安装、调试',
    },
    {
      id: 19,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '音响、监控安装',
    },
    {
      id: 20,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '家私安装',
    },
    {
      id: 21,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '招牌安装',
    },
    {
      id: 22,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: 'POS安装、调试',
    },
    {
      id: 23,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '食药局、消防检查时间',
    },
    {
      id: 24,
      start: moment().format(),
      end: moment().add(4, 'days').format(),
      name: '保洁',
    },
    {
      id: 25,
      start: moment().add(13, 'days').format(),
      end: moment().add(113, 'days').format(),
      name: '完工交店铺',
    },
  ]);
  return (
    <div>
      <div
        style={{
          height: 600,
        }}
      >
        <GanttChart
          columnSize={70}
          value={list}
          onChange={(value) => setList(value)}
        />
      </div>
    </div>
  );
};
