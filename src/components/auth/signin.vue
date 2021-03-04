<template>
  <div id="signin">
    <div class="signin-form">

      <p v-if="sucessful_login"> {{ sucessful_login }}</p>
      <p v-if="success_message"> {{ success_message }}</p>
      {{ errors.detail }}      
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input
                  type="text"
                  id="username"
                  v-model="username">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['success_message'],
    data () {
      return {
        username: '',
        password: '',
        errors:[],
        sucessful_login:''
      }
    },
    methods: {
  
      onSubmit () {
        const formData = {
          username: this.username,
          password: this.password,
        }
        this.$store.dispatch('login',{
          username: formData.username,
          password: formData.password
        }).then(() =>{
          if(this.$route.query.redirectFrom){
              this.$router.push({path: this.$route.query.redirectFrom})
          }else{
            this.$router.push({
              'name': 'dashboard'
            })
          }          
        }).catch(err =>{
          this.errors = err.response.data
        })
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>