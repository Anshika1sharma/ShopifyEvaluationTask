import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SalesByQuarterChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/salesByQuarter');
        const result = await response.json();

        const labels = result.map(item => `Q${item._id.quarter} ${item._id.year}`);
        const salesData = result.map(item => parseFloat(item.totalSales.$numberDecimal));

        setData({
          labels, 
          datasets: [
            {
              label: 'Total Sales Per Quarter',
              data: salesData,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderWidth: 2,
              tension: 0.1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching quarterly sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="chart-page">
      <h2 className="chart-heading">Total Sales Over Time (Quarterly)</h2>
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
                    return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
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
                  text: 'Total Sales'
                },
                ticks: {
                  callback: function (value) {
                    return value.toFixed(2); 
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

export default SalesByQuarterChart;
