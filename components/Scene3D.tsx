import React, { useRef, useMemo, useState, useEffect } from 'react';
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

const NeuralNetwork = ({ count = 60, radius = 4 }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const [particles] = useState(() => {
    const temp: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  });

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

  const [visibleConnections] = useState(() =>
    connections.filter(() => Math.random() > 0.5)
  );

  useEffect(() => {
    const s = new Set<string>();
    visibleConnections.forEach(l => s.add(l.map(p => `${p.x},${p.y},${p.z}`).join('|')));
    const current = new Set<string>();
    connections.forEach(l => current.add(l.map(p => `${p.x},${p.y},${p.z}`).join('|')));
    let changed = false;
    if (s.size !== current.size) changed = true;
    if (!changed) {
      for (const k of s) { if (!current.has(k)) { changed = true; break; } }
    }
  }, [connections, visibleConnections]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.z = t * 0.01;
    }
  });

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
        <Points positions={positions} stride={3} ref={pointsRef}>
            <PointMaterial
                transparent
                color="#22d3ee"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>

        <group ref={linesRef}>
            {visibleConnections.map((line, index) => (
                <Line
                    key={index}
                    points={line}
                    color="#4f46e5"
                    opacity={0.15}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>

        <DataPulses radius={radius} />
    </group>
  );
};

const DataPulses = ({ radius }: { radius: number }) => {
    const count = 15;
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const tempObj = new THREE.Object3D();
    // Optimize: reuse Vector3 instead of instantiating per frame to prevent GC stutters
    const dir = useMemo(() => new THREE.Vector3(), []);

    const [agents] = useState(() =>
        new Array(count).fill(0).map(() => ({
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
    );

    useFrame(() => {
        if (!meshRef.current) return;

        agents.forEach((agent, i) => {
            dir.subVectors(agent.dest, agent.pos).normalize();
            agent.pos.add(dir.multiplyScalar(agent.speed));

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
            <meshBasicMaterial color="#fbbf24" />
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

        <color attach="background" args={['#020617']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7c3aed" />

        <NeuralNetwork count={80} radius={4.5} />

        <EffectComposer enableNormalPass={false}>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Scene3D;
