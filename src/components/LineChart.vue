<template>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        props: {
            chartdata: {
                type: Object,
                default: null
            },
        options: {
            type: Object,
            default: null
            }
        },
        mounted () {
        this.renderChart(this.chartdata, this.options)
        }
    }
</template>

<script>
    export default {
        name: "LineChart"
    }
</script>

<style scoped>

</style>