import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, ChartData, ChartOptions, DoughnutController, Filler, Legend, LinearScale, LineElement, PointElement, RadialLinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    DoughnutController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface DatasetsProp {
    label: string;
    data: number[];
    borderColor: string | string[];
    backgroundColor: string | string[];
    yAxisID: string;
    borderWidth?: number;
}

export const options: ChartOptions<any> = {
    angleLines: {
        display: false
    },
    x: {},
    animation: false,
    maintainAspectRatio: false,
    legend: { display: true },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0,
        },
    },
    stacked: false,
    plugins: {
        datalabels: {
            formatter: (val, context) => `${val}%`,
        },
        tooltip: {
            callbacks: {
                label: (ttItem) => `${ttItem.formattedValue}%`
            }
        },
        title: {
            display: false,
            text: '',
            rotation: 90,
            position: 'left'
        },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
            ticks: {
                stepSize: 2,
                callback: (value, index, values) => {
                    return `${value}%`;
                },
            },
        },
    },
};

const datasets = {
    label: 'Dataset 1',
    data: [1, 2, 3],
    borderColor: 'rgb(77,177,222)',
    backgroundColor: 'rgba(32,156,238,0.5)',
    yAxisID: 'y',
};

interface ChartStateProps {
    data: DatasetsProp;
}

export interface ColourInterface {
    borderColor: string;
    backgroundColor: string;
}

export interface GraphProps {
    data: number[];
    labels?: string[];
    label?: string;
    title?: string;
    barThickness?: number;
    primaryOptionLabel?: string;
    secondaryOptionLabel?: string;
    chartName: 'Line' | 'Doughnut' | 'Pie' | 'Bar' | 'Radar' | 'Bubble' | 'Scatter';
    doNotDisplayLegend?: boolean;
    customBarColours?: { borderColor: string[], backgroundColor: string[] } | false;
    chartWrapper?: string;
    hideVertical?: boolean;
}

export class Chart extends React.Component<GraphProps, ChartStateProps> {
    public state = { data: datasets };

    public componentDidMount() {
        this.setChartData();
    }

    public componentDidUpdate(prevProps: Readonly<GraphProps>, prevState: Readonly<ChartStateProps>, snapshot?: any) {
        if (prevProps.data !== this.props.data) {
            this.setChartData();
        }
    }

    public setChartData() {
        const colours = { borderColor: '#58b7cc', backgroundColor: '#3c9173' };

        this.setState({
            data: {
                ...this.state.data,
                ...colours,
                data: this.props.data,
                label: this.props?.primaryOptionLabel || '',
                borderWidth: 1,
            }
        });
    }

    public getOptions() {
        const barThickness = this.props.barThickness ? { barThickness: 30 } : {};
        const hideVerticalLines = this.props.hideVertical ? { x: { grid: { display: false } } } : {};

        const blockOptions = {
            ...options,
            ...barThickness,
            scales: {
                ...options.scales,
                ...hideVerticalLines
            }
        };

        blockOptions.plugins.legend = { display: false };
        blockOptions.plugins = { ...blockOptions.plugins, legend: { display: false } };

        if (this.props.title) {
            blockOptions.plugins = {
                ...blockOptions.plugins, title: {
                    display: true,
                    align: 'center',
                    text: this.props.title
                }
            };
        }

        return blockOptions;
    }

    public render() {
        const labels = this.props?.labels;
        const datasets = [this.state.data];
        const blockOptions = this.getOptions();

        switch (this.props.chartName) {
            case 'Line':
                // todo this is for the collective together
                return <Line data={{ labels, datasets } as ChartData<any, any, any>} options={blockOptions}/>;
            case 'Bar':
                // todo make it double
                return <div style={{ height: 270 }}>
                    <Bar data={{ labels, datasets } as ChartData<any, any, any>} options={blockOptions}/>
                </div>;
            case 'Pie':
                return <Pie data={{ labels, datasets } as ChartData<any, any, any>} options={blockOptions}/>;
            default:
                return <Pie data={{ labels, datasets } as ChartData<any, any, any>} options={blockOptions}/>;
        }
    }
}
