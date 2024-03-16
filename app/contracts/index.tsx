import { providers, Contract } from 'ethers'
import { ethers } from "ethers";
import BotNFTAbi from './BotNFTABI.json'
import { BigNumber } from 'ethers';
import axios from 'axios';

const NFTContractAddress = '0x4bb3F7718831149C875FC64E6D8Ee852b7CbE74f'

interface NFT {
    price: BigNumber;
    tokenId: BigNumber;
    seller: string;
    owner: string;
    bot: string;
    name: string;
    avatar: string;
}

interface NFTList {
    price: string;
    tokenId: number;
    seller: string;
    owner: string;
    bot: string;
    name: string;
    avatar: string;
  }

const contractFactory = () => {
    const contracts: { [address: string]: Contract } = {};

    return function (contractAddress: string, abi: any) {
        if (!contracts[contractAddress]) {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            contracts[contractAddress] = new Contract(contractAddress, abi, signer);
        }

        return contracts[contractAddress];
    };
};

const getContractFn = contractFactory()


export const createToken = async (url: string, price: string) => {
    const Price = ethers.utils.parseUnits(price, 'ether')
    const NFTContract = getContractFn(NFTContractAddress, BotNFTAbi);
    let listingPrice = await NFTContract.getListingPrice()
    listingPrice = listingPrice.toString()
    const txn = await NFTContract.createToken(url, Price, { value: listingPrice })
    return txn.wait()
};

export const loadNFTs = async () => {
    const NFTContract = getContractFn(NFTContractAddress, BotNFTAbi);
    const NFTData = await NFTContract.fetchMarketItems()

    const items = await Promise.all(NFTData.map(async (i: NFT)=> {
        const tokenUri = await NFTContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const botData = meta.data.bots;
        const firstKey = Object.keys(botData)[0];
        const firstBotValue = botData[firstKey];
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          name: firstBotValue.name,
          avatar:firstBotValue.avatar
        }
        return item
    }))
    return items
};

export const loadBot = async (id: number | undefined) => {
    const NFTContract = getContractFn(NFTContractAddress, BotNFTAbi);
    const tokenUri = await NFTContract.tokenURI(id)
    const metaData = await axios.get(tokenUri)
    console.log(metaData.data)
    // const botData = meta.data.bots;
    // const firstKey = Object.keys(botData)[0];
    // const firstBotValue = botData[firstKey];

    return metaData.data
};

export const fetchMyNFTs = async () => {
    const NFTContract = getContractFn(NFTContractAddress, BotNFTAbi);
    const NFTData = await NFTContract.fetchMyNFTs()

    const items = await Promise.all(NFTData.map(async (i: NFT) => {
        const tokenUri = await NFTContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const botData = meta.data.bots;
        const firstKey = Object.keys(botData)[0];
        const firstBotValue = botData[firstKey];
        let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          name: firstBotValue.name,
          avatar:firstBotValue.avatar
        }
        return item
    }))
    return items
};


export const buyNFT = async (nft: NFTList) => {
    const NFTContract = getContractFn(NFTContractAddress, BotNFTAbi);
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const txn = await NFTContract.createMarketSale(nft.tokenId, {
      value: price
    })
    return txn.wait()
};
