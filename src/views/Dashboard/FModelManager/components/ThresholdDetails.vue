<template>
  <div class="threshold-details modal-card box">
    <div class="tile is-ancestor is-vertical">
      <h1 class="subtitle has-text-centered is-size-4">Threshold Details</h1>
      <div class="tile notification box is-vertical">
        <p class="is-size-6">
          <strong>Name:</strong>
          {{data.qualityMeasure.name}}
        </p>
        <p class="is-size-6e has-text-justified">
          <strong>Description:</strong>
          {{data.qualityMeasure.description}}
        </p>
        <p class="is-size-6e">
          <strong>Thresholds Status:</strong>
          {{checkMeasureStatus()}}
        </p>
      </div>
      <div class="tile notification box">
        <div id="chartdiv"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  props: ["data"],

  methods: {
      checkMeasureStatus() {
      if (this.data.value <= this.data.veryLow)
        return 'Very Low';
      else if (this.data.value <= this.data.low)
        return 'Low';
      else if (this.data.value <= this.data.high)
        return 'Moderate';
      else if (this.data.value <= this.data.veryHigh)
        return 'High';
      else return 'Very High';
    }
  },

  mounted() {
    console.log(this.data);
    /**
     * ---------------------------------------
     * Documentation is available at:
     * https://www.amcharts.com/docs/v4/
     * ---------------------------------------
     */

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
     */

    var axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    });

    /**
     * Axis for ranges
     */

    var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = this.data.veryLow;
    axis2.max = this.data.veryHigh + this.data.veryHigh * 0.2;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    var veryLow = axis2.axisRanges.create();
    veryLow.value = this.data.veryLow;
    veryLow.endValue = this.data.low;
    veryLow.axisFill.fillOpacity = 1;
    veryLow.axisFill.fill = "#f6db2f";

    var low = axis2.axisRanges.create();
    low.value = this.data.low;
    low.endValue = this.data.moderate;
    low.axisFill.fillOpacity = 1;
    low.axisFill.fill = "#faeb8c";

    var moderate = axis2.axisRanges.create();
    moderate.value = this.data.moderate;
    moderate.endValue = this.data.high;
    moderate.axisFill.fillOpacity = 1;
    moderate.axisFill.fill = "#2dd07b";

    var high = axis2.axisRanges.create();
    high.value = this.data.high;
    high.endValue = this.data.veryHigh;
    high.axisFill.fillOpacity = 1;
    high.axisFill.fill = "#fcced8";

    var veryHigh = axis2.axisRanges.create();
    veryHigh.value = this.data.veryHigh;
    veryHigh.endValue = this.data.veryHigh + this.data.veryHigh * 0.2;
    veryHigh.axisFill.fillOpacity = 1;
    veryHigh.axisFill.fill = "#ef8898";

    /**
     * Label
     */

    var label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 40;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    // label.text = "50%";

    /**
     * Hand
     */

    var hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = this.data.value;

    hand.events.on("propertychanged", function(ev) {
      //   veryLow.endValue = ev.target.value
      //   low.value = ev.target.value;
      axis2.invalidate();
    });
  }
};
</script>

<style lang="sass">
.modal
  z-index: 100
  min-height: 500px
.animation-content
  padding: 10px

.threshold-details
  p
    margin: 0


#chartdiv
  width: 100%
  height: 300px
</style>

