let canvas; // Variable to hold the canvas element
let door, hallway, room; // Variables to hold the images for the door and hallway
let cS; // Variables for knob size
let angle = 0; // Variable for the angle used in the sine wave animation
let showDoor = true; // Boolean to track if the knob has been clicked
let showHallway = false; // Boolean to track if the hallway should be shown
let showRoom = false; // Boolean to track if the room should be shown
let d, d2; // Variable to store the distance from the mouse to the knob

let rectX, rectY, rectW, rectH; // Variable to store hallway door position and dimensions

// The preload function is used to load images before the program starts
function preload() {
  door = loadImage("Images/1.png"); // Load the door image
  hallway = loadImage("Images/2.png"); // Load the hallway image
  room = loadImage("Images/3.png"); // Load the room image
}

// The setup function runs once when the program starts
function setup() {
  // Create a square canvas with dimensions based on the window height
  canvas = createCanvas(windowHeight, windowHeight);

  // Set the image mode to CENTER so images are drawn from their center point
  imageMode(CENTER);

  // Disable drawing outlines around shapes
  noStroke();

  // Resize the door image to fit the canvas dimensions
  door.resize(width, height);
  hallway.resize(width, height);
  room.resize(width, height);

  // Set the initial size of the knob based on the canvas height
  cS = height * 0.06;

  // Set the initial position of the door, going to animate later
  rectX = width * 0.5;

  // Set the initial color of the knob to black (0)
  cColor = 0;
}

// The draw function runs continuously in a loop
function draw() {
  // Set the background color to white
  background(255);

  // Calculate the position of the knob
  let cX = width * 0.22; // X position (22% of the canvas width)
  let cY = height * 0.5; // Y position (50% of the canvas height)

  // If the knob has not been clicked, draw the door image and the knob
  if (showDoor) {
    // Draw the door image at the center of the canvas
    image(door, width / 2, height / 2);
    // Draw the knob
    drawKnob(cX, cY);
  } else if (showHallway) {
    // If the knob has been clicked, draw the hallway image
    image(hallway, width / 2, height / 2);

    //draw interactive door
    rectY = height * 0.63;
    rectW = width * 0.2;
    rectH = height * 0.25;
    rectMode(CENTER);
    rect(rectX, rectY, rectW, rectH);

    animateDoor();
  } else if (showRoom) {
    image(room, width / 2, height / 2);
  }

  // Animate the knob size using a sine wave
  animateKnob();

  // Calculate the distance from the mouse to the knob
  d = dist(mouseX, mouseY, cX, cY);

  //Dist from mouse to hallway door
  d2 = dist(mouseX, mouseY, rectX, rectY);
}

// Function to draw the knob
function drawKnob(cX, cY) {
  fill(0); // Set the fill color for the knob
  ellipse(cX, cY, cS * 1.7, cS); // Draw the knob as an ellipse
}

// Function to animate the knob size using a sine wave
function animateKnob() {
  cS = cS + sin(angle) * 0.8; // Update the knob size
  angle += 0.1; // Increment the angle for the sine wave
}

function animateDoor() {
  rectX = rectX + sin(angle) * 0.8; // Update the knob size
  angle += 0.1; // Increment the angle for the sine wave
}

// Function to handle mouse press events
function mousePressed() {
  // If the mouse is close to the knob and the knob is clicked, set knobClicked to true
  if (d < cS / 2) {
    showDoor = false;
    showHallway = true;
  } else if (d2 < rectW / 2 && showHallway) {
    showHallway = false;
    showRoom = true;
  }
}
