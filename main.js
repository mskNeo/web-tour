const nodes = document.querySelectorAll('.node');
const modal = document.querySelector('.modal');
const map = document.querySelector('#map');
const instructions = document.querySelector('.instructions');
const frame = document.querySelector(".frame");
const frameWindow = document.querySelector(".frame object");
const svgNS = map.namespaceURI;
const padding = 50;

let coords = [];
let visited = false;

let sites = [
  "https://longdogechallenge.com/",
  "http://heeeeeeeey.com/",
  "http://corndog.io/",
  "https://mondrianandme.com/",
  "https://puginarug.com",
  "https://alwaysjudgeabookbyitscover.com",
  "https://thatsthefinger.com/",
  "https://cant-not-tweet-this.com/",
  "https://weirdorconfusing.com/",
  "http://eelslap.com/",
  "http://www.staggeringbeauty.com/",
  "http://burymewithmymoney.com/",
  "https://smashthewalls.com/",
  "https://jacksonpollock.org/",
  "http://endless.horse/",
  "https://www.trypap.com/",
  "http://www.republiquedesmangues.fr/",
  "http://www.movenowthinklater.com/",
  "http://www.partridgegetslucky.com/",
  "http://www.rrrgggbbb.com/",
  "http://beesbeesbees.com/",
  "http://www.koalastothemax.com/",
  "http://www.everydayim.com/",
  "http://randomcolour.com/",
  "http://cat-bounce.com/",
  "http://chrismckenzie.com/",
  "https://thezen.zone/",
  "http://hasthelargehadroncolliderdestroyedtheworldyet.com/",
  "http://ninjaflex.com/",
  "http://ihasabucket.com/",
  "http://corndogoncorndog.com/",
  "http://www.hackertyper.com/",
  "https://pointerpointer.com",
  "http://imaninja.com/",
  "http://drawing.garden/",
  "http://www.ismycomputeron.com/",
  "http://www.nullingthevoid.com/",
  "http://www.muchbetterthanthis.com/",
  "http://www.yesnoif.com/",
  "http://lacquerlacquer.com",
  "http://potatoortomato.com/",
  "http://iamawesome.com/",
  "https://strobe.cool/",
  "http://www.pleaselike.com/",
  "http://crouton.net/",
  "http://corgiorgy.com/",
  "http://www.wutdafuk.com/",
  "http://unicodesnowmanforyou.com/",
  "http://chillestmonkey.com/",
  "http://scroll-o-meter.club/",
  "http://www.crossdivisions.com/",
  "http://tencents.info/",
  "https://boringboringboring.com/",
  "http://www.patience-is-a-virtue.org/",
  "http://pixelsfighting.com/",
  "http://isitwhite.com/",
  "https://existentialcrisis.com/",
  "http://onemillionlols.com/",
  "http://www.omfgdogs.com/",
  "http://oct82.com/",
  "http://chihuahuaspin.com/",
  "http://www.blankwindows.com/",
  "http://dogs.are.the.most.moe/",
  "http://tunnelsnakes.com/",
  "http://www.trashloop.com/",
  "http://www.ascii-middle-finger.com/",
  "http://spaceis.cool/",
  "http://www.donothingfor2minutes.com/",
  "http://buildshruggie.com/",
  "http://buzzybuzz.biz/",
  "http://yeahlemons.com/",
  "http://wowenwilsonquiz.com",
  "https://thepigeon.org/",
  "http://notdayoftheweek.com/",
  "http://www.amialright.com/",
  "http://nooooooooooooooo.com/",
  "https://greatbignothing.com/",
  "https://zoomquilt.org/",
  "https://dadlaughbutton.com/",
  "https://remarkablemark.org/Bouncing-DVD-Logo/",
  "https://remoji.com/",
  "http://papertoilet.com/",
];

const selectWebsite = () => {
  const range = sites.length;
  const index = Math.floor(Math.random() * range);

  const site = sites[index];
  sites.splice(index, 1);

  return site;
}

nodes.forEach(node => {
  // generate random x and y coordinates for nodes upon load
  let xPos = Math.random() * (window.innerWidth - padding);
  let yPos = Math.random() * (window.innerHeight - padding);
  if (yPos < 50) {
    yPos = 70;
  }
  node.style.top = `${yPos}px`;
  node.style.left = `${xPos}px`;

  // open image on click and add to coords array
  node.addEventListener('click', (event) => {
    frameWindow.setAttribute('data', selectWebsite());

    // hide instructions after first click
    if (!visited) {
      visited = true;
      instructions.style.display = 'none';
    }

    setTimeout(() => {
      frame.style.display = "block";
      // add xPos and yPos of node to coords
      coords.push({xPos, yPos});

      // make sure clicks on the same node repeatedly doesn't update the coords array
      if ((coords.length > 1) && (JSON.stringify(coords[coords.length - 1]) == JSON.stringify(coords[coords.length - 2]))) {
        coords.pop();
      }

      nodes.forEach(ele => {
        ele.style.backgroundColor = 'grey';
      });
    }, 500);
  });

  map.addEventListener('click', () => {
    frame.style.display = 'none';
    frameWindow.setAttribute('data', '');

    nodes.forEach(ele => {
      ele.style.backgroundColor = 'whitesmoke';
    });

    // update map
    if (coords.length >= 2) {
      const offset = 15;
      const line = document.createElementNS(svgNS,'line');
      line.setAttribute('x1', coords[coords.length - 2].xPos + offset);
      line.setAttribute('y1', coords[coords.length - 2].yPos + offset);
      line.setAttribute('x2', coords[coords.length - 1].xPos + offset);
      line.setAttribute('y2', coords[coords.length - 1].yPos + offset);
      line.setAttribute('stroke', 'whitesmoke');
      line.setAttribute('stroke-width', 2);
      line.setAttribute('class', 'mapPath');
      map.append(line);

      // set up paths in map to be animated
      const paths = document.querySelectorAll('.mapPath');

      paths.forEach(path => {
        path.style.strokeDasharray = path.getTotalLength();
        path.style.strokeDashoffset = path.getTotalLength();
      })
    }
  })
});
