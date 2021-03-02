const nodes = document.querySelectorAll('.node');
const modal = document.querySelector('.modal');
const origImg = document.querySelector('.full-img');
const map = document.querySelector('#map');
const modalText = document.querySelector('#modal-text');
const caption = document.querySelector('#caption');
const svgNS = map.namespaceURI;
const padding = 30;

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

    // animate hover text
    setTimeout(() => {
      modalText.style.width = `${origImg.width}px`;
      modalText.style.height = `${origImg.height}px`;
      modalText.style.marginLeft = `${(window.innerWidth - origImg.width) / 2}px`;
      modalText.style.marginTop = `${(window.innerHeight - origImg.height) / 2}px`;
      modalText.style.transformOrigin = `${(window.innerWidth - origImg.width) / 2 + origImg.width / 2}px ${(window.innerHeight - origImg.height) / 2 + origImg.height / 2}px`;
    }, 1000);

    // once image is loaded, switch to full image
    origImg.onload = () => {
      // add delay so text doesn't show up automatically
      setTimeout(() => {
        modalText.classList.remove('hide');
        modalText.classList.add('show');
      }, 2000);
      return origImg.src = origImg.dataset.src;
    }
  });
});

// exit full-screen view of photo
modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
      modal.classList.remove("modal-open");
      origImg.classList.remove("img-open");
      modalText.classList.remove('show');
      modalText.classList.add('hide');
  }
  // update map
  if (coords.length >= 2) {
    const offset = 15;
    const line = document.createElementNS(svgNS,'line');
    line.setAttribute('x1', coords[coords.length - 2].xPos + offset);
    line.setAttribute('y1', coords[coords.length - 2].yPos + offset);
    line.setAttribute('x2', coords[coords.length - 1].xPos + offset);
    line.setAttribute('y2', coords[coords.length - 1].yPos + offset);
    line.setAttribute('stroke', 'rgb(180, 180, 180)');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('class', 'mapPath');
    map.append(line);

    // set up paths in map to be animated
    const paths = document.querySelectorAll('.mapPath');

    paths.forEach(path => {
      path.style.strokeDasharray = path.getTotalLength();
      path.style.strokeDashoffset = path.getTotalLength();
    })
  }
});
