# Build An Alexa Local Recommendations Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

[Voice User Interface](/step-by-step/1-voice-user-interface.md) || [Lambda Function](/step-by-step/2-lambda-function.md) || [Connect VUI to Code](/step-by-step/3-connect-vui-to-code.md) || [Testing](/step-by-step/4-testing.md) || [Customization](/step-by-step/5-customization.md) || [Intents and Slots](/step-by-step/6-intents-slots.md) || [Smart Recommendations](/step-by-step/7-smart-recommendations.md) || [Alexa Design](/step-by-step/8-alexa-design.md) || [IoT](https://github.com/voicehacks/alexa-iot/blob/master/README.md) || [Publication](/step-by-step/10-publication.md)


<!--<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->


## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  State Management
*  [Speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](#).
*  Simple graphical editing tool

## What Your Skill Will Do
Welcome to Voicehacks! At some point we all gain some unexpected free time and wonder "What should I do today?". Whether going to a local restaurant or coffeehouse, checking out the local library, or just staying inside if the weather is bad, some suggestions are almost always welcome. Especially when those suggestions come from an individual who knows the area very well.

You can now bring that experience to Alexa using our new local recommendations template. Today you will provide the city and the places to visit in that city, and Alexa will dynamically build a recommendation for you. In the guide, Alexa will give recommendations like:
*  "For breakfast, try this, Zeke's place."
*  "Seaport Grille is located at 6 Rowe Square."
*  "Try whale watching, which is 8 miles away. Have fun!"

If you’re in the US, we've also included the new [speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference) feature for Alexa skill development. Speechcons are special words and phrases that Alexa pronounces more expressively. We use them in this quiz game to let the user know whether they gave a correct or incorrect answer during the quiz.

If you would like to see an example of this skill in action, you can enable the [Gloucester Guide](https://www.amazon.com/Robert-McCauley-Gloucester-Guide/dp/B0736QNPP1/ref=sr_1_5?s=digital-skills&ie=UTF8&qid=1501180976&sr=1-5&keywords=local+guide) from the [Alexa app](http://amazon.com/skills).  You may not get all of the info right away, but you'll definitely get a great feel for what your new local guide could sound like!

<a href="/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>

For the Recipe Modules, <a href="https://github.com/voicehacks/Recipe"> click here</a>.
# alexa-skill-local-recommendations
# alexa-skill-local-recommendations
