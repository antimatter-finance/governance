import { GovChainId } from '../../constants/index'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in GovChainId]: string } = {
  [GovChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [GovChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
  [GovChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [GovChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [GovChainId.GÖRLI]: '0x77dCa2C955b15e9dE4dbBCf1246B4B85b651e50e',
  [GovChainId.MATTER]: '0xc99fa9a46726c3a230cce650199161d4eeeabda5'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
