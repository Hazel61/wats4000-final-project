<template>
    <div>

        <h2>Seattle high and low temperature by month in 2018</h2>

        <ul class="results" v-if="results">
            <li v-for="(result,index) in tmax" :key="index">
                <p>Month: {{Months[index]}}</p>
                <p></p>
                <p>High Temperature: {{tmax[index]}}&deg;F</p>
                <p>Low Temperature: {{tmin[index]}}&deg;F</p>

            </li>
        </ul>
        <div v-if="errors.length > 0">
            <h2>There was an error fetching weather data.</h2>
            <ul class="errors">
                <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
            </ul>
            <error-list v-bind:errorList="errors"></error-list>
        </div>
        <p>
            <router-link class="rlink-style" v-bind:to="{name:'Charts'}">View charts</router-link>
        </p>
    </div>
</template>

<script>
    import axios from 'axios';
    import ErrorList from '@/components/ErrorList';



    export default {
        name: 'Seattle',
        data() {
            return {
                chartdata: {
                    labels: ['High Temperature'],
                    datasets: []
                },
                options: {

                },
                tmax: [],
                tmin: [],
                results: null,
                errors: [],
                Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            }
        },

        created() {
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
                    this.results = response.data.results
                    this.tmax = this.results.map(result => result.value)
                })
                .catch(error => {
                    this.errors.push(error)
                });
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
                    this.results = response.data.results
                    this.tmin = this.results.map(result => result.value)

                })
                .catch(error => {
                    this.errors.push(error)
                });
        },
        components: {
            'error-list': ErrorList,

        }
    }
</script>

<style scoped>
    .errors li {
        color: red;
        border: solid red 1px;
        padding: 5px;
    }

    h1, h2 {
        font-weight: normal;
        font-size: medium;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        background-color: lightblue;
        width: 200px;
        min-height: 200px;
        border: solid 1px #e8e8e8;
        padding: 10px;
        margin: 5px;
    }

    a {
        color: #42b983;
    }
</style>