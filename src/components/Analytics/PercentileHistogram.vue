<template>
	<div>
		<canvas :id="canvasName" width="400" height="400"></canvas>
		<p>Show histogram (x-axis: score, y-axis, how many people got this score)</p>
		<p>based on mode, individual: show position in histogram, group: just show distribution</p>
	</div>
</template>

<script>
import Chart from 'chart.js';

export default {
	name: 'PrecentileHistogram',
	mounted(){
		let ctx = document.getElementById(this.canvasName);
		let data = {
			// labels: [1,2,3,4,5,6,7],
			datasets: [{
				label: 'score vs count',
				data: [
					{x: 1, y: 1}, 
					{x: 2, y: 2}, 
					{x: 3, y: 3}, 
					{x: 4, y: 4}, 
					{x: 5, y: 3}, 
					{x: 6, y: 2}, 
					{x: 7, y: 1}, 
				]
			}]
		};


		let options = {
			scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
		};

		var myLineChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: options
		});

	},
	data() {
		return {
			canvasName: "myCanvas" + parseInt(Math.random() * 100 ), 
		}
	}
}
</script>