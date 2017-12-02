import alertify from 'alertify.js';
export class QuestionBulkUploadController {
  constructor($uibModalInstance, items, $scope, QuestionService) {
    'ngInject';
    this.QuestionService = QuestionService;
    this.questionsToEachSet = 10;
    this.currentQuestionSetIndex = 0;
    this.currentQuestionSet = [];
    this.uibModalInstance = $uibModalInstance;
    this.scope = $scope;
    // this.QuizService = QuizService;
    // this.projectDetail = items.project;
    this.fileName = items.fileName;
    this.examType = items.examType;
    this.uploadedList = [];
    // this.ProjectDetailService = ProjectDetailService;
    // this.metaInformation = {
    //   learningLevel: this.projectDetail.learningLevel || {},
    //   lang: this.projectDetail.lang || {},
    //   board: this.projectDetail.board || {},
    //   grade: this.projectDetail.grade || {},
    //   subjectGroup: this.projectDetail.subjectGroup || {},
    //   subject: this.projectDetail.subject || {},
    //   topic: this.projectDetail.topic,
    //   skills: [],
    //   licence: this.projectDetail.licence
    // };
    this.multipleAnswer = 'multipleAnswer';
    this.singleAnswer = 'singleAnswer';
    this.reflectivePause = 'reflectivePause';
    this.fillTheBlanks = 'fillTheBlanks';
    this.trueFalse = 'trueFalse';
    this.matchTheFollowing = 'matchTheFollowing';
    this.questionTypesArray = ['singleAnswer'];
    this.possibleChoices = ['1', '2', '3', '4'];
    this.selectAll = true;
    // this.getSkills();
    this.buildData(items.data);
  }

  getQuizSchema(title, projectId, questionSet, metaInformation) {
    return {
      "title": title,
      "description": "sample quiz",
      "microCourseType": "quiz",
      "type": "microCourse",
      "projectId": projectId,
      "thumbnail": {
        "bytes": 142223,
        "createdBy": "58d6697305dde71d00f1cb2a",
        "creationTime": "2017-11-04T10:31:40.978Z",
        "format": "jpg",
        "height": 300,
        "id": "59fd970c156a9d00056bb822",
        "lastUpdatedBy": "58d6697305dde71d00f1cb2a",
        "lastUpdationTime": "2017-11-04T10:31:40.978Z",
        "original_filename": "whuhntubz6r6o9vfnm6r",
        "private": true,
        "public_id": "taxqgdeifdi6tpdtbsy2",
        "resource_type": "image",
        "secure_url": "https://res.cloudinary.com/dra5yicjk/image/upload/v1509791498/taxqgdeifdi6tpdtbsy2.jpg",
        "thumb": "https://res.cloudinary.com/dra5yicjk/image/upload/v1509791500/zukvklbqddb9tvzlzx1g.jpg",
        "thumbXL": "https://res.cloudinary.com/dra5yicjk/image/upload/q_auto:low/v1509791498/taxqgdeifdi6tpdtbsy2.jpg",
        "type": "upload",
        "url": "https://res.cloudinary.com/dra5yicjk/image/upload/v1509791498/taxqgdeifdi6tpdtbsy2.jpg",
        "version": 1509791498,
        "width": 1200
      },
      "thumbnailCredit": "http://www.bing.com/cr?IG=27749D7939344E50B85490BF4EE2C0DE&CID=35683479874364D206AC3F5686A665B0&rd=1&h=xaAv0VKdpbVrDvOanfM45_akKM9e8sDELJmzgPJPFj8&v=1&r=http%3a%2f%2fwww.copyrightlaws.com%2fwp-content%2fuploads%2f2016%2f11%2fQuiz.jpg&p=DevEx,5009.1",
      "metaInformation": metaInformation,
      "questions": questionSet,
      "isEmpty": false,
      "quizTitle": title,
      "quizToRender": "objective",
      "url": "",
      "resources": []
    }
  }

