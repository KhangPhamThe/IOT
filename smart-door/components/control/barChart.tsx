import { Chart } from 'chart.js/auto'
import { useEffect, useState } from 'react';
import controlStyle from 'styles/control.module.scss';

interface IData {
	hour: string;
	count: number;
}

interface BarChartProps {
	data: IData[];
	props?: any;
	style?: React.CSSProperties;
	className?: string;
}

let myChart: any;

const BarChart = ({ data }: BarChartProps) => {
	const [element, setElement] = useState<HTMLCanvasElement | null>(null);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		setElement(document.getElementById('barChart') as HTMLCanvasElement);

		let sum = 0;
		for (let singleData of data) {
			sum = sum + singleData.count;
		}
		setTotalCount(sum);
	}, [data])

	useEffect(() => {
		console.log("data: ", JSON.stringify(data))
		if (element && data && data.length > 0) {
			console.log("I'm in", data.length);
			(async function () {
				if (myChart) myChart?.destroy && myChart.destroy();
				myChart = new Chart(
					element,
					{
						type: 'bar',
						data: {
							labels: data.map(row => row.hour),
							datasets: [
								{
									label: 'Traffic of in-out at main hall',
									data: data.map(row => row.count),
									backgroundColor: '#7A7A7A',
									hoverBackgroundColor: 'white',
								}
							]
						},
						options: {
							layout: {
								padding: 10
							},
							responsive: true,
							aspectRatio: 2,
						}
					}
				);
				myChart.canvas.width = "400px"
			})();
		}
	}, [element, data])

	if (!data || data.length == 0) return (
		<div className={controlStyle.barChartContainer} style={{ width: '100%', height: '100%' }}>
			<div className={controlStyle.canvasContainer}>
			</div>
			<div className={controlStyle.toolArea}>
				<h3 className={controlStyle.title}>Total In-Out per Hour</h3>
				<p className={controlStyle.text}>Total In-Out of day: <span className={controlStyle.imp}>{totalCount}</span></p>
			</div>
		</div>
	)

	return (
		<div className={controlStyle.barChartContainer} style={{ width: '100%', height: '100%' }}>
			<div className={controlStyle.canvasContainer}>
				<canvas id="barChart" style={{ height: '100%', width: '100%' }}></canvas>
			</div>
			<div className={controlStyle.toolArea}>
				<h3 className={controlStyle.title}>Total In-Out per Hour</h3>
				<p className={controlStyle.text}>Total In-Out of day: <span className={controlStyle.imp}>{totalCount}</span></p>
			</div>
		</div>
	)
}

export default BarChart