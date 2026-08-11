import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Interactive particle background
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5de8d2"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// 3D Floating Geometry responding to mouse movements
const FloatingShapes = () => {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(() => {
    // Target rotation based on mouse coordinates
    const targetX = mouse.x * 0.5;
    const targetY = mouse.y * 0.5;

    if (meshRef1.current) {
      meshRef1.current.rotation.x += 0.005;
      meshRef1.current.rotation.y += 0.005;
      meshRef1.current.rotation.x = THREE.MathUtils.lerp(meshRef1.current.rotation.x, targetY * 1.5, 0.1);
      meshRef1.current.rotation.y = THREE.MathUtils.lerp(meshRef1.current.rotation.y, targetX * 1.5, 0.1);
    }

    if (meshRef2.current) {
      meshRef2.current.rotation.x -= 0.003;
      meshRef2.current.rotation.y += 0.004;
      meshRef2.current.rotation.x = THREE.MathUtils.lerp(meshRef2.current.rotation.x, -targetY * 1.2, 0.1);
      meshRef2.current.rotation.y = THREE.MathUtils.lerp(meshRef2.current.rotation.y, -targetX * 1.2, 0.1);
    }
  });

  return (
    <>
      {/* Outer abstract ring */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef1} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1.2, 0.35, 120, 16]} />
          <meshStandardMaterial
            color="#7f7dff"
            wireframe
            roughness={0.1}
            metalness={0.9}
            emissive="#7f7dff"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      {/* Inner abstract core */}
      <Float speed={3.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={meshRef2} position={[0, 0, 0]}>
          <octahedronGeometry args={[0.55]} />
          <meshStandardMaterial
            color="#5de8d2"
            flatShading
            roughness={0.2}
            metalness={0.8}
            emissive="#5de8d2"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </>
  );
};

const DeveloperWorkspace3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#5de8d2" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7f7dff" />
        <directionalLight position={[0, 5, 2]} intensity={0.8} />
        <ParticleField />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default DeveloperWorkspace3D;
