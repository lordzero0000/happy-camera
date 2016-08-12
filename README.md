# Happy Camera

Let's show your emotion in pictures!

This project gets a picture from your camera and gets an image based on the emotion that you showed on that picture.
We use the Emotion API from Microsoft Cognitive Services, so in order to make this work, you should have a subscription key.

## How to run

To run this project you'll need to use the next commands:

```
npm install
git clone https://github.com/jhuckaby/webcamjs.git webcamjs
npm start
```

And now, you can go to ``http://localhost:1337?token=myAwesomeToken`` (you can set the port using the PORT environment variable) and start to pose to the camera!
You'll need to use your token from Microsoft Cognitive Services Emotion API, [get it here](https://www.microsoft.com/cognitive-services/en-us/pricing).
