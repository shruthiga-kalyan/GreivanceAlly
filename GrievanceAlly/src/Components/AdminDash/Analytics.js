import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const Analytics = () => {
  const pieChartRef = useRef('');
  const pieChartInstance = useRef('');
  const barChartRef = useRef('');
  const barChartInstance = useRef('');
  const [grievanceCounts, setGrievanceCounts] = useState('');
  const [departmentsData, setDepartmentsData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/grievance/countcomplaint`);
        setGrievanceCounts(response.data);
      } catch (error) {
        console.error('Error fetching grievance counts:', error);
      }
      try {
        const response = await axios.get(`http://localhost:5000/grievance/countdepartmentsgriev`);
        setDepartmentsData(response.data);
      } catch (error) {
        console.error('Error fetching departments data:', error);
      }
    };

    fetchData();
  }, []);

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
            data: [
              grievanceCounts.submitted,
              grievanceCounts.inprogress,
              grievanceCounts.rejected,
              grievanceCounts.solved,
            ],
            backgroundColor: [
              'rgba(194, 54, 22, 0.8)', // Dark Red
              'rgba(194, 162, 22, 0.8)', // Dark Yellow
              'rgba(22, 54, 194, 0.8)', // Dark Blue
              'rgba(22, 194, 54, 0.8)', // Dark Green
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

    barChartInstance.current = new Chart(barChartRefCanvas, {
      type: 'bar',
      data: {
        labels: [
          'Agriculture and Farmers Welfare',
          'Chemicals and Petrochemicals',
          'Labour and Employment',
          'Housing and Urban Affairs',
          'Civil Aviation',
        ], // Use the departments fetched from backend
        datasets: [
          {
            data: [departmentsData.agri, departmentsData.che, departmentsData.lab, departmentsData.house, departmentsData.civil], // Replace this data with the actual counts for each department
            backgroundColor: colors,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            hoverBackgroundColor: colors.map(color => `${color}80`), // Slightly transparent for hover effect
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Grievances by Department',
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
              display: false,
            },
            ticks: {
              display: false,
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
          },
        },
        tooltips: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label || '';
              if (label) {
                return label + ': ' + context.formattedValue;
              }
              return 'Number of Grievances: ' + context.formattedValue;
            },
          },
        },
      },
    });

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [grievanceCounts, departmentsData]);

  return (
    <div style={{ margin: '5px auto',padding:'5px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>
    <div style={{ display: 'flex', justifyContent:'space-between',gap:'15rem',marginLeft:'12%'}}>
      <div style={{ width: '600px', height: '400px', margin: '20px', textAlign: 'center' }}>
        <canvas ref={pieChartRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ width: '800px', height: '400px', textAlign: 'center',marginRight:'-10%' }}>
        <canvas ref={barChartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
    </div>
  );
};

export default Analytics;
