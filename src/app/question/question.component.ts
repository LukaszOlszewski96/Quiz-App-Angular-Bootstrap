import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string = "";
  public questionList : any = [];
  public currentQuestion : number = 0;
  public timer : any ;
  public counter : number = 5;
  public questionNumber : number = 1;
  public points : number = 0;
  public correctAnswer : number = 0;
  public inCorrectAnswer : number = 0;
  public endQuiz : boolean = false;
  public scoreOne : boolean = false;
  public scoreTwo : boolean = false;
  public scoreThree : boolean = false;
  public scorePrecent : number = 0 ;
  public mins: number = 4;
  public  sec: number = 60;

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();

    if (this.mins === 0 && this.sec === 0) {
      this.stopCounter();

    }
  }

  

  getAllQuestions() {
    this.questionService.getQuestionJson()
    .subscribe(res=> {
      this.questionList = res.questions;
    })
  }

  nextQuestion() {
    this.currentQuestion++;
    this.questionNumber++;
    this.resetCounter();
    if(this.currentQuestion === this.questionList.length) {
      this.endQuiz = true;
      this.getPrecentage();
    }
  }

  prevQuestion() {
    this.currentQuestion--;
    this.questionNumber--;
    this.resetCounter();
    if(this.currentQuestion === this.questionList.length) {
      this.endQuiz = true;
      this.getPrecentage();
    }
  }

  setAnswer(currentQue:number,option:any) {

    if(option.correct){
      this.points++;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.questionNumber++;

        if(currentQue === this.questionList.length) {
          this.endQuiz = true;
          this.getPrecentage();
        }
      },1000)
    }else {
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.questionNumber++;
        if(currentQue === this.questionList.length) {
          this.endQuiz = true;
          this.getPrecentage();
        }
      },1000)
    }

    this.resetCounter();
  }
  
  
  startCounter() {
    this.timer = interval(1000)
      .subscribe(val => {
        this.sec--;
        if(this.sec === 0){
          this.mins = this.mins - 1;
          this.sec = 60;
        }
      });
    setTimeout(() => {
      this.timer.unsubscribe();
    }, 500000) 
  }

  stopCounter() {
    this.timer.unsubscribe();
    this.mins = 0;
    this.sec = 0;
  }

  resetCounter() {
    this.mins = 4;
    this.sec = 60;
    this.startCounter();
  }

  getPrecentage () {
    
    this.scorePrecent = Math.round((this.correctAnswer/this.questionList.length)*100);
    if ( this.scorePrecent <= 50){
      this.scoreOne = true;
    }
    if (this.scorePrecent >50 && this.scorePrecent<81){
      this.scoreTwo = true;
    }
    if (this.scorePrecent >=81 && this.scorePrecent <= 100){
      this.scoreThree = true;
    }

  }

  backHome ()  {
    
  }

}
