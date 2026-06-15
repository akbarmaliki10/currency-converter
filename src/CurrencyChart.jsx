import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import './CurrencyChart.css';
import { callback } from "chart.js/helpers";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const formatValue = (val) => {
    if (val === null || val === undefined) return '';
    return val > 0.01
        ? val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
        : val.toFixed(6);
};

export default function CurrencyChart({ data, fromCurrency, toCurrency }) {
    if (!data || data.length === 0) {
        return (
            <div className="chart-loading">
                Loading trend chart...
            </div>
        );
    }

    const labels = data.map(item => item.date);
    const rateData = data.map(item => item.rates[toCurrency] / item.rates[fromCurrency]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: `${fromCurrency} to ${toCurrency}`,
                data: rateData,
                borderColor: '#a78bfa',
                backgroundColor: 'rgba(167, 139, 250, 0.08)',
                tension: 0.35,
                fill: true,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointBackgroundColor: '#a78bfa',
                pointBorderColor: 'transparent',
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${fromCurrency} to ${toCurrency} Trend (Last 7 Days)`,
                color: '#f8fafc',
                font: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    weight: '600',
                },
                padding: {
                    bottom: 12
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#f8fafc',
                bodyColor: '#f8fafc',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                titleFont: { family: "'Inter', sans-serif", weight: '600' },
                bodyFont: { family: "'Inter', sans-serif" }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 10
                    },
                    callback: (value) => formatValue(value)
                },
            }
        }
    };

    return (
        <div className="chart-card">
            <Line data={chartData} options={options} />
        </div>
    );
}