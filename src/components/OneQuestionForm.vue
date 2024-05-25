<script>
export default {
  //fetch(`http://localhost:3001/vote/0`,{method: 'POST'})
  props: ['question', 'options'],
  data() {
    return {
      vote: undefined,
      buttonDisabled: true,
    }
  },
  methods: {
    sendVote() {
      fetch(`http://localhost:3001/vote/${this.vote}`, { method: 'POST' })
        .then(res => { console.log(res); })
        .catch(err => { console.log(err); })
    },
  }
}
</script>

<template>
  <div class="question">
    <span class="question">{{ question }}</span>
    <span v-for="(opt, index) in options">
      <input type="radio" v-model="vote" @input="buttonDisabled = false" :value="index"><label>{{ opt }}</label>
    </span>
    <button :disabled="buttonDisabled" @click="sendVote">Send</button>
  </div>
</template>

<style scoped>
div.question {
  background-color: rgb(255, 153, 102);
}
</style>