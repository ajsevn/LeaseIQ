import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, LabelList } from 'recharts';

const KPIOverview = () => {
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    setRoi(45); // Simulate fetching data
  }, []);

  const data = [
    {
      name: 'ROI',
      value: roi,
      fill: '#8884d8',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h4 className="text-lg text-gray-500">ROI</h4>
        <RadialBarChart
          width={200}
          height={200}
          innerRadius="30%"
          outerRadius="80%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            dataKey="value"
          />
          <LabelList
            position="center"
            content={<div className="text-xl text-blue-500">{`${roi}%`}</div>}
          />
        </RadialBarChart>
      </div>
      {/* Repeat similar gauges for different KPIs */}
    </div>
  );
};

export default KPIOverview;
