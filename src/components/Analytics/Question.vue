<template>
	<div class="text-left bg-gray-secondary max-w-sm md:max-w-xl rounded rounded-xl justify-between overflow-hidden flex flex-col px-3 py-3 md:py-5 ">
		<p>
			Question #{{ data.qData.question_no }}
		</p>
		<canvas :id="canvasName" width="400" height="400"></canvas>
		<p>
			<span v-if="data.qData.student_answer">Student answered {{ data.qData.student_answer }}.</span> 
			Correct answer is {{  data.qData.correct_answer }}
		</p>
		<p>{{ data.qData[data.qData.correct_answer.toLowerCase()] }}% answered this correctly.</p>
	</div>
</template>

<script>
import Chart from 'chart.js';

let red = 'rgba(255, 99, 132, 0.2)';
let green = 'rgba(75, 192, 192, 0.2)';
let redBorder = 'rgba(255, 99, 132, 1)';
let greenBorder = 'rgba(54, 162, 235, 1)';

export default {
	name: 'QuestionAnalytics',
	mounted() {
		// draw the chart from data
		var ctx = document.getElementById(this.canvasName);
		var myChart = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
					labels: ['A', 'B', 'C', 'D'],
					datasets: [{
							label: '% of Answers',
							data: [
								this.data.qData['a'],
								this.data.qData['b'],
								this.data.qData['c'],
								this.data.qData['d'],
							],
							backgroundColor: [
									this.data.qData.correct_answer == 'A' ? green : red,
									this.data.qData.correct_answer == 'B' ? green : red,
									this.data.qData.correct_answer == 'C' ? green : red,
									this.data.qData.correct_answer == 'D' ? green : red,
							],
							borderColor: [
									this.data.qData.correct_answer == 'A' ? greenBorder : redBorder,
									this.data.qData.correct_answer == 'B' ? greenBorder : redBorder,
									this.data.qData.correct_answer == 'C' ? greenBorder : redBorder,
									this.data.qData.correct_answer == 'D' ? greenBorder : redBorder,
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
			canvasName: "myCanvas" + parseInt(Math.random() * 1000 ), 
			data: this.$attrs.data,
		}
	}
}
</script>