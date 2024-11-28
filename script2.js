import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight);
//renderer.setClearColor(0x00ffff);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.pixelRatio = window.devicePixelRatio;

document.body.appendChild( renderer.domElement );

camera.position.set(0,1,2);



const light = new THREE.DirectionalLight(0xffffff,1.5);
light.position.set(-700,700,-750);
scene.add(light);

const light2 = new THREE.HemisphereLight(0xffffff,1);
light2.position.set(-700,700,-750);
scene.add(light2);



const light3 = new THREE.DirectionalLight(0xffffff,1.5);
light3.position.set(700,700,750);
scene.add(light3);















const loader = new GLTFLoader();
let mixer,model,delta,clock = new THREE.Clock();




loader.load('model.glb',function(gltf){

model = gltf.scene;
model.position.set(0,0,0);
model.scale.setScalar(1);
scene.add(model);

mixer = new THREE.AnimationMixer(model);
mixer.clipAction(gltf.animations[0]).play();



});


const tex = new THREE.TextureLoader().load("IMGP5487_seamless.jpg");




const g = new THREE.PlaneGeometry(1000,1000)
const m = new THREE.MeshStandardMaterial({map:tex,roughness:0,metalness:1});
const ground = new THREE.Mesh(g,m);
ground.rotation.x = -0.5 * Math.PI;
scene.add(ground);



const rgbeLoader = new RGBELoader();
    rgbeLoader.load('symmetrical_garden_02_2k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping; // Set the mapping type

        // Set the environment map in the scene
        scene.environment = texture;
        scene.background = texture;


	});











const point = new THREE.Object3D();
point.add(camera);
scene.add(point);

















// Resize Handling






function animate() {
    requestAnimationFrame(animate);
        
    
    delta = clock.getDelta();
    mixer.update(delta);
    
    
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
      
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });
    
    

// Create an audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Load the audio file
fetch('intergalactic-116633.mp3')
  .then(response => response.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data, buffer => {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;  // Set to loop
    source.connect(audioContext.destination);
    source.start(0);  // Play immediately
  }));



  


    
    point.rotation.y += 0.001;
 
        renderer.render( scene, camera );
    
    }
    animate();
    
