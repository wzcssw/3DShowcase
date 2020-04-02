var scene;
var camera;
var renderer;
var light;
var loader;
var orbit;

// initThree initThree
var initThree = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    loader = new THREE.GLTFLoader();

    // scene.background = new THREE.Color(0xdddddd)

    orbit = new THREE.OrbitControls(camera, renderer.domElement)

    renderer.setSize(window.innerWidth, window.innerHeight);
    

    document.body.appendChild(renderer.domElement);
};

window.onload = function(){
    initThree();
    
    camera.position.set(7, 7, 7);
    camera.lookAt(0,0,0);

    // 地面
    let geometryPlane = new THREE.PlaneGeometry(1000,1000);
    let materialPlane = new THREE.MeshBasicMaterial({color: 0xA9A9A9});
    let rect = new THREE.Mesh(geometryPlane,materialPlane);
    rect.rotation.x = -1.58;
    rect.position.set(0, 0, 0);
    scene.add(rect);

    // 点光源
    pLight = new THREE.PointLight( 0xFFFFFF, 15, 300 );
    pLight.position.set( 200, 130, 40 );
    scene.add( pLight );


    // 点光源2
    pLight2 = new THREE.PointLight( 0xFFFFFF, 35, 300 );
    pLight2.position.set( -140, 130, 220 );
    scene.add( pLight2 );

    // 点光源3
    pLight3 = new THREE.PointLight( 0xFFFFFF, 25, 300 );
    pLight3.position.set( -180, 200, -250 );
    scene.add( pLight3 );
 

    // // 环境光
    // hLight = new THREE.AmbientLight(0xFFFFFF, 10);
    // scene.add(hLight);

    // 平行光
    // hLight = new THREE.DirectionalLight(0xFFFFFF, 3);
    // hLight.position.set(10, 200, 10)
    // scene.add(hLight);


    // 渲染
    // renderer.render(scene, camera);

    // 控制
    orbit.addEventListener('change', function(){
        
    })
    orbit.autoRotate = true
    orbit.autoRotateSpeed = 1
    orbit.dampingFactor = 0.01; 

    loader.load('./models/garage/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        animate();
    })

    loader.load('./models/bmw_m6/scene.gltf', function(gltf) {
        gltf.scene.position.y = 0.7
        gltf.scene.scale.set(.03,.03,.03) // 缩放模型
        scene.add(gltf.scene);
        animate();
    })

    var animate = function() {
        orbit.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
};
