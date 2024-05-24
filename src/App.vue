<script>
import OneQuestionForm from './components/OneQuestionForm.vue'
import ResultsViewer from './components/ResultsViewer.vue'
export default{
  components:{
    OneQuestionForm,
    ResultsViewer,
  },
  data(){
    return{
      options: ['molt bé', 'bé', 'normal', 'regular', 'malament'],
      question: "Com t'ha anat l'examen de STW? ",
    }
  }
}
</script>

<template>
  <h3>Enquesta de STW</h3>
  <h4>Si us plau respon a la següent pregunta: </h4>
  <OneQuestionForm :question="question" :options="options" />
  <hr />
  <ResultsViewer :options="options" />
</template>

<style>
div.results {
  font-weight: bold;
  background-color:rgb(255, 204, 102);
}

div.participants {
  font-weight: bold;
} 
</style>