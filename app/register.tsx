import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const Page = () => {
	const [countryCode, setCountryCode] = useState('60');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
	const router = useRouter();
	const { signUp } = useSignUp();

	const onRegister = async () => {
		// if (phone !== '') {
		// 	const fullPhoneNumber = `${countryCode}${phone}`;

		// 	try {
		// 		await signUp!.create({
		// 			phoneNumber: fullPhoneNumber
		// 		})
		// 		signUp!.preparePhoneNumberVerification();

		// 		router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
		// 	} catch (error) {
		// 		console.error('Error register:', error);
		// 	}
		// }

		if (email !== '') {
			try {
				await signUp!.create({
					emailAddress: email
				})
				signUp!.prepareEmailAddressVerification();

				router.push({ pathname: '/verify/[email]', params: { email } });
			} catch (error) {
				console.error('Error register:', error);
				console.log(error)
			}
		}
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Let's get started!</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter your email address. We will send you a confirmation code there
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
						placeholder="Email Address"
						placeholderTextColor={Colors.gray}
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>
				</View>

				<Link href="/login" replace asChild>
					<TouchableOpacity>
						<Text style={defaultStyles.textLink}>Already have an account? Log In</Text>
					</TouchableOpacity>
				</Link>

				<View style={{ flex: 1 }} />

				<TouchableOpacity
					onPress={onRegister}
					style={[defaultStyles.pillButton, { marginTop: 20 }, phone !== '' || email !== '' ? styles.enabled : styles.disabled]}
				>
					<Text style={defaultStyles.buttonText}>Register</Text>
				</TouchableOpacity>
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
