import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

export default function Analytics() {
  const pieChartRef = useRef('');
  const pieChartInstance = useRef('');
  const barChartRef = useRef('');
  const barChartInstance = useRef('');
  const [grievanceCounts, setGrievanceCounts] = useState('');

  const { dept } = useAuth();
  const [departmentname] = useState(dept.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/grievance/deptdetailscount/${departmentname}`);
        setGrievanceCounts(response.data);
      } catch (error) {
        console.error('Error fetching grievance counts:', error);
      }
    };

    fetchData();
  }, [departmentname]);

  useEffect(() => {
    // Pie Chart
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    const pieChartRefCanvas = pieChartRef.current.getContext('2d');

    pieChartInstance.current = new Chart(pieChartRefCanvas, {
      type: 'pie',
      data: {
        labels: ['Submitted', 'In Progress', 'Rejected', 'Solved'],
        datasets: [
          {
            data: [grievanceCounts.submitted, grievanceCounts.inprogress, grievanceCounts.rejected, grievanceCounts.solved],
            backgroundColor: [
              'rgba(194, 54, 22, 0.8)',
              'rgba(194, 162, 22, 0.8)',
              'rgba(22, 54, 194, 0.8)',
              'rgba(22, 194, 54, 0.8)',
            ],
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Grievance Status Distribution',
            font: {
              size: 18,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });

    // Bar Chart
    if (barChartInstance.current) {
      barChartInstance.current.destroy();
    }

    const barChartRefCanvas = barChartRef.current.getContext('2d');

    // Fetch grievance counts by month
    const fetchMonthlyCounts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/grievance/countgrievancesbymonth/${departmentname}`);
        const monthlyCounts = response.data;

        barChartInstance.current = new Chart(barChartRefCanvas, {
          type: 'bar',
          data: {
            labels: Object.keys(monthlyCounts),
            datasets: [
              {
                data: Object.values(monthlyCounts),
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#aqua', '#fuchsia', '#maroon', '#lime', '#yellow', '#teal'],
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Grievances by Month',
                font: {
                  size: 18,
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months',
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Grievances',
                  font: {
                    size: 14,
                  },
                },
                grid: {
                  display: true,
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5, // You can adjust this value to achieve the desired aspect ratio
            tooltips: {
              callbacks: {
                label: function (context) {
                  return 'Number of Grievances: ' + context.formattedValue;
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching monthly grievance counts:', error);
      }
    };

    fetchMonthlyCounts();

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [grievanceCounts]);

  return (
    <div style={{ margin: '5px auto',padding:'5px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>

    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '400px', height: '400px', margin: '20px', textAlign: 'center' }}>
        <canvas ref={pieChartRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ width: '600px', height: '400px', margin: '20px', textAlign: 'center' }}>
        <canvas ref={barChartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
    </div>
  );
}