  getSkills() {
    this.isAPICall = true;
    this.ProjectDetailService.getSkills(this.metaInformation, this.projectDetail.projectType.id).then((result) => {
      this.isAPICall = false;
      this.skills = result;
    }, (error) => {
      this.isAPICall = false;
      alertify.error(error.error.message);
    });
  }

  buildData(list) {
    list.splice(0, 1);
    list.splice((list.length - 1), 1);
    this.uploadedList = [];
    for (const _L of list) {
      // const isSelected = true;
      this.uploadedList.push({
        isSelected: true,
        examType: this.examType,
        type: _L[1],
        language: _L[2],
        question: _L[3],
        choice1: _L[4],
        choice2: _L[5],
        choice3: _L[6],
        choice4: _L[7],
        correctChoice: _L[8]
      });
    };
    // this.isAPICall = false;
    // this.questionSetsArray = this.uploadedList.reduce((acc, curr, i) => {
    //   if (!(i % this.questionsToEachSet)) {    // if index is 0 or can be divided by the `size`...
    //     acc.push(this.uploadedList.slice(i, i + this.questionsToEachSet));   // ..push a chunk of the original array to the accumulator
    //   }
    //   return acc;
    // }, []);
    // this.currentQuestionSet = this.questionSetsArray[this.currentQuestionSetIndex];
  }

  selectAllFn(flag) {
    this.selectAll = flag;
    for (const _UL of this.uploadedList) {
      _UL.isSelected = flag;
    }
  }

  addBulkSkills() {
    if (this.bulkSkillsForQuestions && this.bulkSkillsForQuestions.length) {
      let count = 0;
      for (let i = 0; i < this.currentQuestionSet.length; i++) {
        if (this.currentQuestionSet[i].isSelected) {
          count += 1;
          this.currentQuestionSet[i].skills = this.bulkSkillsForQuestions;
        }
      }
      if (count === 0) {
        alertify.error('Please select questions to add skills');
        return;
      }
    } else {
      alertify.error('Please select skills to add');
    }
  }

  upload() {
    this.data = [];
    for (let i = 0; i < this.uploadedList.length; i++) {
      if (this.uploadedList[i].isSelected) {
        let question = this.buildQuestion(this.uploadedList[i], i + 1);
        if (question) {
          this.data.push(question);
        }
        else {
          return;
        }
      }
    }
    if (!this.data.length) {
      alertify.error('No question selected');
      return;
    }
    this.isAPICall = true;
    this.QuestionService.bulkUploadQuestions(this.data).then((respData) => {
      alertify.success('Questions uploaded successfully');
      this.isAPICall = false;
      this.uibModalInstance.dismiss();
    }, (err) => {
      this.isAPICall = false;
      alertify.error('Error Occurred! Plz try again');
    });
  }

