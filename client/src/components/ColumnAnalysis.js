import { useState, useEffect } from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Select from "react-select";

// Chart.js setup
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const ColumnAnalysis = () => {
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('project_area_(sqmts)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const columnOptions = [
    { value: 'project_area_(sqmts)', label: 'Project Area (sqm)' },
    { value: 'sanctioned_fsi', label: 'Sanctioned FSI' },
    { value: 'recreational_open_space', label: 'Recreational Open Space' },
    // Add more columns as needed
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5001/overall-analysis`, {
        params: { column: selectedColumn },
      });

      setData(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedColumn]);

  const chartData = {
    labels: data.map(item => item.district),
    datasets: [
      {
        label: selectedColumn.replace(/_/g, ' '),
        data: data.map(item => item[selectedColumn]),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `District Analysis - ${selectedColumn.replace(/_/g, ' ')}`,
      },
    },
  };

  const renderChart = (type) => {
    switch (type) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={chartOptions} />;
      case 'pie':
      default:
        return <Pie data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="column-analysis">
      <h3>District Analysis - {selectedColumn.replace(/_/g, ' ')}</h3>

      <div>
        <Select
          options={columnOptions}
          value={columnOptions.find(option => option.value === selectedColumn)}
          onChange={option => setSelectedColumn(option.value)}
        />
      </div>

      <div className="charts-container">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        {data.length > 0 ? (
          <>
            <div className="first-row">
              <div className="chart-card">{renderChart('pie')}</div>
              <div className="chart-card">{renderChart('line')}</div>
              <div className="chart-card">{renderChart('doughnut')}</div>
            </div>

            <div className="second-row">
              <div className="chart-card">{renderChart('bar')}</div>
            </div>
          </>
        ) : (
          <div>No data to display</div>
        )}
      </div>
    </div>
  );
};

export default ColumnAnalysis;
