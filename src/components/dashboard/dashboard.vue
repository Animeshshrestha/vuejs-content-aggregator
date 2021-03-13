<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      prev-text="Prev"
      next-text="Next"
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
        currentPage: 1,
        rows:null,
        perPage:1
      }
    },
    created () {
      this.fetchData()
    },
    methods:{
      fetchData (page_number) {
        var url = '/news'
        if (page_number){
          var url = `/news?page=${page_number}`
        }
        axios.get(url).
        then((response) =>{
          this.rows = parseInt(response.data.count/10)
          this.newsData = response.data.results
          })
      },
      handlePageChange(value){
        this.fetchData(value)

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