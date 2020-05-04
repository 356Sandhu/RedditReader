const playbtn = document.getElementById("play");
const pausebtn = document.getElementById("pause");
const stopbtn = document.getElementById("stop");
const cPost = document.getElementById("currentPost");
const links = document.querySelectorAll(".subreddit-link");
const postsRemaining = document.getElementById("posts-remaining");
const searchBar = document.getElementById("searchBar");

let synth = window.speechSynthesis;

const getPosts = async (subreddit) => {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  const json = await res.json();
  const data = json.data.children;
  return data;
};

// const createUtterances = (data) => {
//   let utterances = [];
//   data.forEach((post, i) => {
//     const title = post.data.title;
//     const utterance = new SpeechSynthesisUtterance(
//       `Post Number ${i}: ${title}`
//     );
//     utterances.push(utterance);
//   });
//   return utterances;
// };

// const speakPosts = async () => {
//   const data = await getPosts("worldnews");
//   let utterances = createUtterances(data);
//   let one = utterances[0];
//   synth.speak(one);
//   one.onend
//   console.log("utterance creation done.");
//   await speakingPromise(utterances);
//   // console.log("looping");
//   // if (!synth.speaking) {
//   //   console.log("speaking a post!");
//   //   synth.speak(utterances.pop());
//   // }
// };

let posts = [];
let currentSubTitle = "worldnews";
let currentSub = links[0];

const speaker = () => {
  if (posts.length == 0) {
    return true;
  } else {
    let currentPost = posts.pop();
    let utterance = new SpeechSynthesisUtterance(currentPost);
    synth.speak(utterance);
    cPost.textContent = currentPost;
    postsRemaining.textContent = posts.length;
    utterance.onend = function (e) {
      console.log("done speaking!");
      speaker();
    };
  }
};

const speakPosts = async () => {
  const data = await getPosts(currentSubTitle);
  data.forEach((post, i) => {
    posts.push(post.data.title);
  });
  speaker();
  cPost.classList.remove("paused");
};

const pauseSpeaking = () => {
  if (synth.paused) {
    synth.resume;
    cPost.classList.remove("paused");
  } else {
    synth.pause();
    cPost.classList.add("paused");
  }
  synth.paused ? synth.resume() : synth.pause();
};

const stopSpeaking = () => {
  if (synth.speaking) synth.cancel();
  posts = [];
  cPost.textContent = "";
  postsRemaining.textContent = "Queue is empty.";
  cPost.classList.remove("paused");
  console.log("Post Queue cleared.");
};

playbtn.addEventListener("click", speakPosts);
pausebtn.addEventListener("click", pauseSpeaking);
stopbtn.addEventListener("click", stopSpeaking);

let curatedSubs = [];

links.forEach((link) => {
  console.log("added event listeners");
  curatedSubs.push(link.textContent);
  link.addEventListener("click", (e) => {
    changeSub(e.target.textContent);
    console.log(`Changed to ${currentSubTitle}`);
    e.preventDefault();
  });
});

function changeSub(newSub) {
  if (curatedSubs.includes(currentSub.textContent)) {
    currentSub.classList.remove("currentSub");
  }
  currentSub = newSub;
  currentSubTitle = currentSub.textContent;
  if (curatedSubs.includes(currentSub.textContent)) {
    currentSub.classList.add("currentSub");
  }
}

searchBar.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    // currentSub.classList.remove("currentSub");
    let sub = document.createElement("li");
    sub.textContent = searchBar.value;
    changeSub(sub);
    console.log("changed to", currentSubTitle);
  }
});
