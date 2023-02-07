require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')

// https://hardhat.org/hardhat-runner/docs/config
// https://github.com/smartcontractkit/hardhat-starter-kit/blob/main/hardhat.config.js

module.exports = {
	solidity: {
		version: '0.8.7',
		settings: {
			optimizer: {
				enabled: true,
				runs: 1000,
			},
		},
	},

	// For adding HD wallet:
	// https://hardhat.org/hardhat-runner/docs/config#hd-wallet-config
	// @NOTE: private key is safer to use than a mnemonic keyphrase, as losing a private key
	// will only compromise a single account, and losing a mnemonic key/ will compromise
	// all the accounts that can be generated from it.

	networks: {
		hardhat: {},
		polygon: {
			chainId: 137,
			url: process.env.POLY_URL,
			accounts: [process.env.POLY_PRIVATE_KEY],
			timeout: 60000,
		},
		mumbai: {
			chainId: 80001,
			url: process.env.MUMB_URL,
			accounts: [process.env.MUMB_PRIVATE_KEY],
			timeout: 60000,
		},
		arbitrum: {
			chainId: 200,
			url: process.env.ARBI_URL,
			accounts: [process.env.ARBI_PRIVATE_KEY],
			timeout: 60000,
		},
		arbitrinkeby: {
			chainId: 421611,
			url: process.env.ARBIRINK_URL,
			accounts: [process.env.ARBIRINK_PRIVATE_KEY],
			timeout: 60000,
		},
		optimism: {
			chainId: 10,
			url: process.env.OPTI_URL,
			accounts: [process.env.OPTI_PRIVATE_KEY],
			timeout: 60000,
		},
		optikovan: {
			chainId: 69,
			url: process.env.OPTIKOV_URL,
			accounts: [process.env.OPTIKOV_PRIVATE_KEY],
			timeout: 60000,
		},
		mainnet: {
			chainId: 1,
			url: process.env.MAIN_URL,
			accounts: [process.env.MAIN_PRIVATE_KEY],
			timeout: 60000,
		},
		chalen: {
			chainId: 97,
			url: process.env.CHALEN_URL,
			accounts: [process.env.CHALEN_PRIVATE_KEY],
			timeout: 60000,
		},
		moonriver: {
			chainId: 1285,
			url: process.env.MOONRIVER_URL,
			accounts: [process.env.MOONRIVER_PRIVATE_KEY],
			timeout: 60000,
		},
		moonrbeam: {
			chainId: 1284,
			url: process.env.MOONRBEAM_URL,
			accounts: [process.env.MOONRBEAM_PRIVATE_KEY],
			timeout: 60000,
		},
		evmos: {
			chainId: 9001,
			url: process.env.EVMOS_URL,
			accounts: [process.env.EVMOS_PRIVATE_KEY],
			timeout: 60000,
		},
		tevmos: {
			chainId: 9000,
			url: process.env.TEVMOS_URL,
			accounts: [process.env.TEVMOS_PRIVATE_KEY],
			timeout: 60000,
		},
		// //https://docs.avax.network/community/tutorials-contest/2022/local-subnet-development/hardhat.config.ts
		fuji: {
			chainId: 43113,
			url: process.env.FUJI_URL,
			accounts: [process.env.FUJI_PRIVATE_KEY],
			timeout: 60000,
		},
		fujix: {
			chainId: 000000,
			url: process.env.FUJIX_URL,
			accounts: [process.env.FUJIX_PRIVATE_KEY],
			timeout: 60000,
		},
		avax: {
			chainId: 43114,
			url: process.env.AVAX_URL,
			accounts: [process.env.AVAX_PRIVATE_KEY],
			timeout: 60000,
		},
	},

	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			mainnet: process.env.MAIN_API_KEY,
			goerli: process.env.GOERLI_API_KEY,
			polygon: process.env.POLY_API_KEY,
			polygonMumbai: process.env.MUMB_API_KEY,
			optimism: process.env.OPTI_API_KEY,
		},
	},

	paths: {
		sources: './contracts',
		tests: './test',
		cache: './cache',
		artifacts: './artifacts',
	},
}
