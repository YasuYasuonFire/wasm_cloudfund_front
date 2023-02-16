import type { NextPage } from 'next'
import { useState, useCallback, useEffect } from 'react'
import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { Abi, ContractPromise } from '@polkadot/api-contract'
import type { WeightV2 } from '@polkadot/types/interfaces'
import BN from 'bn.js';
import {
  web3Enable,
  isWeb3Injected,
  web3Accounts,
} from '@polkadot/extension-dapp'
import type { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types'

import Spinner from './spinner'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
//import abiData from './abi'
import abiData from './myabi'
import { send } from 'process'

// local
//const WS_PROVIDER = 'ws://127.0.0.1:9944'

// shibuya
//const WS_PROVIDER = 'wss://shibuya-rpc.dwellir.com'

// shiden
//const WS_PROVIDER = 'wss://shiden-rpc.dwellir.com'
const WS_PROVIDER = 'wss://shiden.public.blastapi.io'

const proofSize = 131072
const refTime = 6219235328
const storageDepositLimit = null

//const address = "XS6uDNeEA5N6qvNXBkdvY1VKfAYSUtrM4KwH2rd3usFa4CY";
//const address = "ab6cMAFjtKAnYnRhKHjmSmwZVoghBTbh6ku9M8oxY9HzB82";//shibuya
const address = "bDnAheHGy4yMfxCEVaX9QxXQ5CcdGAoqepUk84XwES9P9KZ";//shiden

const Home: NextPage = () => {
  // const [address, setAddress] = useState('')
  // const [addressSubmitted, setAddressSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [extensions, setExtensions] = useState<InjectedExtension[]>([])
  //for campaign contract
  const [approversCount, setApproversCount] = useState(0)
  const [approvalCount, setApprovalCount] = useState(0)
  const [description, setDescription] = useState<string>('')
  const [value, setValue] = useState(BigInt(0))
  const [recipient, setRecipient] = useState('')
  const [minimumContribution, setMinimumContribution] = useState(0)
  const [fundvalue, setFundvalue] = useState(BigInt(0))
  const [gatheredvalue, setGatheredvalue] = useState(BigInt(0))

  const [newdescription, setNewescription] = useState<string>('')
  const [newvalue, setNewvalue] = useState(0)
  const [newrecipient, setNewrecipient] = useState('')


  useEffect(() => {
     get_minimum();
     get_description();
     get_value();
     get_recipient();
     get_gatheredvalue();
  }, []);

  // load Substrate wallet and set the signer
  const initSubstrateProvider = useCallback(async () => {
    if (!isWeb3Injected) {
      throw new Error('The user does not have any Substrate wallet installed')
    }

    const extensions = await web3Enable('Flipper UI')

    if (extensions.length > 0) {
      setExtensions(extensions)
    }

    // set the first wallet as the signer (we assume there is only one wallet)
    // wallet.substrate.setSigner(extensions[0].signer)

    const injectedAccounts = await web3Accounts()

    if (injectedAccounts.length > 0) {
      setAccounts(injectedAccounts)
    }
  }, [])

  const handleOnSelect = async (event: any) => {
    setAccount(event.target.value)
  }


  //get minimum value for contribution
  const get_minimum = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })

    await api.isReady

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.getMinimum(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      }
    )
    
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setMinimumContribution(Number(output?.toString()))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  
  const get_description = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })

    await api.isReady

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.getDescription(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      }
    )
    
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {  
        let description = output?.toHuman()?.toString(); 
        if(description){
          setDescription(description);
        }
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  const get_value = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })

    await api.isReady

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.getValue(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      }
    )
    
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setValue(BigInt(output?.toString()))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }

  const get_recipient = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })

    await api.isReady

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.getRecipient(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      }
    )
    
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setRecipient(output?.toString())
      }
    } else {
      console.error('Error', result.asErr)
    }
  }


  //get minimum value for contribution
  const get_gatheredvalue = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })

    await api.isReady

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.getBalance(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      }
    )
    
    console.log(result.toHuman())

    // the gas consumed for contract execution
    console.log(gasRequired.toHuman())

    // check if the call was successful
    if (result.isOk) {
      // output the return value
      console.log('Success', output?.toHuman())

      if (output) {
        setGatheredvalue(BigInt(output?.toString()))
      }
    } else {
      console.error('Error', result.asErr)
    }
  }



  //make new proposal
  const createRequest = async () => {
    const provider = new WsProvider(WS_PROVIDER)
		const api = new ApiPromise({ provider })


    let sendvalue = BigInt(newvalue) * 10n*10n*10n*10n*10n*10n*10n*10n*10n* 
    10n*10n*10n*10n*10n*10n*10n*10n*10n;

    await api.isReady

    api.setSigner(extensions[0].signer)

    console.log('API is ready')

    const abi = new Abi(abiData, api.registry.getChainProperties())

    const contract = new ContractPromise(api, abi, address)

    const { gasRequired, result, output } = await contract.query.createRequest(
      address,
      {
        gasLimit: api.registry.createType('WeightV2', {
          refTime,
          proofSize,
        }) as WeightV2,
        storageDepositLimit,
      },newdescription, sendvalue, newrecipient

    )

    const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2

    setLoading(true)

    // Send the transaction, like elsewhere this is a normal extrinsic
    // with the same rules as applied in the API (As with the read example,
    // additional params, if required can follow)
    try {
      await contract.tx
        .createRequest({
          gasLimit: gasLimit,
          storageDepositLimit
        },newdescription, sendvalue, newrecipient)//newvalue:convert to max decimal
        .signAndSend(account, async (res) => {
          if (res.status.isInBlock) {
            console.log('in a block')
            setLoading(false)
          } else if (res.status.isFinalized) {
            console.log('finalized')
          }
        })

    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }


 //Fund to  proposal
  const approveRequest = async () => {
  const provider = new WsProvider(WS_PROVIDER)
  const api = new ApiPromise({ provider })

  //let sendvalue =  new BN(fundvalue).pow(new BN(18));
  let sendvalue = BigInt(fundvalue) * 10n*10n*10n*10n*10n*10n*10n*10n*10n* 
  10n*10n*10n*10n*10n*10n*10n*10n*10n;
  await api.isReady

  api.setSigner(extensions[0].signer)

  console.log('API is ready')

  const abi = new Abi(abiData, api.registry.getChainProperties())

  const contract = new ContractPromise(api, abi, address)

  const { gasRequired, result, output } = await contract.query.approveRequest(
    address,
    {
      value: sendvalue,
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
      storageDepositLimit,
    },
  )

  const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2
  //const gasLimit = 30000*1000000;
  //const value = new BN(10).pow(new BN(18));
  setLoading(true)

  // Send the transaction, like elsewhere this is a normal extrinsic
  // with the same rules as applied in the API (As with the read example,
  // additional params, if required can follow)
  try {
    await contract.tx
      .approveRequest({
        value: sendvalue,
        gasLimit: gasLimit,
        storageDepositLimit,
      })
      .signAndSend(account, async (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
          setLoading(false)
        } else if (res.status.isFinalized) {
          console.log('finalized')
        }
      })

  } catch (e) {
    console.error(e)
    setLoading(false)
  }
}



