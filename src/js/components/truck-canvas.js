import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { queryMatches, isMobileOrTablet } from '../base/utils.js';


function createTruckScene(containerSelector, parentNode, modelPosition, modelRotation, cameraPosition, cameraRotation, lightPosition, bottomTruck, buildingsModelPath) {
    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.background = new THREE.Color(0x091019);
    scene.fog = new THREE.Fog(0x091019, 0.8, 40);

    scene.add(group)

    const container = document.querySelector(containerSelector);
    // container.style.height = `${window.innerHeight}px`;

    // Камера
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(...cameraPosition);
    camera.rotation.set(...cameraRotation);

    if (!bottomTruck && queryMatches(1199.98, "min")) {
        camera.setViewOffset(window.innerWidth, container.clientHeight, 380, 100, window.innerWidth, container.clientHeight)
    }

    if (!bottomTruck && queryMatches(1199.98, "max")) {
        camera.setViewOffset(window.innerWidth, container.clientHeight, 0, 20, window.innerWidth, container.clientHeight)
    }

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.querySelector(containerSelector).appendChild(renderer.domElement);

    // PMREM Generator для окружения
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    let pngCubeRenderTarget, pngBackground;

    // Загрузка текстуры для окружения
    new THREE.TextureLoader().load('https://d3b6muno9lbfvx.cloudfront.net/berocker/models/textures/texture-2.jpg', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        pngCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
        pngBackground = texture;
        scene.environment = pngCubeRenderTarget.texture;
    });

    // Свет
    const light = new THREE.DirectionalLight(0xA9BAD6, 5);
    light.position.set(...lightPosition);
    light.castShadow = true;
    scene.add(light);

    let sizeLight = 10;
    // Настройка качества теней
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.radius = 0;
    light.shadow.camera.near = 20;
    light.shadow.camera.far = 500;
    light.shadow.camera.top = sizeLight * 1.2;
    light.shadow.camera.bottom = -sizeLight / 1.5;
    light.shadow.camera.left = sizeLight;
    light.shadow.camera.right = -sizeLight;

    const ambientLight = new THREE.AmbientLight(0x3E4D60, 1);
    scene.add(ambientLight);

    // Загрузка моделей
    const loader = new GLTFLoader();
    let mixers = [];
    let models = [];

    function loadModel(path, position, rotation, castShadow = true, receiveShadow = false, metalness = null, roughness = null, speed = 1) {
        loader.load(path, (gltf) => {
            const model = gltf.scene;
            group.add(model);
            centerModel(model);

            model.position.set(...position);
            model.rotation.set(...rotation);

            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = castShadow;
                    node.receiveShadow = receiveShadow;
                    if (metalness !== null) node.material.metalness = metalness;
                    if (roughness !== null) node.material.roughness = roughness;
                }
            });

            if (gltf.animations.length) {
                const mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                mixers.push({ mixer, speed }); // Добавляем скорость в объект микшера
            }

            if (bottomTruck) {
                models.push(model);
            }
        });
    }

    // Загрузка моделей по отдельности
    let defaultSpeed = 0.002
    let truckSpeed = 0.01

    if (queryMatches(1600)) {
        defaultSpeed = 0.0015
        truckSpeed = 0.008
    }

    loadModel('https://d3b6muno9lbfvx.cloudfront.net/berocker/models/truck-kun.glb', modelPosition, modelRotation, true, false, null, null, truckSpeed);
    loadModel(buildingsModelPath, modelPosition, modelRotation, true, false, 0.35, 0.6, defaultSpeed);
    loadModel('https://d3b6muno9lbfvx.cloudfront.net/berocker/models/ground_1.glb', modelPosition, modelRotation, false, true, 0, 0.5, defaultSpeed);

    // Центрирование модели
    function centerModel(model) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
    }

    // Анимация камеры при движении мыши
    let targetX = 0;
    let targetY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetPosX = 0;
    const smoothFactor = 0.06; // Степень плавности

    const maxRotationY = Math.PI / 32;
    const maxRotationX = Math.PI / 20;
    const maxPosX = 1;

    window.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / container.clientHeight) * 2 + 1;

        targetX = -mouseX * 0.5;
        if (mouseY < 0) {
            targetY = -mouseY * 0.5;
        }

        // Обновляем целевые значения вращения
        targetRotationY = -mouseY * maxRotationY;
        targetRotationX = mouseX * maxRotationX;
        targetPosX = -mouseX * maxPosX;
    });

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    let isAnimating = false;

    // Анимация сцены
    function animate() {
        if (!isAnimating) return;
        requestAnimationFrame(animate);

        // Only Desktop Devices
        if (!isMobileOrTablet()) {
            // Intro Truck
            if (!bottomTruck) {
                // Плавное движение камеры
                camera.position.x += (targetX - camera.position.x) * smoothFactor;
                camera.position.y += (targetY - camera.position.y) * smoothFactor;
            }

            // Bottom Truck
            if (bottomTruck) {
                group.rotation.y = (targetRotationX) * 1;
                camera.position.y += (targetY - camera.position.y) * smoothFactor;
            }
        }

        // Обновление анимаций с учетом скорости
        mixers.forEach(({ mixer, speed }) => {
            mixer.update(speed);
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, container.clientHeight);
    });

    gsap.timeline({
        scrollTrigger: {
            trigger: parentNode,

            // Start Three js Animation
            onEnter: () => {
                if (!isAnimating) {
                    isAnimating = true;
                    animate();
                }
            },
            onEnterBack: () => {
                if (!isAnimating) {
                    isAnimating = true;
                    animate();
                }
            },
            // Stop Three js Animation
            onLeave: () => {
                isAnimating = false;
            },
            onLeaveBack: () => {
                isAnimating = false;
            },
        }
    })
}

export function truckCanvas() {
    createTruckScene(
        // containerSelector
        '.intro__truck',
        // parentNode
        '.intro',
        // ModelPosition
        [0, -1.5, queryMatches(767.98) ? -2 : -1],
        // ModelRotation
        [0, 0, 0],
        // cameraPosition
        [0, 0, 3.6],
        // cameraRotation
        [0, 0, 0],
        // lightPosition
        [-8, 20, 40],
        // bottomTruck
        false,
        // buildingsModelPath
        'https://d3b6muno9lbfvx.cloudfront.net/berocker/models/buildings.glb');

    createTruckScene(
        '.footer__truck',
        // parentNode
        '.footer',
        // modelPosition
        [3, -2, queryMatches(992, "min") ? -3 : -13,],
        // ModelRotation
        [0, Math.PI / 2, 0],
        // cameraPosition
        [0, 0, 4],
        // cameraRotation
        [0, 0, 0],
        // lightPosition
        [50, 30, 25],
        // bottomTruck
        true,
        // buildingsModelPath
        'https://d3b6muno9lbfvx.cloudfront.net/berocker/models/buildings-sideview.glb');
}