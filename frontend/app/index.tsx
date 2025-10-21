import {useEffect} from 'react';
import {useRouter} from 'expo-router';

export default function Index() {
  console.log('🎮 Index component rendering...');
  const router = useRouter();

  useEffect(() => {
    console.log('📍 Navigation: Pushing to mainMenu');
    router.push('/onBoarding/mainMenu');
  }, []);

  return <></>;
}
