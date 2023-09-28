import * as echarts from 'echarts';

export const trendChart = (domId: string, data: any[]) => {
  const chartDom = document.getElementById(domId);
  if (!chartDom) return;
  const myChart = echarts.init(chartDom, null, { renderer: 'svg' });
  if (!myChart) return;
  const option = {
    grid: {
      top: "10%",
      bottom: "10%",
      right: "0%",
      left: "0%"
    },
    xAxis: {
      show: false,
      data: data.map(function (item, index) {
        return index;
      })
    },
    yAxis: {
      show: false
    },
    series: {
      type: "line",
      data: data,
      lineStyle: {
        color: "#0474FF",
        width: 2
      },
      label: {
        show: false,
        position: "insideBottom"
      },
      silent: true,
      smooth: true,
      showSymbol: false
    }
  };
  
  option && myChart.setOption(option);
  return myChart;
} 
