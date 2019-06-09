<script>
    import { Bar } from 'vue-chartjs'

    export default {
        extends: Bar,
        props: ['chartdata'],
        data() {
            // chartdata: {
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            //     datasets: [
            //         {
            //             label: 'High Temperature',
            //             backgroundColor: '#f87979',
            //             data: [40, 20]
            //         }
            //     ]
            // },
            return {
                // chartdata: this.chartdata,
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