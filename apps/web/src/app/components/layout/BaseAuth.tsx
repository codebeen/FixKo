import { ReactNode } from "react";
import { Text, Title, Stack, Flex, Box } from "@mantine/core";

interface BaseAuthProps {
  children: ReactNode;
}

function BaseAuth({ children }: BaseAuthProps) {
  return (
    <Flex direction={{ base: "column", md: "row" }} mih="100vh" bg="#f8fafc">
      {/* LEFT SIDE: Brand Showcase */}
      <Box
        w={{ base: "100%", md: "60%" }}
        p={{ base: "xl", sm: "3rem", md: "4rem" }}
        style={{
          background: `
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23ffffff' fill-opacity='0.08'/%3E%3C/svg%3E"),
            radial-gradient(circle at 15% 85%, rgba(219, 169, 46, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.3) 0%, transparent 45%),
            linear-gradient(140deg, #001851 0%, #0b2361 25%, #18388c 50%, #2655bf 75%, #3b82f6 100%)
          `,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack align="center" gap="md" style={{ width: "100%", maxWidth: 520 }}>
          {/* Logo Container */}
          <Box
            className="logo-container"
            style={{
              width: "100%",
              maxWidth: 420,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 480"
              className="fixko-logo"
              style={{ width: "100%", height: "auto", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="primaryGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#003B9F" />
                  <stop offset="100%" stopColor="#DBA92E" />
                </linearGradient>
                <linearGradient id="wrenchGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#003B9F" />
                  <stop offset="50%" stopColor="#556b82" />
                  <stop offset="100%" stopColor="#DBA92E" />
                </linearGradient>
                <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#003B9F" />
                  <stop offset="100%" stopColor="#2c3e50" />
                </linearGradient>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="2" dy="5" stdDeviation="4" floodOpacity="0.4" />
                </filter>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* House and Sparkles Group */}
              <g transform="translate(120, 0)">
                {/* Sparkles */}
                <g transform="translate(60, 40)">
                  <path className="sparkle" style={{ animationDelay: "0s" }} d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" filter="url(#shadow)" />
                </g>
                <g transform="translate(320, 60) scale(0.7)">
                  <path className="sparkle" style={{ animationDelay: "0.3s" }} d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" />
                </g>
                <g transform="translate(340, 180) scale(0.5)">
                  <path className="sparkle" style={{ animationDelay: "0.6s" }} d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" />
                </g>

                <g filter="url(#shadow)">
                  {/* Gear Outline */}
                  <g className="gear-spin" style={{ transformOrigin: "180px 180px" }}>
                    <path d="M 230 50 L 245 30 L 275 50 L 260 75 A 110 110 0 0 1 285 110 L 315 105 L 325 135 L 295 145 A 110 110 0 0 1 290 190 L 315 210 L 295 240 L 265 220 A 110 110 0 0 1 220 255 L 220 285 L 190 285 L 195 255" fill="none" stroke="#DBA92E" strokeWidth="8" strokeLinejoin="round" />
                  </g>

                  {/* Roof Fill */}
                  <path d="M 110 140 C 80 140 80 130 100 110 L 180 20 L 260 110 C 280 130 280 140 250 140 Z" fill="white" stroke="none" />
                  {/* Roof Outline */}
                  <path d="M 110 140 C 80 140 80 130 100 110 L 180 20 L 260 110 C 280 130 280 140 250 140" fill="none" stroke="url(#primaryGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Base Box Fill & Outline */}
                  <rect x="80" y="160" width="200" height="120" fill="white" stroke="url(#primaryGrad)" strokeWidth="8" strokeLinejoin="round" />

                  {/* Inner Blocks */}
                  <g className="blocks-hover">
                    <rect x="110" y="180" width="55" height="40" fill="#003B9F" />
                    <rect x="195" y="180" width="55" height="40" fill="url(#blockGrad)" />
                    <rect x="110" y="235" width="55" height="41" fill="#003B9F" />
                  </g>

                  {/* Wrench Overlay */}
                  <g className="wrench-swing" style={{ transformOrigin: "120px 80px" }}>
                    <g transform="translate(120, 80) rotate(35)">
                      <rect x="-30" y="-10" width="60" height="20" fill="url(#wrenchGrad)" />
                      {/* Left Head */}
                      <path d="M -40 -20 A 22 22 0 1 0 -40 20 L -20 20 L -20 8 L -45 8 L -45 -8 L -20 -8 L -20 -20 Z" fill="#003B9F" />
                      {/* Right Head */}
                      <path d="M 40 -20 A 22 22 0 1 1 40 20 L 20 20 L 20 8 L 45 8 L 45 -8 L 20 -8 L 20 -20 Z" fill="#DBA92E" />
                    </g>
                  </g>
                </g>
              </g>

              {/* TEXT GRAPHIC */}
              <g transform="translate(15, 290)">
                <text className="text-float-1 fix-text" x="30" y="150" fontFamily="'Arial Black', Impact, sans-serif" fontStyle="italic" fontWeight="900" fontSize="130" fill="url(#blueGrad)" filter="url(#shadow)">
                  Fix
                </text>
                
                <text className="text-float-2 ko-text" x="250" y="150" fontFamily="'Arial Black', Impact, sans-serif" fontStyle="italic" fontWeight="900" fontSize="130" fill="url(#redGrad)" filter="url(#shadow)">
                  Ko
                </text>

                {/* Text: PH */}
                <text className="text-pulse ph-text" x="460" y="110" fontFamily="'Arial Black', Impact, sans-serif" fontStyle="italic" fontWeight="900" fontSize="55" fill="#facc15" filter="url(#shadow)">
                  PH
                </text>

                {/* Half Sun */}
                <g transform="translate(490, 50)">
                  <g className="sun-waggle">
                    <path d="M -30 0 A 30 30 0 0 1 30 0 Z" fill="#facc15" filter="url(#shadow)" />
                    {[-70, -45, -20, 0, 20, 45, 70].map((angle, i) => (
                      <polygon key={i} points="-4,-35 4,-35 0,-48" transform={`rotate(${angle} 0 0)`} fill="#facc15" />
                    ))}
                  </g>
                </g>

                {/* Animated Sparkles */}
                <g transform="translate(180, 40)">
                  <g className="sparkle" style={{ animationDelay: "0s" }}>
                    <path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#fef08a" filter="url(#shadow)" />
                  </g>
                </g>
                <g transform="translate(560, 30) scale(0.7)">
                  <g className="sparkle" style={{ animationDelay: "0.3s" }}>
                    <path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#fef08a" />
                  </g>
                </g>
                <g transform="translate(580, 60) scale(0.5)">
                  <g className="sparkle" style={{ animationDelay: "0.6s" }}>
                    <path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#fef08a" />
                  </g>
                </g>
              </g>
            </svg>
          </Box>

          {/* Core Animation Styles Injection */}
          <style>{`
            .logo-container {
              transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
            }
            .logo-container:hover {
              transform: translateY(-6px) scale(1.03);
              filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3));
            }
            .logo-container:hover .wrench-swing {
              animation: repair-fast 0.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
            }
            .logo-container:hover .gear-spin {
              animation: gear-rock 1.5s ease-in-out infinite alternate;
            }
            .logo-container:hover .sparkle {
              animation-duration: 0.4s;
              fill: #ffffff;
            }
            .logo-container:hover .fix-text,
            .logo-container:hover .ko-text {
              filter: url(#glow) url(#shadow);
            }
            .logo-container:hover .ph-text {
              animation: popPulseFast 0.5s ease-in-out infinite alternate;
              filter: url(#glow) url(#shadow);
            }
            .wrench-swing {
              animation: repair 2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
              transform-origin: 300px 140px;
            }
            @keyframes repair {
              0% { transform: rotate(-15deg); }
              100% { transform: rotate(25deg); }
            }
            @keyframes repair-fast {
              0% { transform: rotate(-35deg) scale(0.95); }
              100% { transform: rotate(45deg) scale(1.1); }
            }
            .sparkle {
              animation: twinkle 1s ease-in-out infinite alternate;
              transform-origin: 0px 0px;
              transition: fill 0.3s ease;
            }
            @keyframes twinkle {
              0% { opacity: 0.3; transform: scale(0.5) rotate(-20deg); }
              100% { opacity: 1; transform: scale(1.3) rotate(45deg); }
            }
            @keyframes gear-rock {
              0% { transform: rotate(-12deg); }
              100% { transform: rotate(12deg); }
            }
            .text-float-1 { animation: float1 4s ease-in-out infinite alternate; }
            @keyframes float1 {
              0% { transform: translateY(3px); }
              100% { transform: translateY(-3px); }
            }
            .text-float-2 { animation: float2 4s ease-in-out infinite alternate; animation-delay: 0.4s; }
            @keyframes float2 {
              0% { transform: translateY(3px); }
              100% { transform: translateY(-3px); }
            }            
            .text-pulse {
              animation: popPulse 2s ease-in-out infinite alternate;
              transform-origin: 485px 90px;
            }
            @keyframes popPulse {
              0% { transform: scale(0.96); }
              100% { transform: scale(1.08); }
            }
            @keyframes popPulseFast {
              0% { transform: scale(0.95); }
              100% { transform: scale(1.15) rotate(4deg); }
            }
          `}</style>

          {/* Catchy Typography Headings */}
          <Stack gap={4} align="center" mt="xl">
            <Title
              order={2}
              ta="center"
              c="white"
              ff="heading"
              fw={700}
              style={{ fontSize: "1.75rem", letterSpacing: "-0.025em" }}
            >
              Supporting Filipino Workers,
            </Title>
            <Text
              fs="italic"
              c="blue.1"
              fw={500}
              style={{ fontSize: "1.35rem", opacity: 0.95 }}
            >
              Serving Every Home.
            </Text>
          </Stack>

          <Text
            ta="center"
            c="white"
            mt="sm"
            style={{ fontSize: "0.925rem", lineHeight: 1.6, opacity: 0.85, color: "#ffffff" }}
          >
            Empowering the hands that build our nation. We bridge the gap between the hardworking
            Filipino and the homes that need them most. Pinoy pride, professional service.
          </Text>
        </Stack>
      </Box>

      {/* RIGHT SIDE: Authentication Container */}
      <Box
        w={{ base: "100%", md: "40%" }}
        p={{ base: "xl", sm: "3rem" }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box w="100%" maw={380} my={{ base: "3rem", md: "auto" }}>
          {children}
        </Box>

        {/* Footer legal notices */}
        <Box w="100%" maw={380}>
          <Text c="dimmed" size="xs" ta="center" style={{ lineHeight: 1.5, fontSize: "11px" }}>
            By using this service, you understand and agree to the FixKoPH{" "}
            <Text
              component="a"
              href="#"
              c="blue.7"
              fw={600}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text
              component="a"
              href="#"
              c="blue.7"
              fw={600}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Privacy Statement
            </Text>
            .
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default BaseAuth;