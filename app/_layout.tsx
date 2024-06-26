import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useFonts } from 'expo-font';
import { Link, Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (error) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (error) {
			return;
		}
	}
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (!isLoaded) return;

		const inAuthGroup = segments[0] === '(authed)';

		if (isSignedIn && !inAuthGroup) {
			router.replace('/home');
		} else if (!isSignedIn) {
			router.replace('/');
		}
	}, [isSignedIn])

	if (!loaded || !isLoaded) {
		return <Slot />;
	}

	return <Stack>
		<Stack.Screen name="index" options={{ headerShown: false }} />
		<Stack.Screen
			name="register"
			options={{
				title: '',
				headerBackTitle: '',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: Colors.background },
				headerLeft: () => (
					<TouchableOpacity onPress={router.back}>
						<Ionicons name="arrow-back" size={32} color={Colors.dark} />
					</TouchableOpacity>
				)
			}}
		/>
		<Stack.Screen
			name="login"
			options={{
				title: '',
				headerBackTitle: '',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: Colors.background },
				headerLeft: () => (
					<TouchableOpacity onPress={router.back}>
						<Ionicons name="arrow-back" size={32} color={Colors.dark} />
					</TouchableOpacity>
				),
				headerRight: () => (
					<Link href={'/help'} asChild>
						<TouchableOpacity>
							<Ionicons name="help-circle-outline" size={32} color={Colors.dark} />
						</TouchableOpacity>
					</Link>
				),
			}}
		/>

		{/* <Stack.Screen
			name="verify/[phone]"
			options={{
				title: '',
				headerBackTitle: '',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: Colors.background },
				headerLeft: () => (
					<TouchableOpacity onPress={router.back}>
						<Ionicons name="arrow-back" size={32} color={Colors.dark} />
					</TouchableOpacity>
				)
			}}
		/> */}

		<Stack.Screen
			name="verify/[email]"
			options={{
				title: '',
				headerBackTitle: '',
				headerShadowVisible: false,
				headerStyle: { backgroundColor: Colors.background },
				headerLeft: () => (
					<TouchableOpacity onPress={router.back}>
						<Ionicons name="arrow-back" size={32} color={Colors.dark} />
					</TouchableOpacity>
				)
			}}
		/>

		<Stack.Screen name="help" options={{ presentation: 'modal', title: "Help" }} />

		<Stack.Screen name="(authed)/(tab)" options={{ headerShown: false }} />
		<Stack.Screen
			name="(authed)/crypto/[id]"
			options={{
				title: '',
				headerLargeTitle: true,
				headerTransparent: true,
				headerLeft: () => (
					<TouchableOpacity onPress={router.back}>
						<Ionicons name="arrow-back" size={32} color={Colors.dark} />
					</TouchableOpacity>
				),
				headerRight: () => (
					<View style={{ flexDirection: 'row', gap: 12 }}>
						<TouchableOpacity>
							<Ionicons name="notifications-outline" color={Colors.dark} size={32} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Ionicons name="star-outline" color={Colors.dark} size={32} />
						</TouchableOpacity>
					</View>
				)
			}}
		/>

	</Stack>;
}

const RootLayoutNav = () => {

	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={CLERK_PUBLISHABLE_KEY!}
		>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar style='auto' />
					<InitialLayout />
				</GestureHandlerRootView>
			</QueryClientProvider>
		</ClerkProvider>
	);
}

export default RootLayoutNav
