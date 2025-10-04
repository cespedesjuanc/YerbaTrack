import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Coffee, DollarSign, Calendar, Calculator } from 'lucide-react';

// Datos basados en precios reales de yerba mate (2020-2025)
// Precios promedio por kg en pesos argentinos
const preciosHistoricos = [
  { mes: 'Ene 2020', precio: 180, inflacion: 3.7 },
  { mes: 'Abr 2020', precio: 195, inflacion: 4.2 },
  { mes: 'Jul 2020', precio: 210, inflacion: 3.9 },
  { mes: 'Oct 2020', precio: 230, inflacion: 4.1 },
  { mes: 'Ene 2021', precio: 250, inflacion: 4.0 },
  { mes: 'Abr 2021', precio: 280, inflacion: 4.8 },
  { mes: 'Jul 2021', precio: 320, inflacion: 5.2 },
  { mes: 'Oct 2021', precio: 360, inflacion: 6.0 },
  { mes: 'Ene 2022', precio: 420, inflacion: 5.1 },
  { mes: 'Abr 2022', precio: 490, inflacion: 6.8 },
  { mes: 'Jul 2022', precio: 580, inflacion: 7.4 },
  { mes: 'Oct 2022', precio: 680, inflacion: 6.3 },
  { mes: 'Ene 2023', precio: 800, inflacion: 6.0 },
  { mes: 'Abr 2023', precio: 950, inflacion: 8.4 },
  { mes: 'Jul 2023', precio: 1150, inflacion: 12.4 },
  { mes: 'Oct 2023', precio: 1380, inflacion: 8.3 },
  { mes: 'Ene 2024', precio: 1650, inflacion: 20.6 },
  { mes: 'Abr 2024', precio: 2100, inflacion: 11.0 },
  { mes: 'Jul 2024', precio: 2900, inflacion: 4.0 },
  { mes: 'Oct 2024', precio: 3450, inflacion: 2.7 },
  { mes: 'Ene 2025', precio: 3700, inflacion: 2.3 },
  { mes: 'Abr 2025', precio: 3950, inflacion: 2.0 },
  { mes: 'Jul 2025', precio: 4100, inflacion: 1.8 },
  { mes: 'Oct 2025', precio: 4240, inflacion: 1.7 }
];

const marcasPopulares = [
  { marca: 'Rosamonte', precio: 4290, variacion: 3.5 },
  { marca: 'Taragüí', precio: 4239, variacion: 2.8 },
  { marca: 'CBSé', precio: 3950, variacion: 2.3 },
  { marca: 'La Merced', precio: 4580, variacion: 4.1 },
  { marca: 'Playadito', precio: 3750, variacion: 1.9 }
];

