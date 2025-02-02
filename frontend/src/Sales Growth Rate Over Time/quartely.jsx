import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const QuarterlySalesGrowthChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await fetch('http://localhost:3000/quarterlySalesGrowthRate');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        const labels = result.map(item => `Q${item.quarter} ${item.year}`);
        const growthRates = result.map(item => parseFloat(item.growthRate['$numberDecimal'])); 

        setData({
          labels,
          datasets: [
            {
              label: 'Quarterly Sales Growth Rate (%)',
              data: growthRates,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };

    fetchGrowthData();
  }, []);

  return (
    <div className="chart-page">
      <h2 className="chart-heading">Quarterly Sales Growth Rate</h2>
      <div className="chart-container">
        <Line 
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
                  }
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Quarter'
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 8
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Growth Rate (%)'
                },
                ticks: {
                  callback: function (value) {
                    return value.toFixed(2) + '%'; 
                  }
                }
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        
        .chart-heading {
          text-align: center;
          margin-bottom: 20px; 
        }

        .chart-container {
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: center; 
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default QuarterlySalesGrowthChart;