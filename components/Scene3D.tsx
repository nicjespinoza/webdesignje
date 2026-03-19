import React, { useRef, useMemo } from 'react';
import {
  Canvas,
  useFrame,
} from '@react-three/fiber';
import {
  Stars,
  PerspectiveCamera,
  PointMaterial,
  Points,
  Line,
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

// --- Neural Network Logic ---

const NeuralNetwork = ({ count = 60, radius = 4 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Generate random nodes (Neurons)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // Even distribution inside sphere
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [count, radius]);

  // Generate connections (Synapses) based on distance
  const connections = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const threshold = 2.5;

    particles.forEach((p1, i) => {
      particles.forEach((p2, j) => {
        if (i !== j) {
          const dist = p1.distanceTo(p2);
          if (dist < threshold) {
            lines.push([p1, p2]);
          }
        }
      });
    });
    return lines;
  }, [particles]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotate the entire brain
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.z = t * 0.01;
    }
  });

  // Convert particles to positions array for Points component
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
        pos[i * 3] = p.x;
        pos[i * 3 + 1] = p.y;
        pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [particles, count]);

  return (
    <group ref={groupRef}>
        {/* The Neurons (Nodes) */}
        <Points positions={positions} stride={3} ref={pointsRef}>
            <PointMaterial
                transparent
                color="#22d3ee" // Cyan
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>

        {/* The Synapses (Lines) */}
        {/* Note: Rendering individual lines is expensive, but for < 200 lines perfectly fine for modern GPUs */}
        {/* We use a Group to hold lines, or better, use LineSegments if we manually built geometry, but Drei Line is convenient here for "glowing" effect */}
        <group ref={linesRef}>
            {connections.map((line, index) => (
                // Optimizing: Only render a fraction of lines to avoid clutter if too dense
                Math.random() > 0.5 ? (
                <Line
                    key={index}
                    points={line}
                    color="#4f46e5" // Indigo
                    opacity={0.15}
                    transparent
                    lineWidth={1}
                />
                ) : null
            ))}
        </group>
        
        {/* Floating Data Bits moving through the system */}
        <DataPulses radius={radius} />
    </group>
  );
};

// Simulates data moving through the network
const DataPulses = ({ radius }: { radius: number }) => {
    const count = 15;
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const tempObj = new THREE.Object3D();
    
    // Initial random positions
    const agents = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            pos: new THREE.Vector3(
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2
            ),
            dest: new THREE.Vector3(
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2,
                (Math.random() - 0.5) * radius * 2
            ),
            speed: Math.random() * 0.05 + 0.02
        }))
    }, [radius]);

    useFrame(() => {
        if (!meshRef.current) return;
        
        agents.forEach((agent, i) => {
            // Move agent towards destination
            const dir = new THREE.Vector3().subVectors(agent.dest, agent.pos).normalize();
            agent.pos.add(dir.multiplyScalar(agent.speed));
            
            // If close to destination, pick new destination
            if (agent.pos.distanceTo(agent.dest) < 0.5) {
                agent.dest.set(
                    (Math.random() - 0.5) * radius * 2,
                    (Math.random() - 0.5) * radius * 2,
                    (Math.random() - 0.5) * radius * 2
                );
            }

            tempObj.position.copy(agent.pos);
            tempObj.scale.setScalar(1);
            tempObj.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObj.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#fbbf24" /> {/* Gold data packets */}
        </instancedMesh>
    );
};

const Scene3D: React.FC = () => {
  return (
    <div
      className="
        h-[400px] w-full max-w-[500px] mx-auto 
        opacity-100
        relative overflow-hidden
        rounded-2xl 
        border border-cyan-500/20
        bg-slate-900/40
        shadow-[0_0_50px_rgba(6,182,212,0.15)]
      "
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

        {/* Deep Space Background */}
        <color attach="background" args={['#020617']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7c3aed" />

        {/* The Brain/Network */}
        <NeuralNetwork count={80} radius={4.5} />

        {/* Post-Processing for the "Glow" */}
        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
          {/* Subtle glitchy effect for realism */}
          <ChromaticAberration offset={[0.002, 0.002]} /> 
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene3D;