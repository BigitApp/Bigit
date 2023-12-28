import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export function getContract(contractAddress: string) {
  return axios.get(`/nft/contract/${contractAddress}`);
}

export function getNfts(contractAddress: string, startToken?: string) {
  return axios.get(`/nft/contract/${contractAddress}/tokens`, {
    params: {
      startToken,
    },
  });
}

export function getOneNft(contractAddress: string, tokenId: string) {
  return axios.get(`/nft/contract/${contractAddress}/tokens/${tokenId}`);
}

export function getNftTransferHistory(
  contractAddress: string,
  tokenId: string
) {
  return axios.get(
    `/nft/contract/${contractAddress}/tokens/${tokenId}/history`
  );
}

export function getProxyAddress(address: string) {
  return axios.get(`/order/proxy/${address}`);
}

export function generateSellOrder({
  maker,
  contract,
  tokenId,
  price,
  expirationTime,
}: {
  maker: string;
  contract: string;
  tokenId: string;
  price: string;
  expirationTime: number;
}) {
  return axios.post("/order/sell", {
    maker,
    contract,
    tokenId,
    price,
    expirationTime,
  });
}

// 판매 주문 서명 검증
export function verifySellOrder(orderId: number, sig: string) {
  return axios.post("/order/sell/verify", {
    orderId,
    sig: {
      r: `0x${sig.slice(2, 66)}`,
      s: `0x${sig.slice(66, 130)}`,
      v: `0x${sig.slice(130, 132)}`,
    },
  });
}

//판매 주문 가져오기
export function getNftSellOrders(contractAddress: string, tokenId: string) {
  return axios.get(`/order/sell/${contractAddress}/${tokenId}`);
}

export function generateBuyOrder({
  orderId,
  maker,
}: {
  orderId: number;
  maker: string;
}) {
  return axios.post("/order/buy", {
    orderId,
    maker,
  });
}

export function verifyBuyOrder(order: any, sig: string) {
  return axios.post("/order/verify", {
    order,
    sig: {
      r: `0x${sig.slice(2, 66)}`,
      s: `0x${sig.slice(66, 130)}`,
      v: `0x${sig.slice(130, 132)}`,
    },
  });
}

export function getNftOfferLists(contractAddress: string, tokenId: string) {
  return axios.get(`/order/offer/${contractAddress}/${tokenId}`);
}

export function generateOfferOrder({
  maker,
  contract,
  tokenId,
  price,
  expirationTime,
}: {
  maker: string;
  contract: string;
  tokenId: string;
  price: string;
  expirationTime: number;
}) {
  return axios.post("/order/offer", {
    maker,
    contract,
    tokenId,
    price,
    expirationTime,
  });
}

export function acceptOffer({
  orderId,
  maker,
}: {
  orderId: number;
  maker: string;
}) {
  return axios.post("/order/offer/accept", {
    orderId,
    maker,
  });
}

export function verifyOfferOrder(orderId: number, sig: string) {
  return axios.post("/order/offer/verify", {
    orderId,
    sig: {
      r: `0x${sig.slice(2, 66)}`,
      s: `0x${sig.slice(66, 130)}`,
      v: `0x${sig.slice(130, 132)}`,
    },
  });
}
