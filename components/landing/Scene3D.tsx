// ============================================================
// Scene3D Component - Portafolio Joseph Espinoza
// Neural Network 3D MEJORADA - Partículas, conexiones y animaciones
// ============================================================

import React, { useRef, useMemo, useState } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  Stars,
  PerspectiveCamera,
  PointMaterial,
  Points,
  Line,
} from '@react-three/drei';
import * as THREE from 'three';
import type { Line2 } from 'three-stdlib';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

const fract = (n: number) => n - Math.floor(n);

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const stableSeedFromNumbers = (...values: number[]) => {
  const s = values.reduce((acc, v, idx) => {
    const n = Number.isFinite(v) ? v : 0;
    return acc + (n + 1) * (idx + 1) * 9973;
  }, 0);
  return Math.floor(fract(Math.sin(s) * 100000) * 2 ** 32);
};

// --- Neural Network Logic ---

interface Neuron {
  position: THREE.Vector3;
  baseSize: number;
  pulseOffset: number;
  layer: number;
}

const NeuralNetwork = ({ count = 120, radius = 4.5 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredNeuron, setHoveredNeuron] = useState<number | null>(null);
  useThree();

  // Generate neurons with layers (core, middle, outer)
  const neurons = useMemo<Neuron[]>(() => {
    const rand = mulberry32(stableSeedFromNumbers(count, radius));
    const temp: Neuron[] = [];
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);

      // Layered distribution for more organic brain-like structure
      const layerRoll = rand();
      let r: number;
      let layer: number;

      if (layerRoll < 0.3) {
        // Core layer (dense)
        r = radius * 0.3 * Math.cbrt(rand());
        layer = 0;
      } else if (layerRoll < 0.7) {
        // Middle layer
        r = radius * (0.3 + 0.4 * rand());
        layer = 1;
      } else {
        // Outer layer (sparse)
        r = radius * (0.7 + 0.3 * rand());
        layer = 2;
      }

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      temp.push({
        position: new THREE.Vector3(x, y, z),
        baseSize: layer === 0 ? 0.25 : layer === 1 ? 0.18 : 0.12,
        pulseOffset: rand() * Math.PI * 2,
        layer
      });
    }
    return temp;
  }, [count, radius]);

  // Generate connections based on distance and layer
  const connections = useMemo(() => {
    const lines: { points: [THREE.Vector3, THREE.Vector3]; strength: number; layer: number }[] = [];

    neurons.forEach((n1, i) => {
      neurons.forEach((n2, j) => {
        if (i !== j) {
          // Use distanceToSquared to avoid expensive Math.sqrt calculation
          const distSq = n1.position.distanceToSquared(n2.position);
          // Different thresholds per layer
          const threshold = n1.layer === 0 ? 2.0 : n1.layer === 1 ? 2.8 : 3.5;

          if (distSq < threshold * threshold) {
            // Strength based on layer (core connections stronger)
            const strength = n1.layer === 0 ? 0.6 : n1.layer === 1 ? 0.4 : 0.25;
            lines.push({
              points: [n1.position, n2.position],
              strength,
              layer: n1.layer
            });
          }
        }
      });
    });
    return lines;
  }, [neurons]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Rotate the entire brain with subtle easing
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.03) * 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.02) * 0.05;
    }

    // Pulse animation for neurons
    if (pointsRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.15;
      pointsRef.current.scale.setScalar(scale);
    }
  });

  // Convert particles to positions array
  const positions = useMemo(() => {
    const pos = new Float32Array(neurons.length * 3);
    neurons.forEach((n, i) => {
      pos[i * 3] = n.position.x;
      pos[i * 3 + 1] = n.position.y;
      pos[i * 3 + 2] = n.position.z;
    });
    return pos;
  }, [neurons]);

  // Colors per layer
  const getNeuronColor = (layer: number) => {
    switch (layer) {
      case 0: return '#FFEBAA'; // Core - Ultra bright gold
      case 1: return '#FBE18D'; // Middle - Bright gold
      case 2: return '#C69320'; // Outer - Primary gold
      default: return '#FBE18D';
    }
  };

  return (
    <group ref={groupRef}>
      {/* The Neurons (Nodes) with pulsing effect */}
      <Points positions={positions} stride={3} ref={pointsRef}>
        <PointMaterial
          transparent
          color="#FBE18D"
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Individual neuron meshes for hover effect */}
      {neurons.map((neuron, i) => (
        <mesh
          key={`neuron-${i}`}
          position={neuron.position}
          onPointerOver={() => setHoveredNeuron(i)}
          onPointerOut={() => setHoveredNeuron(null)}
        >
          <sphereGeometry args={[neuron.baseSize * 1.5, 16, 16]} />
          <meshStandardMaterial
            color={getNeuronColor(neuron.layer)}
            emissive={getNeuronColor(neuron.layer)}
            emissiveIntensity={hoveredNeuron === i ? 3 : 1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* The Synapses (Lines) with animated opacity */}
      <group ref={linesRef}>
        {connections.map((conn, index) => (
          <AnimatedLine
            key={index}
            points={conn.points}
            color={conn.layer === 0 ? '#FFEBAA' : conn.layer === 1 ? '#FBE18D' : '#C69320'}
            baseOpacity={conn.strength}
            index={index}
          />
        ))}
      </group>

      {/* Floating Data Bits moving through the system */}
      <DataPulses radius={radius} count={35} />

      {/* Energy waves emanating from core */}
      <EnergyWaves count={5} />
    </group>
  );
};

// Animated line with pulsing opacity
const AnimatedLine = ({
  points,
  color,
  baseOpacity,
  index
}: {
  points: [THREE.Vector3, THREE.Vector3];
  color: string;
  baseOpacity: number;
  index: number;
}) => {
  const ref = useRef<Line2>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Pulsing opacity with phase offset based on index
      const opacity = baseOpacity * (0.6 + 0.4 * Math.sin(t * 3 + index * 0.1));
      (ref.current.material as THREE.Material).opacity = opacity;
    }
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      opacity={baseOpacity}
      transparent
      lineWidth={1.5}
      blending={THREE.AdditiveBlending}
    />
  );
};

