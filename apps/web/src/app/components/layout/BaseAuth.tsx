import { ReactNode } from "react";
import { Image, Text, Stack, Flex, Box, Center } from "@mantine/core";
// import fixko from "../../assets/FixKoLogo.png";

function BaseAuth({ children }: { children: ReactNode }) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      style={{ minHeight: "100vh" }}
    >
      {/* Left Side */}
      <Box
        w={{ base: '100%', md: '60%' }}
        style={{
          background: "linear-gradient(180deg, #4b83c3 0%, #17325e 100%)",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}
      >
        <Stack align="center" gap="xs">
          {/* The SVG paths below are incomplete. If it doesn't render, consider replacing <svg>          <Box className="animated-logo">
            <Image src={fixko.src} w={200} alt="FixKo Logo" />
          </Box>
          <style>{`
            .animated-logo {
              animation: float 4s ease-in-out infinite;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
              100% { transform: translateY(0px); }
            }
          `}</style> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" className="fixko-logo" style={{ width: 200, height: 250 }}>
            <path className="gear-rotate" d="..." />
            <path className="wrench-swing" d="..." />
            <g className="text-fade">...</g>
          </svg>
          <style>{`
            .gear-rotate {
              animation: spin 10s linear infinite;
              transform-origin: 290px 180px;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .wrench-swing {
              animation: repair 2.5s ease-in-out infinite alternate;
              transform-origin: 190px 240px;
            }

            @keyframes repair {
              0% { transform: rotate(-5deg); }
              100% { transform: rotate(10deg); }
            }

            .text-fade {
              animation: pulse 2s ease-in-out infinite alternate;
            }

            @keyframes pulse {
              0% { opacity: 0.8; } 
              100% { opacity: 1; }
            }
          `}</style>

          <Text fw={700} style={{ fontSize: 24, color: 'white' }}>
            Supporting Filipino Workers,
          </Text>
          <Text fs="italic" style={{ fontSize: 18, color: '#e2e8f0' }} mb="lg">
            Serving Every Home.
          </Text>

          <Text
            ta="center"
            style={{ fontSize: 12, lineHeight: 1.6, color: '#cbd5e1' }}
            maw={500}
            mt="md"
          >
            Empowering the hands that build our nation. We bridge the gap between the hardworking
            Filipino and the homes that need them most. Pinoy pride, professional service.
          </Text>
        </Stack>
      </Box>

      {/* Right Side */}
      <Box
        w={{ base: '100%', md: '40%' }}
        bg="white"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}
      >
        <Stack align="center" w="100%" maw={400}>
          <Box w="100%">
            {children}
          </Box>

          <Stack align="center" w="100%" mt={20}>
            <Text c="#1A1A2E" style={{ fontSize: 10, lineHeight: 1.4 }} ta="center">
              By using this service, you understood and agree to the PUP Online
              Services{" "}
              <Text
                span
                c="#061C48"
                style={{ textDecoration: "underline", cursor: "pointer", fontSize: "10px", fontWeight: 600 }}
              >
                Terms of Use
              </Text>{" "}
              and{" "}
              <Text
                span
                c="#061C48"
                style={{ textDecoration: "underline", cursor: "pointer", fontSize: "10px", fontWeight: 600 }}
              >
                Privacy Statement
              </Text>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}

export default BaseAuth;
