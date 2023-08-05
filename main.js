const nodes = document.querySelectorAll('.node');
const map = document.querySelector('#map');
const instructions = document.querySelector('.instructions');
const frame = document.querySelector(".frame");
const close = document.querySelector("#close")
const svgNS = map.namespaceURI;
const padding = 50;

let coords = [];
let visited = false;

let sites = [
  "https://longdogechallenge.com/",
  "https://heeeeeeeey.com/",
  "https://corndog.io/",
  "https://mondrianandme.com/",
  "https://puginarug.com",
  "https://alwaysjudgeabookbyitscover.com",
  "https://thatsthefinger.com/",
  "https://cant-not-tweet-this.com/",
  "https://weirdorconfusing.com/",
  "https://eelslap.com/",
  "https://burymewithmymoney.com/",
  "https://smashthewalls.com/",
  "https://jacksonpollock.org/",
  "https://endless.horse/",
  "https://www.trypap.com/",
  "https://www.republiquedesmangues.fr/",
  "https://www.movenowthinklater.com/",
  "https://www.partridgegetslucky.com/",
  "https://www.rrrgggbbb.com/",
  "https://beesbeesbees.com/",
  "https://www.koalastothemax.com/",
  "https://www.everydayim.com/",
  "https://randomcolour.com/",
  "https://cat-bounce.com/",
  "https://chrismckenzie.com/",
  "https://thezen.zone/",
  "https://hasthelargehadroncolliderdestroyedtheworldyet.com/",
  "https://ninjaflex.com/",
  "https://ihasabucket.com/",
  "https://corndogoncorndog.com/",
  "https://www.hackertyper.com/",
  "https://pointerpointer.com",
  "https://imaninja.com/",
  "https://drawing.garden/",
  "https://www.ismycomputeron.com/",
  "https://www.nullingthevoid.com/",
  "https://www.muchbetterthanthis.com/",
  "https://www.yesnoif.com/",
  "https://lacquerlacquer.com",
  "https://potatoortomato.com/",
  "https://iamawesome.com/",
  "https://strobe.cool/",
  "https://www.pleaselike.com/",
  "https://crouton.net/",
  "https://corgiorgy.com/",
  "https://www.wutdafuk.com/",
  "https://unicodesnowmanforyou.com/",
  "https://chillestmonkey.com/",
  "https://scroll-o-meter.club/",
  "https://tencents.info/",
  "https://boringboringboring.com/",
  "https://pixelsfighting.com/",
  "https://isitwhite.com/",
  "https://existentialcrisis.com/",
  "https://onemillionlols.com/",
  "https://www.omfgdogs.com/",
  "https://oct82.com/",
  "https://chihuahuaspin.com/",
  "https://www.blankwindows.com/",
  "https://tunnelsnakes.com/",
  "https://www.trashloop.com/",
  "https://www.ascii-middle-finger.com/",
  "https://www.donothingfor2minutes.com/",
  "https://buildshruggie.com/",
  "https://buzzybuzz.biz/",
  "https://yeahlemons.com/",
  "https://wowenwilsonquiz.com",
  "https://thepigeon.org/",
  "https://notdayoftheweek.com/",
  "https://nooooooooooooooo.com/",
  "https://greatbignothing.com/",
  "https://zoomquilt.org/",
  "https://dadlaughbutton.com/",
  "https://remarkablemark.org/Bouncing-DVD-Logo/",
  "https://remoji.com/",
  "https://papertoilet.com/",
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
    const object = document.createElement('object');
    object.setAttribute('type', 'text/html')
    object.setAttribute('data', selectWebsite())  
    object.setAttribute('id', 'website');
    
    frame.appendChild(object)

    // hide instructions after first click
    if (!visited) {
      visited = true;
      instructions.style.display = 'none';
    }

    // slight delay in interaction
    setTimeout(() => {
      // display frame
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

    close.addEventListener('click', () => {
      frame.style.display = 'none';
      frame.removeChild(document.getElementById('website'));

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
