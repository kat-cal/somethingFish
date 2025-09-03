let img;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let particles = []; // Array to hold all particles
let circleColor = [255, 215, 0]; // initial color (gold)
let circleSize = 50;
let instrumentIndex = 0;
let instrumentImages = [];
let instrumentProps = [
  {dx: -35, dy: -10, w: 40, h: 90},   // img2
  {dx: 17,  dy: -70, w: 90, h: 80},   // img3
  {dx: 10, dy: -20, w: 60, h: 120},  // img4
  {dx: -20,   dy: -50, w: 120, h: 150}   // img5
];
let music;
let amplitude;
let currentScene = 1;
let inventory = [];             // ["Key", ...]
let hasKey = false;

// Key visual (simple circle target)
let keyX, keyY, keySize = 36;   // size in pixels

function renderInventory() {
  const ul = document.getElementById('inventory-list');
  if (!ul) return;
  ul.innerHTML = '';
  if (inventory.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Empty';
    ul.appendChild(li);
    return;
  }
  inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

function preload(){
  img = loadImage('assets/71rBv3UAaFL.jpg');
  img2 = loadImage('assets/images-for-cartoon-microphone-stand-microphone-stand-clipart-11562931370bnsm3xmmdx.png')
  img3 = loadImage('assets/trompete-coloured-clipart-xl.png');
  img4 = loadImage('assets/Saxophone_PNG.png');
  img5 = loadImage('assets/double-bass.png');
  img6 = loadImage('assets/the_barstools_should_be_a_deep_red_velvet_and_the_setting_should_be_moody_and_expensive_the_style_s_qvsckpaaty3knm9dq5wy_2.png');
  img7 = loadImage('assets/a_hallway_lined_with_framed_photgraphs_of_fancy_fish_the_floor_should_be_a_deep_red_velvet_and_the__exy2yfg6wqru2er1qu0w_1.png');
  img8 = loadImage('assets/dart_board_on_the_wall_hand_drawing_style_but_with_the_typical_red_and_green_colors_for_certain_sec_z85wxu29gykrbwe7p0sw_1.png');
  img9 = loadImage('assets/jazz_band_club_stage_with_deep_crimson_curtains_and_lots_of_dramatic_features_there_should_be_a_dru_d8do4xyblqmhma88ueh8_3.png');
  music = loadSound('assets/loop-file-jazz-waltz-34-beat-bpm132-144689.mp3');
  instrumentImages = [img2, img3, img4, img5];
  
}

// Update the color when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
// const randomColorBtn = document.getElementById('random-circle-color');
// randomColorBtn.addEventListener('click', function() {
//    circleColor = [random(255), random(255), random(255)];
// });

const instrumentBtn = document.getElementById('change-instrument');
instrumentBtn.addEventListener('click', function() {
  instrumentIndex = (instrumentIndex + 1) % instrumentImages.length;
});



const volSlider = document.getElementById('vol');
const volDisplay = document.getElementById('volVal');
  volSlider.addEventListener('input', function() {
    const vol = parseFloat(volSlider.value);
    music.setVolume(vol);
    volDisplay.textContent = vol.toFixed(2);
  });

const soundBtn = document.getElementById('toggle-sound');
  soundBtn.addEventListener('click', function() {
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.play();
    }
  });

});

// Next scene
document.getElementById('next-scene').addEventListener('click', () => {
  currentScene++;
});

// (Optional) back button
const prevBtn = document.getElementById('prev-scene');
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentScene = 1;
  });
}

/* function changeCircleColor() {
circleColor = [random(255), random(255), random(255)];
}
*/

class Particle {
  constructor() {
    this.x = random(width) /// 2;
    this.y = 0;
    this.vy = random(-10, -0.05); // random upward velocity
    this.alpha = 255; // full opacity
  }

  update() {
    this.y -= this.vy; // move the particle upward
    this.alpha -= 4.5; // fade out 
  }

  show() {
    noStroke();
    fill(255, 215, 0, this.alpha);
    ellipse(this.x, this.y, 5, 5)
  }

  isFinished() {
    return this.alpha <= 0; // Particle is finished when it's fully transparent
  }
}



function fish(x,y){
    fill(mouseX, 180, 0);
    ellipse(x, y, 40, 90);
    triangle( x+30, y+70, x, y+40, x - 30,y+70);
  ellipse( x-7, y-22, 10);
  fill(0,0,0)
  ellipse( x-7, y-22, 5)
  ellipse(x+11, y-15, 5, 9)
  }

