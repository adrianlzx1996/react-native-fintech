import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

enum LoginType {
	Phone,
	Email,
	Google,
	Apple
}

const Page = () => {
	const router = useRouter();
	const { signIn } = useSignIn();
	const [countryCode, setCountryCode] = useState('60');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

	const onLogin = async (type: LoginType) => {
		// if (type === LoginType.Phone) {
		// 	try {
		// 		const fullPhoneNumber = `${countryCode}${phone}`;
		// 		const { supportedFirstFactors } = await signIn!.create({
		// 			identifier: fullPhoneNumber
		// 		});
		// 		const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
		// 			return factor.strategy === 'phone_code';
		// 		})

		// 		const { phoneNumberId } = firstPhoneFactor;

		// 		await signIn!.prepareFirstFactor({
		// 			strategy: 'phone_code',
		// 			phoneNumberId
		// 		})

		// 		router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber, signin: 'true' } });
		// 	} catch (error) {
		// 		console.error('Error login:', error);
		// 		if (isClerkAPIResponseError(error)) {
		// 			if (error.errors[0].code === 'form_identifier_not_found') {
		// 				Alert.alert('Error', error.errors[0].message);
		// 			}
		// 		}
		// 	}
		// }
		if (type === LoginType.Email) {
			try {
				const { supportedFirstFactors } = await signIn!.create({
					identifier: email
				});
				const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
					return factor.strategy === 'email_code';
				})

				const { emailAddressId } = firstPhoneFactor;

				await signIn!.prepareFirstFactor({
					strategy: 'email_code',
					emailAddressId
				})

				router.push({ pathname: '/verify/[email]', params: { email, signin: 'true' } });
			} catch (error) {
				console.error('Error login:', error);
				if (isClerkAPIResponseError(error)) {
					if (error.errors[0].code === 'form_identifier_not_found') {
						Alert.alert('Error', error.errors[0].message);
					}
				}
			}
		}
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Welcome back!</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter your phone number associated with your account
				</Text>

				<View style={styles.inputContainer}>
					{/* <TextInput
						style={styles.input}
						placeholder="Country Code"
						placeholderTextColor={Colors.gray}
						value={countryCode}
						onChangeText={setCountryCode}
					/>
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholder="Mobile number"
						placeholderTextColor={Colors.gray}
						keyboardType="numeric"
						value={phone}
						onChangeText={setPhone}
					/> */}
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholder="Email address"
						placeholderTextColor={Colors.gray}
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>
				</View>

				{/* <View style={{ flex: 1 }} /> */}

				<TouchableOpacity
					onPress={() => onLogin(LoginType.Phone)}
					style={[defaultStyles.pillButton, { marginBottom: 20 }, phone !== '' || email !== '' ? styles.enabled : styles.disabled]}
				>
					<Text style={defaultStyles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
					<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
					<Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
					<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }} />
				</View>

				<TouchableOpacity onPress={() => onLogin(LoginType.Email)} style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}>
					<Ionicons name="mail" size={24} color={"#000"} />
					<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Email</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => onLogin(LoginType.Google)} style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}>
					<Ionicons name="logo-google" size={24} color={"#000"} />
					<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Google</Text>
				</TouchableOpacity>

				{Platform.OS === 'ios'
					?
					<TouchableOpacity onPress={() => onLogin(LoginType.Apple)} style={[defaultStyles.pillButton, { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#fff' }]}>
						<Ionicons name="logo-apple" size={24} color={"#000"} />
						<Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with Apple</Text>
					</TouchableOpacity>
					: null}
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 40,
		flexDirection: 'row'
	},
	input: {
		backgroundColor: Colors.lightGray,
		padding: 20,
		borderRadius: 16,
		fontSize: 20,
		marginRight: 10
	},
	enabled: {
		backgroundColor: Colors.primary,
	},
	disabled: {
		backgroundColor: Colors.primaryMuted,
	}
})

export default Page;
