const btn = document.getElementById("btn");
let synth = window.speechSynthesis;

let script = new SpeechSynthesisUtterance(
  "Hello My Friend, How are you? . ! . I hope you are doing well. ! Isn't it an exciting time to be alive?"
);

const getPosts = async () => {
  const res = await fetch("https://www.reddit.com/.json");
  if (res.ok) console.log("response successful");
  else console.log("response failed");
  const json = await res.json();
  const data = json.data.children;
  // data.forEach((item) => {
  //   console.log(item.data.title);
  // });

  return data;
};

// const doShit = async () => {
//   const data = await getPosts();

//   data.forEach((item) => {
//     console.log(`TITLE: ${item.data.title}`);
//   });

//   let randomPost = data[1].data.title;

// };

// doShit();

btn.addEventListener("click", () => {
  synth.speak(script);
});