// Simulates data moving through the network
const DataPulses = ({ radius, count }: { radius: number; count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObj = new THREE.Object3D();
  const color = new THREE.Color();

  const nextRand = (agent: { seed: number }) => {
    agent.seed = (agent.seed * 1664525 + 1013904223) >>> 0;
    return agent.seed / 4294967296;
  };

  const agents = useMemo(() => {
    const seeded = mulberry32(stableSeedFromNumbers(radius, count, 202));
    return new Array(count).fill(0).map((_, i) => ({
      pos: new THREE.Vector3(
        (seeded() - 0.5) * radius * 2,
        (seeded() - 0.5) * radius * 2,
        (seeded() - 0.5) * radius * 2
      ),
      dest: new THREE.Vector3(
        (seeded() - 0.5) * radius * 2,
        (seeded() - 0.5) * radius * 2,
        (seeded() - 0.5) * radius * 2
      ),
      speed: seeded() * 0.08 + 0.04,
      phase: seeded() * Math.PI * 2,
      colorOffset: i / count,
      seed: Math.floor(seeded() * 2 ** 32) >>> 0
    }));
  }, [radius, count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!meshRef.current) return;

    agents.forEach((agent, i) => {
      // Move agent towards destination with easing
      const dir = new THREE.Vector3().subVectors(agent.dest, agent.pos).normalize();
      agent.pos.add(dir.multiplyScalar(agent.speed));

      // If close to destination, pick new destination
      // Use distanceToSquared to avoid expensive Math.sqrt calculation
      if (agent.pos.distanceToSquared(agent.dest) < 0.09) { // 0.3 * 0.3 = 0.09
        const r1 = nextRand(agent);
        const r2 = nextRand(agent);
        const r3 = nextRand(agent);
        agent.dest.set(
          (r1 - 0.5) * radius * 2,
          (r2 - 0.5) * radius * 2,
          (r3 - 0.5) * radius * 2
        );
      }

      tempObj.position.copy(agent.pos);

      // Pulsing scale
      const scale = 0.08 + 0.04 * Math.sin(t * 5 + agent.phase);
      tempObj.scale.setScalar(scale);

      tempObj.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObj.matrix);

      // Color variation from gold to white
      const flicker = 0.5 + 0.5 * Math.sin(t * 3 + agent.phase + agent.colorOffset * 12);
      color.setHSL(0.12 + agent.colorOffset * 0.05, 0.9, 0.7 + flicker * 0.3);
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshBasicMaterial transparent opacity={0.9} />
    </instancedMesh>
  );
};

// Energy waves emanating from the core
const EnergyWaves = ({ count }: { count: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempObj = new THREE.Object3D();

  const waves = useMemo(() => {
    const rand = mulberry32(stableSeedFromNumbers(count, 303));
    return new Array(count).fill(0).map((_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 0,
      speed: rand() * 0.5 + 0.3,
      maxRadius: 4 + rand() * 2,
      opacity: 0,
      phase: rand() * Math.PI * 2
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (!meshRef.current) return;

    waves.forEach((wave, i) => {
      // Expand wave
      wave.radius += wave.speed;

      if (wave.radius > wave.maxRadius) {
        wave.radius = 0;
        wave.opacity = 0;
      } else {
        wave.opacity = Math.sin((wave.radius / wave.maxRadius) * Math.PI) * 0.4;
      }

      const x = Math.cos(wave.angle) * wave.radius;
      const y = Math.sin(wave.angle) * wave.radius;
      const z = Math.sin(t + wave.phase) * 0.5;

      tempObj.position.set(x, y, z);
      tempObj.scale.setScalar(wave.radius * 0.3 + 0.1);
      tempObj.rotation.z = wave.angle;
      tempObj.updateMatrix();

      meshRef.current.setMatrixAt(i, tempObj.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <torusGeometry args={[1, 0.02, 8, 32]} />
      <meshBasicMaterial color="#FBE18D" transparent opacity={0.3} />
    </instancedMesh>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div
      className="
        h-[500px] w-full max-w-[600px] mx-auto 
        opacity-100
        relative overflow-hidden
        rounded-2xl 
        border border-[#C69320]/40
        bg-black/80
        shadow-[0_0_80px_rgba(198,147,32,0.3)]
      "
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} gl={{ alpha: true, antialias: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />

        {/* Deep Space Background */}
        <color attach="background" args={['#020202']} />
        <Stars radius={150} depth={70} count={8000} factor={6} saturation={1} fade speed={2} />

        {/* Lights */}
        <ambientLight intensity={0.8} />
        <pointLight position={[15, 15, 15]} intensity={3} color="#FBE18D" />
        <pointLight position={[-15, -15, -15]} intensity={2} color="#C69320" />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFEBAA" distance={8} />

        {/* The Brain/Network */}
        <NeuralNetwork count={120} radius={5} />

        {/* Post-Processing for the "Glow" */}
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={0.15} mipmapBlur intensity={3} radius={0.8} />
          <ChromaticAberration offset={[0.0015, 0.0015]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene3D;
