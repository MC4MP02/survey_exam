
//TODO
let getDelayedPromiseGenerator = function(){
  let delay = 0;
  return function(vote) {
    return new Promise((resolve, reject) => {
      delay += Math.random() * 100;
      setTimeout(() => {
        resolve(vote);
      }, delay);
    });
  };
}
  
//TODO
//begin class SurveyServer

class SurveyServer {
  constructor() {
    this.timeout = undefined
    this.surveyResult = {participants: 0, responses: [0,0,0,0,0]}
    this.promises = []
  }

  addResponse(promise) {
    this.promises.push(promise);
    promise.then((vote) => {
      this.surveyResult.participants++;
      this.surveyResult.responses[vote]++;
      this.promises = this.promises.filter(p => p !== promise);
      if (this.timeout != undefined) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        if (this.promises.length === 0) {
          this.timeout = undefined;
          this.promiseResult(this.surveyResult);
        }
      }, 5000);
    });
  }

  getResults() {
    return new Promise((resolve, reject) => {
      this.promiseResult = resolve
      if (this.promises.length === 0) {
        resolve(this.surveyResult);
      }
    })
  }

  toString = () =>{
    console.log(`participants: ${this.surveyResult.participants}`);
    this.surveyResult.responses.forEach((response, index)=>{
      let category = (index == 0) ? 'molt bé' : (index==1) ? 'bé'  : (index==2) ? 'ni bé ni malament' :  (index==3) ? 'regular' : 'malament'
      console.log(`${category}: ${response}`);
    })
  }
}

//end class SurveyServer

//tests
let getDelayedPromise = getDelayedPromiseGenerator();

//test 1 (ended by timeout) expected result: {participants:3 responses:[1,2,0,0,0]}
//----------------------------------------------------------------------------------
let ss = new SurveyServer()
ss.getResults().then(()=>{
  console.log("Results test 1: {participants:3 responses:[1,2,0,0,0]}");
  ss.toString()
})

let op_0 = getDelayedPromise(0)
ss.addResponse(op_0)
let op_1 = getDelayedPromise(1)
ss.addResponse(op_1)
let op_11 = getDelayedPromise(1)
ss.addResponse(op_11)


/*
//test2 (ended by the last resolved promise (op_1)) expected result: {participants:3 responses:[0,0,1,2,0]}
//----------------------------------------------------------------------------------
let ss = new SurveyServer()
ss.getResults().then(()=>{
  console.log("Results test 2: {participants:3 responses:[0,0,1,2,0]}");
  ss.toString()
})

let op_3 = getDelayedPromise(3)
ss.addResponse(op_3)
let op_2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{resolve(2)}, 6000)
})
ss.addResponse(op_2)
let op_33 = getDelayedPromise(3)
ss.addResponse(op_33)
*/



//== Web Server ==============================================================

import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


/* let surveyServer = {
  participants: 0,
  responses: [0, 0, 0, 0, 0]
} */
let surveyServer = new SurveyServer()
let g = getDelayedPromiseGenerator();

app.post('/vote/:vote?', (req, res) => { 
  console.log(req.params);
  let votePromise = g(req.params.vote);
  surveyServer.addResponse(votePromise);
})

app.get('/results', (req, res)=>{
  if(typeof surveyServer != 'undefined'){
    //TODO
    //aPormise.then(data=>res.json(data)).finally(()=>res.end())
    surveyServer.getResults().then(data => {
      res.json(data);
      res.end();
      console.log("sending response");
    });
  }else{ //dumy response
    setTimeout(()=>{
      res.json({participants: 30, responses:[5,10,12,1,2]})
      res.end()
      console.log("sending dumy response");
    }, 1000)
  }
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))


