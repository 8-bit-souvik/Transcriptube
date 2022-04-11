const fetch = require('cross-fetch');
const { Deepgram } = require('@deepgram/sdk');

// The API key you created in step 1
const deepgramApiKey = '7140e9a3002de178a8c7a70b4c7aabe35ce9fdfd';

// URL for the real-time streaming audio you would like to transcribe
const url = 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_fourlw_online_nonuk';

// Initialize the Deepgram SDK
const deepgram = new Deepgram(deepgramApiKey);

// Create a websocket connection to Deepgram
const deepgramLive = deepgram.transcription.live({
  punctuate: true,
  interim_results: false,
  language: 'en-GB'
});

// Listen for the connection to open and send streaming audio from the URL to Deepgram
fetch(url).then(r => r.body).then(res => {
  res.on('readable', () => {
    if(deepgramLive.getReadyState() === 1) {
      deepgramLive.send(res.read());
    }
  });
});

// Listen for the connection to close
deepgramLive.addListener('close', () => {
  console.log('Connection closed.')
});

// Listen for any transcripts received from Deepgram and write them to the console
deepgramLive.addListener('transcriptReceived', (transcription) => {
  console.dir(transcription, { depth: null });
});