  buildQuestion(question, index) {
    this.dataQuestion = { type: question.type, choices: [], examType: question.examType };
    if (this.questionTypesArray.indexOf(this.dataQuestion.type) === -1) {
      alertify.error(`Invalid QuestionType for question no. ${index}`);
      return false;
    }
    if (question.language.toLowerCase() === 'english' || question.language.toLowerCase() === 'hindi') {
      if (question.language.toLowerCase() === 'english') {
        this.dataQuestion.language = 'english';
      } else if (question.language.toLowerCase() === 'hindi') {
        this.dataQuestion.language = 'hindi';
      }
    } else {
      alertify.error(`Invalid language for question no. ${index}`);
      return false;
    }
    // if (question.isImageIncluded.toLowerCase() === 'y' || question.isImageIncluded.toLowerCase() === 'n') {
    //   if (question.isImageIncluded.toLowerCase() === 'y') {
    //     if (question.imageURl) {
    //       this.dataQuestion.isImageIncluded = true;
    //       this.dataQuestion.imageURl = question.imageURl;
    //     } else {
    //       alertify.error(`Invalid imageURL for question no. ${index}`);
    //       return false;
    //     }
    //   } else {
    //     this.dataQuestion.isImageIncluded = false;
    //   }
    // } else {
    //   alertify.error(`Invalid isImageIncluded for question no. ${index}`);
    //   return false;
    // }
    // if (question.type !== this.matchTheFollowing) {
    if (question.question) {
      this.dataQuestion.question = question.question;
    } else {
      alertify.error(`Question text can not empty for question no. ${index}`);
      return false;
    }
    // }
    // if (question.type !== this.reflectivePause) {
    //   if (question.explanation) {
    //     this.dataQuestion.explanation = question.explanation;
    //   } else {
    //     alertify.error(`Explanation can not empty for question no. ${index}`);
    //     return false;
    //   }
    // }
    // for (let i = 1; i < 4; i++) {
    //   if (question[`hint${i}`]) {
    //     this.dataQuestion.hints.push({ content: question[`hint${i}`] });
    //   }
    // }
    if (question.type === this.trueFalse || question.type === this.singleAnswer || question.type === this.multipleAnswer) {
      this.dataQuestion.choices = [];
      // let trueCount = 0, falseCount = 0;
      for (let i = 1; i < 5; i++) {
        if (question[`choice${i}`]) {
          this.dataQuestion.choices.push({ content: question[`choice${i}`], isCorrect: false });
        } else {
          alertify.error(`Invalid ${i} option in question no. ${index}`);
          return false;
        }
      }
      if (!question.correctChoice) {
        alertify.error(`Correct option field is must for question no. ${index}`);
        return false;
      }
      if (this.possibleChoices.indexOf(question.correctChoice) == -1) {
        alertify.error(`Invalid correct option for question no. ${index}, Only 1/2/3/4 is allowed`);
        return false;
      }
      for (let i = 1; i < 5; i++) {
        i == question.correctChoice ? (this.dataQuestion.choices[i-1].isCorrect = true) : (this.dataQuestion.choices[i-1].isCorrect = false);
      }
      // if (this.dataQuestion.choices.length < 2 || (question.type === this.trueFalse && this.dataQuestion.choices.length > 2)) {
      //   alertify.error(`At least two valid choices/Answers required for question no. ${index}`);
      //   return false;
      // }
      // if (question.type === this.trueFalse) {
      //   this.dataQuestion.choices[0].content = 'True';
      //   this.dataQuestion.choices[1].content = 'False';
      //   if (trueCount !== 1 || falseCount !== 1) {
      //     alertify.error(`Both answers can not be same in question no. ${index}`);
      //     return false;
      //   }
      // }
      // if (question.type === this.singleAnswer && trueCount !== 1) {
      //   alertify.error(`At Least/Most one correct answer required for question no. ${index}`);
      //   return false;
      // }
      // if (question.type === this.multipleAnswer && trueCount < 1) {
      //   alertify.error(`At least one correct answer required for question no. ${index}`);
      //   return false;
      // }
    }
    // if (question.type === this.matchTheFollowing) {
    //   this.dataQuestion.question = { 'entityName': '', 'placeHolderName': '', 'matchingContent': [] };
    //   if (!question.entityName) {
    //     alertify.error(`EntityName is must for question no. ${index}`);
    //     return false;
    //   } else {
    //     this.dataQuestion.question.entityName = question.entityName;
    //   }
    //   if (!question.placeHolderName) {
    //     alertify.error(`PlaceHolderName is must for question no. ${index}`);
    //     return false;
    //   } else {
    //     this.dataQuestion.question.placeHolderName = question.placeHolderName;
    //   }
    //   for (let i = 1; i < 6; i++) {
    //     if (question[`placeholder${i}`] && question[`entity${i}`]) {
    //       this.dataQuestion.question.matchingContent.push({ entity: question[`entity${i}`], placeholder: question[`placeholder${i}`] });
    //     }
    //   }
    //   if (this.dataQuestion.question.matchingContent.length < 2) {
    //     alertify.error(`At least two entities and placeholders required for question no. ${index}`);
    //     return false;
    //   }
    // }
    return this.dataQuestion;
  }
}