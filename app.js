const playbtn = document.getElementById("play");
const pausebtn = document.getElementById("pause");
const stopbtn = document.getElementById("stop");
let synth = window.speechSynthesis;

let script = new SpeechSynthesisUtterance(
  "Hello My Friend, How are you? . ! . I hope you are doing well. ! Isn't it an exciting time to be alive?"
);

const getPosts = async () => {
  const res = await fetch("https://www.reddit.com/r/writingprompts.json");
  if (res.ok) console.log("response successful");
  else console.log("response failed");

  const json = await res.json();
  const data = json.data.children;

  return data;
};

console.log(synth.getVoices());

const createUtterances = (data) => {
  let utterances = [];
  data.forEach((post, i) => {
    const title = post.data.title;
    const utterance = new SpeechSynthesisUtterance(
      `Post Number ${i}: ${title}`
    );

    utterances.push(utterance);
  });
  return utterances;
};

// const doStuff = async () => {
//   const data = await getPosts();
//   let utterances = createUtterances(data);
//   console.log(utterances);
//   return utterances;
// };

const speakPosts = async () => {
  const data = await getPosts();
  let utterances = createUtterances(data);
  console.log("utterances done.");
  console.log(utterances.length);
  console.log(synth.speaking);
  console.log(utterances.pop());
  while (utterances.length != 0) {
    synth.speak(utterances.pop());
  }
};

const pauseSpeaking = () => {
  synth.paused ? synth.resume() : synth.pause();
};

const stopSpeaking = () => {
  if (synth.speaking) synth.cancel();
};

playbtn.addEventListener("click", speakPosts);
pausebtn.addEventListener("click", pauseSpeaking);
stopbtn.addEventListener("click", stopSpeaking);
