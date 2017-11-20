export default {
  common: {
    actions: 'Actions',
    author: 'Author',
    cancel: 'Cancel',
    create: 'Create',
    delete: 'Delete',
    edit: 'Edit',
    legend: 'Legend',
    referenceId: 'Reference Id',
    paths: 'Paths',
    save: 'Save',
    title: 'Title',
    type: 'Type',
    updated: 'Updated',
    yes: 'Yes',
    practices: 'Practices',
    practice: 'Practice'
  },
  header: {
    authorization: 'Authorization',
    contentTypeKey: 'Content-Type',
    contentTypeValue: 'application/json'
  },
  survey: {
    surveyType: 'Survey Type',
    submitSurveyTitle: 'Name Survey',
    path: 'Path',
    skipToPractice: 'Skip To Practice',
    createQuestion: 'WEEKLY WORKOUT',
    labelLongFormSurveyButton: 'Create A Long Survey'
  },
  questionContent: {
    left: {
      questionType: {
        type: 'Question Type',
        questionTitle: 'Question Title',
        questionSubTitle: 'Question',
        openText: {
          instruction: 'Instruction for text box',
          limitCharacters: '%d character limit for answers',
          remainCharacters: '%s Character Limit',
          numericSettings: 'Numeric Range:',
          rangeDescription: 'Allow numbers between %d1 and %d2.'
        }
      }
    },
    right: {
      addAnswer: 'Add an Answer',
      addQuestionToSurvey: 'Add a Question to Survey',
      editQuestionLogic: 'Edit Question Logic',
      editQuestionOrder: 'Edit Question Order',
      goToMap: 'GO TO MAP',
      removeAnswer: 'Remove an Answer',
      questionRequired: 'Make Question Required'
    }
  },
  dialog: {
    unAuthorizedToken: {
      title: 'Session Expired',
      msg: 'Your session has expired. Would you like to be redirected to the login page?',
      type: 'Warning'
    },
    delete: {
      title: 'Delete Question!',
      msg: 'Are you sure that you want to delete this question?',
      survey: {
        title: 'Delete Survey!',
        msg: 'Are you sure that you want to delete this survey?'
      }
    }
  }
};
