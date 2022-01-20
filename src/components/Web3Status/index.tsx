// import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken } from 'polished'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
// import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
// import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
// import PortisIcon from '../../assets/images/portisIcon.png'
// import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
// import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useHasSocks } from '../../hooks/useSocksBalance'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'
import { ButtonOutlined } from '../Button'
import Copy from '../AccountDetails/Copy'
import accountControlUrl from 'assets/svg/account_control.svg'

// import Identicon from '../Identicon'
import Loader from '../Loader'

import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'
import { TYPE } from 'theme'
import useTheme from 'hooks/useTheme'

// const IconWrapper = styled.div<{ size?: number }>`
//   ${({ theme }) => theme.flexColumnNoWrap};
//   align-items: center;
//   justify-content: center;
//   & > * {
//     height: ${({ size }) => (size ? size + 'px' : '32px')};
//     width: ${({ size }) => (size ? size + 'px' : '32px')};
//   }
// `

const Web3StatusGeneric = styled(ButtonOutlined)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  padding: 8px 25px;
  border: 1px solid ${({ theme }) => theme.text1};
  border-color: ${({ theme }) => theme.text1};
  color: ${({ theme }) => theme.text1};
  font-weight: 500;
  border-radius: 49px;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.text1)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.bg1};
      border: 1px solid ${({ theme }) => theme.text1};
      color: ${({ theme }) => theme.text1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.text1)};
        color: ${({ theme }) => darken(0.05, theme.text1)};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text3)};
  padding: 0;
  border: none
  font-weight: 500;
  :hover,
  :focus {
    color:${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : theme.text1)};
    border: none;
    box-shadow: none
  }
  & p{
    margin: 0 .5rem;
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 13px;
  width: fit-content;
  font-weight: 400;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size:12px
  `}
`

const StyledAccountControl = styled('img')`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height:25px;
    width:25px
`}
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const SOCK = (
  <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
    🧦
  </span>
)

// eslint-disable-next-line react/prop-types
// function StatusIcon({ connector }: { connector: AbstractConnector }) {
//   if (connector === injected) {
//     return <Dot />
//   } else if (connector === walletconnect) {
//     return (
//       <IconWrapper size={16}>
//         <img src={WalletConnectIcon} alt={''} />
//       </IconWrapper>
//     )
//   } else if (connector === walletlink) {
//     return (
//       <IconWrapper size={16}>
//         <img src={CoinbaseWalletIcon} alt={''} />
//       </IconWrapper>
//     )
//   } else if (connector === fortmatic) {
//     return (
//       <IconWrapper size={16}>
//         <img src={FortmaticIcon} alt={''} />
//       </IconWrapper>
//     )
//   } else if (connector === portis) {
//     return (
//       <IconWrapper size={16}>
//         <img src={PortisIcon} alt={''} />
//       </IconWrapper>
//     )
//   }
//   return null
// }

function Web3StatusInner() {
  const { t } = useTranslation()
  const { account, error } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()
  const theme = useTheme()
  if (account) {
    return (
      <>
        <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
          <StyledAccountControl alt="" src={accountControlUrl} />
          {/* {!hasPendingTransactions && connector && <StatusIcon connector={connector} />} */}
          {hasPendingTransactions ? (
            <RowBetween>
              <Loader stroke={theme.text1} />{' '}
              <Text style={{ marginLeft: '12px', color: theme.text1 }}>{pending?.length} Pending</Text>
            </RowBetween>
          ) : (
            <>
              {hasSocks ? SOCK : null}
              <Text>{ENSName || shortenAddress(account)}</Text>
            </>
          )}
        </Web3StatusConnected>
        <HideSmall> {account && <Copy toCopy={account}></Copy>}</HideSmall>
      </>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
      </Web3StatusError>
    )
  } else {
    return (
      <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <TYPE.black fontSize={16}>{t('Connect Wallet')}</TYPE.black>
      </Web3StatusConnect>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