//finalize request
const FinalizeRequest = async () => {
  const provider = new WsProvider(WS_PROVIDER)
  const api = new ApiPromise({ provider })

  await api.isReady

  api.setSigner(extensions[0].signer)

  console.log('API is ready')

  const abi = new Abi(abiData, api.registry.getChainProperties())

  const contract = new ContractPromise(api, abi, address)

  const { gasRequired, result, output } = await contract.query.finalizeRequest(
    address,
    {
      gasLimit: api.registry.createType('WeightV2', {
        refTime,
        proofSize,
      }) as WeightV2,
      storageDepositLimit,
    },

  )

  const gasLimit = api.registry.createType('WeightV2', gasRequired) as WeightV2

  setLoading(true)

  // Send the transaction, like elsewhere this is a normal extrinsic
  // with the same rules as applied in the API (As with the read example,
  // additional params, if required can follow)
  try {
    await contract.tx
      .finalizeRequest({
        gasLimit: gasLimit,
        storageDepositLimit
      },)//newvalue:convert to max decimal
      .signAndSend(account, async (res) => {
        if (res.status.isInBlock) {
          console.log('in a block')
          setLoading(false)
        } else if (res.status.isFinalized) {
          console.log('finalized')
        }
      })

  } catch (e) {
    console.error(e)
    setLoading(false)
  }
}

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Crowdfunding Contract</title>
        <meta name='description' content='Crowdfunding Contract' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {loading ? <Spinner /> : null }

      <main className={styles.main}>
          <h3 className={styles.title}>
          Crowdfunding Contract
          </h3>
          
          <div>
          <button onClick={initSubstrateProvider}>Load Wallets</button><br />
          </div>
          <div>
          <select onChange={handleOnSelect}>
            <option value="">Select Address</option>
            {accounts.map(account => (
              <option key={account.address} value={account.address}>{account.meta.name} {account.address}</option>
            ))}
          </select></div><br />

          <h3 className={styles.underline}>Now Proposing</h3>
          <p>description:  {description}</p>
          <p>value needed: {Math.trunc(Number(value) * 10 ** (-18))} SDN</p>
          <p>value gathered: {Math.trunc(Number(gatheredvalue) * 10 ** (-18))} SDN</p>
          <p>recepient: {recipient}</p>


          <h3 className={styles.underline}>For Contributor</h3>
          
          <p>
 
          <input
              type='number'
              onChange={e => setFundvalue(BigInt(e.target.value))}
            /> SDN</p>
          <div>
          <button onClick={e => approveRequest()}>Fund to Proposal</button>
          </div>
          <p>※ minimum fund:  {minimumContribution * 10 ** (-18)} SDN</p>


          <h3 className={styles.underline}>Create new proposal</h3>
          <div>
            <p>description:　　
            <input
              type='text'
              value={newdescription}
              onChange={e => setNewescription(e.target.value)}
            /></p>
            <p>value needed:　
            <input
              type='text'
              value={newvalue}
              onChange={e => setNewvalue(Number(e.target.value))}
            /> SDN </p>
            <p>recipient:　　　
            <input
              type='text'
              value={newrecipient}
              onChange={e => setNewrecipient(e.target.value)}
            /></p>
            <button onClick={e => createRequest()}>Create</button>
          </div>

          <h3 className={styles.underline}>For Master</h3>
          <div>
          <button onClick={e => FinalizeRequest()}>Finalize Proposal</button>
          </div>
      </main>
    </div>
  )
}

export default Home