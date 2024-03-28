import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

enum LoginType {
	Phone,
	Email,
	Google,
	Apple
}

const Page = () => {
	const [countryCode, setCountryCode] = useState('+60');
	const [phone, setPhone] = useState('');
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

	const onLogin = async (type: LoginType) => {
		if (type === LoginType.Phone) { }
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Welcome back!</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter your phone number associated with your account
				</Text>

				<View style={styles.inputContainer}>
					<TextInput
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
					/>
				</View>

				{/* <View style={{ flex: 1 }} /> */}

				<TouchableOpacity
					onPress={() => onLogin(LoginType.Phone)}
					style={[defaultStyles.pillButton, { marginBottom: 20 }, phone !== '' ? styles.enabled : styles.disabled]}
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
