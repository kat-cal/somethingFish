let img;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let slash;
let famousfish;
let showFamousFish = false;
let fishhook;
let picframe;
let envelope;
let bartender;
let fishingline;
let particles = []; // Array to hold all particles
let circleColor = [255, 215, 0]; // initial color (gold)
let circleSize = 50;
let showYouDidItBtn = true;
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
let hasGash = false; // Add this line

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
  inventory.forEach((item, idx) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = item;
    btn.style.width = '100%';
    btn.style.margin = '4px 0';
    btn.addEventListener('click', () => handleInventoryClick(item, idx));
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function preload(){
  envelope = loadImage('assets/pngtree-top-secret-envelope-note-dossier-label-vector-picture-image_9448898.png');
  fishingline = loadImage('assets/Fishing_Line_PNG_Clip_Art-2523.png');
  picframe = loadImage('assets/frame.png');
  famousfish = loadImage('assets/famous_fish.png');
  img = loadImage('assets/71rBv3UAaFL.jpg');
  img2 = loadImage('assets/images-for-cartoon-microphone-stand-microphone-stand-clipart-11562931370bnsm3xmmdx.png')
  img3 = loadImage('assets/trompete-coloured-clipart-xl.png');
  img4 = loadImage('assets/Saxophone_PNG.png');
  img5 = loadImage('assets/double-bass.png');
  img6 = loadImage('assets/the_barstools_should_be_a_deep_red_velvet_and_the_setting_should_be_moody_and_expensive_the_style_s_qvsckpaaty3knm9dq5wy_2.png');
  img7 = loadImage('assets/a_hallway_lined_with_framed_photgraphs_of_fancy_fish_the_floor_should_be_a_deep_red_velvet_and_the__exy2yfg6wqru2er1qu0w_1.png');
  img8 = loadImage('assets/dart_board_on_the_wall_hand_drawing_style_but_with_the_typical_red_and_green_colors_for_certain_sec_z85wxu29gykrbwe7p0sw_1.png');
  img9 = loadImage('assets/jazz_band_club_stage_with_deep_crimson_curtains_and_lots_of_dramatic_features_there_should_be_a_dru_d8do4xyblqmhma88ueh8_3.png');
  img10 = loadImage('assets/front_ofbar.png');
  slash = loadImage('assets/slash.png');
  fishhook = loadImage('assets/pngtree-fishing-hook-isolated-on-white-background-rope-png-image_11215543.png');
  bartender = loadImage('assets/fish_bartender.png');
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
  if (currentScene === 2) {
    bartenderX = -400;
    bartenderArrived = false;
    showTalkButton = false;
  }
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
  bartenderTargetX = width * 0.45; // Almost center

  winBoxX = -500;
  winBoxTargetX = width * 0.1; // Where the box should stop

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
  // Only pick up envelope in Scene 1 and if not already collected
  if (currentScene === 1 && !hasKey) {
    // Envelope center and size
    const envX = width / 2;
    const envY = height / 1.5;
    const envW = keySize * 1.5;
    const envH = keySize;

    // Check if mouse is inside the envelope image
    if (
      mouseX > envX - envW / 2 &&
      mouseX < envX + envW / 2 &&
      mouseY > envY - envH / 2 &&
      mouseY < envY + envH / 2
    ) {
      hasKey = true;
      inventory.push('Mission Statement');
      flashMessage('Picked up: Mission Statement');
      renderInventory();
    }
  }

  // Slash image in scene 4

if (currentScene === 2 && showTalkButton && window.talkBtnBounds) {
  let b = window.talkBtnBounds;
  if (
    mouseX > b.x - b.w / 2 &&
    mouseX < b.x + b.w / 2 &&
    mouseY > b.y - b.h / 2 &&
    mouseY < b.y + b.h / 2
  ) {
    showInventoryMessage([
      'Bartender: <br><em>"Welcome to the club, friend! The jazz is hot and the drinks are cold."</em>',
      '<em>"If you\'re looking for Tank Finatra, he\'s probably backstage getting ready for his big solo."</em>',
      '<em>"Ohhh you\'re one of them official sorts eh."</em>',
      '<em>"Didn\'t hear it from me, but there have been a couple fishy folks around here. Keep your eyes peeled, I think one of them dropped something important."</em>',
      '<em>"Let me know if you need anything else."</em>',
    ]);
  }
}
  if (currentScene === 2 && showFishingLine && window.fishingLineBounds && !hasFishingLine) {
    let b = window.fishingLineBounds;
    // Simple bounding box check
    if (
      mouseX > b.x - b.w / 2 &&
      mouseX < b.x + b.w / 2 &&
      mouseY > b.y - b.h / 2 &&
      mouseY < b.y + b.h / 2
    ) {
      hasFishingLine = true;
      showFishingLine = false;
      inventory.push('Fishing Line');
      flashMessage('Picked up: Fishing Line');
      renderInventory();
    }
  }

  // Add this block here:
  if (currentScene === 3 && window.frameBounds) {
    let b = window.frameBounds;
    if (
      mouseX > b.x &&
      mouseX < b.x + b.w &&
      mouseY > b.y &&
      mouseY < b.y + b.h
    ) {
      showFamousFish = true;
      if (!inventory.includes("Suspect: Gillbert Finatra")) {
        inventory.push("Suspect: Gillbert Finatra");
        flashMessage('Added to inventory: Suspect: Gillbert Finatra');
        renderInventory();
      }
    }
  }

  // Slash click detection for scene 4
  if (currentScene === 4) {
    let slashW = width * 0.15;
    let slashH = height * 0.15;
    let slashX = 200;
    let slashBaseY = 300;
    let slashY = slashBaseY + Math.sin(slashBouncePhase) * 20;

    if (
      mouseX > slashX &&
      mouseX < slashX + slashW &&
      mouseY > slashY &&
      mouseY < slashY + slashH
    ) {
      if (!inventory.includes("Suspicious Gash")) {
        inventory.push("Suspicious Gash");
        flashMessage('Added to inventory: Suspicious Gash');
        renderInventory();
      }
      hasGash = true; // Hide the gash after clicking
    }
  }

  if (currentScene === 5 && showYouDidItBtn && window.youDidItBtnBounds) {
  let b = window.youDidItBtnBounds;
  if (
    mouseX > b.x &&
    mouseX < b.x + b.w &&
    mouseY > b.y &&
    mouseY < b.y + b.h
  ) {
    showYouDidItBtn = false;
    // Optionally show a flash message or do nothing
    flashMessage('Congratulations!');
  }
}
}

const requiredItems = [
  "Mission Statement",
  "Fishing Line",
  "Suspicious Gash",
  "Suspect: Gillbert Finatra"
];

let messageSteps = [];
let currentMessageStep = 0;

function drawScene1() {
  fill(128,0,0);
  rect(0,0, width, height);

  fill(0,0,0);
  ellipse(width * 0.33, height * 0.55, width * 0.33, height * 0.75);
  image(img10, 25, 25, 350, 550);
  push();

  let boxX = width * 0.4;
  let boxY = height * 0.14;
  translate(boxX, boxY);
  rotate(radians(-12)); // negative for left slant
  stroke(180, 140, 0);      // dark gold/brown border
  strokeWeight(4); 
  fill(255, 215, 0);
  rect(-width * 0.14, height * .05, width * 0.32, height * 0.14);

  // Draw the image (replace img with jazzSignImg if you loaded it)
  image(img, -width * 0.13, height * 0.06, width * 0.3, height * 0.12);
  pop();

 

  
  
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
  //circle(width / 2, height / 2, circleSize);

  // --- draw the Key if not collected ---
if (!hasKey) {
  push();
  imageMode(CENTER);
  image(
      envelope,
      width / 2,      // center horizontally
      height / 1.5,    // center vertically
      keySize * 1.5,  // width
      keySize         // height
  );
  pop();
}

}

function drawScene2() {
  fill(128,0,0);
  rect(0,0, width, height);
  image(img6, 0, 0, width, height);

  // Animate bartender sliding in
  if (!bartenderArrived) {
    bartenderX += 8; // Slide speed
    if (bartenderX >= bartenderTargetX) {
      bartenderX = bartenderTargetX;
      bartenderArrived = true;
      showTalkButton = true;
    }
  }

  image(bartender, bartenderX, height * 0.55, width * 0.42, height * 0.62);

  // Show "Talk" button when bartender arrives
  if (showTalkButton) {
    drawTalkButton();
  }

  fish(mouseX,mouseY);

  let props = instrumentProps[instrumentIndex];
  image(
    instrumentImages[instrumentIndex],
    mouseX + props.dx,
    mouseY + props.dy,
    props.w,
    props.h
  );

  // Show and animate fishing line after bartender blurb is closed
  if (showFishingLine && !hasFishingLine) {
    fishingLineBouncePhase += 0.08;
    let baseY = height * 0.25;
    fishingLineY = baseY + Math.sin(fishingLineBouncePhase) * 20;

    let fishingLineX = width * 0.8;
    let fishingLineW = width * 0.12;         // keep width the same
    let fishingLineH = height * 0.12;        // make height shorter (was 0.25)

    image(fishingline, fishingLineX, fishingLineY, fishingLineW, fishingLineH);

    window.fishingLineBounds = {
      x: fishingLineX,
      y: fishingLineY,
      w: fishingLineW,
      h: fishingLineH
    };
  }
}

let frameBouncePhase = 0; // Add this at the top if not already present

function drawScene3() {
  fill(128,0,0);
  rect(0,0, width, height);
  image(img7, 0, 0, width, height);

  // Hall of Fame box
  let boxW = width * 0.7;
  let boxH = 70;
  let boxX = width / 2 - boxW / 2;
  let boxY = 30;

  stroke(255, 215, 0);
  strokeWeight(4);
  fill(255, 245, 220, 230);
  rect(boxX, boxY, boxW, boxH, 18);

  noStroke();
  fill(128, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Hall of Fame", width / 2, boxY + boxH / 2);

  // Animate and draw the frame
  frameBouncePhase += 0.08;
  let frameX = width * 0.16;
  let frameBaseY = height * 0.53;
  let frameY = frameBaseY + Math.sin(frameBouncePhase) * 20;
  let frameW = width * 0.14;
  let frameH = height * 0.12;

  image(picframe, frameX, frameY, frameW, frameH);

  // Store frame bounds for click detection
  window.frameBounds = {
    x: frameX,
    y: frameY,
    w: frameW,
    h: frameH
  };

  // Show famous fish image if triggered
if (showFamousFish) {
  // Set larger dimensions
  let fishW = width * 0.45;
  let fishH = height * 0.55;
  let fishX = width / 2 - fishW / 2;
  let fishY = height * 0.25;

  // Draw frame (border) around the image
  stroke(255, 215, 0); // gold
  strokeWeight(8);
  fill(255, 245, 220, 230); // light background, slightly transparent
  rect(fishX - 10, fishY - 10, fishW + 20, fishH + 20, 24);

  // Draw the famous fish image centered in the frame
  noStroke();
  image(famousfish, fishX, fishY, fishW, fishH);

  // --- Plaque blurb overlapping the bottom ---
  let plaqueH = 60; // Make plaque taller for more text room
  let plaqueY = fishY + fishH - plaqueH;
  fill(255, 215, 0, 220); // gold, semi-transparent
  stroke(120, 80, 0);
  strokeWeight(2);
  rect(fishX, plaqueY, fishW, plaqueH, 16);

  noStroke();
  fill(60, 30, 0);
  textAlign(CENTER, CENTER);
  textSize(20); // Slightly smaller for better fit
  text(
    "Tank Finatra & \n  Gillbert Finatra",
    fishX + fishW / 2,
    plaqueY + plaqueH / 2 // Center text vertically in plaque
  );
}

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
  let flashlightRadius = 50;

  image(img8, 0, 0, width, height);

  // Animate and draw the slash image only if not collected
  if (!hasGash) {
    slashBouncePhase += 0.08;
    let slashW = width * 0.15;
    let slashH = height * 0.15;
    let slashX = 200;
    let slashBaseY = 300;
    let slashY = slashBaseY + Math.sin(slashBouncePhase) * 20;
    image(slash, slashX, slashY, slashW, slashH);

    window.slashBounds = {
    x: slashX,
    y: slashY,
    w: slashW,
    h: slashH
  };
  }

  // Draw black overlay everywhere except the flashlight area
  noStroke();
  fill(0);

  // Top rectangle
  rect(0, 0, width, mouseY - flashlightRadius);
  // Bottom rectangle  
  rect(0, mouseY + flashlightRadius, width, height - (mouseY + flashlightRadius));
  // Left rectangle
  rect(0, mouseY - flashlightRadius, mouseX - flashlightRadius, flashlightRadius * 2);
  // Right rectangle
  rect(mouseX + flashlightRadius, mouseY - flashlightRadius, width - (mouseX + flashlightRadius), flashlightRadius * 2);

 
}

function drawScene5() {
  fill(128,0,0);
  rect(0,0, width, height);
  image(img9, 0, 0, width, height);

  // Animate and draw the swinging fishhook
  fishhookSwingPhase += 0.05;
  let hookX = width / 2;
  let hookY = height * 0.18;
  let hookW = width * 0.18 * 5;
  let hookH = height * 0.22 * 5;
  let swingAngle = sin(fishhookSwingPhase) * PI / 8;

  push();
  translate(hookX, hookY);
  rotate(swingAngle);
  imageMode(CENTER);
  image(fishhook, 0, 0, hookW, hookH);
  pop();

  // Draw "You Did It!" button in the center
  if (showYouDidItBtn) {
    let btnW = 180;
    let btnH = 60;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 - btnH / 2;

    push();
    fill(255, 215, 0);
    stroke(120, 80, 0);
    strokeWeight(4);
    rect(btnX, btnY, btnW, btnH, 16);
    noStroke();
    fill(128, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("You Did It!", btnX + btnW / 2, btnY + btnH / 2);
    pop();

    // Store button bounds for click detection
    window.youDidItBtnBounds = {x: btnX, y: btnY, w: btnW, h: btnH};
  }

  fish(mouseX, mouseY);

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
    const hasAllItems = requiredItems.every(item => inventory.includes(item));
    if (hasAllItems) {
      drawScene5();
    } else {
      background(30);
      fill(255, 215, 0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text("You must gather all clues before proceeding!", width / 2, height / 2);
    }
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

function handleInventoryClick(item, idx) {
  if (item === 'Mission Statement') {
    showInventoryMessage([
      'Mission :<br><em>"Agent Phin. The Strategic Hazard Elimination Leviathon League has found evidence of a plot to hijack tonight\'s jazz performance and abduct the prestigious Tank Finatra."</em>',
      '<em>The short notice of the evidence has left us no choice but to send you under cover on your own. You must discreetly gather the missing 3 pieces of information and stop this disaster."</em>',
      '<em>You are our only hope. Good Luck Agent. - S.H.E.L.L."</em>'
    ]);
  } else {
    showInventoryMessage(`You clicked: ${item} thats a suspicious item.`);
  }
}

function showInventoryMessage(msgs) {
  // Accepts either a string or an array of strings
  messageSteps = Array.isArray(msgs) ? msgs : [msgs];
  currentMessageStep = 0;
  const box = document.getElementById('inventory-message');
  const text = document.getElementById('inventory-message-text');
  const nextBtn = document.getElementById('inventory-message-next');
  text.innerHTML = messageSteps[0];
  box.style.display = 'block';
  if (messageSteps.length > 1) {
    nextBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'none';
  }
}

document.getElementById('inventory-message-next').addEventListener('click', function() {
  currentMessageStep++;
  const text = document.getElementById('inventory-message-text');
  const nextBtn = document.getElementById('inventory-message-next');
  if (currentMessageStep < messageSteps.length) {
    text.innerHTML = messageSteps[currentMessageStep];
    if (currentMessageStep === messageSteps.length - 1) {
      nextBtn.style.display = 'none';
    }
  }
});

document.getElementById('inventory-message-close').addEventListener('click', function() {
  document.getElementById('inventory-message').style.display = 'none';
  // Only show fishing line after bartender blurb in scene 2
  if (currentScene === 2 && !hasFishingLine) {
    showFishingLine = true;
    fishingLineBouncePhase = 0; // reset animation
  }
});

let bartenderX = -400; // Start off-screen left
let bartenderTargetX;  // Where bartender should stop
let bartenderArrived = false;
let showTalkButton = false;

function drawTalkButton() {
  // Button position to the left of bartender
  let btnW = 90;
  let btnH = 40;
  let btnX = bartenderX - btnW * 0.7; // shift left from bartender
  let btnY = height * 0.75;

  // Draw button
  push();
  rectMode(CENTER);
  fill(255, 180, 60);
  stroke(120, 80, 0);
  strokeWeight(2);
  rect(btnX, btnY, btnW, btnH, 10);
  noStroke();
  fill(60, 30, 0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Talk", btnX, btnY);
  pop();

  // Store button bounds for click detection
  window.talkBtnBounds = {x: btnX, y: btnY, w: btnW, h: btnH};
}

let showFishingLine = false;
let fishingLineY = 0;
let fishingLineBouncePhase = 0;
let hasFishingLine = false;
let slashBouncePhase = 0;
let fishhookSwingPhase = 0;



