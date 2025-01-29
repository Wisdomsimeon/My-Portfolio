import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight);
//renderer.setClearColor(0x00ffff);
//renderer.toneMapping = THREE.ACESFilmicToneMapping;
//renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.pixelRatio = window.devicePixelRatio;

document.body.appendChild( renderer.domElement );

camera.position.set(0,1,2);



const light = new THREE.DirectionalLight(0xffffff,3);
light.position.set(-700,700,-750);
scene.add(light);

const light2 = new THREE.HemisphereLight(0xffffff,1);
scene.add(light2);



const light3 = new THREE.DirectionalLight(0xffffff,3);
light3.position.set(700,700,750);
scene.add(light3);



let source,audioContext;

// Create an audio context
 audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load the audio file
fetch('intergalactic-116633.mp3')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data, buffer => {
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;  // Set to loop
    source.connect(audioContext.destination);
   
  }));










const loader = new GLTFLoader();
let mixer,model,delta,clock = new THREE.Clock();




loader.load('model.glb',function(gltf){

model = gltf.scene;
model.position.set(0,0,0);
model.scale.setScalar(1);
scene.add(model);

mixer = new THREE.AnimationMixer(model);
mixer.clipAction(gltf.animations[0]).play();
mixer.clipAction(gltf.animations[0]).loop = THREE.LoopPingPong;


});


const tex = new THREE.TextureLoader().load("Concrete_Floor_vlkladr_4K_BaseColor.jpg");
tex.wrapS = THREE.RepeatWrapping;
tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set( 500, 500 );



const g = new THREE.PlaneGeometry(1000,1000)
const m = new THREE.MeshStandardMaterial({map:tex});
const ground = new THREE.Mesh(g,m);
ground.rotation.x = -0.5 * Math.PI;
scene.add(ground);

const ge = new THREE.CubeGeometry(1,1,1)
const ma = new THREE.MeshStandardMaterial();
const pos = new THREE.Mesh(g,m);
scene.add(pos);


const ge2 = new THREE.CubeGeometry(1,1,1)
const ma2 = new THREE.MeshStandardMaterial();
const pos2 = new THREE.Mesh(ge2,ma2);
scene.add(pos2);

const ge3 = new THREE.CubeGeometry(1,1,1)
const ma3 = new THREE.MeshStandardMaterial();
const pos3 = new THREE.Mesh(ge3,ma3);
scene.add(pos3);


const ge4 = new THREE.CubeGeometry(1,1,1)
const ma4 = new THREE.MeshStandardMaterial();
const pos4 = new THREE.Mesh(ge4,ma4);
scene.add(pos4);


pos.position.set(0,0,50);
pos2.position.set(0,0,-50);
pos3.position.set(50,0,0);
pos4.position.set(-50,0,0);









const point = new THREE.Object3D();
point.add(camera);
scene.add(point);






window.addEventListener('load',function(){

document.getElementById('intro').style.opacity = "1";
document.getElementById('intro').style.transition = "3s";



});



const texe = new THREE.TextureLoader().load("rosendal_mountain_midmorning.webp");
texe.mapping = THREE.EquirectangularReflectionMapping;
 scene.environment = texe;
 scene.background = texe;





// Resize Handling


  window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
      
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });



function animate() {
    requestAnimationFrame(animate);
        
   
    delta = clock.getDelta();
    mixer.update(delta);
    
  
	
  
    
    
document.addEventListener('click',function(){

 source.start(0);  // Play immediately

});


    
    point.rotation.y += 0.001;
 
        renderer.render( scene, camera );
    
    }
    animate();
    
