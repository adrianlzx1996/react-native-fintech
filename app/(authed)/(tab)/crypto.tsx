import { defaultStyles } from "@/constants/Styles"
import { Currency } from "@/interfaces/crypto"
import { useQuery } from "@tanstack/react-query"
import { Link } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import Colors from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const Page = () => {
	const headerHeight = useHeaderHeight();

	const currencies = useQuery({
		queryKey: ['listings'],
		queryFn: () => fetch("/api/listings").then(res => res.json())
	});

	const ids = currencies?.data?.map((currency: Currency) => currency.id).join(',');

	const { data } = useQuery({
		queryKey: ['info', ids],
		queryFn: () => fetch(`/api/quotes?ids=${ids}`).then(res => res.json()),
		enabled: !!ids,
	});

	return (
		<ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
			<Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
			<View style={defaultStyles.block}>
				{currencies.data?.map((currency: Currency) => (
					<Link href={`/crypto/${currency.id}`} asChild key={currency.id}>
						<TouchableOpacity style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
							<Image
								source={{ uri: data?.[currency.id].logo }}
								style={{ width: 40, height: 40 }}
							/>
							<View style={{ flex: 1, gap: 4 }}>
								<Text style={{ fontWeight: '600', color: Colors.dark }}	>{currency.name}</Text>
								<Text style={{ color: Colors.gray, fontSize: 12 }}>{currency.symbol}</Text>
							</View>
							<View style={{ gap: 4, alignItems: 'flex-end' }}>
								<Text style={{ color: Colors.gray }}>{currency.quote.USD.price.toFixed(2)} $</Text>
								<View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
									<Ionicons name={`arrow-${currency.quote.USD.percent_change_1h > 0 ? 'up' : 'down'}`} size={12} color={currency.quote.USD.percent_change_1h > 0 ? 'green' : 'red'} />
									<Text style={{ color: currency.quote.USD.percent_change_1h > 0 ? 'green' : 'red', fontSize: 12 }}>{currency.quote.USD.percent_change_1h.toFixed(2)}%</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Link>
				))}
			</View>
		</ScrollView>
	)
}

export default Page;
