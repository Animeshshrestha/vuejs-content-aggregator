<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      prev-text="Prev"
      next-text="Next"
      aria-controls="itemList"
      align="center"
      @change="handlePageChange"
    ></b-pagination>
    <b-card-group deck v-for="news in newsData" :key="news.id">
    <b-card
      :title="news.title"
      :href="news.link"
      :img-src="news.images_link"
      img-alt="Image"
      img-top
    >
      <b-card-text v-if="news.description">
        {{news.description}}
      </b-card-text>
    </b-card>
  </b-card-group>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        newsData: null,
        page:1
      }
    },
    created () {
      this.fetchData()
    },
    methods:{
      fetchData () {
        axios.get('/news').
        then(response =>this.newsData = response.data.results)
      },
      handlePageChange(value){
        this.page = value
        console.log(this.page)
      }
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>