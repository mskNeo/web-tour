const nodes = document.querySelectorAll('.node');
const modal = document.querySelector('.modal');
const origImg = document.querySelector('.full-img');
const map = document.querySelector('#map');
const svgNS = map.namespaceURI;
const padding = 20;

let coords = [];

nodes.forEach(node => {
  // generate random x and y coordinates for nodes upon load
  let xPos = Math.random() * (window.innerWidth - padding);
  let yPos = Math.random() * (window.innerHeight - padding);
  node.style.top = `${yPos}px`;
  node.style.left = `${xPos}px`;

  // open image on click and add to coords array
  node.addEventListener('click', (event) => {
    modal.classList.add("modal-open");
    origImg.classList.add("img-open");

    coords = coords.concat({xPos, yPos});

    const id = event.target.id;
    
    origImg.src = `assets/pic${id}-min.jpg`;
    origImg.dataset.src = `assets/pic${id}.jpg`;

    origImg.onload = () => {
      return origImg.src = origImg.dataset.src;
    }
  });
});

// exit full-screen view of photo
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
      modal.classList.remove("modal-open");
      origImg.classList.remove("img-open");
  }
  // update map
  if (coords.length >= 2) {
    const offset = 6;
    const line = document.createElementNS(svgNS,'line');
    line.setAttribute('x1', coords[coords.length - 2].xPos + offset);
    line.setAttribute('y1', coords[coords.length - 2].yPos + offset);
    line.setAttribute('x2', coords[coords.length - 1].xPos + offset);
    line.setAttribute('y2', coords[coords.length - 1].yPos + offset);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('class', 'mapPath');
    map.append(line);

    const paths = document.querySelectorAll('.mapPath');

    paths.forEach(path => {
      path.style.strokeDasharray = path.getTotalLength();
      path.style.strokeDashoffset = path.getTotalLength();
    })
  }
});
