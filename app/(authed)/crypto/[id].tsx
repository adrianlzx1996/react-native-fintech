import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import * as Haptics from "expo-haptics";
import { Ticker } from "@/interfaces/crypto";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "@formkit/tempo"
import Animated, { SharedValue, useAnimatedProps } from "react-native-reanimated";

const categories = ["Overview", "News", "Orders", "Transactions"]

const INIT_STATE = { x: 0, y: { price: 0 } } as const;

Animated.addWhitelistedNativeProps({ text: true, });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
	return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
	const headerHeight = useHeaderHeight();
	const { id } = useLocalSearchParams();
	const [activeIndex, setActiveIndex] = useState(0);
	const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);

	// 👇 create multiple press states
	const { state, isActive } = useChartPressState(INIT_STATE);

	useEffect(() => {
		if (isActive) {
			Haptics.selectionAsync()
		}

	}, [isActive])


	const { data } = useQuery({
		queryKey: ['info', id],
		queryFn: async () => {
			const info = await fetch(`/api/info?ids=${id}`).then(res => res.json())

			return info[+id];
		},
	});

	const { data: tickers } = useQuery({
		queryKey: ['tickers', id],
		queryFn: async (): Promise<Ticker[]> => await fetch(`/api/ticker`).then(res => res.json()),
	});

	const animatedText = useAnimatedProps(() => {
		return {
			text: `$${state.y.price.value.value.toFixed(2)}`,
			defaultValue: ''
		}
	})

	const animatedDateText = useAnimatedProps(() => {
		const date = new Date(state.x.value.value)
		return {
			text: date.toLocaleDateString(),
			defaultValue: ''
		}
	})

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
						<View style={[defaultStyles.block, { height: 500 }]}>
							{tickers !== undefined
								?
								<>
									{!isActive
										? <View>
											<Text style={{ fontSize: 32, fontWeight: "bold", color: Colors.dark }}>${tickers[tickers.length - 1].price.toFixed(2)}</Text>
											<Text style={{ fontSize: 16, color: Colors.gray }}>Today</Text>
										</View>
										: <View>
											<AnimatedTextInput editable={false} underlineColorAndroid={'transparent'} style={{ fontSize: 32, fontWeight: "bold", color: Colors.dark }} animatedProps={animatedText} />
											<AnimatedTextInput editable={false} underlineColorAndroid={'transparent'} style={{ fontSize: 16, fontWeight: "bold", color: Colors.dark }} animatedProps={animatedDateText} />
										</View>}
									<CartesianChart
										chartPressState={state}
										axisOptions={{
											font,
											tickCount: 4,
											labelOffset: { x: -2, y: 2 },
											labelColor: Colors.gray,
											formatYLabel: v => `$${v}`,
											formatXLabel: ms => format(new Date(ms), "MM/YY")
										}}
										data={tickers!}
										xKey="timestamp"
										yKeys={["price"]}
									>
										{({ points }) => (
											<>
												<Line points={points.price} color={Colors.primary} strokeWidth={3} />
												{isActive && <ToolTip x={state.x.position} y={state.y.price.position} />}
											</>
										)}
									</CartesianChart>
								</>
								: null}
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
