/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const sentencesFile = require('./sentences.json');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
	
	var speechText = "";
	if (sentencesFile.sentences)
	{
		var sentences = sentencesFile.sentences;
		if (sentences)
		{
			var randomNumber = getRandom(0, sentences.length - 1);
			speechText = sentences[randomNumber].sentence;
			if (speechText == "")	  
				speechText = "Sei un grande!";
		}
	}
	return handlerInput.responseBuilder
		.speak(speechText)
		.getResponse();		
	},
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Ti basta dire motivami!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'A presto!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Mi dispiace. Non sono riuscita a capire cosa mi hai chiesto. Dimmi motivami!')
      .reprompt('Mi dispiace. Non sono riuscita a capire cosa mi hai chiesto. Dimmi motivami!')
      .getResponse();
  },
};

/* Utils Functions */

function getRandom(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();