import { GovernanceData } from './useGovernanceDetail'
export function amountAddDecimals(amount: string | number, decimals = 18) {
  return amount + new Array(decimals).fill('0').join('')
}

interface Users {
  totalNo: string
  totalStake: string
  totalYes: string
  stakeEndTime: number
}
enum StatusOption {
  Live = 'Live',
  Success = 'Success',
  Failed = 'Failed'
}
const mockList: { [key in string]: GovernanceData } = {
  g1: {
    id: 'g1',
    title: 'Adopt new math model to oracle-less bull and bear',
    creator: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1584433),
    voteAgainst: amountAddDecimals(484433),
    totalVotes: amountAddDecimals(2068866),
    contents: {
      summary:
        'The current math model v1 is not smooth enough to follow the price movement. The new model would largely increase the smoothness of the model. The new model is described in the details section below',
      details: `We aim to decide whether a particular cryptocurrency is bullish or bearish by using a financial derivative: perpetual options. We achieve this by tokenize perpetual options, so that investors can forge and trade these tokens. One can judge based on two facts: the market price of the asset and the cost of generating tokens. The paper can be seen here https://github.com/antimatter-finance/antimatter-assets/blob/main/antimatter%20V2%20white%20paper.pdf`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g2: {
    id: 'g2',
    title: 'Launching Financial NFT application Nonfungible Finance',
    creator: '0x55cB10Cc3AE459EeE072567c8D53d1Bca31761fA',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1684433),
    voteAgainst: amountAddDecimals(654433),
    totalVotes: amountAddDecimals(2338866),
    contents: {
      summary: `Many discussions in the NFT space have been revolving around fine arts and music, making us forget about bigger, even more exciting use cases for this technology: financial NFTs. While this idea has been floating around, so far it's been too complicated to implement. As we are exploring a variety of derivatives and working on the perpetual polarized options, we are excited to launch another line of product for antimatter: non-fungible finance.`,
      details: `This product allows people to trade indexes in NFT format with a variety of underlying assets combination. Anyone can create indexes in a permission-less way. To create your index, you simply need to define the type of underlying crypto asset with amount. Then you can release the index to public.
Anyone can buy or sell these indexes. When you buy an index, the contract will automatically purchase underlying assets from the market and then generate the NFT index for buyer. To sell the index, the seller will burn his piece of NFT index and liquidate the underlying asset. NFTs can be used as a locker for crypto assets. Use cases include digital safe with an unlock schedule, or gift that you can reward to people. You can select asset to put into a locker NFT and you can choose a release schedule for the token.
`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g3: {
    id: 'g3',
    title: 'Multichain deployment for Bull&bear tokens',
    creator: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1584433),
    voteAgainst: amountAddDecimals(354433),
    totalVotes: amountAddDecimals(1938866),
    contents: {
      summary: `We should deploy decentralized bull and bear tokens on Binance smart chain, Avalanche and fantom.`,
      details: `The deployment should include both smart contract deployment through EVM framework as well as the the frontend and back end update.`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g4: {
    id: 'g4',
    title: 'Add NFT minting tool to nonfungible Finance and launch Antimatter Art work',
    creator: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(2124433),
    voteAgainst: amountAddDecimals(254433),
    totalVotes: amountAddDecimals(2378866),
    contents: {
      summary: `We should involve Antimatter Dao with artworks to bring more element to community`,
      details: `We will adoption a lottery blind box to nonfungible finance and launch 66 artworks for matter holders to mint.`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g5: {
    id: 'g5',
    title: 'Add oracle to bull and bear',
    creator: '0x670Fd18990A129231e7640218248C3C745E3c3FD',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(663543),
    voteAgainst: amountAddDecimals(884433),
    totalVotes: amountAddDecimals(1547976),
    contents: {
      summary: 'We should replace the current math model with oracles to provide more flexibility',
      details: `The current model without oracle faces some constraint and we should take the risk of oracle to gain more benefits.`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Failed,
    m: true
  },
  g6: {
    id: 'g6',
    title: 'New application submission - Antimatter structured products',
    creator: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1924433),
    voteAgainst: amountAddDecimals(454433),
    totalVotes: amountAddDecimals(2378866),
    contents: {
      summary: `Antimatter Dual Investment is an advanced options derivative based on a decentralized protocol. The product has a "market-neutral, returns guaranteed" feature, where the yield is clear and fixed at the time of purchase, while the settlement currency is uncertain. At maturity, the settlement currency depends on the outcome of the settlement price at maturity compared to the strike price.`,
      details: `Options derivatives are highly complex financial products, which are difficult to use and have high barriers to entry. Options derivatives often deter many users. Therefore, we are considering the introduction of simplified derivatives products to serve users more conveniently. Meanwhile, Antimatter is facing a real challenge of a plain product structure and the lack of real users. So we plan to develop more accessible products based on the original derivatives ecosystem, in order to find new growth room.`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g7: {
    id: 'g7',
    title: 'Add Vault to structured products',
    creator: '0x174F1F7A2CD0c7B5A9f48c56016ea13aF3BF8D3E',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1624433),
    voteAgainst: amountAddDecimals(654433),
    totalVotes: amountAddDecimals(2278866),
    contents: {
      summary: `Add Vault to structured products`,
      details: `The antimatter structured products should add recurring strategy to initiate automatic strategy for users to participate long term and earn premium. The recurring strategy design proposal is send to Figma`,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  },
  g8: {
    id: 'g8',
    title: 'Liquidity Mining of MATTER token',
    creator: '0x4eaed749Dc2CCbC1fB1FF44528eA4521ad217C00',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(827879),
    voteAgainst: amountAddDecimals(1317879),
    totalVotes: amountAddDecimals(2145758),
    contents: {
      summary: 'Title: Liquidity Mining of MATTER token',
      details: `Use LP staking to incentivize liquidity providers to contribute more to Matter token’s dex pool. The apy should be high enough to attract more trading and liquidity provision activities `,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Failed,
    m: true
  },
  g9: {
    id: 'g9',
    title: 'Antimatter Fee generation and reward to stakers',
    creator: '0x5718D9C95D15a766E9DdE6579D7B93Eaa88a26b8',
    timeLeft: '1642134738',
    voteFor: amountAddDecimals(1317879),
    voteAgainst: amountAddDecimals(327879),
    totalVotes: amountAddDecimals(1645758),
    contents: {
      summary: 'We propose to use fees accumulated in the vault to reward stakers',
      details: `Currently Antimatter Bull&bear and Nonfungible finance generate fees from transactions. The fee accumulation should be rewarded to stakers. `,
      agreeFor: 'agreeFor',
      againstFor: 'againstFor'
    },
    status: StatusOption.Success,
    m: true
  }
}

export function addMockList() {
  const ret: GovernanceData[] = Object.values(mockList).reverse()
  return ret
}

export function useMockDetail(index: string) {
  return mockList?.[index]
}

export function useMockUserStaking(proposeid: string | number | undefined): Users {
  return proposeid
    ? {
        totalNo: '',
        totalStake: '',
        totalYes: '',
        stakeEndTime: 6786876743
      }
    : {
        totalNo: '',
        totalStake: '',
        totalYes: '',
        stakeEndTime: 0
      }
}
