import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

function init() {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 50;
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  new OrbitControls(camera, renderer.domElement);

  for (let i = 0; i < 300; i++) {
    const spheres = new THREE.Mesh(
      new THREE.SphereGeometry(10, 100, 100),
      new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    );

    spheres.position.x = Math.random() * 1000 - 500;
    spheres.position.y = Math.random() * 1000 - 700;
    spheres.position.z = Math.random() * 1000 - 300;

    scene.add(spheres);
  }

  const light = new THREE.DirectionalLight(0xc471ed, 0.4);
  light.position.set(0, 1, 1);
  scene.add(light);

  function getTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let session = `AM`;

    if (hours > 12) {
      session = `PM`;
      hours = hours - 12;
    }

    let hour = hours;
    if (hours < 10) {
      hour = `0` + hours;
    } else {
      hour = hours;
    }

    let minute = minutes;
    if (minutes < 10) {
      minute = `0` + minutes;
    } else {
      minute = minutes;
    }

    let second = seconds;
    if (seconds < 10) {
      second = `0` + seconds;
    } else {
      second = seconds;
    }

    let time = `${hour}:${minute}:${second} ${session}`;

    document.getElementById('clock').innerText = time;
  }

  setInterval(function () {
    getTime();
  }, 1000);

  let animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    camera.rotation.x += 0.001;
    camera.rotation.y += 0.0015;
    camera.rotation.z += 0.0001;
  };

  animate();
}

init();
