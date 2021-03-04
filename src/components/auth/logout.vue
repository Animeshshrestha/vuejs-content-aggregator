<script>
  export default {
    created () {
      this.$store.dispatch('logoutUser')
        .then(() => {
          this.$router.push(
              { 
                  name: 'signin',
                  params: {
                  success_message: 'logged Out Sucessfully' // or anything you want
                }
             }
            )
        })
    }
  }
</script>