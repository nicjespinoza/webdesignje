"use client";

// ============================================================
// Esfera 3D Animada — Estilo Cyber / Holográfico
// Tecnologías: @react-three/fiber + drei + postprocessing
//
// Componentes de la escena:
//   1. CyberSphere     → Esfera distorsionada con MeshDistortMaterial
//   2. WireframeShell   → Icosaedro wireframe envolvente
//   3. OrbitingParticles→ 300 partículas orbitando la esfera
//   4. OrbitalRing      → Anillos sci-fi en distintos ángulos
//   5. PostProcessing   → Bloom (glow) + ChromaticAberration
// ============================================================

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars, Html, Line } from "@react-three/drei";
import { Globe, Smartphone, Brain, Search, Code, Cpu } from "lucide-react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

// ---- Esfera principal con distorsión y material holográfico ----

function CyberSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Rotación lenta automática para efecto "flotante"
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={3.5}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#C69320"
          emissive="#FBE18D"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.9}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

// ---- Shell wireframe que envuelve la esfera ----

function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={4.5}>
      <icosahedronGeometry args={[1, 3]} />
      <meshBasicMaterial
        color="#C69320"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

// ---- Partículas que orbitan alrededor de la esfera ----

function OrbitingParticles({ count = 400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5.0 + Math.random() * 4.0; // Radio muy amplio para llenar pantalla
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  // Rotación orbital suave
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      pointsRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FBE18D"
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// ---- Anillo orbital estilo sci-fi ----

function OrbitalRing({
  radius,
  speed,
  tilt,
}: {
  radius: number;
  speed: number;
  tilt: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 16, 100]} />
      <meshBasicMaterial color="#C69320" transparent opacity={0.25} />
    </mesh>
  );
}

// ---- Red de Nodos Conectados (Iconos Flotantes) ----

function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const nodes = [
    { pos: [12, 6, -3], icon: Globe, color: "#FBE18D" },
    { pos: [-10, -8, 5], icon: Smartphone, color: "#C69320" },
    { pos: [8, -9, -4], icon: Brain, color: "#FBE18D" },
    { pos: [-13, 7, -6], icon: Search, color: "#C69320" },
    { pos: [14, -2, 3], icon: Code, color: "#FBE18D" },
    { pos: [-8, 10, 2], icon: Cpu, color: "#C69320" },
  ];

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <group key={i}>
          {/* Línea conectora desde el centro de la esfera */}
          <Line
            points={[[0, 0, 0], n.pos as [number, number, number]]}
            color={n.color}
            lineWidth={1.5}
            transparent
            opacity={0.4}
          />
          {/* Punto de conexión dorado */}
          <mesh position={n.pos as [number, number, number]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#FBE18D" />
          </mesh>
          {/* Nodo / Icono HTML */}
          <group position={n.pos as [number, number, number]}>
            {/* Animación local para que el ícono pulse sutilmente */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <Html transform center zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
                <div className="p-3 rounded-xl border border-[#C69320]/30 bg-[#05050a]/70 backdrop-blur-md shadow-[0_0_20px_rgba(198,147,32,0.3)]">
                  <n.icon className="w-6 h-6 text-[#FBE18D]" />
                </div>
              </Html>
            </Float>
          </group>
        </group>
      ))}
    </group>
  );
}

// ---- Componente exportado: Canvas completo con escena y post-procesado ----

export default function AnimatedSphere() {
  // Vector para ChromaticAberration (reutilizado, evita re-creación)
  const chromaticOffset = useMemo(
    () => new THREE.Vector2(0.001, 0.001),
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: '100vw', height: '100vh' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[20, 20, 20]} intensity={1.5} color="#C69320" />
        <pointLight position={[-20, -20, -10]} intensity={0.8} color="#FBE18D" />

        {/* Escena principal escalada */}
        <CyberSphere />
        <WireframeShell />
        <OrbitingParticles count={500} />
        <NodeNetwork />

        {/* Tres anillos orbitales expansivos en diferentes inclinaciones */}
        <OrbitalRing radius={7.5} speed={0.2} tilt={Math.PI / 3} />
        <OrbitalRing radius={8.5} speed={-0.15} tilt={-Math.PI / 4} />
        <OrbitalRing radius={9.5} speed={0.1} tilt={Math.PI / 6} />

        {/* Estrellas de fondo para ambiente espacial */}
        <Stars
          radius={120}
          depth={80}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />

        {/* Post-procesado: Bloom (glow neón) + ChromaticAberration (efecto cyber) */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={0.8}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={chromaticOffset}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
