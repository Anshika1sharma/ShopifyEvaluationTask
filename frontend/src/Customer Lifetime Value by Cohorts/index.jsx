import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CLVByCohortChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCLVData = async () => {
      try {
        const response = await fetch('http://localhost:3000/clvByCohort');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        const labels = result.map(item => item._id); 
        const averageCLV = result.map(item => item.averageCLV); 

        setData({
          labels,
          datasets: [
            {
              label: 'Average CLV by Cohort',
              data: averageCLV,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching CLV data:', error);
      }
    };

    fetchCLVData();
  }, []);

  return (
    <div className="chart-wrapper">
      <h2 className="chart-heading">Customer Lifetime Value by Cohort</h2>
      <div className="chart-container">
        <Line 
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: {
                    weight: 'bold'
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`; 
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Cohort (Month-Year)',
                  font: {
                    weight: 'bold' 
                  }
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  font: {
                    weight: 'bold' 
                  }
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Average CLV ($)',
                  font: {
                    weight: 'bold' 
                  }
                },
                ticks: {
                  callback: function (value) {
                    return `$${value.toFixed(2)}`; 
                  },
                  font: {
                    weight: 'bold' 
                  }
                }
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .chart-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center; 
        }
        .chart-heading {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .chart-container {
          width: 80%;
          max-width: 800px; 
          height: 400px;
        }
      `}</style>
    </div>
  );
};

export default CLVByCohortChart;