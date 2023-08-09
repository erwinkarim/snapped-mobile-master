<template>
	<div class="text-left bg-gray-secondary max-w-sm md:max-w-xl rounded rounded-xl justify-between overflow-hidden flex flex-col px-3 py-3 md:py-5 ">
		<canvas :id="canvasName" width="400" height="400"></canvas>
		<p>
			Question X
		</p>
		<p>You answered A. Correct answer is B.</p>
		<p>36% answered this correctly.</p>
	</div>
</template>

<script>
import Chart from 'chart.js';

export default {
	name: 'QuestionAnalytics',
	mounted() {
		// draw the chart from data
		var ctx = document.getElementById(this.canvasName);
		console.log("myChart", this.canvasName);
		var myChart = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
					labels: ['A', 'B', 'C', 'D'],
					datasets: [{
							label: '# of Votes',
							data: [12, 19, 3, 5, 2, 3],
							backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(255, 99, 132, 0.2)',
									'rgba(255, 99, 132, 0.2)',
							],
							borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 99, 132, 1)',
									'rgba(255, 99, 132, 1)',
							],
							borderWidth: 1
					}]
			},
			options: {
					scales: {
							yAxes: [{
									ticks: {
											beginAtZero: true
									}
							}]
					}
			}
		});
	},
	data() {
		return {
			canvasName: "myCanvas" + parseInt(Math.random() * 100 ), 
		}
	}
}
</script>