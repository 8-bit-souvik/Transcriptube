const axios = require("axios");
const { Deepgram } = require("@deepgram/sdk");
const { Module } = require("module");
const express = require("express");
const router = express.Router();

const deepgramApiKey = process.env.deepgramApiKey;
const xrapidAPIkey = process.env.xrapidAPIkey

router.post("/transcript", (req, res, next) => {

  let url = req.body.url;
  console.log(url);
  const options = {
    method: "GET",
    url: "https://socialdownloader.p.rapidapi.com/api/youtube/video",
    params: { video_link: url },
    headers: {
      "X-RapidAPI-Host": "socialdownloader.p.rapidapi.com",
      "X-RapidAPI-Key": xrapidAPIkey,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let info = response.data.body.url;

      function check(age) {
        return age.ext == "m4a";
      }

      meta = info.find(check);

      //   fs.writeFile("meta.txt", JSON.stringify(response.data, null, 2), (err) => {
      //     if (err) throw err;
      //     console.log("metadata saved!");
      //   });

      console.log(`time left:  ${response.data.body.meta.duration}`);

      const audioUrl = meta.url;

      const deepgram = new Deepgram(deepgramApiKey);

      console.log("Requesting transcript...");

      deepgram.transcription
        .preRecorded({ url: audioUrl }, { punctuate: true, language: "en-GB" })
        .then((transcription) => {
          let script =
            transcription.results.channels[0].alternatives[0].transcript;

          //   fs.writeFile(
          //     "transcript.txt",
          //     JSON.stringify(script, null, 2),
          //     (err) => {
          //       if (err) throw err;
          //       console.log("transcript saved!");
          //     }
          //   );

          // console.log(`result: ${script}`);
          console.log("success! \n");

          return res.send({ script: script });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
