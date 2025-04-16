// src/components/ui/home/PropertyPriceTrend.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const propertyPriceData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Property Price Trend',
      data: [1200, 1300, 1250, 1350, 1400],
      borderColor: '#00c8e0',
      backgroundColor: 'rgba(0, 200, 224, 0.2)',
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Property Price Trend',
    },
  },
};

const PropertyPriceTrend = () => {
  return <Line data={propertyPriceData} options={chartOptions} />;
};

export default PropertyPriceTrend;
