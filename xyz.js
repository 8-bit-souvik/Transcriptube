const { Deepgram } = require('@deepgram/sdk');

// The API key you created in step 1
const deepgramApiKey = '7140e9a3002de178a8c7a70b4c7aabe35ce9fdfd';

// Hosted sample file
const audioUrl = "https://www.youtube.com/results?search_query=fuck+you+nvdia";

// Initializes the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

console.log('Requesting transcript...')

deepgram.transcription.preRecorded(
  { url: audioUrl },
  { punctuate: true, language: 'en-GB' },
)
.then((transcription) => {
  console.dir(transcription, {depth: null});
})
.catch((err) => {
  console.log(err);
});