<template>
    <div>
        <h2>Seattle: average temperature by month for the last ten years</h2>

        <ul class="cities" v-if="results && results.length > 0">
            <li v-for="(result,index) in results" :key="index">

                <!--<weather-summary v-bind:weatherData="city.weather"></weather-summary>-->
                <!--<weather-conditions v-bind:conditions="city.main"></weather-conditions>-->
                <dl>
                    <dt>High Temperature</dt>
                    <dd>{{ result.value }}&deg;F</dd>

                </dl>
            </li>
        </ul>
        <div v-if="errors.length > 0">
            <h2>There was an error fetching weather data.</h2>
            <ul class="errors">
                <li v-for="(error,index) in errors" :key="index">{{ error }}</li>
            </ul>
            <error-list v-bind:errorList="errors"></error-list>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ErrorList from '@/components/ErrorList';


    export default {
        name: 'Seattle',
        data() {
            return {
                results: [],
                errors: [],
            }
        },
        created() {

            axios.get('http://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
                headers: {
                    token: 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD',
                },
                params: {
                    stationid: "GHCND:USW00024233",
                    units: "standard",
                    datatypeid: "TMAX",
                    limit: 100,
                    startdate: "2018-01-01",
                    enddate: "2018-12-31",
                    datasetid: "GSOM"
                }
            })
                .then(response => {
                    this.results = response.data
                })
                .catch(error => {
                    this.errors.push(error)
                });
        },
        components: {
            'error-list': ErrorList

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
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        width: 300px;
        min-height: 300px;
        border: solid 1px #e8e8e8;
        padding: 10px;
        margin: 5px;
    }

    a {
        color: #42b983;
    }
</style>