function setup() {
  const sketchDiv = document.getElementById('sketch');
  // Responsive width: use parent width, but max 400px, min 300px
  let w = sketchDiv ? Math.min(Math.max(sketchDiv.offsetWidth, 300), 400) : 400;
  // Height is always 1.5x width (portrait: 2:3 ratio)
  let h = Math.round(w * 1.5);

  const c = createCanvas(w, h);
  c.parent('sketch');
  c.elt.style.borderRadius = '16px';

  keyX = width * 0.25;
  keyY = height * 0.6;

  document.getElementById('toggle-inventory').addEventListener('click', () => {
    const panel = document.getElementById('inventory-panel');
    panel.hidden = !panel.hidden;
    renderInventory();
  });
}






function windowResized() {
  const sketchDiv = document.getElementById('sketch');
  let w = sketchDiv ? Math.min(Math.max(sketchDiv.offsetWidth, 300), 400) : 400;
  let h = Math.round(w * 1.5); // portrait ratio
  resizeCanvas(w, h);
}

function mousePressed() {
  // (keep your sound play/stop logic if present)
  // userStartAudio(); etc.

  // Only pick up key in Scene 1 and if not already collected
  if (currentScene === 1 && !hasKey) {
    const d = dist(mouseX, mouseY, keyX, keyY);
    if (d <= keySize * 0.6) {
      hasKey = true;
      inventory.push('Key');
      flashMessage('Picked up: Key'); // optional feedback
      renderInventory();              // update panel if open
    }
  }
}

function drawScene1() {
  // (your existing drawing code from draw() goes here)
  fill(128,0,0);
  rect(0,0, 600);
  fill(0,0,0);
  ellipse(200,330, 200, 450);
  fill(255, 215, 0)
  rect(120,20,160,130)
  image(img, 125, 25, 150,120);
  
  //translate(mouseX, mouseY);
  //rotate(frameCount * 0.01);
  fish(mouseX,mouseY);
  
  let props = instrumentProps[instrumentIndex];
image(
  instrumentImages[instrumentIndex],
  mouseX + props.dx,
  mouseY + props.dy,
  props.w,
  props.h
);


  particles.push(new Particle());

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); 
    particles[i].show(); 

    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }

  fill(circleColor[0], circleColor[1], circleColor[2]);
  //ellipse(mouseX, mouseY, 50, 50);

   // MODIFY: use circleColor for the circle
  fill(circleColor);
  noStroke();
  circle(width / 2, height / 2, circleSize);

  // --- draw the Key if not collected ---
if (!hasKey) {
  // simple “key” icon: a gold circle + small rectangle
  push();
  noStroke();
  fill(255, 204, 0); // gold
  circle(keyX, keyY, keySize);                 // key head
  rectMode(CENTER);
  rect(keyX + keySize * 0.5, keyY, keySize * 0.9, keySize * 0.25, 4); // key body
  pop();
}

}

function drawScene2() {
 
  fill(128,0,0);
  rect(0,0, 600, 400);
  image(img6, 0, 0, 400, 650);

  fish(mouseX,mouseY);
  
  let props = instrumentProps[instrumentIndex];
image(
  instrumentImages[instrumentIndex],
  mouseX + props.dx,
  mouseY + props.dy,
  props.w,
  props.h
);

}

function drawScene3() {

  fill(128,0,0);
  rect(0,0, 600, 400);
  image(img7, 0, 0, 400, 650);

  fish(mouseX,mouseY);
  
  let props = instrumentProps[instrumentIndex];
image(
  instrumentImages[instrumentIndex],
  mouseX + props.dx,
  mouseY + props.dy,
  props.w,
  props.h
);

}

function drawScene4() {

  fill(128,0,0);
  rect(0,0, 600, 400);
  image(img8, 0, 0, 400, 650);

  fish(mouseX,mouseY);
  
  let props = instrumentProps[instrumentIndex];
image(
  instrumentImages[instrumentIndex],
  mouseX + props.dx,
  mouseY + props.dy,
  props.w,
  props.h
);

}

function drawScene5() {

  fill(128,0,0);
  rect(0,0, 600, 400);
  image(img9, 0, 0, 400, 650);

  fish(mouseX,mouseY);
  
  let props = instrumentProps[instrumentIndex];
image(
  instrumentImages[instrumentIndex],
  mouseX + props.dx,
  mouseY + props.dy,
  props.w,
  props.h
);

}
function draw() {
  

  clear();
  if (currentScene === 1) {
    drawScene1();
  } else if (currentScene === 2) {
    drawScene2();
  } else if (currentScene === 3) {
    drawScene3();
  } else if (currentScene === 4) {
    drawScene4();
  } else if (currentScene === 5) {
    drawScene5();
  }
  
  

/*    if (isClicked){
  //image(img2, mouseX- 35, mouseY - 10, 40,90);
} else {
  //image(img3, mouseX+ 17, mouseY - 70, 90,80);
}
  */



//image(instrumentImages[instrumentIndex], mouseX - 35, mouseY - 10, 40, 90);


    //fill(255);
  //textFont(font);
//  textSize(textSizeVal);
  //text("Hello!", width / 2 - 250, height / 2 - 150);

}
