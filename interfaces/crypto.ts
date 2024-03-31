export interface Currency {
	circulating_supply: number;
	cmc_rank: number;
	date_added: string;
	id: number;
	infinite_supply?: any;
	last_updated: string;
	max_supply: number;
	name: string;
	num_market_pairs: number;
	platform?: any;
	quote: Quote;
	self_reported_circulating_supply?: any;
	self_reported_market_cap?: any;
	slug: string;
	symbol: string;
	tags: string[];
	total_supply: number;
}

interface Quote {
	USD: USD;
}

interface USD {
	price: number;
	volume_24h: number;
	volume_change_24h: number;
	percent_change_1h: number;
	percent_change_24h: number;
	percent_change_7d: number;
	percent_change_30d: number;
	percent_change_60d: number;
	percent_change_90d: number;
	market_cap: number;
	market_cap_dominance: number;
	fully_diluted_market_cap: number;
	last_updated: string;
	tvl?: any;
}

interface Platform {
	id: number;
	name: string;
	symbol: string;
	slug: string;
	token_address: string;
}
