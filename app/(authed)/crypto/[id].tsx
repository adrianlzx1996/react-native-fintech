import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
const categories = ["Overview", "News", "Orders", "Transactions"]

const Page = () => {
	const headerHeight = useHeaderHeight();
	const { id } = useLocalSearchParams();
	const [activeIndex, setActiveIndex] = useState(0);

	const { data } = useQuery({
		queryKey: ['info', id],
		queryFn: async () => {
			const info = await fetch(`/api/info?ids=${id}`).then(res => res.json())

			return info[+id];
		},
	});

	return (
		<>
			<Stack.Screen options={{ title: data?.name }} />
			<SectionList
				style={{ paddingTop: headerHeight }}
				contentInsetAdjustmentBehavior="automatic"
				sections={[{ data: [{ title: "Section 1" }] }]}
				data={[]}
				keyExtractor={item => item.title}
				renderSectionHeader={({ section: { title } }) => (
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 16, paddingBottom: 8, backgroundColor: Colors.background, borderBottomColor: Colors.lightGray, borderBottomWidth: StyleSheet.hairlineWidth }}>
						{categories.map((category, index) => (
							<TouchableOpacity onPress={() => setActiveIndex(index)} style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
								<Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{category}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				)}
				ListHeaderComponent={() => (
					<>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
							<Text style={styles.subtitle}>{data?.symbol}</Text>
							<Image source={{ uri: data?.logo }} style={{ width: 64, height: 64 }} />
						</View>

						<View style={{ flexDirection: 'row', gap: 12, margin: 12 }}>
							<TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 }]}>
								<Ionicons name="add" size={24} color={"#fff"} />
								<Text style={[defaultStyles.buttonText, { color: "#fff" }]}>Buy</Text>
							</TouchableOpacity>

							<TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 }]}>
								<Ionicons name="arrow-back" size={24} color={Colors.primary} />
								<Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
							</TouchableOpacity>
						</View>
					</>
				)}
				renderItem={({ item }) => (
					<>
						{/* Chart */}
						<View style={{ height: 500, backgroundColor: "green" }}>

						</View>
						<View style={[defaultStyles.block, { marginTop: 20 }]}>
							<Text style={styles.subtitle}>Overview</Text>
							<Text style={{ color: Colors.gray }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga sit aut nesciunt atque facilis reiciendis ipsam at magni odit voluptatum veniam, vel quis saepe in minima nobis eius possimus perspiciatis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt itaque officiis sit quas. Ullam ut laborum aut a inventore voluptatem assumenda similique repudiandae distinctio, ad illum maiores qui nihil quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo tenetur laborum, illum iste nam totam sequi sunt voluptatibus tempore deleniti voluptates beatae officiis aperiam maxime perspiciatis? Ducimus, illo rerum.</Text>
						</View>
					</>
				)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
		color: Colors.gray
	},
	categoryText: {
		fontSize: 12,
		color: Colors.gray,
	},
	categoryTextActive: {
		fontSize: 12,
		color: "#000"
	},
	categoriesBtn: {
		padding: 8,
		paddingHorizontal: 16,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
	},
	categoriesBtnActive: {
		padding: 8,
		paddingHorizontal: 16,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#fff",
		borderRadius: 20,
	},
})

export default Page
