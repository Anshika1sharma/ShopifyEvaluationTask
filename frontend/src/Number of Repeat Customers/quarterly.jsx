import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const RepeatCustomersQuarterlyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/repeatCustomersByQuarter');
        
       
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map(item => `Q${item._id.quarter} ${item._id.year}`), 
    datasets: [
      {
        label: 'Repeat Customers Count',
        data: data.map(item => item.repeatCustomers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        tension: 0.1,
      }
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Repeat Customers per Quarter',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Quarter',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Repeat Customers Count',
        },
        beginAtZero: true,
      },
    },
  };

  const styles = {
    heading: {
      textAlign: 'center',
      marginTop: '20px',
    },
    chartContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '400px',
      margin: '0 auto',
    },
  };

  return (
    <div>
      <h2 style={styles.heading}>Number of Repeat Customers per Quarter</h2>
      <div style={styles.chartContainer}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RepeatCustomersQuarterlyChart;