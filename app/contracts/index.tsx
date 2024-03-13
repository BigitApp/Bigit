import { providers, Contract } from 'ethers'
import { ethers } from "ethers";
import BotNFTAbi from './BotNFTABI.json'
import { Amount } from '@thirdweb-dev/sdk';

const NFTContractAddress = '0xfb6bbf05aD57F73581cDb68A678f5064FCa99aC8'


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

