const nodes = document.querySelectorAll('.node');
const modal = document.querySelector('.modal');
const origImg = document.querySelector('.full-img');
const map = document.querySelector('#map');
const modalText = document.querySelector('#modal-text');
const caption = document.querySelector('#caption');
const instructions = document.querySelector('.instructions');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const svgNS = map.namespaceURI;
const padding = 50;

let coords = [];
let visited = false;

function calcDist(x1, x2, y1, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

document.addEventListener('scroll', (e) => {
  if (window.scrollX == 0) {
    left.style.opacity = '0';
  }
  if (window.scrollX > 0) {
    left.style.opacity = '1';
  }
  if (window.scrollX < document.body.scrollWidth / 2) {
    right.style.opacity = '1';
  }
  if (window.scrollX >= document.body.scrollWidth / 2) {
    right.style.opacity = '0';
  }
  if (window.scrollY > 0) {
    up.style.opacity = '1';
  }
  if (window.scrollY == 0) {
    up.style.opacity = '0';
  }
  if (window.scrollY < document.body.scrollHeight / 1.5) {
    down.style.opacity = '1';
  }
  if (window.scrollY >= document.body.scrollHeight / 1.5) {
    down.style.opacity = '0';
  }
});

nodes.forEach(node => {
  // generate random x and y coordinates for nodes upon load
  let xPos = Math.random() * (window.innerWidth * 2 - padding);
  let yPos = Math.random() * (window.innerHeight * 2 - padding);
  if (yPos < 50) {
    yPos = 70;
  }
  node.style.top = `${yPos}px`;
  node.style.left = `${xPos}px`;

  // open image on click and add to coords array
  node.addEventListener('click', (event) => {
    modal.classList.add("modal-open");
    origImg.classList.add("img-open");

    // add xPos and yPos of node to coords
    coords.push({xPos, yPos});

    // make sure clicks on the same node repeatedly doesn't update the coords array
    if ((coords.length > 1) && (JSON.stringify(coords[coords.length - 1]) == JSON.stringify(coords[coords.length - 2]))) {
      coords.pop();
    }

    const id = event.target.id;
    let text = event.target.dataset.text;
    
    // set image to the minified version
    origImg.src = `assets/pic${id}-min.jpg`;
    origImg.dataset.src = `assets/pic${id}.jpg`;
    origImg.alt = text;
    caption.innerHTML = text;

    // once image is loaded, switch to full image
    origImg.onload = () => origImg.src = origImg.dataset.src;

    // animate hover text
    setTimeout(() => {
      modalText.style.width = `${origImg.width}px`;
      modalText.style.height = `${origImg.height}px`;
      modalText.style.marginLeft = `${(window.innerWidth - origImg.width) / 2}px`;
      modalText.style.marginTop = `${(window.innerHeight - origImg.height) / 2}px`;
      modalText.style.transformOrigin = `${(window.innerWidth - origImg.width) / 2 + origImg.width / 2}px ${(window.innerHeight - origImg.height) / 2 + origImg.height / 2}px`;
      modalText.style.animation = 'fadeIn 1s ease forwards';
      modalText.style.animationDelay = '1s';
    }, 3500);

    // fade out text after 9 seconds to view text and image sufficiently
    setTimeout(() => {
      modalText.style.animation = 'fadeOut 1s ease forwards';
    }, 9500);

    // view modal image and exit automatically
    setTimeout(() => {
      modal.classList.remove("modal-open");
      origImg.classList.remove("img-open");
      
      // hide instructions after first click
      if (!visited) {
        visited = true;
        instructions.style.display = 'none';
      }
      // update map
      if (coords.length >= 2) {
        const offset = 15;
        const line = document.createElementNS(svgNS,'line');
        line.setAttribute('x1', coords[coords.length - 2].xPos + offset);
        line.setAttribute('y1', coords[coords.length - 2].yPos + offset / 2);
        line.setAttribute('x2', coords[coords.length - 1].xPos + offset);
        line.setAttribute('y2', coords[coords.length - 1].yPos + offset / 2);
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
    }, 11500);
  });
});
