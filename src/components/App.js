import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json';

import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadExchange
} from '../store/interactions';

import Navbar from './Navbar';
import Markets from './Markets';

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    try {
      // Connect Ethers to blockchain
      const provider = loadProvider(dispatch);

      // Get the current chain ID
      const chainId = await loadNetwork(provider, dispatch);
     // console.log('Current Chain ID:', chainId); // Print the current chain ID

      // Fetch current account & balance from Metamask
      await loadAccount(provider, dispatch);

      // Check if 'ASH' and 'ISA' properties exist for the current chainId
      if (config[chainId] && config[chainId].ASH && config[chainId].ISA) {
        const ASH = config[chainId].ASH;
        const ISA = config[chainId].ISA;

        // Load token smart contracts
        await loadTokens(provider, [ASH.address, ISA.address], dispatch);
      } else {
        console.error('ASH or ISA properties not found in config for chainId:', chainId);
        // Handle the error or provide default values for ASH and ISA as needed
      }

      // Check if 'exchange' property exists for the current chainId
      if (config[chainId] && config[chainId].exchange) {
        const exchangeConfig = config[chainId].exchange;

        // Load exchange smart contract
        await loadExchange(provider, exchangeConfig.address, dispatch);
      } else {
        console.error('exchange property not found in config for chainId:', chainId);
        // Handle the error or provide default values for exchangeConfig as needed
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
      // You can add additional error handling or dispatch Redux actions for errors here if needed
    }
  };

  
  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <div>

<Navbar />
      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          <Markets/>

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}


export default App;