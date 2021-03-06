import {
	TieMeshGenerator
} from "../lib/plugins/TieMeshGenerator"
const OrbitControls = require("../lib/plugins/OrbitControls.js")
const THREE = require("../lib/threejs/Three.js")

import BasicVertexShader from "../shader/baseVts.glsl"
import BasicFragmentShader from "../shader/baseFs.glsl"

import MinPhongVertexShader from "../shader/phongVts.glsl"
import MinPhongFragmentShader from "../shader/phongFs.glsl"

const ShaderApp = function(context) {
	this.context = context
}

ShaderApp.prototype.initCamControl = function(camera, renderer) {

	// Cam Controller
	this.cameraControl = new OrbitControls(camera, renderer.domElement);
	this.cameraControl.target.set(0, 0, 0);
};

ShaderApp.prototype.onInit = function() {
	this.context.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
	this.context.camera.position.z = 400;
	this.context.camera.position.y = 400;
	this.context.scene = new THREE.Scene();


	this.context.renderer = new THREE.WebGLRenderer();
	this.context.renderer.setPixelRatio(window.devicePixelRatio);
	this.context.renderer.setSize(window.innerWidth, window.innerHeight);

	var axisHelper = new THREE.AxisHelper(500);
	this.context.scene.add(axisHelper);

	var gridHelper = new THREE.GridHelper(500)
	this.context.scene.add(gridHelper);

	this.initCamControl(this.context.camera, this.context.renderer)
	this.setupLight()
	this.initGeoMesh()
};

ShaderApp.prototype.setupLight = function() {
	this.context.scene.add(new THREE.AmbientLight(0x404040));

	var dirLight = new THREE.DirectionalLight(0xffffff, 1);
	dirLight.position.set(100, 100, 50);
	this.context.scene.add(dirLight);

	var directLightHelper = new THREE.DirectionalLightHelper(dirLight)
	this.context.scene.add(directLightHelper);
};


ShaderApp.prototype.initGeoMesh = function() {
	
	const UniformsUtils = THREE.UniformsUtils
	const UniformsLib = THREE.UniformsLib


	// Basic Shader
	// const uniforms = THREE.UniformsUtils.merge([
	// 	THREE.UniformsLib['lights'], {
	// 		color: {
	// 			type: "c",
	// 			value: new THREE.Color(0xffaa00)
	// 		}
	// 	}
	// ])

	// const material = new THREE.ShaderMaterial({
	// 	uniforms: uniforms,
	// 	vertexShader: BasicVertexShader,
	// 	fragmentShader: BasicFragmentShader
	// })


	const uniforms = UniformsUtils.merge( [
			UniformsLib.common,
			UniformsLib.aomap,
			UniformsLib.lightmap,
			UniformsLib.emissivemap,
			UniformsLib.bumpmap,
			UniformsLib.normalmap,
			UniformsLib.displacementmap,
			UniformsLib.gradientmap,
			UniformsLib.fog,
			UniformsLib.lights,
			{
				emissive: { value: new THREE.Color( 0x000000 ) },
				specular: { value: new THREE.Color( 0x111111 ) },
				shininess: { value: 30 }
			}
		] )

	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: MinPhongVertexShader,
		fragmentShader: MinPhongFragmentShader,
		lights: true
	})

	// const material = new THREE.MeshPhongMaterial({})

	var object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
	object.position.set(0, 0, 0);
	this.context.scene.add(object)
};

ShaderApp.prototype.onUpdate = function(dt) {
	// this.context.mesh.rotation.x += 0.005;
	// this.context.mesh.rotation.y += 0.01;
};

module.exports = ShaderApp