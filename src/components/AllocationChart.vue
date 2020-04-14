<script lang="ts">
import { Doughnut, mixins } from "vue-chartjs-typescript";
const { reactiveProp } = mixins;
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  extends: Doughnut,
  mixins: [reactiveProp]
})
export default class AllocationChart extends Vue {
  @Prop({ required: true })
  public title!: string;

  mounted() {
    this.renderChart(this.chartData, { title: { text: this.title, display: true, fontSize: 16 } });
  }
}
</script>
