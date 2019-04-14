<script>
import VueCharts from "vue-chartjs";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data"],
  data() {
    return {
      chartdata: {
        datasets: [
          {
            label: "Max",
            backgroundColor: "#d35a7f",
            borderColor: "#d35a7f",
            // borderDash: [5],
            borderWidth: 1,
            pointBackgroundColor: "#d35a7f",
            pointBorderColor: "#d35a7f",
            pointBorderWidth: 2,
            pointStyle: 'line',

            // spanGaps: false,
            showLine: false,
            // steppedLine: true,
            fill: false,
            data: [15, 55, 25, 50, 15, 55, 45, 50, 15, 55, 45, 50, 15, 55, 45, 50, 15, 55, 45, 50],
            type: "line"
          },
          {
            label: "Min",
            backgroundColor: "#996688",
            borderColor: "#996688",
            // borderDash: [5],
            borderWidth: 1,
            pointBackgroundColor: "#996688",
            pointBorderColor: "#996688",
            pointBorderWidth: 2,
            // pointHitRadius: 50,
            pointStyle: 'line',

            // spanGaps: true,
            // borderDashOffset: 1.5,
            showLine: false,
            // steppedLine: true,
            fill: false,
            data: [12, 40, 10, 20, 12, 40, 30, 20, 12, 40, 30, 20, 12, 40, 30, 20, 12, 40, 30, 20],
            type: "line"
          },
          {
            type: "bar",
            label: "Measures",
            borderColor: ["#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00"],
            backgroundColor: ["#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00", "#ffd700", "#ffd700", "#cd2626", "#008b00"],
            data: [10, 20, 30, 45, 10, 20, 30, 45, 10, 20, 30, 45, 10, 20, 30, 45, 10, 20, 30, 45]
          }
        ],
        labels: ["NoF", "nOR", "nXOR", "Al","NoF", "nOR", "nXOR", "Al","NoF", "nOR", "nXOR", "Al","NoF", "nOR", "nXOR", "Al","NoF", "nOR", "nXOR", "Al"]
      },
      options: {
        responsive: true,
        showLine: true,
        spanGaps: true,

        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
        // elements: {
        //     line: {
        //         tension: 0 // disables bezier curves
        //     }
        // }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>
