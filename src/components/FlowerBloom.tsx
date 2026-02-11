import { useState, useCallback } from "react";

interface Bloom {
  id: number;
  x: number;
  y: number;
}

const FLOWERS = ["🌸", "🌺", "🌷", "🌻", "💮", "🌼", "🏵️"];

const FlowerBloom = () => {
  const [blooms, setBlooms] = useState<Bloom[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    const bloom: Bloom = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setBlooms((prev) => [...prev, bloom]);
    setTimeout(() => {
      setBlooms((prev) => prev.filter((b) => b.id !== bloom.id));
    }, 1500);
  }, []);

  return (
    <div className="fixed inset-0 z-[5]" onClick={handleClick}>
      {blooms.map((b) => (
        <span
          key={b.id}
          className="absolute pointer-events-none animate-bloom"
          style={{ left: b.x, top: b.y, transform: "translate(-50%, -50%)" }}
        >
          {FLOWERS[Math.floor(Math.random() * FLOWERS.length)]}
        </span>
      ))}
    </div>
  );
};

export default FlowerBloom;
