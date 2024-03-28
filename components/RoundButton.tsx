import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type RoundButtonProps = {
	title: string;
	icon: typeof Ionicons.defaultProps;
	onPress?: () => void;
}
const RoundButton = ({ title, icon, onPress }: RoundButtonProps) => {
	return <TouchableOpacity onPress={onPress} style={styles.container}>
		<View style={styles.circle}>
			<Ionicons name={icon} size={32} color={Colors.dark} />
		</View>
		<Text style={styles.label}>{title}</Text>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 12
	},
	circle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center'
	},
	label: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.dark
	}
})

export default RoundButton;
