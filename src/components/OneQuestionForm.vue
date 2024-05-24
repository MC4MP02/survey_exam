<script>
export default {
 //fetch(`http://localhost:3001/vote/0`,{method: 'POST'})
 data(){
    return{
      vote: undefined,
    }
  },
}
</script>

<template>
  <div class="question">
    <span class="question">Here goes the question</span>
    <span><input type="radio" v-model="vote" value="0"><label>molt bé</label></span>
    <span><input type="radio" v-model="vote" value="1"><label>bé</label></span>
    <span><input type="radio" v-model="vote" value="2"><label>normal</label></span>
    <button>Send</button>
  </div>
</template>

<style scoped>
div.question {
  background-color: rgb(255, 153, 102);
}
</style>