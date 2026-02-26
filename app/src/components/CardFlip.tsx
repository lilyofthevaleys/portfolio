"use client";

import { ArrowRight, Repeat2, Lightbulb, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  iconType?: "innovation" | "excellence" | "growth";
  circleColor?: string;
}

export default function CardFlip({
  title = "Design Systems",
  subtitle = "Explore the fundamentals",
  description = "Dive deep into the world of modern UI/UX design.",
  features = ["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"],
  iconType = "innovation",
  circleColor = "rgba(251, 146, 60, 0.3)",
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getIcon = () => {
    switch (iconType) {
      case "innovation":
        return Lightbulb;
      case "excellence":
        return Award;
      case "growth":
        return TrendingUp;
      default:
        return Lightbulb;
    }
  };

  const Icon = getIcon();

  return (
    <div
      style={{ height: "340px", width: "280px", perspective: "2000px", zIndex: 3, position: "relative" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        {/* Front of card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            overflow: "hidden",
            borderRadius: "16px",
            backgroundColor: "#fafafa",
            border: "1px solid #e4e4e7",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          }}
          className="dark:bg-zinc-900 dark:border-zinc-800/50 dark:shadow-lg"
        >
          {/* Animated icon background */}
          <div
            style={{ position: "relative", height: "100%", width: "100%" }}
            className="bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black"
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  position: "relative",
                  marginTop: "-20px",
                }}
              >
                {/* Glint overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: -20,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
                    animation: "glint 3s ease-in-out infinite",
                    opacity: 0.6,
                  }}
                />
                <Icon
                  style={{
                    width: "100px",
                    height: "100px",
                    color: circleColor,
                    filter: `drop-shadow(0 0 15px ${circleColor})`,
                  }}
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ position: "absolute", right: 0, bottom: 0, left: 0, padding: "20px 20px 24px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#18181b",
                    lineHeight: "1.4",
                    letterSpacing: "-0.025em",
                  }}
                  className="dark:text-white"
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#52525b",
                    lineHeight: "1.4",
                  }}
                  className="dark:text-zinc-200"
                >
                  {subtitle}
                </p>
              </div>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Repeat2 style={{ height: "16px", width: "16px", color: "#f97316" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "100%",
            width: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            padding: "24px",
            background: "linear-gradient(to bottom, #f4f4f5, #ffffff)",
            border: "1px solid #e4e4e7",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            display: "flex",
            flexDirection: "column",
          }}
          className="dark:from-zinc-900 dark:to-black dark:border-zinc-800 dark:shadow-lg"
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#18181b",
                  lineHeight: "1.3",
                  letterSpacing: "-0.025em",
                }}
                className="dark:text-white"
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#52525b",
                  lineHeight: "1.4",
                }}
                className="dark:text-zinc-400"
              >
                {description}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-zinc-700 transition-all duration-500 dark:text-zinc-300"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 100 + 200}ms`,
                  }}
                >
                  <ArrowRight className="h-3 w-3 text-orange-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glint {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </div>
  );
}
