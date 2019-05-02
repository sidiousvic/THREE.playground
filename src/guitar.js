import controls from "three-orbitcontrols";
import "./assets/OBJLoader";
(function() {
  var canvas = document.querySelector("#guitar");
  var width = window.innerWidth,
    height = window.innerHeight;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(-3, 70, -1);
  controls.target.set(0, 0, 0);
  // controls.autoRotate = true;

  var loader = new THREE.OBJLoader();
  var guitar = new THREE.Mesh();

  loader.load(
    "guitar.obj",

    object => {
      scene.add(object);
      guitar = object;
      object.scale.set(1, 1, 1);
      object.position.set(1, -1, -6);
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.wireframe = true;
          child.material.needsUpdate = true;
        }
      });
    }
  );

  var boundingBox = new THREE.Box3();

  boundingBox.setFromObject(guitar);
  var center = boundingBox.getCenter();

  // set camera to rotate around center of object
  controls.target = center;

  var axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  var directionalLight = new THREE.DirectionalLight(0xff0000, 0.9);
  scene.add(directionalLight);

  function render(a) {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
    // guitar.rotation.x += 0.01;
    // guitar.rotation.y -= 0.001;
    // guitar.rotation.z -= 0.1;
    // renderer.render();
    console.log(camera.position);
  }

  function onResize() {
    canvas.style.width = "";
    canvas.style.height = "";
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  requestAnimationFrame(render);
  var resizeTm;
  window.addEventListener("resize", function() {
    resizeTm = clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 10);
  });
})();
