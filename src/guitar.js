import './assets/perlin.js'
import 'three-orbitcontrols'
import './assets/OBJLoader'

;(function() {
    var canvas = document.querySelector('#guitar');
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
    var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000);
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set(0, 10, 50);
    


    var loader = new THREE.OBJLoader();

    loader.load(
        'guitar.obj',

        object => {
            scene.add(object);
        }
    );
    
    
    function render(a) {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera );
        console.log(camera.position);
        // renderer.render();
    }
    
    function onResize() {
        canvas.style.width = '';
        canvas.style.height = '';
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();  
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    requestAnimationFrame(render);
    var resizeTm;
    window.addEventListener("resize", function(){
        resizeTm = clearTimeout(resizeTm);
        resizeTm = setTimeout(onResize, 10);
    });

})()
