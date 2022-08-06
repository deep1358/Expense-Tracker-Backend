import { memo, useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Image, Center, Text, Stack } from '@mantine/core';

const BarOrAreaChart = ({ data = [], name, chartType = 'bar' }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    setOptions({
      plotOptions: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        bar: {
          borderRadius: 10,
          columnWidth: '70%',
          dataLabels: {
            position: 'top' // top, center, bottom
          },
          distributed: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + ' Rs';
        },
        offsetY: -20,
        style: {
          fontSize: '12px'
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: data?.map((item) => item[name]) || [],
        position: 'bottom',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false
        }
      },
      stroke: {
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.2,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [20, 60, 80, 100]
        }
      },
      grid: {
        borderColor: '#5C5F66'
      },
      theme: {
        mode: 'dark'
      },
      colors: ['#4263EB', '#f16161', '#20C997', '#9775FA', '#AE3EC9', '#82C91E', '#F76707'],
      tooltip: {
        y: {
          formatter: function (value) {
            return value + ' Rs';
          }
        }
      }
    });
    setSeries([
      {
        name: 'Expense',
        data: data?.map((item) => item.amount)
      }
    ]);

    data?.forEach(({ amount }) => {
      if (amount > 0) {
        setIsDataAvailable(true);
      }
    });
  }, [data]);

  if (!isDataAvailable)
    return (
      <Center style={{ height: '280px' }}>
        <Stack>
          <Image width={120} height={120} src="/empty-bar.png" alt="empty-bar" ml={12} />
          <Text>No Data Available</Text>
        </Stack>
      </Center>
    );
  return (
    <Chart
      style={{ marginTop: '10px' }}
      options={options}
      series={series}
      type={chartType}
      height={chartType === 'bar' ? '250px' : '320px'}
    />
  );
};

export default memo(BarOrAreaChart);