const App = () => {
  const [vista, setVista] = useState('dashboard');
  const [sueldo, setSueldo] = useState('');
  const [resultadoSimulacion, setResultadoSimulacion] = useState(null);

  const precioActual = preciosHistoricos[preciosHistoricos.length - 1].precio;
  const variacionAnual = ((precioActual / preciosHistoricos[preciosHistoricos.length - 5].precio - 1) * 100).toFixed(1);

  const calcularSimulacion = () => {
    const sueldoNum = parseFloat(sueldo);
    if (!sueldoNum || sueldoNum <= 0) return;

    // Cálculos realistas
    const gramosPoTermo = 50; // gramos de yerba por termo
    const paqueteGramos = 1000; // paquete de 1kg
    const termosMaximos = Math.floor((sueldoNum / precioActual) * (paqueteGramos / gramosPoTermo));
    const porcentajeSueldo = ((termosMaximos * gramosPoTermo / paqueteGramos * precioActual) / sueldoNum * 100).toFixed(1);
    const gastoMensual = (termosMaximos * gramosPoTermo / paqueteGramos * precioActual).toFixed(0);
    const paquetesPorMes = (termosMaximos * gramosPoTermo / paqueteGramos).toFixed(1);

    setResultadoSimulacion({
      termosMaximos,
      porcentajeSueldo,
      gastoMensual,
      paquetesPorMes,
      termosPorDia: Math.floor(termosMaximos / 30),
      costoPromedioTermo: (precioActual / (paqueteGramos / gramosPoTermo)).toFixed(0)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coffee className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">YerbaTrack</h1>
                <p className="text-green-100 text-sm">Análisis de Precios de Yerba Mate en Argentina</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100">Precio Promedio Actual</div>
              <div className="text-3xl font-bold">${precioActual.toLocaleString()}</div>
              <div className="text-xs text-green-200">paquete de 1kg</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setVista('dashboard')}
              className={`px-6 py-4 font-medium transition-all ${
                vista === 'dashboard'
                  ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Dashboard
              </div>
            </button>
            <button
              onClick={() => setVista('simulador')}
              className={`px-6 py-4 font-medium transition-all ${
                vista === 'simulador'
                  ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Simulador del Termo
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="container mx-auto px-6 py-8">
        {vista === 'dashboard' && (
          <div className="space-y-6">
            {/* Tarjetas de Estadísticas */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Precio Actual</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">${precioActual.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">por kilogramo</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-500 opacity-80" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Variación Anual</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">+{variacionAnual}%</p>
                    <p className="text-xs text-gray-500 mt-1">últimos 12 meses</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-amber-500 opacity-80" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Período Analizado</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">2020-2025</p>
                    <p className="text-xs text-gray-500 mt-1">casi 6 años de datos</p>
                  </div>
                  <Calendar className="w-12 h-12 text-blue-500 opacity-80" />
                </div>
              </div>
            </div>

            {/* Gráfico de Evolución de Precios */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Evolución Histórica de Precios (2020-2025)</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={preciosHistoricos}>
                  <defs>
                    <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => [`${value.toLocaleString()}`, 'Precio']}
                  />
                  <Area type="monotone" dataKey="precio" stroke="#10b981" fillOpacity={1} fill="url(#colorPrecio)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de Inflación */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Inflación Mensual vs Precio de Yerba</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={preciosHistoricos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value, name) => [
                      name === 'inflacion' ? `${value}%` : `${value.toLocaleString()}`,
                      name === 'inflacion' ? 'Inflación' : 'Precio'
                    ]}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="inflacion" stroke="#ef4444" strokeWidth={2} name="Inflación %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comparación de Marcas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Comparación de Marcas Populares</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marcasPopulares}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="marca" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Precio']}
                  />
                  <Bar dataKey="precio" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {vista === 'simulador' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <Coffee className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Simulador del Termo</h2>
                <p className="text-gray-600">Descubrí cuántos termos de mate podés tomar al mes según tu sueldo</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-8">
                <label className="block text-gray-700 font-medium mb-3">
                  Ingresá tu sueldo mensual (ARS)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={sueldo}
                    onChange={(e) => setSueldo(e.target.value)}
                    placeholder="Ej: 500000"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                  />
                  <button
                    onClick={calcularSimulacion}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {resultadoSimulacion && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-8 shadow-xl">
                    <div className="text-center">
                      <p className="text-lg opacity-90 mb-2">Podés tomar hasta</p>
                      <p className="text-6xl font-bold mb-2">{resultadoSimulacion.termosMaximos}</p>
                      <p className="text-xl opacity-90">termos de mate al mes</p>
                      <div className="mt-4 pt-4 border-t border-green-400">
                        <p className="text-lg">≈ {resultadoSimulacion.termosPorDia} termos por día</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <p className="text-gray-600 text-sm font-medium mb-1">Gasto Mensual en Yerba</p>
                      <p className="text-3xl font-bold text-gray-800">${Number(resultadoSimulacion.gastoMensual).toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{resultadoSimulacion.porcentajeSueldo}% de tu sueldo</p>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-500">
                      <p className="text-gray-600 text-sm font-medium mb-1">Paquetes por Mes</p>
                      <p className="text-3xl font-bold text-gray-800">{resultadoSimulacion.paquetesPorMes}</p>
                      <p className="text-sm text-gray-500 mt-1">paquetes de 1kg</p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                      <p className="text-gray-600 text-sm font-medium mb-1">Costo Promedio por Termo</p>
                      <p className="text-3xl font-bold text-gray-800">${resultadoSimulacion.costoPromedioTermo}</p>
                      <p className="text-sm text-gray-500 mt-1">usando {50}g de yerba</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                      <p className="text-gray-600 text-sm font-medium mb-1">Precio Actual del Kg</p>
                      <p className="text-3xl font-bold text-gray-800">${precioActual.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">promedio del mercado</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-amber-600" />
                      Datos del Cálculo
                    </h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Se considera 50g de yerba por termo (consumo estándar)</li>
                      <li>• Precio promedio del mercado: ${precioActual.toLocaleString()} por kg</li>
                      <li>• El cálculo maximiza la cantidad de termos según tu presupuesto</li>
                      <li>• Un paquete de 1kg rinde aproximadamente 20 termos</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">YerbaTrack © 2024 - Proyecto Imaginario de Análisis de Precios</p>
          <p className="text-gray-500 text-sm mt-2">Datos simulados con fines demostrativos</p>
        </div>
      </footer>
    </div>
  );
};

export default App;