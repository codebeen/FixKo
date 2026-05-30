// import React, { useEffect } from 'react';
// import { Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import LoadingAnimation from '@/components/ui/loading/LoadingAnimation';
// import BaseMain from '@/components/layout/(base-main)/BaseMain';

// export default function LoadingScreenView() {
//     const router = useRouter();

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             router.replace('/(client)/booking/WorkerSelectionPage' as any);
//         }, 2500);

//         return () => clearTimeout(timer);
//     }, [router]);

//     return (
//         <BaseMain align="center" contentContainerStyle={{ justifyContent: 'center' }}>
//             <LoadingAnimation style={{ width: 250, height: 250 }} />
//             <Text className="text-white text-lg font-bold mt-5">Finding available workers...</Text>
//         </BaseMain>
//     );
// }


// app/booking/LoadingPage.tsx
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import LoadingAnimation from '@/components/ui/loading/LoadingAnimation';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

export default function LoadingPage() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Capture totalCost, serviceType, etc. Passed from booking

  useEffect(() => {
    const timer = setTimeout(() => {
      // Direct the user cleanly to the next screen after the animation completes!
      router.replace({
        pathname: '/booking/WorkerSelectionPage' as any, // Or change to '/(client)/booking/WorkerSelectionPage'
        params: params, // Automatically pass forward the price and service keys!
      });
    }, 2500); // 2.5 second delay matching your sweet animation setup

    return () => clearTimeout(timer);
  }, [router, params]);

  return (
    <BaseMain align="center" contentContainerStyle={{ justifyContent: 'center' }}>
      <LoadingAnimation style={{ width: 250, height: 250 }} />
      <Text className="text-white text-lg font-bold mt-5">Finding available workers...</Text>
    </BaseMain>
  );
}
