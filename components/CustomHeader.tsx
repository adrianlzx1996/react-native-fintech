import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const CustomHeader = () => {
	const { top } = useSafeAreaInsets()
	return (
		<BlurView intensity={80} tint='extraLight' style={{ paddingTop: top }}>
			<View style={styles.container}>
				<TouchableOpacity style={styles.avatar}>
					<Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>AL</Text>
				</TouchableOpacity>

				<View style={styles.searchSection}>
					<Ionicons name="search" size={20} color={Colors.dark} style={styles.searchIcon} />
					<TextInput style={styles.input} placeholder="Search" placeholderTextColor={Colors.dark} />
				</View>

				<View style={styles.circle}>
					<Ionicons name="stats-chart" size={20} color={Colors.dark} />
				</View>

				<View style={styles.circle}>
					<Ionicons name="card" size={20} color={Colors.dark} />
				</View>
			</View>
		</BlurView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
		height: 60,
		backgroundColor: 'transparent',
		paddingHorizontal: 20
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.gray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchSection: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.lightGray,
		borderRadius: 25,
	},
	searchIcon: {
		padding: 10
	},
	input: {
		flex: 1,
		paddingVertical: 10,
		paddingRight: 10,
		color: Colors.dark,
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default CustomHeader
