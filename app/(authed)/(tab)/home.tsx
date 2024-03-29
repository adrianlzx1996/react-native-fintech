import Dropdown from "@/components/Dropdown";
import RoundButton from "@/components/RoundButton";
import Tile from "@/components/SortableList/Tile";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements"

const Page = () => {
	const { balance, runTransaction, transactions, clearTransaction } = useBalanceStore();

	const headerHeight = useHeaderHeight();

	const onAddMoney = () => {
		runTransaction({
			id: Math.random().toString(),
			amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
			date: new Date(),
			title: 'Added Money'
		})
	}

	return (
		<ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
			<View style={styles.account}>
				<View style={styles.row}>
					<Text style={styles.balance}>{balance()}</Text>
					<Text style={styles.currency}>$</Text>
				</View>
			</View>

			<View style={styles.actionRow}>
				<RoundButton icon="add" title="Send" onPress={onAddMoney} />
				<RoundButton icon="refresh" title="Exchange" onPress={clearTransaction} />
				<RoundButton icon="list" title="Details" />
				<Dropdown />
			</View>

			<Text style={defaultStyles.sectionHeader}>
				Transactions
			</Text>
			<View style={styles.transactions}>
				{transactions.length === 0
					? (
						<Text style={{ padding: 14, color: Colors.gray }}>No transaction yet...</Text>
					)
					:
					transactions.map(transaction => (
						<View key={transaction.id} style={styles.transaction}>
							<View style={styles.circle}>
								<Ionicons name={transaction.amount > 0 ? "add" : "remove"} size={24} color={Colors.primary} />
							</View>
							<View style={{ flex: 1 }}>
								<Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
								<Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toUTCString()}</Text>
							</View>
							<Text>{transaction.amount}$</Text>
						</View>
					))
				}
			</View>

			<Text style={defaultStyles.sectionHeader}>
				Widgets
			</Text>
			<WidgetList />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	account: {
		margin: 80,
		alignItems: 'center'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		gap: 8
	},
	balance: {
		fontSize: 64,
		fontWeight: 'bold',
	},
	currency: {
		fontSize: 20,
		fontWeight: '500',
		// marginBottom: 10,
	},
	actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	transactions: {
		marginHorizontal: 20,
		padding: 12,
		backgroundColor: '#fff',
		borderRadius: 16,
		gap: 20
	},
	transaction: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		gap: 16,
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

export default Page;
