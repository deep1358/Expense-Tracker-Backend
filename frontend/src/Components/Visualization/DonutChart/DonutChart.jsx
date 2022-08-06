import { memo, useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Image, Center, Text, Stack } from '@mantine/core';

const DonutChart = ({ data = [], name }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    setOptions({
      chart: {
        type: 'donut',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                formatter: (val) => {
                  let totalAmount = val.globals.initialSeries.reduce((acc, curr) => acc + curr, 0);
                  return `${totalAmount} Rs`;
                }
              }
            }
          }
        }
      },
      theme: {
        mode: 'dark'
      },
      colors: ['#2880EC', '#f16161', '#20C997', '#9775FA', '#AE3EC9', '#82C91E', '#F76707'],
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
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + ' Rs';
        }
      },
      labels: data?.filter((item) => item['amount'] > 0).map((item) => item[name]) || [],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '8px'
        },
        formatter: function (val) {
          return +val.toFixed(2) + '%';
        }
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + ' Rs';
          }
        }
      },
      responsive: [
        {
          breakpoint: 700,
          options: {
            chart: {
              height: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    });
    setSeries(data?.map((item) => item.amount).filter((item) => item > 0));

    data?.forEach(({ amount }) => {
      if (amount > 0) {
        setIsDataAvailable(true);
      }
    });
  }, [data]);

  if (!isDataAvailable)
    return (
      <Center style={{ height: '250px' }}>
        <Stack>
          <Image width={120} height={120} src="/empty-donut.png" alt="empty-donut" ml={12} />
          <Text>No Data Available</Text>
        </Stack>
      </Center>
    );
  return (
    <Chart
      style={{ marginTop: '10px' }}
      options={options}
      series={series}
      type="donut"
      height={300}
    />
  );
};

export default memo(DonutChart);
