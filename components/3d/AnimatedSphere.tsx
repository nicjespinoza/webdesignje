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

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
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
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#00f5ff"
          emissive="#0066ff"
          emissiveIntensity={0.4}
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

  // Rotación inversa para contraste visual
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.2}>
      <icosahedronGeometry args={[1, 3]} />
      <meshBasicMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

// ---- Partículas que orbitan alrededor de la esfera ----

function OrbitingParticles({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generar posiciones en una distribución esférica aleatoria
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5; // Radio entre 2.5 y 4.0
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
        color="#00f5ff"
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
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
    </mesh>
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
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Iluminación: ambiental suave + dos puntos de luz de color */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7b2ff7" />

        {/* Escena principal */}
        <CyberSphere />
        <WireframeShell />
        <OrbitingParticles count={300} />

        {/* Tres anillos orbitales en diferentes inclinaciones */}
        <OrbitalRing radius={2.8} speed={0.2} tilt={Math.PI / 3} />
        <OrbitalRing radius={3.2} speed={-0.15} tilt={-Math.PI / 4} />
        <OrbitalRing radius={3.6} speed={0.1} tilt={Math.PI / 6} />

        {/* Estrellas de fondo para ambiente espacial */}
        <Stars
          radius={50}
          depth={50}
          count={1500}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />

        {/* Post-procesado: Bloom (glow neón) + ChromaticAberration (efecto cyber) */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
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
