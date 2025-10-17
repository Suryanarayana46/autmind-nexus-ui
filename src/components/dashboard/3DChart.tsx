import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Bar3DProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
}

function Bar3D({ position, height, color, label }: Bar3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.8, height, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

interface Chart3DProps {
  data: Array<{ name: string; value: number }>;
  title: string;
}

export function Chart3D({ data, title }: Chart3DProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="w-full h-[400px] relative">
      <div className="absolute top-4 left-4 z-10 text-lg font-semibold text-foreground">
        {title}
      </div>
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: 'hsl(var(--background))' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        {data.map((item, index) => (
          <Bar3D
            key={item.name}
            position={[(index - data.length / 2) * 2, 0, 0]}
            height={(item.value / maxValue) * 4}
            color={colors[index % colors.length]}
            label={item.name}
          />
        ))}

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}