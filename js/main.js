var scene;
var camera;
var renderer;
var light;
var loader;
var orbit;
var composer;

// initThree initThree
var initThree = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    loader = new THREE.GLTFLoader();

    // scene.background = new THREE.Color(0xdddddd)

    orbit = new THREE.OrbitControls(camera, renderer.domElement)

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    

    document.body.appendChild(renderer.domElement);

    Pace.on('done', function(){
        document.getElementById('nav').style.display = 'inline-block'
        console.log(123213)
    })
};

var tuggleRotation = function() {
    orbit.autoRotate = !orbit.autoRotate
}

window.onload = function(){
    initThree();
    
    camera.position.set(10, 8, 11);
    camera.lookAt(0,0,0);

    // 点光源
    pLight = new THREE.PointLight( 0xFFFFFF, 1, 50 );
    pLight.position.set( -15, 9, 6 );
    scene.add( pLight );


    // 点光源2
    pLight2 = new THREE.PointLight( 0xFFFFE0, 2, 50 );
    pLight2.position.set( -15, 9, -7 );
    scene.add( pLight2 );

    // 平行光
    dLight = new THREE.DirectionalLight(0xFFFFE0, 1.2);
    dLight.position.set( 100, 100, 300 );
    scene.add(dLight);

    // 控制
    orbit.addEventListener('change', function(){
        
    })
    // 自动旋转和速度
    orbit.autoRotate = true
    orbit.autoRotateSpeed = 0.3
    orbit.enableDamping = true
    orbit.dampingFactor = 0.25;
    orbit.zoomSpeed = 0.5;
    // 视角的最大仰角和俯角
    orbit.minPolarAngle = Math.PI / 5;
    orbit.maxPolarAngle = Math.PI / 2.1;
    // 距离中心点最小距离和最大距离
    orbit.minDistance = 10;
    orbit.maxDistance = 100

    // post-processing 后处理
    composer = new POSTPROCESSING.EffectComposer(renderer);
    composer.addPass(new POSTPROCESSING.RenderPass(scene, camera))
    const effectPass = new POSTPROCESSING.EffectPass(camera, new POSTPROCESSING.BloomEffect()) // 辉光
    // const effectPass = new POSTPROCESSING.EffectPass(camera, new POSTPROCESSING.DepthOfFieldEffect()) // 景深
    effectPass.renderToScreen = true
    composer.addPass(effectPass)

    const manager = new THREE.LoadingManager()
    manager.onLoad = function ( ) {
        console.log( "Loading complete!")
    }

    loader.load('./models/garage/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        animate();
    })

    loader.load('./models/bmw_m6/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0.7
        gltf.scene.scale.set(.03,.03,.03) // 缩放模型
        scene.add(gltf.scene);
    })

    var animate = function() {
        orbit.update();
        // renderer.render(scene, camera);
        composer.render() 
        requestAnimationFrame(animate);
    }
};
