<script>
    import { Bar, mixins } from 'vue-chartjs'

    export default {
        extends: Bar,
        mixins: [mixins.reactiveProp],
        props: ['chartdata'],
        data() {
            return {
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },

        mounted () {
            this.renderChart(this.chartdata, this.options)
        }
     }

</script>

<style scoped>

</style>