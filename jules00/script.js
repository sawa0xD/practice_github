// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Three.js is loaded (it is, via CDN in HTML)
    if (typeof THREE === 'undefined') {
        console.error('Three.js has not been loaded. Check the CDN link in your HTML.');
        return;
    }

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee); // A light grey background

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3; // Adjusted Z position for a 1x1x1 cube

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1); // Standard cube size
    // Using MeshStandardMaterial for better appearance with lights
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00, // Green
        metalness: 0.4,   // A bit of metallic look
        roughness: 0.5    // Not too shiny, not too matte
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting
    // Ambient light to softly illuminate the whole scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // (color, intensity)
    scene.add(ambientLight);

    // Directional light to cast shadows and highlight surfaces
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // (color, intensity)
    directionalLight.position.set(1, 2, 3); // Positioned to cast light from an angle
    scene.add(directionalLight);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the cube
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        // Update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false); // Use false for the third parameter, which is the standard for addEventListener

    // Start animation
    animate();
});
