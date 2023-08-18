import "./App.css"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { Web3Button } from '@web3modal/react'

function App() {

  const chains = [arbitrum, mainnet, polygon]
  const projectId = 'b7c4896bb79704f27f2533235c423901'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  return (
    <div className='wrapper'>
      <>
        <WagmiConfig config={wagmiConfig}>
          <h1>Wallet connect</h1>
          <Web3Button />
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
    </div>
  )
}

export default App;