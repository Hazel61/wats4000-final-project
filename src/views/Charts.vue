<template>
    <div>
        <p>
            High and low temperatures for 2018
        </p>
        <p>
            <line-chart :options="chartOptions" :chartdata="chartdata"/>
        </p>
    </div>
</template>

<script>
    import axios from 'axios';
    import LineChart from '@/components/LineChart';

    export default {
        name: 'Seattle',
        data() {
            return {
                chartdata: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                        {
                            label: 'High Temperature',
                            backgroundColor: '#f87979',
                            data: []
                        },
                        {
                            label: 'Low Temperature',
                            backgroundColor: 'blue',
                            data: [],
                        }
                    ]
                },
                chartOptions: {

                },
                results: null,
                errors: [],
                Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },

        created() {
            // High Temperature call
            axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
                headers: {
                    token: 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD',
                },
                params: {
                    stationid: "GHCND:USW00024233",
                    units: "standard",
                    datatypeid: "EMXT",
                    limit: 100,
                    startdate: "2018-01-01",
                    enddate: "2018-12-31",
                    datasetid: "GSOM"
                }
            })
                .then(response => {
                    this.results = response.data.results;
                    let highTemperatures = this.chartdata.datasets.find(dataset => dataset.label === 'High Temperature');
                    if (highTemperatures) {
                        highTemperatures.data = this.results.map(result => result.value);

                    } else {
                        console.error('Could not find high temperature dataset.');
                    }
                })
                .catch(error => {
                    this.errors.push(error)
                });

            // Low Temperature call
            axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
                headers: {
                    token: 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD',
                },
                params: {
                    stationid: "GHCND:USW00024233",
                    units: "standard",
                    datatypeid: "EMNT",
                    limit: 100,
                    startdate: "2018-01-01",
                    enddate: "2018-12-31",
                    datasetid: "GSOM"
                }
            })
                .then(response => {
                    this.results = response.data.results;
                    let lowTemperatures = this.chartdata.datasets.find(dataset => dataset.label === 'Low Temperature');
                    if (lowTemperatures) {
                        lowTemperatures.data = this.results.map(result => result.value);

                    } else {
                        console.error('Could not find high temperature dataset.');
                    }
                })
                .catch(error => {
                    this.errors.push(error)
                });
        },
        components: {
            // 'error-list': ErrorList,
            'line-chart': LineChart
        }
    }
</script>

<style scoped>

</style>