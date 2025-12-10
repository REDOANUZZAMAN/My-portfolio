'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Computer({ isMobile }: { isMobile: boolean }) {
  try {
    const gltf = useGLTF('/desktop_pc/scene.gltf', true);
    
    return (
      <group>
        {/* Soft ambient light */}
        <ambientLight intensity={0.3} />
        
        {/* Hemisphere light for basic fill */}
        <hemisphereLight intensity={0.15} groundColor="black" />
        
        {/* Main focused spotlight - like a torch beam */}
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        
        {/* Point light for subtle fill */}
        <pointLight intensity={1} />
        
        <primitive
          object={gltf.scene}
          scale={isMobile ? 0.6 : 0.85}
          position={isMobile ? [0, -3, -1.2] : [0, -3.5, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </group>
    );
  } catch (error) {
    console.error('Failed to load 3D model:', error);
    // Return fallback content
    return null;
  }
}

export default function ComputerModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-[500px] md:h-[700px] xl:h-[800px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ 
          preserveDrawingBuffer: true,
          alpha: true,
          antialias: true
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <Computer isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
