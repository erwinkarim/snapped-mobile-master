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
				data: 
				this.data.dist,
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

		this.myLineChart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: options
		});

	},
	updated(){
		// should fire when data is updated
		console.log('updated data', this.data);

	}, 
	data() {
		return {
			canvasName: "myCanvas" + parseInt(Math.random() * 100 ), 
			data: this.$attrs.data,
			myLineChart: null, 
		}
	}
}
</script>