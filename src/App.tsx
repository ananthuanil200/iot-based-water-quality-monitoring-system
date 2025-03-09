import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';
import { Droplets, Thermometer, FlaskRound as Flask, Activity } from 'lucide-react';

interface WaterQualityData {
  temperature: number;
  tds: number;
  turbidity: number;
  ph: number;
}

function App() {
  const [data, setData] = useState<WaterQualityData>({
    temperature: 0,
    tds: 0,
    turbidity: 0,
    ph: 0
  });

  useEffect(() => {
    const waterQualityRef = ref(database, 'waterQuality');
    const unsubscribe = onValue(waterQualityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setData(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const getPhColor = (ph: number) => {
    if (ph < 6.5) return 'text-red-500';
    if (ph > 8.5) return 'text-red-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Water Quality Monitoring System
          </h1>
          <p className="text-blue-600">Real-time water quality parameters</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Temperature Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Temperature</h2>
              <Thermometer className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{data.temperature}°C</p>
          </div>

          {/* TDS Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">TDS</h2>
              <Droplets className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{data.tds} ppm</p>
          </div>

          {/* Turbidity Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Turbidity</h2>
              <Flask className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{data.turbidity} NTU</p>
          </div>

          {/* pH Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">pH Level</h2>
              <Activity className={getPhColor(data.ph)} size={24} />
            </div>
            <p className={`text-3xl font-bold ${getPhColor(data.ph)}`}>{data.ph}</p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Water Quality Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">Temperature Status</p>
              <p className={`font-semibold ${data.temperature > 30 ? 'text-red-500' : 'text-green-500'}`}>
                {data.temperature > 30 ? 'High' : 'Normal'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">TDS Status</p>
              <p className={`font-semibold ${data.tds > 500 ? 'text-red-500' : 'text-green-500'}`}>
                {data.tds > 500 ? 'High' : 'Normal'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">Turbidity Status</p>
              <p className={`font-semibold ${data.turbidity > 5 ? 'text-red-500' : 'text-green-500'}`}>
                {data.turbidity > 5 ? 'High' : 'Normal'}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">pH Status</p>
              <p className={`font-semibold ${getPhColor(data.ph)}`}>
                {data.ph < 6.5 ? 'Acidic' : data.ph > 8.5 ? 'Alkaline' : 'Normal'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;